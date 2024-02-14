
// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.163.17.53:8080/NIC-support-mail/api/issues',
});

// Add an interceptor to include withCredentials for all requests
instance.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});

export default instance;
