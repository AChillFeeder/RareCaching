import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Layout.css';

const Layout = ({ children }) => {

    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate('/Dashboard');
    }
    return (
        <div>
            {/* Header ou barre de navigation */}
            <header className='header'>
                <div className='header-left'>
                    <h2 onClick={handleTitleClick}>RareCaching</h2>
                    <img className = 'help-icon' src="/icons/help.png"/>
                </div>
                <div className='header-right'>
                    <img className = 'market-icon' src="/icons/market.png"/>
                    <img className = 'profil-icon' src="/icons/profil.png"/>
                </div>
            </header>

            {/* Contenu dynamique */}
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;