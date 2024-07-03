import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
        const reservationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReservations(reservationsList);
      }
    };

    fetchReservations();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to view your reservations.</div>;
  }

  return (
    <div className="reservations-container">
      <h2>Mis Reservas</h2>
      <div className="reservations-list">
        {reservations.map(reservation => (
          <div key={reservation.id} className="reservation-card">
            <p className="reservation-title">{reservation.propertyTitle}</p>
            <p className="reservation-date">Fecha: {reservation.date}</p>
            <p className="reservation-location">Ubicación: {reservation.propertyLocation}</p>
            <p className="reservation-price">Precio: ${reservation.propertyPrice}/hr</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;


  