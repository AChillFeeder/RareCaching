import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/CreateGame.css';
import IndiceInput from './components/IndiceInput'
import IndicesList from './components/IndicesList';
import Box from '@mui/material/Box';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './configurations/MapConfiguration';
import Map from './components/MapCreate';
import slide_image1 from "../assets/champions/champion1.jpeg";

const CreateGame = () => {
  const location = useLocation();
  const { champion } = location.state || {};
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader ({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey
  })
  const [localisationCache, setLocalisationCache] = useState('');
  const [indices, setIndices] = useState([]);

  const colorRarityMap = {
    "commune": "green",
    "rare": "blue",
    "exceptionnelle": "violet",
    "unique": "black",
    "tres rare": "red",
  }

  const [listIndices,setListIndices]=useState([]);

  let addList = (inputText)=>{
    if(inputText!=='')
      setListIndices([...listIndices,inputText]);
  }
  
  const deleteListItem = (key)=>{
    let newListIndices = [...listIndices];
    newListIndices.splice(key,1)
    setListIndices([...newListIndices])
  }

  const handleBtnClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/create_partie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organisateur_id: 4, // Assure-toi que champion.id est bien défini
          collection: 1,
          localisation_cache: localisationCache,
          indice: 'École informatique', // Utilise la liste des indices
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Partie créée avec succès:', data);
        navigate('/Dashboard'); // Redirige vers le tableau de bord après la création
      } else {
        console.error('Erreur lors de la création de la partie');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
    navigate('/Profile');
  };

  const handleMarkerDragEnd = (position) => {
    setLocalisationCache(position); // Met à jour les coordonnées du marqueur
  };


  return (
    <div className='main-container'>
      <div className="center-container">
        <h1 className="title">Créer une cache</h1>
          <Box className="champion-card">
            <p className='default'>{`${champion.name}`}</p>
            <div className='hover'>
              <div className='champion-data'>
                <img src={champion.image_url.replace(/'/g, "").replace(/ /g, "").replace('skins/base', 'hud').replace('loadscreen', '_circle')}/>
                <p>{`${champion.name}`}</p>
              </div>
            </div>
          </Box>
        <img src={champion.image_url} className='create-cache-img'/>
        <IndiceInput addList={addList}/>
        {listIndices.map((listItem,i) => {
          return (
            <IndicesList key={i} index={i} item={listItem} deleteItem={deleteListItem}/>
          )
        })}
        <div className='map-container'>
          <Map isLoaded={isLoaded} onMarkerDragEnd={handleMarkerDragEnd}/>
        </div>

        <button 
          className='btn-create'
          onClick={handleBtnClick}
        >Créer cache</button>
        
          
      </div>
    </div>
  );
}

export default CreateGame;