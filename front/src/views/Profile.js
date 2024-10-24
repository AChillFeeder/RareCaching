import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../css/Profile.css';
import { customGetAllFetch } from './utils/customFetch';


// const generateChampionCollection = (champions) => {
//     const championsArray = Array(100).fill(null); // Tableau de 100 éléments

//     champions.forEach((champion) => {
//         championsArray[champion.id - 1] = champion; // Placer chaque champion à sa position (id-1)
//     });

//     return championsArray;
// };

const Profile = () => {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        customGetAllFetch('cards').then( data =>
        setCards(data)
    ).then( data =>
        console.log(data)
    )
    }, []);


    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [isScrollable, setIsScrollable] = useState(false);

    const colorRarityMap = {
        "commune": "green",
        "rare": "blue",
        "exceptionnelle": "violet",
        "unique": "black",
        "tres rare": "red",
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsScrollable(window.innerWidth < 600); // Par exemple, si la largeur de la fenêtre est inférieure à 600px
        };

        // Vérifier la taille initiale
        handleResize();

        // Écouter les redimensionnements de la fenêtre
        window.addEventListener('resize', handleResize);

        // Nettoyage
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleBtnClick = (champion) => {
        navigate('/CreateGame', { state: { champion } });
    };


    return (
        <div className='container'>
            <h1 className='title'>Mon profil</h1>
            <div className='profile-details'>
              <div className='game-group-field'>
                <p className='game-field'>Pseudo : </p>
                <p className='game-value'>Jonkox</p>
              </div>
              <div className='game-group-field'>
                <p className='game-field'>Adresse mail :</p>
                <p className='game-value'>sarah.allaire@supdevinci-edu.com</p>
              </div>
            </div>

            <Box className='box'>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    TabIndicatorProps={{
                        style: { backgroundColor: '#4e6491' } // Trait de sélection en blanc
                    }}
                    textColor='black'
                    textAlign='center'
                >
                    <Tab className='tab' label="Tous" style={{color: "white"}}/> 
                    <Tab className='tab' label="Commune" style={{color: "white"}}/>
                    <Tab className='tab' label="Rare" style={{color: "white"}}/>
                    <Tab className='tab' label="Très Rare" style={{color: "white"}}/>
                    <Tab className='tab' label="Exceptionnelle" style={{color: "white"}}/>
                    <Tab className='tab' label="Unique" style={{color: "white"}}/>
                    <Tab className='tab' label="Caches Créées" style={{color: "white"}}/>
                </Tabs>
            </Box>

            {value === 0 && (
                <Box className="collection-container" sx={{ padding: '20px' }}>

                    <div className='all-cards-container'>
                        {cards.map((champion, index) => (
                            <div className='champion-container' style={{ backgroundImage: `url(${champion.image_url.replace(/'/g, "").replace(/ /g, "")})`, borderColor: `${colorRarityMap[champion.rarity]}` }}>
                                <Box className="champion-card">
                                    <p className='default'>{`${champion.name}`}</p>
                                    <div className='hover'>
                                        <div className='champion-data'>
                                            <img src={champion.image_url.replace(/'/g, "").replace(/ /g, "").replace('skins/base', 'hud').replace('loadscreen', '_circle')}/>
                                            <p>{`${champion.name}`}</p>
                                        </div>
                                            <button onClick={() => handleBtnClick(champion)}>Créer un cache</button>
                                    </div>
                                </Box>
                            </div>

                        ))}
                    </div>
                </Box>
            )}

            
        </div>
    );
}

export default Profile;