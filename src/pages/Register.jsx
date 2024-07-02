// src/pages/Register.js

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!termsAccepted) {
      setError('Debes aceptar los términos de servicio y la política de privacidad.');
      return;
    }

    try {
      await register(email, password);
      console.log({ firstName, lastName, email, termsAccepted });
      navigate('/explore');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Crea tu cuenta</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Tu nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Apellidos</label>
          <input
            type="text"
            placeholder="Tus apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Correo Electrónico</label>
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small>Se te enviará un correo de confirmación</small>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="terms-label">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            Acepto los términos de servicio y la política de privacidad.
          </label>
          <button type="submit" className="submit-button">Registrar</button>
        </form>
        <div className="divider">o</div>
        <button className="social-button google-button">Registrar con Google</button>
        <button className="social-button facebook-button">Registrar con Facebook</button>
      </div>
    </div>
  );
};

export default Register;

