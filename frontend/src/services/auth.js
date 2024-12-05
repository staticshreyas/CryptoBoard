import axios from 'axios';

class AuthService {
  static async login(credentials) {
    const response = await axios.post('/api/v1/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.token;
  }

  static validateToken(token) {
    return token && token.length > 0;
  }
}

export default AuthService;
