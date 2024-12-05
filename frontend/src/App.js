import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <div>
      <Routes>
        {/* Authenticated Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard setAuth={setAuth} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          // Unauthenticated Routes
          <>
            <Route path="/" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register setAuth={setAuth} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
