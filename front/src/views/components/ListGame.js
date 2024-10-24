import React, { useEffect, useState } from 'react';
import ItemGame from './ItemGame';
import '../../css/ListGame.css';
import { customFetch } from '../utils/customFetch';

const ListGame = () => {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
         customGetAllFetch('parties').then( data =>
            setGames(data)
        ).then( data =>
            console.log(data)
        )
    }, []);

    
    return (
        <div>
            <h2 className='title-column'>Rejoindre une chasse</h2>
            <div className='game-container'>
                <div className='game-container-header'>
                    <input type='text' placeholder='Filtrer par référence ou par organisateur' className='searchBar'/>
                </div>
                {games && games.length > 0 ? (
                    games.map((game, index) => (
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