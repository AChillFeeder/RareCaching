import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
// import { useUser } from './UserContext';

import ItemGame from './ItemGame';
import { customGetAllFetch } from '../utils/customFetch';
import '../../css/ListGame.css';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#cfccde',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

// ---------------------------------------------------------------------------------------------
// ListGame est le component qui gère la liste des parties (caches à trouver)
// ---------------------------------------------------------------------------------------------
const ListGame = () => {

    // -----------------------------------------------------------------------------------------
    // Déclarations constantes
    // -----------------------------------------------------------------------------------------
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rarityFilter, setRarityFilter] = useState(null);
    const [searchText, setSearchText] = useState(null);
    // const { currentUser } = useUser();

    // -----------------------------------------------------------------------------------------
    // useEffect
    // -----------------------------------------------------------------------------------------

    useEffect(() => {
        customGetAllFetch('parties').then( data =>
            setGames(data)
        ).then( data =>
            console.log(data)
        )
    }, []);

    // -----------------------------------------------------------------------------------------
    // Fonctions
    // -----------------------------------------------------------------------------------------

    const handleChange = (event) => {
        setRarityFilter(event.target.value);
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value.toLowerCase());
    };

    const filteredGames = games && games.filter((game) => {
        let matchesRarity = false;
        if (game.collection) {
            matchesRarity = rarityFilter ? game.collection.card.rarity === rarityFilter : true;
        }
        const matchesSearch = !searchText || game.organisateur.username.toLowerCase().includes(searchText);
        return matchesRarity && matchesSearch;
        // return true;
    });

    
    return (
        <div>
            <h1 style={{marginLeft: '15px'}} className='title'>Rejoindre une chasse</h1>
            <div className='game-container'>
                <Box 
                    className='game-container-header'
                    sx={{
                        display: 'flex',
                        gap: 4,
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Search sx={{ flex:1 }}>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: '#02163D' }}/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Filtrer par organisateur..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchChange}
                        />
                    </Search>
                    <FormControl 
                        fullWidth
                        sx={{
                            flex: 1,
                            marginRight: '30px',
                            color: '#cfccde', 
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#cfccde', 
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4e6491', 
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#cfccde',
                            },
                        }}
                    >
                        <InputLabel 
                            id="demo-simple-select-label"
                            sx={{
                                color: '#cfccde', 
                                '& .MuiSelect-icon': {
                                    color: '#cfccde' 
                                },
                            '   &.MuiFormLabel-filled': {
                                    color: '#cfccde', 
                                },
                            }}
                        >Rareté</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rarityFilter}
                            label="Rareté"
                            onChange={handleChange}
                            sx={{
                                color: '#cfccde', 
                                '& .MuiSelect-icon': {
                                    color: '#cfccde' 
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4e6491', 
                                    },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4e6491', 
                                },
                                '&.Mui-focused': {
                                    color: '#4e6491', 
                                },
                                '& .MuiSelect-select': {
                                    color: '#cfccde', 
                                },
                            }}
                        >
                            <MenuItem value="">Toutes</MenuItem>
                            <MenuItem value={"commune"}>Commune</MenuItem>
                            <MenuItem value={"rare"}>Rare</MenuItem>
                            <MenuItem value={"tres rare"}>Très Rare</MenuItem>
                            <MenuItem value={"exceptionnelle"}>Exceptionnelle</MenuItem>
                            <MenuItem value={"unique"}>Unique</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {filteredGames && filteredGames.length > 0 ? (
                    filteredGames.map((game, index) => (
                        <ItemGame
                            key={index}
                            game={game}
                        />
                    ))
                ) : (
                    <div className='text'>Aucune partie disponible.</div> 
                )}
            </div>
        </div>
    ); 
};

export default ListGame;