import axios from 'axios';
import { instance, baseURL } from '../axios/axios';

export const postShorts = async payload => {
  return await axios.post('http://localhost:4000/shorts', payload);
};

export const updateShorts = async payload => {
  const { id } = payload;
  return await axios.put(`http://localhost:4000/shorts/${id}`, payload);
};

export const getShorts = async () => {
  return await axios.get('http://localhost:4000/shorts');
};

export const deleteShorts = async shortsId => {
  return await axios.delete(`http://localhost:4000/shorts/${shortsId}`);
};

export const getDetailShorts = async payload => {
  const { queryKey } = payload;
  const id = queryKey[1];
  return await axios.get(`http://localhost:4000/shorts/${id}`);
};
