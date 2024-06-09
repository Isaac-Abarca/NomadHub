// src/services/api.js
import axios from 'axios';

const API_URL = 'https://api.example.com';

export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};
