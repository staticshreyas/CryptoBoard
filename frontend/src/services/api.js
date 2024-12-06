import axios from 'axios';

const APIService = {
  getData: async (url, token) => {
    const response = await axios.get(`/api/v1/data${url}`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  },
  postData: async (url, data) => {
    const response = await axios.post(`/api/v1${url}`, data);
    return response.data;
  },
};

export default APIService;
