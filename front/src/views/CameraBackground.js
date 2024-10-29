import React, { useEffect, useRef, useState } from 'react';

const CameraBackground = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true); // État pour gérer le type de caméra

    const getCameraStream = async (facingMode) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facingMode },
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera: ", error);
        }
    };

    useEffect(() => {
        getCameraStream('user'); // Utiliser la caméra frontale par défaut

        return () => {
            if (streamRef.current) {
                const tracks = streamRef.current.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const toggleCamera = () => {
        const newFacingMode = isFrontCamera ? 'environment' : 'user'; // Basculer entre les caméras
        getCameraStream(newFacingMode); // Obtenez le flux de la caméra correspondante
        setIsFrontCamera(!isFrontCamera); // Mettre à jour l'état de la caméra
    };

    return (
        <div>
            <video 
                ref={videoRef} 
                autoPlay 
                muted 
                style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    zIndex: -1 
                }} 
            />
            <button 
                onClick={toggleCamera} 
                style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '20px', 
                    padding: '10px', 
                    fontSize: '16px', 
                    zIndex: 1 // Assurez-vous que le bouton est au-dessus de la vidéo
                }}
            >
                Changer de caméra
            </button>
        </div>
    );
};

export default CameraBackground;
