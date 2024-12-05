import React, { useState, useEffect } from 'react';
import APIService from '../services/api';

function Alert() {
  const [alerts, setAlerts] = useState([]);
  const [alertSettings, setAlertSettings] = useState({});

  const createAlert = async () => {
    try {
      const token = localStorage.getItem('token');
      await APIService.postData('/alerts', alertSettings, token);
      alert('Alert created successfully.');
      fetchAlerts();
    } catch (error) {
      alert('Error creating alert.');
    }
  };

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await APIService.getData('/alerts', token);
      setAlerts(data);
    } catch (error) {
      alert('Error fetching alerts.');
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div>
      <h2>Manage Alerts</h2>
      <input
        type="text"
        placeholder="Crypto Name"
        onChange={(e) => setAlertSettings({ ...alertSettings, cryptoName: e.target.value })}
      />
      <input
        type="number"
        placeholder="Threshold"
        onChange={(e) => setAlertSettings({ ...alertSettings, threshold: e.target.value })}
      />
      <button onClick={createAlert}>Set Alert</button>
      <h3>Existing Alerts</h3>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            {alert.cryptoName}: {alert.threshold}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alert;
