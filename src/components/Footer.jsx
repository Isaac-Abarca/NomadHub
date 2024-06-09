// src/components/Footer.js

import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/about" className="footer-link">Acerca de</a>
        <a href="/host" className="footer-link">Anfitrión</a>
        <a href="/careers" className="footer-link">Trabaja en NomadHub</a>
        <a href="/discover" className="footer-link">Descubre</a>
        <a href="/support" className="footer-link">Asistencia</a>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" className="social-icon"><i className="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" className="social-icon"><i className="fab fa-instagram"></i></a>
        <a href="https://twitter.com" className="social-icon"><i className="fab fa-twitter"></i></a>
      </div>
      <div className="footer-copyright">
        &copy;2024 NomadHub
      </div>
    </footer>
  );
};

export default Footer;
