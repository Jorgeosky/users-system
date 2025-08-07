import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8000/api';

export const createUser = async (data: any, token: string) => {
  return axios.post(`${API_URL}/users/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = async (id: number, data: any, token: string) => {
  return axios.patch(`${API_URL}/users/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = async (id: number, token: string) => {
  return axios.delete(`${API_URL}/users/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
