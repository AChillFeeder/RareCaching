import { GoogleMap, Marker} from "@react-google-maps/api";
import React, { useState, useRef, useEffect } from "react";
import CacheMarker from '../../assets/coffre_violet2.png';
import { useNavigate } from 'react-router-dom';
import '../../css/MapCreate.css';
const Map = (props) => {
    const center = {
        lat: 47.2184,
        lng: -1.5536
    };

    const { isLoaded } = props;
    const [zoom, setZoom] = useState(10); // Ajout de l'état pour le niveau de zoom
    const [mapCenter, setMapCenter] = useState(center);
    const [cachePosition, setCachePosition] = useState(center); // Position initiale du coffre
    const [isDragging, setIsDragging] = useState(false); // Gérer le drag
    
    const navigate = useNavigate();
    const containerStyle = {
        height: '400px',
        width: '100%'
    };

    const mapRef = useRef();
    const handleMapLoad = (map) => {
        mapRef.current = map; // Save the map instance in the ref
    };

    const handleMarkerDragEnd = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setCachePosition(newPosition); // Met à jour la position du coffre
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
                        icon={CacheMarker} // Icône du coffre
                        draggable={true} // Rendre le marker draggable
                        onDragEnd={handleMarkerDragEnd} // Gérer la fin du drag
                    />
                )} 
            </GoogleMap>
            
        </div>
    );
};

export default Map;