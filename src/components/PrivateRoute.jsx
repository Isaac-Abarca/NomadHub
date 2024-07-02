/* eslint-disable react/prop-types */
// src/components/PrivateRoute.js

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return null; // Or a loading spinner
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
