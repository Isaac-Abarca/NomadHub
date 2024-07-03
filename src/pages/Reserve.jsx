import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Reserve.css';
import Modal from '../components/Modal';

const Reserve = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [date, setDate] = useState(new Date());
  const [paymentOption, setPaymentOption] = useState('registered');
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  const isCardValid = (card) => {
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;
    return cardNumberRegex.test(card.number) && expiryRegex.test(card.expiry) && cvvRegex.test(card.cvv) && card.name;
  };

  const handleReserve = async () => {
    setError('');

    // Validate date availability
    const q = query(
      collection(db, 'reservations'),
      where('propertyId', '==', id),
      where('date', '==', date.toISOString().split('T')[0])
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError('La propiedad no está disponible para la fecha seleccionada.');
      return;
    }

    // Validate card information if new card
    if (paymentOption === 'new' && !isCardValid(newCard)) {
      setError('La información de la tarjeta es incorrecta.');
      return;
    }

    // Create reservation
    const reservation = {
      propertyId: id,
      date: date.toISOString().split('T')[0],
      paymentOption,
      ...(paymentOption === 'new' && { newCard }),
    };

    try {
      await setDoc(doc(db, `reservations/${Date.now()}`), reservation);
      setShowModal(true);
    } catch (error) {
      setError('Error al realizar la reserva. Por favor, intenta nuevamente.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/reservations');
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reserve-container">
      <h2>Registra tu reserva</h2>
      <div className="property-summary">
        <div className="property-image" style={{ backgroundImage: `url(${property.imageUrl})` }}></div>
        <div className="property-info">
          <p className="property-price">${property.price}/hr</p>
          <p className="property-title">{property.title}</p>
          <p className="property-location">{property.location}</p>
          <p className="property-rating">{property.rating}</p>
        </div>
      </div>
      <div className="date-picker">
        <h3>Fecha</h3>
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>
      <div className="payment-options">
        <h3>Opciones de pago</h3>
        <div>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="registered"
              checked={paymentOption === 'registered'}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            Usar una tarjeta registrada
          </label>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="new"
              checked={paymentOption === 'new'}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            Agregar nueva tarjeta
          </label>
        </div>
        {paymentOption === 'new' && (
          <div className="new-card-details">
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={newCard.number}
              onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
            />
            <input
              type="text"
              placeholder="Fecha de vencimiento (MM/YY)"
              value={newCard.expiry}
              onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              value={newCard.cvv}
              onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nombre responsable de la tarjeta"
              value={newCard.name}
              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            />
          </div>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      <div className="buttons">
        <button onClick={handleReserve} className="btn-reserve">Reservar</button>
        <button onClick={() => window.history.back()} className="btn-cancel">Cancelar</button>
      </div>
      {showModal && (
        <Modal message="¡Reserva realizada con éxito!" onClose={closeModal} />
      )}
    </div>
  );
};

export default Reserve;

