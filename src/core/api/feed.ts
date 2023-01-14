import axios from 'axios';
import { instance, baseURL, subURL } from '../axios/axios';

export const postEventWrite = async payload => {
  console.log(payload);
  return await subURL.post('/eventWrite', payload);
};
