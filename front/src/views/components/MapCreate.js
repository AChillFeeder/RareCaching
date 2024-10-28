import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import CacheMarker from '../../assets/coffres/coffre_violet2.png';
import '../../css/MapCreate.css';
import coffreCommun from '../../assets/coffres/coffreCommun.png';
import coffreRare from '../../assets/coffres/coffreRare.png';
import coffreTresRare from '../../assets/coffres/coffreTresRare.png';
import coffreExceptionnelle from '../../assets/coffres/coffreExceptionnelle.png';
import coffreUnique from '../../assets/coffres/coffreUnique.png';

// ---------------------------------------------------------------------------------------------
// MapCreate est le component qui affiche la Map pour la création d'une cache
// ---------------------------------------------------------------------------------------------
const Map = ({ isLoaded, onMarkerDragEnd, rarity }) => {

    // -----------------------------------------------------------------------------------------
    // Déclarations constantes
    // -----------------------------------------------------------------------------------------
    const center = { lat: 47.2184, lng: -1.5536 };
    const containerStyle = { height: '400px', width: '100%' };
    const [zoom, setZoom] = useState(10);
    const [mapCenter, setMapCenter] = useState(center);
    const [cachePosition, setCachePosition] = useState(center);
    const mapRef = useRef();

    // -----------------------------------------------------------------------------------------
    // Fonctions
    // -----------------------------------------------------------------------------------------
    
    // Permet de charger la map
    const handleMapLoad = (map) => {
        mapRef.current = map;
    };

    // Récupère la rareté de la cache à créer, et affiche le coffre correspondant
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

    // Permet de récupérer les coordonnées du marker quand il est déplacé
    const handleMarkerDragEnd = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setCachePosition(newPosition); // Met à jour la position du coffre
        onMarkerDragEnd(newPosition);
    };

    return isLoaded && (
        <div className="container">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={zoom}
                onLoad={handleMapLoad}
            >
                {cachePosition && (
                    <Marker
                        position={cachePosition}
                        icon={getRarityImage()} 
                        draggable={true} 
                        onDragEnd={handleMarkerDragEnd} 
                    />
                )} 
            </GoogleMap>
        </div>
    );
};

export default Map;