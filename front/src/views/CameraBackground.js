import React, { useEffect, useRef, useState } from 'react';
import IconCamera from '../assets/icon/ChangerCamera.png';

const CameraBackground = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);

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
        const newFacingMode = isFrontCamera ? 'environment' : 'user';
        getCameraStream(newFacingMode);
        setIsFrontCamera(!isFrontCamera);
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
                    zIndex: 1, 
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <img 
                    src={IconCamera} 
                    alt="Changer de caméra" 
                    style={{ width: '30px', height: '30px' }} 
                />
            </button>
        </div>
    );
};

export default CameraBackground;
