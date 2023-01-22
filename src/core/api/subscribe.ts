import { instance, baseURL, subURL } from '../axios/axios';
import sweetAlert from '../utils/sweetAlert';

//구독
export const postSubscribe = async userId => {
  try {
    console.log(userId, 'userId');
    return await baseURL.post(`/shorts/${userId}`);
  } catch (error) {
    sweetAlert(1000, 'error', '구독중 에러');
  }
};

//구독 취소
export const deleteSubscribe = async userId => {
  try {
    console.log(userId, 'userId');
    return await baseURL.post(`/shorts/${userId}`);
  } catch (error) {
    sweetAlert(1000, 'error', '구독 취소중 에러');
  }
};

//구독 읽지 않은 알림 조회
export const getSubscribe = async () => {
  try {
    return await baseURL.get('/alerts');
  } catch (error) {
    sweetAlert(1000, 'error', '구독 알림조회중 에러');
  }
};

//구독 알림확인
export const postCheckSubscribe = async alertId => {
  try {
    return await baseURL.get(`/alert/${alertId}`);
  } catch (error) {
    sweetAlert(1000, 'error', '구독 알림확인중 에러');
  }
};
