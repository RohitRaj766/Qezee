import axios from 'axios';

// const baseURL = 'http://localhost:5000'; 

const baseURL = 'https://qezee-server-re.onrender.com';
// Development
// const baseURL = 'https://qezee-server.onrender.com'; 
// Production
// const baseURL = 'https://qezee-server-prod.onrender.com'; 

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
