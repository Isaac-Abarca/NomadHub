// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="NomadHub Logo" />
                <span>NomadHub</span>
            </div>
            <div className="navbar-links">
                <Link to="/explore">Explorar</Link>
                <Link to="/workspaces">Espacios de trabajo</Link>
                <Link to="/help">Ayuda</Link>
            </div>
            <div className="navbar-buttons">
                <Link to="/login">
                    <button className="btn-login">Iniciar sesión</button>
                </Link>
                <Link to="/register">
                    <button className="btn-register">Registrarse</button>
                </Link>
            </div>
        </nav>
    )
};

export default Navbar;
