import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import ListGame from './components/ListGame';
import '../css/Dashboard.css';

const isMobile = () => {
  const userAgent = window.navigator.userAgent;
  return /Mobi|Android/i.test(userAgent);
};

const Dashboard = () => {

    const [open, setOpen] = useState(true);

    const handleClose= () => {
        setOpen(false);
    }

    useEffect(() => {
        // Si l'utilisateur n'est pas sur mobile, afficher l'alerte
        if (!isMobile()) {
          setOpen(true);
        }
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