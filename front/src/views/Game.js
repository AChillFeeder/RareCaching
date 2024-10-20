import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './configurations/MapConfiguration';
import Map from './components/MapSearch';
import '../css/Game.css';

const Game = () => {

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
                <p className='game-value'>12345</p>
              </div>
              <div className='game-group-field'>
                <p className='game-field'>Créateur :</p>
                <p className='game-value'>Jonkox</p>
              </div>
              <div className='game-group-field'>
                <p className='game-field'>Date de création :</p>
                <p className='game-value'>07/10/2024</p>
              </div>
              <div className='game-group-field'>
                <p className='game-field'>Rareté du cache :</p>
                <p className='game-value'>Légendaire</p>
              </div>
            </div>
            <div className='body-container'>
              <div className='map-container'>
                <Map isLoaded={isLoaded}/>
              </div>
              <div className='indices-container'>
                <p className='indices'>La où les petits poissons dansent</p>
                <p className='indices'>On se sent en Afrique</p>
              </div>
            </div>
        </div>
      );
};

export default Game;






