import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import ListGame from './components/ListGame';
import '../css/Dashboard.css';

const Dashboard = () => {

    const [open, setOpen] = useState(true);

    const handleClose= () => {
        setOpen(false);
    }

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