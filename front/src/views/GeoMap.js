import React, { useState, useEffect } from "react";
import { Entity, Scene } from "aframe-react";
import "aframe";
import "aframe-particle-system-component";
import CameraBackground from "./Camerabackground";

// Définir les caches avec des positions dans le monde 3D
const caches = [
    { name: "Cache Commun", position: { x: 1, y: 1, z: -5 }, rarity: "Commun" },
];

function App() {
    const [userPosition, setUserPosition] = useState([51.505, -0.09]); // Position par défaut
    const [isLoading, setIsLoading] = useState(true);
    const [cameraPosition, setCameraPosition] = useState("0 1.6 0"); // Position de la caméra initiale
    const [cameraRotation, setCameraRotation] = useState("0 0 0"); // Rotation de la caméra initiale
    const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

    // Gérer la géolocalisation
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setUserPosition([position.coords.latitude, position.coords.longitude]);
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                    setIsLoading(false);
                }
            );

            // Nettoyer le watchPosition lorsque le composant est démonté
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error("La géolocalisation n'est pas supportée par ce navigateur.");
            setIsLoading(false);
        }
    }, []);

    // Gérer l'orientation de l'appareil
    useEffect(() => {
        const handleOrientation = (event) => {
            const { alpha, beta, gamma } = event;
            setDeviceOrientation({ alpha, beta, gamma });

            setCameraRotation(`${beta} ${alpha} ${-gamma}`); // Ajustement pour A-Frame
        };

        window.addEventListener("deviceorientation", handleOrientation);

        return () => window.removeEventListener("deviceorientation", handleOrientation);
    }, []);

    // Mettre à jour la position de la caméra en fonction de l'orientation de l'appareil
    useEffect(() => {
        const { beta, gamma } = deviceOrientation;
        const z = Math.cos((beta * Math.PI) / 180) * 1.6;
        const x = Math.sin((gamma * Math.PI) / 180) * 1.6;
        setCameraPosition(`${x} 1.6 ${z}`);
    }, [deviceOrientation]);

    if (isLoading) {
        return <div>Chargement de votre position...</div>;
    }

    return (
        <div>
            <CameraBackground /> {/* Ajoutez le composant de la caméra ici */}
            {/* Scène de Réalité Augmentée */}
            <Scene>
                
                <Entity
                    primitive="a-camera"
                    position={cameraPosition}
                    rotation={cameraRotation} // Appliquer la rotation de la caméra
                    wasd-controls="enabled: false" // Désactiver les contrôles au clavier et autres
                    look-controls="enabled: false" // Désactiver les contrôles à la souris
                >
                </Entity>

                {/* Marqueurs de caches en réalité augmentée */}
                {caches.map((cache, index) => (
                    <Entity
                        key={index}
                        geometry={{ primitive: "box" }}
                        material={{ color: cache.rarity === "Exceptionnel" ? "red" : "blue" }}
                        position={`${cache.position.x} ${cache.position.y} ${cache.position.z}`}
                    >
                        <Entity
                            text={{ value: `${cache.name} - Rareté : ${cache.rarity}`, align: "center" }}
                            position="0 1.5 0"
                        />
                    </Entity>
                ))}

                {/* Lumière */}
                <Entity light={{ type: "directional", color: "#FFF", intensity: 1 }} position="1 1 1" />
            </Scene>
        </div>
    );
}

export default App;
