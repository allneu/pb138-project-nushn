import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true,
});

export default axiosInstance;
