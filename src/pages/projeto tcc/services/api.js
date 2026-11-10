import axios from 'axios';

// Endereço da API (precisa ser igual ao PORT do .env da API)
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Depois do login, o token fica guardado no navegador e é enviado em todos os pedidos
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default api;
