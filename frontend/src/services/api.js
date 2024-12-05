// import axios from 'axios';

// class APIService {
//   static async getData(endpoint, token) {
//     const response = await axios.get(`/api/v1/data${endpoint}`, {
//       headers: { Authorization: token },
//     });
//     return response.data;
//   }

//   static async postData(endpoint, data, token) {
//     const response = await axios.post(`/api/v1/data${endpoint}`, data, {
//       headers: { Authorization: token },
//     });
//     return response.data;
//   }
// }

// export default APIService;

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
