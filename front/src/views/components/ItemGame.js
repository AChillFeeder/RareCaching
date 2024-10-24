  import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/ItemGame.css';
import coffreCommun from '../../assets/coffres/coffreCommun.png';
import coffreRare from '../../assets/coffres/coffreRare.png';
import coffreTresRare from '../../assets/coffres/coffreTresRare.png';
import coffreExceptionnelle from '../../assets/coffres/coffreExceptionnelle.png';
import coffreUnique from '../../assets/coffres/coffreUnique.png';


const ItemGame = ({ id, pseudo, rarity }) => {

    const navigate = useNavigate();
    
    const handleGame= (id) => {
        navigate('/Game/${id}');
    }

    const getRarityImage = () => {
        switch (rarity) {
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
        switch (rarity) {
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
        <div className='game-item' onClick={() => handleGame(id)}>
            <span className='game-ref'>{id}</span>
            <span className='game-pseudo'>{pseudo}</span>
            <span>{getRarityLabel()}</span>
            <img src={getRarityImage()} className='coffre-img'/>

        </div>
    );
};

export default ItemGame;

