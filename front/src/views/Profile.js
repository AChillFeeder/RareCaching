import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../css/Profile.css';
import { customGetAllFetch } from './utils/customFetch';
import { UserContext } from './UserContext';


const Profile = () => {

    const { user } = useContext(UserContext);
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [ownershipData, setOwnershipData] = useState([]);

    useEffect(() => {
        customGetAllFetch('cards').then( data => {
            setCards(data)
            setFilteredCards(data)
        }
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
        let rarityFilter = "";
        setValue(newValue);
        switch (newValue) {
            case 0:
                // setFilteredCards(cards)
                rarityFilter = ""
                break;
            case 1:
                rarityFilter = "commune"
                break;
            case 2:
                rarityFilter = "rare"
                break;
            case 3:
                rarityFilter = "tres rare"
                break;
            case 4:
                rarityFilter = "exceptionnelle"
                break;
            case 5:
                rarityFilter = "unique"
                break;

            default:
                break;            
        }
        
        let filteredCards = cards.filter( card => {
            return card.rarity.includes(rarityFilter);
        } )

        setFilteredCards(filteredCards);
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

    useEffect(() => {
        if (user && user.id) {
            customGetAllFetch(`users/${user.id}/card_count`).then( data => {
                handleCardOwnership(data);
            })
        }
    }, [user])

    const handleCardOwnership = (data) => {
        console.log("card ownership data");
        console.log(data);
        data.forEach(ownedCard => {
            const element = document.getElementById(ownedCard.card_id);
            if (element) {
                element.classList.add('owned');
            }
        });

        const ownershipMap = {};
        data.forEach(ownedCard => {
            ownershipMap[ownedCard.card_id] = ownedCard.count;
        });

        console.log("card ownership map");
        console.log(ownershipMap);
        setOwnershipData(ownershipMap);
    }


    return (
        <div className='container'>
            <h1 className='title'>Mon profil</h1>
            <div className='profile-details'>
              <div className='game-group-field'>
                <p className='game-field'>Pseudo : </p>
                <p className='game-value'>{user && user.username}</p>
              </div>
              <div className='game-group-field'>
                <p className='game-field'>Adresse mail :</p>
                <p className='game-value'>{user && user.email}</p>
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

            
            <Box className="collection-container" sx={{ padding: '20px' }}>

                <div className='all-cards-container'>
                    {filteredCards && filteredCards.map((champion, index) => (
                        <div className='champion-container' id={champion.id} key={champion.id} style={{ backgroundImage: `url(${champion.image_url.replace(/'/g, "").replace(/ /g, "")})`, borderColor: `${colorRarityMap[champion.rarity]}` }}>
                            <Box className="champion-card">
                                <p className='default'>{`${champion.name}`}</p>
                                <div className='hover'>
                                    <div className='champion-data'>
                                        <img src={champion.image_url.replace(/'/g, "").replace(/ /g, "").replace('skins/base', 'hud').replace('loadscreen', '_circle')}/>
                                        <p>{`${champion.name}`}</p>
                                        <p className='copies'>Copies: {ownershipData[champion.id] || 0}</p>
                                    </div>
                                        <button onClick={() => handleBtnClick(champion)}>Créer un cache</button>
                                </div>
                            </Box>
                        </div>

                    ))}
                </div>
            </Box>
            

            
        </div>
    );
}

export default Profile;