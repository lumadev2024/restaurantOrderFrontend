import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

export const getTables = () => api.get('/tables');
export const createOrder = (tableId) => api.post('/orders', { tableId });
export const addItem = (orderId, item) => api.post(`/orders/${orderId}/items`, item);
export const closeOrder = (orderId) => api.put(`/orders/${orderId}/close`);
