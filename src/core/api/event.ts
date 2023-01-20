import sweetAlert from '../utils/sweetAlert';
import { instance, baseURL, subURL } from '../axios/axios';

export const postEventWrite = async payload => {
  for (const value of payload.values()) {
    console.log(value);
  }
  console.log(payload, '확인');
  return await subURL.post('/event', payload);
};
