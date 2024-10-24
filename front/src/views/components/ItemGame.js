  import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/ItemGame.css';

const ItemGame = ({ reference, pseudo, imageUrl, accessibility }) => {

    const navigate = useNavigate();
    
    const handleGame= () => {
        navigate('/Game');
    }
    
    return (
        <div className='game-item' onClick={handleGame}>
            <span className='game-ref'>{reference}</span>
            <span className='game-pseudo'>{pseudo}</span>
            <div className='image-container'>
                <img src={imageUrl} className='game-image'/>
            </div>
            <img src={accessibility} className='game-icon'/>
        </div>
    );
};

export default ItemGame;

