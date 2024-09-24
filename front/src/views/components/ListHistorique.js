import React from 'react';

import '../../css/ListHistorique.css';
import ItemHistorique from './ItemHistorique';

// prendra en paramètre un objet historique
// comporte les champs rareté, date et heure de découvert, personne qui l'a découvert
const ListHistorique = () => {

    const historiqueData = [
        { rarete: 'Exceptionnel', date: '20/09/2024 - 20:20:40', personne: 'Jonkox', imageUrl: '/icons/coffre_icons/coffre_au_tresor_violet.png' },
        { rarete: 'Très Rare', date: '20/09/2024 - 20:20:40', personne: 'Reda', imageUrl: '/icons/coffre_icons/coffre_au_tresor_rouge.png' },
        { rarete: 'Très Rare', date: '20/09/2024 - 20:20:40', personne: 'Aboubacar', imageUrl: '/icons/coffre_icons/coffre_au_tresor_rouge.png' },
        { rarete: 'Rare', date: '20/09/2024 - 20:20:40', personne: 'Romaric', imageUrl: '/icons/coffre_icons/coffre_au_tresor_bleu.png' },
        { rarete: 'Rare', date: '20/09/2024 - 20:20:40', personne: 'Sarah', imageUrl: '/icons/coffre_icons/coffre_au_tresor_bleu.png' },
        { rarete: 'Commun', date: '20/09/2024 - 20:20:40', personne: 'Jonkox', imageUrl: '/icons/coffre_icons/coffre_au_tresor_vert.png' },
        { rarete: 'Commun', date: '20/09/2024 - 20:20:40', personne: 'Reda', imageUrl: '/icons/coffre_icons/coffre_au_tresor_vert.png' },
        { rarete: 'Commun', date: '20/09/2024 - 20:20:40', personne: 'Sarah', imageUrl: '/icons/coffre_icons/coffre_au_tresor_vert.png' }
    ];

    return (
        <div>
            <h2 className='title-column'>Historique</h2>
            <p className='description'>Trouvaille de la journée</p>
            <div className='historique-container'>
                {historiqueData.map((historique, index) => (
                    <ItemHistorique
                    key={index}
                    rarete={historique.rarete}
                    date={historique.date}
                    personne={historique.personne}
                    imageUrl={historique.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListHistorique;










