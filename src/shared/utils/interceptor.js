import axios from 'axios';
import { API_ENDPOINTS } from '../config/api-endpoints';

import { store } from '../redux/store/Store';


const instance = axios.create({
  baseURL: API_ENDPOINTS.fintech_backend_url, // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
instance.interceptors.request.use(
 
  async (config) => {
    console.log('store---',store.getState().auth?.data?.access_token);
    const token = store.getState().auth?.data?.access_token;
    console.log('interceptor token--',token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('config---',config);
    return config;
  },
  (error) => {
    console.log('error---',error);
    return Promise.reject(error);
  }
);

  


export default instance;