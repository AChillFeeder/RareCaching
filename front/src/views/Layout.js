import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { IoGameControllerOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { PiBasketBold } from "react-icons/pi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import '../css/Layout.css';

const Layout = ({ children }) => {

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    
    return (
        <div>
            {/* Header ou barre de navigation */}
            <header className='header'>
                <div className='menu-icon' onClick={toggleMenu}>
                    <TiThMenu className='menu-icon'/>
                </div>
                <h2 onClick={() => handleNavigation('/Dashboard')}>RareCaching</h2>


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
 
                {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}  
            </header>

            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;