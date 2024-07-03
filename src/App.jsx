// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Explore from './pages/Explore';
import Workspaces from './pages/Workspaces';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedComponent from './pages/ProtectedComponent';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import HostPanel from './pages/HostPanel'; 
import PropertyDetails from './pages/PropertyDetails';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/host/*" element={<PrivateRoute><HostPanel /></PrivateRoute>} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

