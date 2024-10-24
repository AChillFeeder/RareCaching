import React from 'react';
import { useLocation } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './configurations/MapConfiguration';
import Map from './components/MapSearch';
import '../css/Game.css';

const Game = () => {

  const location = useLocation();
  const game = location.state?.game;

  const { isLoaded } = useJsApiLoader ({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey
  })

    return (
        <div className='game-container'>
            <h1 className='title'>Partie pour une chasse</h1>
            <div className='game-details'>
              <div className='game-group-field'>
                <p className='game-field'>Numéro de la partie :</p>
                <p className='game-value'>{game.id}</p>
              </div>
              <div className='game-group-field'>
                <p className='game-field'>Créateur :</p>
                <p className='game-value'>{game.organisateur.username}</p>
              </div>
{/*               <div className='game-group-field'>
                <p className='game-field'>Date de création :</p>
                <p className='game-value'>07/10/2024</p>
              </div> */}
              <div className='game-group-field'>
                <p className='game-field'>Rareté :</p>
                <p className='game-value'>{game.collection.card.rarity}</p>
              </div>
            </div>
            <div className='body-container'>
              <div className='map-container'>
                <Map 
                  isLoaded={isLoaded}
                  game={game}/>
              </div>
              <div className='indices-container'>
                <p className='indices'>{game.indice}</p>
              </div>
            </div>
        </div>
      );
};

export default Game;






