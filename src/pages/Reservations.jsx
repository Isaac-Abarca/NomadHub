import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Reservations.css';

const Reservations = () => {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (currentUser) {
        const q = query(collection(db, 'reservations'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const reservationsList = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
          const reservation = { id: docSnapshot.id, ...docSnapshot.data() };
          const propertyDoc = await getDoc(doc(db, 'properties', reservation.propertyId));
          if (propertyDoc.exists()) {
            reservation.property = propertyDoc.data();
          }
          return reservation;
        }));
        setReservations(reservationsList);
      }
    };

    fetchReservations();
  }, [currentUser]);

  if (!currentUser) {
    return <div className='inloggion'><span>Please log in to view your reservations.</span></div>;
  }

  return (
    <div className="reservations-container">
      <h2>Mis Reservas</h2>
      <div className="reservations-list">
        {reservations.map(reservation => (
          <div key={reservation.id} className="reservation-card">
            <div className="reservation-info">
              <p className="reservation-title">{reservation.property?.title}</p>
              <p className="reservation-date">Fecha: {reservation.date}</p>
              <p className="reservation-location">Ubicación: {reservation.property?.location}</p>
              <p className="reservation-price">Precio: ${reservation.property?.price}/hr</p>
            </div>
            {reservation.property && (
              <div className="reservation-property-info">
                <div className="property-image" style={{ backgroundImage: `url(${reservation.property.imageUrl})` }}></div>
                <p className="property-price">${reservation.property.price}/hr</p>
                <Link to={`/property/${reservation.propertyId}`} className="details-button">Ver Detalles</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;



  