import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import PublicPropertyCard from '../components/PublicPropertyCard';
import '../styles/Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propertiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(propertiesList);
    };

    fetchProperties();
  }, []);

  return (
    <div className="home-container">
      <h2>Propiedades Disponibles</h2>
      <div className="properties-grid">
        {properties.map(property => (
          <PublicPropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
