import React from 'react';
import ItemGame from './ItemGame';
import '../../css/ListGame.css';

const ListGame = () => {

    const gameData = [
        { reference: 'ABCD', pseudo: 'Sarah', imageUrl: '/icons/nft-ex1.jpeg', accessibility: '/icons/public.png' },
        { reference: 'EFGH', pseudo: 'Aboubacar', imageUrl: '/icons/nft-ex2.jpeg', accessibility: '/icons/public.png' },
        { reference: 'IJKL', pseudo: 'Reda', imageUrl: '/icons/nft-ex3.jpeg', accessibility: '/icons/prive.png' },
        { reference: 'MNOP', pseudo: 'Romaric', imageUrl: '/icons/nft-ex4.jpeg', accessibility: '/icons/public.png' },
        { reference: 'QRST', pseudo: 'Jonkox', imageUrl: '/icons/nft-ex5.jpeg', accessibility: '/icons/prive.png' },
        { reference: 'UVWX', pseudo: 'Alcatraz', imageUrl: '/icons/nft-ex6.jpeg', accessibility: '/icons/public.png' },
        { reference: 'YZAB', pseudo: 'Yotsubae', imageUrl: '/icons/nft-ex7.jpeg', accessibility: '/icons/public.png' },
        { reference: 'CDEF', pseudo: 'Titou', imageUrl: '/icons/nft-ex8.jpeg', accessibility: '/icons/prive.png' }
    
    ];
    
    return (
        <div>
            <h2 className='title-column'>Rejoindre une chasse</h2>
            <div className='game-container'>
                <div className='game-container-header'>
                    <input type='text' placeholder='Filtrer par référence ou par organisateur' className='searchBar'/>
                </div>
                {gameData.map((game, index) => (
                    <ItemGame
                    key={index}
                    reference={game.reference}
                    pseudo={game.pseudo}
                    imageUrl={game.imageUrl}
                    accessibility={game.accessibility}
                    />
                ))}
            </div>
        </div>
    ); 
};

export default ListGame;