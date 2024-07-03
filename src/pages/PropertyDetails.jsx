import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import '../styles/PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const docRef = doc(db, 'properties', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProperty(docSnap.data());
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-details-container">
      <h2>{property.title}</h2>
      <div className="property-details-image" style={{ backgroundImage: `url(${property.imageUrl})` }}></div>
      <p className="property-details-description">{property.description}</p>
      <p className="property-details-price">${property.price}/hr · {property.spaces} espacios</p>
      <div className="property-services">
        <h3>Servicios:</h3>
        <ul>
          {property.wifi && <li>Wi-Fi</li>}
          {property.coffeeTea && <li>Café y té</li>}
          {property.filteredWater && <li>Agua filtrada</li>}
          {property.reception && <li>Recepción</li>}
          {property.printingService && <li>Servicio de impresión</li>}
        </ul>
      </div>
      <div className="property-details-amenities">
        <h3>Comodidades:</h3>
        <ul>
          {property.bathroom && <li>Baño</li>}
          {property.shower && <li>Ducha</li>}
          {property.kitchen && <li>Cocina</li>}
          {property.airConditioning && <li>Aire acondicionado</li>}
          {property.heating && <li>Calefacción</li>}
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetails;
