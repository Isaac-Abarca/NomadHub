// src/pages/HostPanel.jsx

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
              <Link to="/host/overview" onClick={() => setActiveSection('overview')}>
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z"
                    ></path>
                  </svg>
                </div>
                <p>Overview</p>
              </Link>
            </li>
            <li className={activeSection === 'listings' ? 'active' : ''}>
              <Link to="/host/listings" onClick={() => setActiveSection('listings')}>
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"
                    ></path>
                  </svg>
                </div>
                <p>Listings</p>
              </Link>
            </li>
            <li className={activeSection === 'reservations' ? 'active' : ''}>
              <Link to="/host/reservations" onClick={() => setActiveSection('reservations')}>
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"
                    ></path>
                  </svg>
                </div>
                <p>Reservations</p>
              </Link>
            </li>
            <li className={activeSection === 'support' ? 'active' : ''}>
              <Link to="/host/support" onClick={() => setActiveSection('support')}>
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M201.89,54.66A103.43,103.43,0,0,0,128.79,24H128A104,104,0,0,0,24,128v56a24,24,0,0,0,24,24H64a24,24,0,0,0,24-24V144a24,24,0,0,0-24-24H40.36A88.12,88.12,0,0,1,190.54,65.93,87.39,87.39,0,0,1,215.65,120H192a24,24,0,0,0-24,24v40a24,24,0,0,0,24,24h24a24,24,0,0,1-24,24H136a8,8,0,0,0,0,16h56a40,40,0,0,0,40-40V128A103.41,103.41,0,0,0,201.89,54.66ZM64,136a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V136Zm128,56a8,8,0,0,1-8-8V144a8,8,0,0,1,8-8h24v56Z"
                    ></path>
                  </svg>
                </div>
                <p>Support</p>
              </Link>
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

