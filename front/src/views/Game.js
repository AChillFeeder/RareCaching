import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './configurations/MapConfiguration';
import Map from './components/MapSearch';
import '../css/Game.css';
import {move} from '../'

const Game = () => {

  const location = useLocation();
  const game = location.state?.game;

  const { isLoaded } = useJsApiLoader ({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey
  })

  useEffect(() => {
    const draggableElement = document.getElementById('draggableIndicesList');

    if (draggableElement) {
        draggableElement.addEventListener('dragstart', (e) => {
            const style = window.getComputedStyle(e.target, null);
            const str = (parseInt(style.getPropertyValue("left")) - e.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - e.clientY);
            e.dataTransfer.setData("text/plain", str);
        });

        document.body.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        document.body.addEventListener('drop', (e) => {
            const offset = e.dataTransfer.getData("text/plain").split(',');
            const draggableElement = document.getElementById('draggableIndicesList');
            draggableElement.style.left = (e.clientX + parseInt(offset[0], 10)) + 'px';
            draggableElement.style.top = (e.clientY + parseInt(offset[1], 10)) + 'px';
            e.preventDefault();
        });
    }

    return () => {
        if (draggableElement) {
            draggableElement.removeEventListener('dragstart', () => {});
            document.body.removeEventListener('dragover', () => {});
            document.body.removeEventListener('drop', () => {});
        }
    };
    }, []);

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
              <div className='indices-container draggable' draggable="true" id="draggableIndicesList">
                <p className='indices'>{game.indice}</p>
                <img draggable="false" src={`${process.env.PUBLIC_URL}/images/move.png`} alt="movable" />
              </div> 
            </div>
        </div>
      );
};

export default Game;






