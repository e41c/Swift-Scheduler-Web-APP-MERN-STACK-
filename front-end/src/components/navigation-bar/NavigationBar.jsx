/* NavigationBar.jsx */
import { React, useState }from 'react';
import { Link } from 'react-router-dom'
import NavLogo from '../../assets/nav-logo.png';
import { Menu, X } from 'lucide-react';
import './NavigationBar.css'

function NavigationBar() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = (e) => {
        if (e.currentTarget.id === 'nav-close') {
            setMenuVisible(false);
        } else {
            setMenuVisible(!menuVisible)
        }
    };

    return (
        <header className="header" id="header">
            <nav className="nav container">
                <div className="nav__logo">
                    <a href="/" className="nav__logo">
                        <img src={NavLogo} alt="temp logo" />
                        <span>Groove Zone</span>
                    </a>
                </div>
                <div className={`nav__menu ${menuVisible ? 'show-menu' : ''}`} id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="./about" className="nav__link">About Us</a>
                        </li>
                        <li className="nav__item">
                            <a href="./register" className="nav__link">Join our team!</a>
                        </li>
                        <li className="nav__item">
                            <a href="./home" className="nav__link">Pricing</a>
                        </li>

                        <div className="nav__link">
                            <a href="./login" className='button nav__button'>Login</a>
                        </div>
                    </ul>

                    <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                        <X />
                    </div>
                </div>
                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    {menuVisible ? <X /> : <Menu />}
                </div>
            </nav>
        </header>
    );
}

export default NavigationBar;
