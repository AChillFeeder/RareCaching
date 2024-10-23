import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { customGetAllFetch } from './utils/customFetch';
import '../css/Profile.css';
import Champion1 from '../assets/champions/champion1.jpeg';
import Champion2 from '../assets/champions/champion2.jpeg';
import Champion3 from '../assets/champions/champion3.jpeg';
import Champion4 from '../assets/champions/champion4.jpeg';
import Champion5 from '../assets/champions/champion5.jpeg';
import Champion6 from '../assets/champions/champion6.jpeg';
import Champion7 from '../assets/champions/champion7.jpeg';
import Champion8 from '../assets/champions/champion8.jpeg';
import Champion9 from '../assets/champions/champion9.jpeg';

/*  const championsData = [
    { id: 2, image: Champion1, rarity: 'commun' },
    { id: 10, image: Champion2, rarity: 'commun' },
    { id: 25, image: Champion3, rarity: 'commun' },
    { id: 42, image: Champion5, rarity: 'commun' },
    { id: 43, image: Champion6, rarity: 'rare' },
    { id: 52, image: Champion7, rarity: 'rare' },
    { id: 64, image: Champion8, rarity: 'très rare' },
    { id: 70, image: Champion9, rarity: 'très rare' },
    { id: 98, image: Champion4, rarity: 'exceptionnelle' },
];  */

// const generateChampionCollection = (champions) => {
//     const championsArray = Array(100).fill(null); // Tableau de 100 éléments

//     champions.forEach((champion) => {
//         championsArray[champion.id - 1] = champion; // Placer chaque champion à sa position (id-1)
//     });

//     return championsArray;
// };

const Profile = () => {

    const navigate = useNavigate();
    const [championsData, setChampionsData] = useState([]);
    //const champions = generateChampionCollection(championsData);

    const [value, setValue] = React.useState(0);
    const [isScrollable, setIsScrollable] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        customGetAllFetch('cards').then( data =>
           setChampionsData(data)
       ).then( data =>
           console.log(data)
       )
   }, []);


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

    const handleBtnClick = () => {
        navigate('/CreateGame');
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
                    sx={{
                        '& .MuiTabs-scrollButtons': {
                            color: '#CFCCDE', // Couleur du bouton de scrolling
                            '&.Mui-disabled': {
                                opacity: 0.3, // Couleur des boutons désactivés
                            }
                        }
                    }}
                >
                    <Tab className='tab' label="Tous" sx={{ color: '#CFCCDE', '&.Mui-selected': { color: '#4e6491' }, fontWeight: 'bold'}}/>
                    <Tab className='tab' label="Commune" sx={{ color: '#CFCCDE', '&.Mui-selected': { color: '#4e6491' }, fontWeight: 'bold'}}/>
                    <Tab className='tab' label="Rare" sx={{ color: '#CFCCDE', '&.Mui-selected': { color: '#4e6491' }, fontWeight: 'bold' }}/>
                    <Tab className='tab' label="Très Rare" sx={{ color: '#CFCCDE', '&.Mui-selected': { color: '#4e6491' }, fontWeight: 'bold' }}/>
                    <Tab className='tab' label="Exceptionnelle" sx={{ color: '#CFCCDE', '&.Mui-selected': { color: '#4e6491' }, fontWeight: 'bold' }}/>
                    <Tab className='tab' label="Caches Créées" sx={{ color: '#CFCCDE', '&.Mui-selected': { color: '#4e6491' }, fontWeight: 'bold' }}/>
                </Tabs>
            </Box>

            {value === 0 && (
                <Box className="collection-container" sx={{ padding: '20px' }}>
                    <Grid container spacing={2}>
                        {championsData.map((champion, index) => (
                            <Grid item xs={6} sm={3} md={2} lg={1.5} key={index}>
                                {champion ? (
                                    // Afficher les champions trouvés
                                    <Box className="champion-card" sx={{ backgroundColor: '#4e6491', borderRadius:'10px', padding: '10px', textAlign: 'center' }}>
                                        <img src={champion.image_url} alt={`Champion ${champion.id}`} style={{ width: '100%', height: 'auto' }} />
                                        <p>{`Champion ${champion.id} (${champion.rarity})`}</p>
                                        <Tooltip title="Créer une cache" arrow>
                                            <button className="create-btn" onClick={handleBtnClick}>+</button>
                                        </Tooltip>
                                    </Box>
                                ) : (
                                    // Afficher un encadré vide pour les champions non trouvés
                                    <Box className="empty-slot" sx={{ border: '2px solid #4e6491', borderRadius:'10px', padding: '10px', textAlign: 'center', height: '100px' }}>
                                        <p className='text-empty'>Champion {index + 1}</p>
                                    </Box>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            
        </div>
    );
}

export default Profile;