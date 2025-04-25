import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientDashboard from './components/ClientDashboard';
import SalonDashboard from './components/SalonDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    fetch('/api/salons')
      .then(response => response.json())
      .then(data => setSalons(data))
      .catch(error => console.error('Error fetching salons:', error));
  }, []);

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/client">Client Dashboard</Link>
            </li>
            <li>
              <Link to="/salon">Salon Dashboard</Link>
            </li>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/salons">Salons</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/salon" element={<SalonDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/salons" element={
              <div>
                <h2>Salons</h2>
                <ul>
                  {salons.map(salon => (
                    <li key={salon._id}>
                      <h3>{salon.name}</h3>
                      <p>City: {salon.city}</p>
                      <p>Rating: {salon.rating}</p>
                    </li>
                  ))}
                </ul>
              </div>
            } />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;