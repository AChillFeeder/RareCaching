import React from 'react';
import '../../css/ItemGame.css';

const ItemGame = ({ reference, pseudo, imageUrl, accessibility }) => {

    return (
        <div className='game-item'>
            <span className='game-ref'>{reference}</span>
            <span className='game-pseudo'>{pseudo}</span>
            <div className='image-container'>
                <img src={imageUrl} className='game-image'/>
            </div>
            <button className='game-button'>Chasser</button>
            <img src={accessibility} className='game-icon'/>
        </div>
    );
};

export default ItemGame;

