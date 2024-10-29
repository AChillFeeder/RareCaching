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
    const [searchQuery, setSearchQuery] = useState('');

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

    const championsWithDifferentCircularImageNames = {
        "cho'gath": 'https://raw.communitydragon.org/14.9/game/assets/characters/chogath/hud/greenterror_circle.png',
        'orianna': 'https://raw.communitydragon.org/14.9/game/assets/characters/orianna/hud/oriana_circle.png',
        'skarner': 'https://raw.communitydragon.org/14.9/game/assets/characters/skarner/hud/skarner_circle_0.skarner_rework.png',
        'lee sin': 'https://raw.communitydragon.org/14.9/game/assets/characters/leesin/hud/leesin_circle_0.asu_leesin.png',
        'anivia': 'https://raw.communitydragon.org/14.9/game/assets/characters/anivia/hud/cryophoenix_circle.png',
        'blitzcrank': 'https://raw.communitydragon.org/14.9/game/assets/characters/blitzcrank/hud/steamgolem_circle.png',
        'dr. mundo': 'https://raw.communitydragon.org/14.9/game/assets/characters/drmundo/hud/drmundo_circle_0.png',
        'rammus': 'https://raw.communitydragon.org/14.9/game/assets/characters/rammus/hud/armordillo_circle.png',
        'shaco': 'https://raw.communitydragon.org/14.9/game/assets/characters/shaco/hud/jester_circle.png',
        'wukong': 'https://raw.communitydragon.org/14.9/game/assets/characters/monkeyking/hud/monkeyking_circle.png',
        'zilean': 'https://raw.communitydragon.org/14.9/game/assets/characters/zilean/hud/chronokeeper_circle.png',
        'vex': 'https://raw.communitydragon.org/14.9/game/assets/characters/vex/hud/vex_circle_0.png'
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
        if(!data){
            return;
        }
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

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const updatedFilteredCards = cards.filter(card =>
            card.name.toLowerCase().includes(query.toLowerCase()) &&
            card.rarity.includes(value === 0 ? "" : handleChange(value))
        );

        setFilteredCards(updatedFilteredCards);
    };

    const getChampionRectangleImageUrl = (champion) => {
        switch (champion.name.toLowerCase()) {
            case 'dr. mundo':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/drmundo/skins/base/drmundoloadscreen_0.png'
            case 'hecarim':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/hecarim/skins/base/hecarimloadscreen_0.png'
            case 'jax':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/jax/skins/base/jaxloadscreen_0.png'
            case 'kassadin':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/kassadin/skins/base/kassadinloadscreen_0.png'
            case 'lee sin':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/leesin/skins/base/leesinloadscreen_0.asu_leesin.png'
            case 'sivir':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/sivir/skins/base/sivirloadscreen_0.png'
            case 'skarner':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/skarner/skins/base/skarnerloadscreen_0.skarner_rework.png'
            case 'syndra':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/syndra/skins/base/syndraloadscreen_0.png'
            case 'udyr':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/udyr/skins/base/udyrloadscreen_0.png'
            case 'wukong':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/monkeyking/skins/base/monkeykingloadscreen.png'
            case 'gwen':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/gwen/skins/base/gwenloadscreen_0.png'
            case 'vex':
                return 'https://raw.communitydragon.org/14.9/game/assets/characters/vex/skins/base/vexloadscreen_0.png'
        }
        return champion.image_url.replace(/'/g, "").replace(/ /g, "")
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

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher un champion..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
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
                    textColor='#CFCCDE'
                    textAlign='center'
                    TabScrollButtonProps={{
                        sx: {
                            color: '#CFCCDE' // Couleur des icônes de défilement
                        }
                    }}
                >
                    <Tab className='tab' label="Tous" sx={{color: "#CFCCDE", '&.Mui-selected': { color: '#4e6491' } }}/> 
                    <Tab className='tab' label="Commune" sx={{color: "#CFCCDE", '&.Mui-selected': { color: '#4e6491' } }}/>
                    <Tab className='tab' label="Rare" sx={{color: "#CFCCDE", '&.Mui-selected': { color: '#4e6491' } }}/>
                    <Tab className='tab' label="Très Rare" sx={{color: "#CFCCDE", '&.Mui-selected': { color: '#4e6491' } }}/>
                    <Tab className='tab' label="Exceptionnelle" sx={{color: "#CFCCDE", '&.Mui-selected': { color: '#4e6491' } }}/>
                    <Tab className='tab' label="Unique" sx={{color: "#CFCCDE", '&.Mui-selected': { color: '#4e6491' } }}/>
                    <Tab className='tab' label="Caches Créées" sx={{color: "#CFCCDE", '&.Mui-selected': { color: '#4e6491' } }}/>
                </Tabs>
            </Box>

            
            <Box className="collection-container" sx={{ padding: '20px' }}>

                <div className='all-cards-container'>
                    {filteredCards && filteredCards.map((champion, index) => (
                        <div className='champion-container' id={champion.id} key={champion.id} style={{ backgroundImage: `url(${getChampionRectangleImageUrl(champion)})`, borderColor: `${colorRarityMap[champion.rarity]}` }}>
                            <Box className="champion-card">
                                <p className='default'>{`${champion.name}`}</p>
                                <div className='hover'>
                                    <div className='champion-data'>
                                    <img 
                                        src={champion.image_url.replace(/'/g, "").replace(/ /g, "").replace('skins/base', 'hud').replace('loadscreen', '_circle')} 
                                        onError={(e) => { 
                                            e.target.onerror = null; // éviter boucle infini en cas d'autres soucis
                                            // e.target.src = `${process.env.PUBLIC_URL}/images/circular/${champion.name}.jpeg`;
                                            if(championsWithDifferentCircularImageNames[champion.name.toLowerCase()]){
                                                e.target.src = championsWithDifferentCircularImageNames[champion.name.toLowerCase()];
                                            } else {
                                                e.target.src = champion.image_url.replace(/'/g, "").replace(/ /g, "").replace('skins/base', 'hud').replace('loadscreen', '_circle_0');
                                            }
                                        }}
                                    />
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