import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import ListGame from './components/ListGame';
import '../css/Dashboard.css';

// ---------------------------------------------------------------------------------------------
// Dashboard est la page d'accès à l'ensemble des partie (caches à chercher)
// ---------------------------------------------------------------------------------------------
const Dashboard = () => {

    // -----------------------------------------------------------------------------------------
    // Déclarations constantes
    // -----------------------------------------------------------------------------------------

    const [open, setOpen] = useState(true);

    // -----------------------------------------------------------------------------------------
    // Fonctions
    // -----------------------------------------------------------------------------------------

    // Gère la fermeture de l'alerte
    const handleClose= () => {
        setOpen(false);
    }

    // -----------------------------------------------------------------------------------------
    // useEffect
    // -----------------------------------------------------------------------------------------

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <div>
            <div className='alert-container'>
                {open && (
                    <Alert severity='warning' variant='filled' fontSize='inherit' onClose={handleClose}>
                        Pour utiliser le Mode Géo, connecte-toi via un téléphone portable ou une tablette.
                    </Alert>
                )}
            </div>
            <ListGame/>
        </div>
    );
};

export default Dashboard;