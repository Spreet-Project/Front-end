import sweetAlert from '../utils/sweetAlert';
import { instance, baseURL, subURL } from '../axios/axios';

export const getEvent = async () => {
  //Feed 최신 게시물 조회
  try {
    // console.log(payload, 'payload');
    //event행사 게시물조회조회
    return await instance.get('/event');
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    return error;
  }
};

export const postEventWrite = async payload => {
  console.log(payload);
  const { title, content, location, date, time, file } = payload;
  const evenData = new FormData();
  evenData.append('title', title);
  evenData.append('content', content);
  evenData.append('location', location);
  evenData.append('date', date);
  evenData.append('time', time);
  evenData.append('file', file);
  // for (const value of evenData.values()) {
  //   console.log(value);
  // }
  return await subURL.post('/event', evenData);
};
