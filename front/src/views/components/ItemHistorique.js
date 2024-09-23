import React from 'react';

import '../../css/ItemHistorique.css';

// prendra en paramètre un objet historique
// comporte les champs rareté, date et heure de découvert, personne qui l'a découvert
const ItemHistorique = ({ rarete, date, personne, imageUrl}) => {

    return (
        <div className='historique-item'>
            <img src={imageUrl} className='coffre-img'/>
            <div>
                <p className='historique-date'>{date}</p>
                <p className='historique-text'>Coffre {rarete} découvert par {personne}</p>
            </div>
        </div>
    );
};

export default ItemHistorique;










