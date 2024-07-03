// src/pages/Listings.jsx
import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Listings.css';

const Listings = () => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      if (currentUser) {
        const q = query(collection(db, 'properties'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const propertiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProperties(propertiesList);
      }
    };

    fetchProperties();
  }, []);

  const handleEdit = (property) => {
    navigate(`/host/editproperty/${property.id}`, { state: { property } });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'properties', id));
    setProperties(properties.filter(property => property.id !== id));
    setDeleteModalVisible(false);
  };

  const showDeleteModal = (id) => {
    setPropertyToDelete(id);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setPropertyToDelete(null);
  };

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
          <PropertyCard key={property.id} property={property} onEdit={handleEdit} onDelete={showDeleteModal} />
        ))}
      </div>
      {deleteModalVisible && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <p>¿Está seguro de que desea eliminar esta propiedad? Esta acción no se puede deshacer.</p>
            <button onClick={() => handleDelete(propertyToDelete)}>Eliminar</button>
            <button onClick={hideDeleteModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;