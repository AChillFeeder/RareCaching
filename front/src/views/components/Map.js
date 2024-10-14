import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import React, { useState, useRef, useEffect } from "react";
import CacheMarker from '../../assets/coffre_violet2.png';
import { useNavigate } from 'react-router-dom';
import '../../css/Map.css';

const Map = (props) => {

    const center = {
        lat: 47.2184,
        lng: -1.5536
    };

    const { isLoaded } = props;
    // const [circleOptions, setCircleOptions] = useState({ center: null, radius: 0, strokeColor: '', fillColor: '' });
    const [isCacheOpen, setIsCacheOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [zoom, setZoom] = useState(10); // Ajout de l'état pour le niveau de zoom
    const [showMarker, setShowMarker] = useState(false);
    const [mapCenter, setMapCenter] = useState(center);


    const navigate = useNavigate();

    const containerStyle = {
        height: '600px',
        width: '100%'
    };

    const cacheMarker = {
        lat: 47.20815,
        lng: -1.56579
    }

    const handleCacheClick = () => {
        setIsCacheOpen(true);
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/Dashboard');
    };

    const mapRef = useRef();

    const handleZoomChanged = () => {
        if (mapRef.current) {
            const currentZoom = mapRef.current.getZoom(); // Récupère le niveau de zoom actuel
            setZoom(currentZoom);
            if (currentZoom >= 15) {
                setShowMarker(true); // Affiche le marqueur quand le zoom est suffisant
            } else {
                setShowMarker(false); // Masque le marqueur si le zoom est inférieur
            }
        }
    };

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.addListener("zoom_changed", handleZoomChanged); // Écouteur pour le changement de zoom
        }
    }, []); // Effect hook pour l'initialisation des écouteurs une fois la carte chargée


    /* const mapRef = useRef();

    const handleOnIdle = () => {

            const lat = mapRef.current.getCenter().lat(); ;
            const lng = mapRef.current.getCenter().lng(); ;

            const distance = getDistanceFromLatLonInKm(
                lat,
                lng,
                cacheMarker.lat,
                cacheMarker.lng
            );

            // Définir les options du cercle en fonction de la distance
            let radius;
            let strokeColor;
            let fillColor;

            if (distance < 0.1) { // Moins de 100 mètres
                radius = 100; 
                strokeColor = 'green';
                fillColor = 'green';
            } else if (distance < 0.5) { // Entre 100 et 500 mètres
                radius = 200;
                strokeColor = 'yellow';
                fillColor = 'yellow';
            } else {
                radius = 300;
                strokeColor = 'red';
                fillColor = 'red';
            }

            setCircleOptions({
                center: { lat, lng }, // Mettre à jour le centre du cercle
                radius,
                strokeColor,
                fillColor,
            });
    }; */

    return isLoaded && (
        <div className="container">
            <GoogleMap
                mapContainerStyle={ containerStyle }
                center = { center }
                zoom = {zoom}
                onZoomChanged={(map) => handleZoomChanged(map)}

                /* onIdle={handleOnIdle} */
                
            >
                <div>
                {showMarker && (
                    <Marker 
                        position={cacheMarker} 
                        options={{
                            icon: CacheMarker
                        }}
                        onClick={() => navigate('/Dashboard')} // Gère le clic sur le marqueur
                    />
                )}
                </div>

                {/* {circleOptions.center && (
                    <Circle
                        center={circleOptions.center} // Centre dynamique
                        options={{
                            strokeColor: circleOptions.strokeColor,
                            fillColor: circleOptions.fillColor,
                            fillOpacity: 0.3,
                            strokeOpacity: 1,
                            strokeWeight: 1,
                            radius: circleOptions.radius,
                        }}
                    />
                )} */}


            </GoogleMap>

            {showPopup && (
                <div className="popup-cart-find">
                    <span onClick={handleClosePopup}>&times;</span>
                    <img src='/icons/nft-ex1.jpeg'/>
                </div>
            )}
        </div>
            
    )
};

/* function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
} */


export default Map;