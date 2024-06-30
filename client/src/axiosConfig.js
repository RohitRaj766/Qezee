import axios from 'axios';


const baseURL = 'http://localhost:5000'; 
// const baseURL = process.env.BASE_URL; 
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;