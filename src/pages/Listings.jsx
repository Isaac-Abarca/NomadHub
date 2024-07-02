// src/pages/Listings.jsx
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Listings.css';

const Listings = () => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const userId = currentUser.uid; // Replace with the actual current user ID
      const q = query(collection(db, 'properties'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const propertiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(propertiesList);
    };

    fetchProperties();
  }, []);

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
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Listings;



  