import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://5cc9-203-192-220-137.ngrok-free.app/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials : true
  
});

export default axiosInstance;
