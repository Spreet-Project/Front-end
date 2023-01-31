import sweetAlert from '../utils/sweetAlert';
import { instance, baseURL, subURL } from '../axios/axios';

export const getCrewList = async () => {
  //크루 요청 리스트 조회
  try {
    return await baseURL.get('/admin/crew/list');
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    return error;
  }
};

//크루 요청 승인
export const putCrewAccess = async userId => {
  try {
    return await baseURL.put(`/admin/approve/${userId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '댓글 수정 중 오류!');
    return error;
  }
};

//크루 요청 승인
export const putCrewReject = async userId => {
  try {
    return await baseURL.put(`/admin/reject/${userId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '댓글 수정 중 오류!');
    return error;
  }
};
