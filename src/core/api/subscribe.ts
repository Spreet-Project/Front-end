import { instance, baseURL, subURL } from '../axios/axios';
import sweetAlert from '../utils/sweetAlert';

//구독
export const postSubscribe = async nickname => {
  try {
    console.log(nickname, 'userNickname');
    return await baseURL.post('/subscribe', { nickname });
  } catch (error) {
    console.log(error);
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '구독중 에러');
  }
};

//구독 취소
export const deleteSubscribe = async userId => {
  try {
    console.log(userId, 'userId');
    return await baseURL.post(`/subscribe/${userId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '죄송합니다 다시 로그인 해주세요!');
    }
    sweetAlert(1000, 'error', '구독 취소중 에러');
  }
};

//구독 읽지 않은 알림 조회
export const getSubscribe = async () => {
  try {
    return await baseURL.get('/alarm');
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '죄송합니다 다시 로그인 해주세요!');
    }
    sweetAlert(1000, 'error', '구독 알림조회중 에러');
  }
};

//구독 알림확인
export const postCheckSubscribe = async alertId => {
  try {
    return await baseURL.post(`/alarm/${alertId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '죄송합니다 다시 로그인 해주세요!');
    }
    sweetAlert(1000, 'error', '구독 알림확인중 에러');
  }
};
