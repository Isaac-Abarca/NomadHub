// src/pages/Overview.jsx

import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/Overview.css';

const Overview = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Bookings',
        data: [3, 2, 2, 1, 5, 4],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
  };

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h2>Overview</h2>
      </div>
      <div className="overview-stats">
        <div className="stat-box">
          <p>$1,500</p>
          <p className="stat-label">Earnings</p>
          <p className="stat-change">+25%</p>
        </div>
        <div className="stat-box">
          <p>50</p>
          <p className="stat-label">Bookings</p>
          <p className="stat-change">+10%</p>
        </div>
        <div className="stat-box">
          <p>20</p>
          <p className="stat-label">Listings</p>
          <p className="stat-change">+5%</p>
        </div>
      </div>
      <div className="overview-chart">
        <h3>Activity</h3>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Overview;


  