/* eslint-disable react/prop-types */
// src/components/PropertyCard.jsx

import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/PropertyCard.css';

const PropertyCard = ({ property, onEdit, onDelete }) => {
  return (
    <div className="property-card">
      <div className="property-image" style={{ backgroundImage: `url(${property.imageUrl})` }}>
        <div className="property-actions">
          <button onClick={() => onEdit(property)} className="action-button edit-button">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(property.id)} className="action-button delete-button">
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="property-details">
        <p className="property-title">{property.title}</p>
        <p className="property-price">${property.price}/hr · {property.spaces} espacios</p>
        <p className="property-service">{property.services.foodService ? 'Con servicio de alimentos' : ''}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
