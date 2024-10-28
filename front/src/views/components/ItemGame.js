import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/ItemGame.css';
import coffreCommun from '../../assets/coffres/coffreCommun.png';
import coffreRare from '../../assets/coffres/coffreRare.png';
import coffreTresRare from '../../assets/coffres/coffreTresRare.png';
import coffreExceptionnelle from '../../assets/coffres/coffreExceptionnelle.png';
import coffreUnique from '../../assets/coffres/coffreUnique.png';

// ---------------------------------------------------------------------------------------------
// ItemGame gère l'affiche d'un partie dans la liste des parties
// ---------------------------------------------------------------------------------------------
const ItemGame = ({ game }) => {

    // -----------------------------------------------------------------------------------------
    // Déclarations constantes
    // -----------------------------------------------------------------------------------------
    const navigate = useNavigate();

    // -----------------------------------------------------------------------------------------
    // Fonctions
    // -----------------------------------------------------------------------------------------

    // Redirige vers la page Game lorsqu'on clique sur un item
    const handleGame= (game) => {
        navigate(`/Game/${game}`, { state: { game } });
    }

    // Récupère la rareté de la cache mise en jeu, et affiche le coffre correspondant
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

    // Récupère la rareté de la cache mise en jeu, et affiche le label correspondant
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
            <img src={getRarityImage()} className='coffre-img' title={getRarityLabel()}/>
            <p className='game-ref'>#{game.id}</p>
            <p className='game-pseudo'>Organisée par | <span className='nom-organisateur'>{game.organisateur.username}</span></p>
            {/* <p>{getRarityLabel()}</p> */}

        </div>
    );
};

export default ItemGame;

