import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import APIService from '../services/api';
import { TextField, Button, Card, Typography, Snackbar } from '@mui/material';

function Login({ setAuth }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alertMessage, setAlertMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await APIService.postData('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuth(true);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data || 'Login Error';
      setAlertMessage(errorMessage);
      setOpenSnackbar(true);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: '10%', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={alertMessage}
      />
    </Card>
  );
}

export default Login;
