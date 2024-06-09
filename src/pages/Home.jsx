// src/pages/Home.js
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import '../styles/Home.css';
import homeImage from '../assets/HomeIMG/Home.webp';
import feature1 from '../assets/HomeIMG/Home.webp';
import feature2 from '../assets/HomeIMG/Home.webp';
import feature3 from '../assets/HomeIMG/Home.webp';
import popular1 from '../assets/HomeIMG/Home.webp';
import popular2 from '../assets/HomeIMG/Home.webp';
import popular3 from '../assets/HomeIMG/Home.webp';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <section className="hero-section" style={{ backgroundImage: `url(${homeImage})` }}>
                    <div className="hero-content">
                        <h1>Bienvenido a NomadHub</h1>
                        <p>La plataforma ideal para gestionar propiedades y reservas de manera eficiente.</p>
                        <div className="hero-buttons">
                            <Link to="/login" className="button">Login</Link>
                            <Link to="/register" className="button">Register</Link>
                        </div>
                    </div>
                </section>
                <section className="features-section">
                    <h2>Novedades de esta semana</h2>
                    <div className="features">
                        <div className="feature-item">
                            <img src={feature1} alt="Feature 1" />
                            <h3>Más populares en todo el mundo</h3>
                            <p>Descubre los destinos más populares para nómadas digitales.</p>
                        </div>
                        <div className="feature-item">
                            <img src={feature2} alt="Feature 2" />
                            <h3>Planificación de itinerarios fácil</h3>
                            <p>Organiza tu viaje de manera eficiente con nuestras herramientas.</p>
                        </div>
                        <div className="feature-item">
                            <img src={feature3} alt="Feature 3" />
                            <h3>Fomenta el espíritu de equipo</h3>
                            <p>Encuentra actividades para fortalecer el trabajo en equipo.</p>
                        </div>
                    </div>
                </section>
                <section className="popular-section">
                    <h2>Las más populares</h2>
                    <div className="popular-items">
                        <div className="popular-item">
                            <img src={popular1} alt="Popular 1" />
                            <p>Viaje personalizado a Japón</p>
                        </div>
                        <div className="popular-item">
                            <img src={popular2} alt="Popular 2" />
                            <p>Itinerario de Tokio con un experto</p>
                        </div>
                        <div className="popular-item">
                            <img src={popular3} alt="Popular 3" />
                            <p>Vacaciones perfectas en Nueva York</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;