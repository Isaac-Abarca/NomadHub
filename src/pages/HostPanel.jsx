// src/pages/HostPanel.js

import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Overview from './Overview';
import Listings from './Listings';
import Reservations from './Reservations';
import Support from './Support';
import '../styles/HostPanel.css';

const HostPanel = () => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="host-panel-container">
      <aside className="host-panel-sidebar">
        <nav>
          <ul>
            <li className={activeSection === 'overview' ? 'active' : ''}>
              <Link to="/host/overview" onClick={() => setActiveSection('overview')}>Overview</Link>
            </li>
            <li className={activeSection === 'listings' ? 'active' : ''}>
              <Link to="/host/listings" onClick={() => setActiveSection('listings')}>Listings</Link>
            </li>
            <li className={activeSection === 'reservations' ? 'active' : ''}>
              <Link to="/host/reservations" onClick={() => setActiveSection('reservations')}>Reservations</Link>
            </li>
            <li className={activeSection === 'support' ? 'active' : ''}>
              <Link to="/host/support" onClick={() => setActiveSection('support')}>Support</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="host-panel-main">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="listings" element={<Listings />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="support" element={<Support />} />
        </Routes>
      </main>
    </div>
  );
};

export default HostPanel;
