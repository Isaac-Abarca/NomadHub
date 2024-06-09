// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="NomadHub Logo" className="logo" />
                </Link>
            </div>
            <div className="navbar-center">
                <Link to="/host" className="navbar-link">Pon tu espacio en NomadHub</Link>
            </div>
            <div className="navbar-right">
                <div className="navbar-icon">
                    <i className="fas fa-globe"></i>
                </div>
                <div className="navbar-menu">
                    <i className="fas fa-bars"></i>
                    <i className="fas fa-user-circle"></i>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
