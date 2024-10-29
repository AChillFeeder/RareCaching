import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import IndiceInput from './components/IndiceInput'
import IndicesList from './components/IndicesList';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { mapOptions } from './configurations/MapConfiguration';
import { UserContext } from './UserContext';
import { customGetAllFetch } from './utils/customFetch';
import Map from './components/MapCreate';
import '../css/CreateGame.css';

// ---------------------------------------------------------------------------------------------
// CreateGame est la page qui permet de créer une cache
// ---------------------------------------------------------------------------------------------
const CreateGame = () => {

    const location = useLocation();
    const navigate = useNavigate();

    // -----------------------------------------------------------------------------------------
    // Déclarations constantes
    // -----------------------------------------------------------------------------------------
    const { user } = useContext(UserContext);
    const { champion } = location.state || {};
    const { isLoaded } = useJsApiLoader ({
        id: mapOptions.googleMapApiKey,
        googleMapsApiKey: mapOptions.googleMapApiKey
    })
    const [localisationCache, setLocalisationCache] = useState('');
    const [currentCollection, setCurrentCollection] = useState([]);
    const [listIndices,setListIndices]=useState([]);
    const [error, setError] = useState(false);

    // -----------------------------------------------------------------------------------------
    // useEffect
    // -----------------------------------------------------------------------------------------
    useEffect(() => {
        const fetchUserCollections = async () => {
            if (user) {
                const collections = await customGetAllFetch(`/collections/user/${user.id}`);
                console.log('collections = ', collections);
                console.log('champion = ', champion);
                const collection = collections.find(collection => collection.card_id === champion.id);
                console.log('collection = ', collection);
                if (collection) {
                    setCurrentCollection(collection);
                }
            }
        };
        fetchUserCollections();
    }, [user, champion.id]);

    // -----------------------------------------------------------------------------------------
    // Fonctions
    // -----------------------------------------------------------------------------------------
    
    // Gère la fermeture de l'alerte
    const handleClose= () => {
        setError(false);
    }

    // Permet d'ajouter un indice à la liste d'indices
    let addList = (inputText)=>{
        if(inputText!=='') {
            setListIndices([...listIndices,inputText]);
        }
    }

    // Permet de supprimer un indice de la liste
    const deleteListItem = (key)=>{
        let newListIndices = [...listIndices];
        newListIndices.splice(key,1)
        setListIndices([...newListIndices])
    }

    // Permet de créer une partie lorsqu'on clique sur le bouton créer cache
    const handleBtnClick = async () => {
        try {
            const indices = listIndices.join("\n");

            console.log("Donnèes envoyée à la création de la partie");
            console.log({
                organisateur_id: user.id,
                collection_id: currentCollection.id,
                localisation_cache: localisationCache,
                indice: indices, 
            })

            const response = await fetch('http://localhost:5000/parties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    organisateur_id: user.id,
                    collection_id: currentCollection.id,
                    localisation_cache: localisationCache,
                    indice: indices, 
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Partie créée avec succès:', data);
                navigate('/Profile');
            } else {
                console.error('Erreur lors de la création de la partie');
                setError(true);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            setError(true);
        }
    };

    // Permet de récupérer les coordonnées de la cache dans MapCreate
    const handleMarkerDragEnd = (position) => {
        const coordinates = `${position.lat}, ${position.lng}`;
        setLocalisationCache(coordinates); 
    };


    return (
        <div className='body-create-cache'>
            {error && (
                <Alert severity='error' variant='filled' fontSize='inherit' onClose={handleClose}>
                    Une erreur est survenue lors de la création de la cache
                </Alert>
            )}
            <div className='main-container'>

                <h1 className="title">Créer une partie</h1>
                <div className='flex-container'>
                    <div className="data-container">
                        <div className="champion-card">
                            <p className='champion-name'>{`${champion.name}`}</p>
                            <img src={champion.image_url} className='create-cache-img'/>
                        </div>
                    </div>
                    <div className='map-container'>
                        <Map isLoaded={isLoaded} onMarkerDragEnd={handleMarkerDragEnd} rarity={champion.rarity}/>
                    </div>
                </div>
                    
                <IndiceInput className='IndiceInput' addList={addList}/>
                    {listIndices.map((listItem,i) => {
                        return (
                            <IndicesList className='IndicesList' key={i} index={i} item={listItem} deleteItem={deleteListItem}/>
                        )
                    })}
                <button className='btn-create' onClick={handleBtnClick}>Créer cache</button>
                    
            </div>
        </div>
    );
}

export default CreateGame;