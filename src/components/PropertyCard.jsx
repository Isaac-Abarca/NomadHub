/* eslint-disable react/prop-types */
// src/components/PropertyCard.jsx
import '../styles/PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-image" style={{ backgroundImage: `url(${property.imageUrl})` }}></div>
      <div className="property-details">
        <p className="property-title">{property.title}</p>
        <p className="property-price">${property.price}/hr · {property.spaces} espacios</p>
        <p className="property-service">{property.services.foodService ? 'Con servicio de alimentos' : ''}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
