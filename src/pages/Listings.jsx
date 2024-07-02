// src/pages/Listings.jsx

import { Link } from 'react-router-dom';
import '../styles/Listings.css';

const Listings = () => {
  return (
    <div className="listings-container">
      <div className="header-section">
        <div className="header-text">
          <p className="title">Mis Propiedades</p>
        </div>
        <div className="add-property-button">
          <Link to="/host/addproperty">
            <button>
              <span>Agregar Propiedad</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="tabs-section">
        <div className="tabs">
          <a className="tab active" href="#">
            <p className="tab-text">Todas</p>
          </a>
          <a className="tab" href="#">
            <p className="tab-text">En revisión</p>
          </a>
          <a className="tab" href="#">
            <p className="tab-text">No publicadas</p>
          </a>
        </div>
      </div>
      <div className="properties-grid">
        <div className="property-card">
          <div className="property-image" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/00f5e4af-1773-461e-9d06-53fb89844024.png")' }}></div>
          <div className="property-details">
            <p className="property-title">Casa de playa con vista al mar</p>
            <p className="property-price">$120/hr · 3 espacios</p>
            <p className="property-service">Con servicio de alimentos</p>
          </div>
        </div>
        <div className="property-card">
          <div className="property-image" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/57dfa43f-1579-4456-8ff0-921b1ef68e58.png")' }}></div>
          <div className="property-details">
            <p className="property-title">Departamento moderno en el centro</p>
            <p className="property-price">$90/hr · 2 espacios</p>
            <p className="property-service">Con servicio de alimentos</p>
          </div>
        </div>
        <div className="property-card">
          <div className="property-image" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/3e20a510-85aa-4110-91be-d795d2ffd38a.png")' }}></div>
          <div className="property-details">
            <p className="property-title">Loft industrial con terraza</p>
            <p className="property-price">$150/hr · 4 espacios</p>
            <p className="property-service">Con servicio de alimentos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;



  