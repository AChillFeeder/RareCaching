import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/ItemGame.css';
import coffreCommun from '../../assets/coffres/coffreCommun.png';
import coffreRare from '../../assets/coffres/coffreRare.png';
import coffreTresRare from '../../assets/coffres/coffreTresRare.png';
import coffreExceptionnelle from '../../assets/coffres/coffreExceptionnelle.png';
import coffreUnique from '../../assets/coffres/coffreUnique.png';


const ItemGame = ({ game }) => {

    const navigate = useNavigate();
    
    const handleGame= (game) => {
        navigate(`/Game/${game}`, { state: { game } });
    }

    const getRarityImage = () => {
        switch (game.collection.card.rarity) {
            case 'commune':
                return coffreCommun;
            case 'rare':
                return coffreRare; 
            case 'tres rare':
                return coffreTresRare; 
            case 'exceptionnelle':
                return coffreExceptionnelle;
            case 'unique':
                return coffreUnique;
        }
    }

    const getRarityLabel = () => {
        switch (game.collection.card.rarity) {
            case 'commune':
                return 'Commune 70%';
            case 'rare':
                return 'Rare 20%'; 
            case 'tres rare':
                return 'Très Rare 7%'; 
            case 'exceptionnelle':
                return 'Exceptionnelle 2%';
            case 'unique':
                return 'Unique 1%';
        }
    }
    
    return (
        <div className='game-item' onClick={() => handleGame(game)}>
            <span className='game-ref'>{game.id}</span>
            <span className='game-pseudo'>{game.organisateur.username}</span>
            <span>{getRarityLabel()}</span>
            <img src={getRarityImage()} className='coffre-img'/>

        </div>
    );
};

export default ItemGame;

