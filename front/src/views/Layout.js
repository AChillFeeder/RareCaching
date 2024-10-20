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
    const [activeItem, setActiveItem] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const handleItemClick = (item) => {
        if (activeItem === item) {
            setActiveItem(null);
        } else {
            setActiveItem(item);
        }
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
                        <li onClick={() => handleItemClick('RareCaching')} className='menu-item'>
                            <div className='menu-item-container'>
                                <IoGameControllerOutline/>
                                <span className='menu-item-label'>RareCaching</span>
                            </div>
                            {activeItem === 'RareCaching' && (
                                <ul className="sub-menu">
                                    <li onClick={() => handleNavigation('/CreateGame')}>Créer une cache</li>
                                    <li onClick={() => handleNavigation('/Dashboard')}>Rejoindre une chasse</li>
                                </ul>
                            )}
                        </li>
                        <li onClick={() => handleItemClick('Profile')} className='menu-item'>
                            <div className='menu-item-container'>
                                <CgProfile/>
                                <span className='menu-item-label'>Profil</span>
                            </div>
                            {activeItem === 'Profile' && (
                                <ul className="sub-menu">
                                    <li onClick={() => handleNavigation('/Dashboard')}>Mes informations</li>
                                    <li onClick={() => handleNavigation('/Dashboard')}>Liste de mes NFTs</li>
                                    <li onClick={() => handleNavigation('/Dashboard')}>Liste de mes caches créées</li>
                                </ul>
                            )}
                        </li>
                        <li onClick={() => handleItemClick('Market')} className='menu-item'>
                            <div className='menu-item-container'>
                                <PiBasketBold/>
                                <span className='menu-item-label'>Marché</span>
                            </div>
                        </li>
                        <li onClick={() => handleItemClick('Information')} className='menu-item'>
                            <div className='menu-item-container'>
                                <HiOutlineInformationCircle/>
                                <span className='menu-item-label'>En savoir plus</span>
                            </div>
                        </li>
                        <li onClick={() => handleItemClick('Logout')} className='menu-item'>
                            <div className='menu-item-container logout' >
                                <TbLogout/>
                                <span className='menu-item-label'>Déconnexion</span>
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