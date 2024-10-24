import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { IoGameControllerOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { PiBasketBold } from "react-icons/pi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import '../css/Layout.css';

// ---------------------------------------------------------------------------------------------
// Layout est le template des différentes pages
// On retrouvera le même fond, le header et le menu sur toutes les pages
// Sauf pour la connexion et l'inscription
// ---------------------------------------------------------------------------------------------
const Layout = ({ children }) => {

    // -----------------------------------------------------------------------------------------
    // Déclarations constantes
    // -----------------------------------------------------------------------------------------

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // -----------------------------------------------------------------------------------------
    // Fonctions
    // -----------------------------------------------------------------------------------------

    // handleNavigation est appelée lorsqu'un item du menu est cliqué
    // La fonction redirige vers la bonne page
    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    // toggleMenu est appelée sur l'icon menu
    // La fonction ouvre le menu si l'icon est cliqué
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    
    return (
        <div>
            {/* Header */}
            <header className='header'>
                <div className='menu-icon' onClick={toggleMenu}>
                    <TiThMenu className='menu-icon'/>
                </div>
                <h2 onClick={() => handleNavigation('/Dashboard')}>RareCaching</h2>

                {/* Menu */}
                <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li onClick={() => handleNavigation('/Dashboard')} className='menu-item'>
                            <div className='menu-item-container'>
                                <IoGameControllerOutline/>
                                <span className='menu-item-label'>Rejoindre une chasse</span>
                            </div>
                        </li>
                        <li onClick={() => handleNavigation('/Profile')} className='menu-item'>
                            <div className='menu-item-container'>
                                <CgProfile/>
                                <span className='menu-item-label'>Profil</span>
                            </div>
                        </li>
                        <li className='menu-item'>
                            <div className='menu-item-container'>
                                <PiBasketBold/>
                                <span className='menu-item-label'>Marché</span>
                            </div>
                        </li>
                        <li className='menu-item'>
                            <div className='menu-item-container'>
                                <HiOutlineInformationCircle/>
                                <span className='menu-item-label'>Règles du jeu</span>
                            </div>
                        </li>
                        <li  className='menu-item'>
                            <div className='menu-item-container logout' >
                                <TbLogout/>
                                <span className='menu-item-label logout'>Déconnexion</span>
                            </div>
                        </li>
                    </ul>
                </div> 
 
                {/* Affichage du menu */}
                {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}  
            </header>

            {/* Corps de la page */}
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;