// src/components/Header.js
import { Link } from 'react-router-dom';
import '../styles/Header.css';


const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src="/logo.png" alt="NomadHub Logo" className="logo" />
        </Link>
      </div>
      <div className="header-right">
        <Link to="/login" className="header-link">Login</Link>
        <Link to="/register" className="header-link">Register</Link>
      </div>
    </header>
  );
};

export default Header;
