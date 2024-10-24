import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import React, { useState, useRef, useEffect } from "react";
import CacheMarker from '../../assets/coffres/coffre_violet2.png';
import coffreCommun from '../../assets/coffres/coffreCommun.png';
import coffreRare from '../../assets/coffres/coffreRare.png';
import coffreTresRare from '../../assets/coffres/coffreTresRare.png';
import coffreExceptionnelle from '../../assets/coffres/coffreExceptionnelle.png';
import coffreUnique from '../../assets/coffres/coffreUnique.png';
import { useNavigate } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';
import '../../css/MapSearch.css';
const Map = ({ isLoaded, game}) => {
    const center = {
        lat: 47.2184,
        lng: -1.5536
    };

    const [circleOptions, setCircleOptions] = useState({ center: null, radius: 0, strokeColor: '', fillColor: '' });
    const [isCacheOpen, setIsCacheOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [zoom, setZoom] = useState(10);
    const [showMarker, setShowMarker] = useState(false);
    const [mapCenter, setMapCenter] = useState(center);
    const [circleCounter, setCircleCounter] = useState(-1);
    const [circleInitialized, setCircleInitialized] = useState(false);
    const [cacheMarker, setCacheMarker] = useState({ lat: null, lng: null});
    const [isExploding, setIsExploding] = useState(false);

    const navigate = useNavigate();
    const containerStyle = {
        height: '600px',
        width: '100%'
    };

    const getCacheImage = () => {
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

    const handleCacheClick = () => {
        setIsCacheOpen(true);
        setShowPopup(true);
        setIsExploding(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/Dashboard');
    };

    const mapRef = useRef();
    const handleMapLoad = (map) => {
        mapRef.current = map; // Save the map instance in the ref
    };

    const handleZoomChanged = () => {
        if (mapRef.current) {
            // if(!circleInitialized){
            handleOnIdle();
            // }
            const lat = mapRef.current.getCenter().lat();
            const lng = mapRef.current.getCenter().lng();

            const distance = getDistanceFromLatLonInKm(
                lat,
                lng,
                cacheMarker.lat,
                cacheMarker.lng
            );
            console.log(`Distance: ${distance}`);

            const currentZoom = mapRef.current.getZoom(); // Get the current zoom level
            setZoom(currentZoom);

            // Show marker if zoom level is greater than or equal to 15
            if (currentZoom >= 19) {
                setShowMarker(true);
            } else {
                setShowMarker(false);
            }
        }
    };

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.addListener("zoom_changed", handleZoomChanged); // Listen for zoom changes
        }
    }, []);

    useEffect(() => {
        if (game.localisation_cache) {
            const [lat, lng] = game.localisation_cache.split(',').map(coord => parseFloat(coord.trim()));
            setCacheMarker({ lat, lng});
        }
    }, [game.localisation_cache]);

    useEffect(() => {
        if (cacheMarker.lat && cacheMarker.lng) {
            console.log(`CacheMarker Location: Latitude: ${cacheMarker.lat}, Longitude: ${cacheMarker.lng}`);
        }
    }, [cacheMarker]);

    const handleOnIdle = () => {
        const lat = mapRef.current.getCenter().lat();
        const lng = mapRef.current.getCenter().lng();

        const distance = getDistanceFromLatLonInKm(
            lat,
            lng,
            cacheMarker.lat,
            cacheMarker.lng
        );

        // Define circle options based on the distance
        let radius;
        let strokeColor;
        let fillColor;

        if (distance < 0.1) { // Less than 100 meters
            radius = 300;
            strokeColor = 'green';
            fillColor = 'green';
        } else if (distance < 0.5) { // Between 100 and 500 meters
            radius = 300;
            strokeColor = 'yellow';
            fillColor = 'yellow';
        } else {
            radius = 30 * mapRef.current.getZoom(); // Calculate radius based on zoom level
            strokeColor = 'red';
            fillColor = 'red';
        }

        // Only update circle options if they have actually changed
        if (circleOptions.center?.lat !== lat ||
            circleOptions.center?.lng !== lng ||
            circleOptions.radius !== radius ||
            circleOptions.strokeColor !== strokeColor ||
            circleOptions.fillColor !== fillColor) {
            setCircleOptions({
                center: { lat, lng },
                radius,
                strokeColor,
                fillColor,
            });

            // Mark the circle as initialized after the first render
            if (!circleInitialized) {
                setCircleCounter( circleCounter + 1 )
                console.log( circleCounter )
                setCircleInitialized(true);
            }
        }
    };

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Rayon de la Terre en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance en km
    }

    return isLoaded && (
        <div className="container">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={zoom}
                onZoomChanged={handleZoomChanged}
                onLoad={handleMapLoad}
            >
                <div>
                    {showMarker && (
                        <Marker
                            position={cacheMarker}
                            options={{
                                icon: {
                                    url: getCacheImage()
                                }
                            }}
                            onClick={handleCacheClick} // Handle marker click
                        />
                    )}
                </div>

                {/* Only draw the circle after it has been initialized */}
                {circleOptions.center && (
                    <Circle
                        center={circleOptions.center} // Dynamic center
                        onLoad={() => setCircleCounter(circleCounter + 1)}
                        options={{
                            strokeColor: circleOptions.strokeColor,
                            fillColor: circleOptions.fillColor,
                            fillOpacity: 0.3 * circleCounter,
                            strokeOpacity: 1,
                            strokeWeight: 1 * circleCounter,
                            radius: circleOptions.radius * (1 / mapRef.current.getZoom()),
                        }}
                    />
                )}
            </GoogleMap>

            {showPopup && (
                <div className="popup-cart-find">
                    <span onClick={handleClosePopup}>&times;</span>
                    <p className="text-popup">Félicitation ! Vous avez trouvé la carte Ahri !</p>
                    <p className="text-popup">La carte a été ajoutée à votre collection.</p>
                    <img src={game.collection.card.image_url} alt="Popup" />
{/*                     <div className="explosion">
                        {isExploding && typeof window !== 'undefined' && (
                            <ConfettiExplosion 
                                force={0.8}
                                duration={3000}
                                particleCount={250}
                                width={1600}
                            />
                        )}
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default Map;