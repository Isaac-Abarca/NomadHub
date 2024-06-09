/* eslint-disable react/prop-types */
// src/pages/Login.jsx
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { login } from '../services/api';
import '../styles/Login.css';

const Login = ({ history }) => {
  const { login: userLogin } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      userLogin(response.data);
      history.push('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>Correo Electrónico</label>
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">Iniciar sesión</button>
        </form>
        <div className="divider">o</div>
        <button className="social-button google-button">Iniciar sesión con Google</button>
        <button className="social-button facebook-button">Iniciar sesión con Facebook</button>
        <p className="register-link">
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
