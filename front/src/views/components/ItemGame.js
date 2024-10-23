import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/ItemGame.css';

const ItemGame = ({ id, pseudo}) => {

    const navigate = useNavigate();
    
    const handleGame= () => {
        navigate('/Game');
    }
    
    return (
        <div className='game-item' onClick={handleGame}>
            <span className='game-ref'>{id}</span>
            <span className='game-pseudo'>{pseudo}</span>
            {/* <div className='image-container'>
                <img src={accessibility} className='game-icon'/>
            </div> */}
        </div>
    );
};

export default ItemGame;

