// src/components/NavBar.js

import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
        {currentUser ? (
          <div className="navbar-profile">
            {currentUser.accountType === 'anfitrion' && (
              <Link to="/host-panel">
                <button className="btn-host-panel">Panel de Anfitrión</button>
              </Link>
            )}
            <Link to="/profile">
              <img src={currentUser.photoURL || "/path/to/default-avatar.png"} alt="Profile" className="profile-pic-navbar" />
            </Link>
            <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-login">Iniciar sesión</button>
            </Link>
            <Link to="/register">
              <button className="btn-register">Registrarse</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
