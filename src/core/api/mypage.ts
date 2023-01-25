import sweetAlert from '../utils/sweetAlert';
import { instance, baseURL, subURL } from '../axios/axios';

export const getUserInform = async () => {
  try {
    //shorts카테고리별 게시물조회조회
    return await baseURL.get('/user/mypage');
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};
