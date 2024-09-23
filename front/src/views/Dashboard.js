import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import '../css/Dashboard.css';
import ListHistorique from './components/ListHistorique';
import ListGame from './components/ListGame';

const Dashboard = () => {

    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleClickMap= () => {
        setAlertType('success');
        setAlertMessage('Le mode Map a été activé avec succès !');
        setOpen(true);
    }

    const handleClickGeo= () => {
        setAlertType('error');
        setAlertMessage("Le mode Géo n'est pas disponible sur ordinateur. Connecte toi via un téléphone portable ou une tablette pour profiter de ce mode de jeu.");
        setOpen(true);
    };

    const handleClose= () => {
        setOpen(false);
    }

    return (
        <div>
            <div className='alert-container'>
                {open && (
                    <Alert severity={alertType} variant='filled' fontSize='inherit' onClose={handleClose}>
                        {alertMessage}
                    </Alert>
                )}
            </div>
            <div className="container">
                <div className="column left">
                    <h2 className='title-column'>Chasse géante</h2>
                    <div className='button-container'>
                        <button onClick={handleClickMap} className='button map'>Mode Map</button>
                        <button onClick={handleClickGeo} className='button geo'>Mode Géo</button>
                    </div>
                    <ListHistorique/>
                </div>
                <div className="column right">
                    <ListGame/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;