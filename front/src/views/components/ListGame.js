import React, { useEffect, useState } from 'react';
import ItemGame from './ItemGame';
import '../../css/ListGame.css';
import { customGetAllFetch } from '../utils/customFetch';

const ListGame = () => {

    //  const gameData = [
    //     { reference: 'ABCD', pseudo: 'Sarah', imageUrl: '/icons/nft-ex1.jpeg', accessibility: '/icons/public.png' },
    //     { reference: 'EFGH', pseudo: 'Aboubacar', imageUrl: '/icons/nft-ex2.jpeg', accessibility: '/icons/public.png' },
    //     { reference: 'IJKL', pseudo: 'Reda', imageUrl: '/icons/nft-ex3.jpeg', accessibility: '/icons/prive.png' },
    //     { reference: 'MNOP', pseudo: 'Romaric', imageUrl: '/icons/nft-ex4.jpeg', accessibility: '/icons/public.png' },
    //     { reference: 'QRST', pseudo: 'Jonkox', imageUrl: '/icons/nft-ex5.jpeg', accessibility: '/icons/prive.png' },
    //     { reference: 'UVWX', pseudo: 'Alcatraz', imageUrl: '/icons/nft-ex6.jpeg', accessibility: '/icons/public.png' },
    //     { reference: 'YZAB', pseudo: 'Yotsubae', imageUrl: '/icons/nft-ex7.jpeg', accessibility: '/icons/public.png' },
    //     { reference: 'CDEF', pseudo: 'Titou', imageUrl: '/icons/nft-ex8.jpeg', accessibility: '/icons/prive.png' }
    
    // ]; 

    // const [gameData, setGameData] = useState([]);
    // const [filter, setFilter] = useState('');

    const [parties, setParties] = useState([]);
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
         customGetAllFetch('parties').then( data =>
            setParties(data)
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
                {parties.length > 0 ? (
                    parties.map((partie, index) => (
                        <ItemGame
                            key={index}
                            id={partie.id}
                            pseudo={partie.organisateur.username}
                            rarity={partie.collection.card.rarity}
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