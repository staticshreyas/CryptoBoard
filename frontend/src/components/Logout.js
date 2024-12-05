import React from 'react';
import { Button } from '@mui/material';

function Logout({ setAuth }) {
  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <Button variant="outlined" color="secondary" onClick={logout} sx={{ ml: 2 }}>
      Logout
    </Button>
  );
}

export default Logout;
