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
  try {
    console.log(payload);
    return await subURL.post('/event', payload);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
  }
};

export const getDetailEvent = async payload => {
  try {
    //객체 구조 분해 할당
    const { queryKey } = payload;
    //배열 구조 분해 할당
    const [eventId] = [queryKey[1]];
    console.log(eventId);
    return await subURL.get(`/event/${eventId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
  }
};
