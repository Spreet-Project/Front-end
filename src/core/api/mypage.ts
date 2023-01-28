import sweetAlert from '../utils/sweetAlert';
import { instance, baseURL, subURL } from '../axios/axios';

export const getUserInform = async () => {
  try {
    //shorts카테고리별 게시물조회조회
    return await baseURL.get('/user/mypage');
  } catch (error) {
    if (
      (error.response.request.status === 401,
      error.response.request.status === 500)
    ) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};

//마이페이지 이메일 인증 전송
export const postEmailCheck = async payload => {
  try {
    //Email 인증요청
    return await instance.post(`/user/mypage/send-email?email=${payload}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};

export const putUserNickname = async nickname => {
  try {
    //유저 닉네임 수정
    return await baseURL.put('/user/mypage/edit/nickname', {
      nickname,
    });
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};

export const putUserProfile = async payload => {
  try {
    //유저 프로필 수정
    // console.log(payload, '정보수정');
    // for (const value of payload.values()) {
    //   console.log(value);
    // }
    return await subURL.put('/user/mypage/edit/profile-image', payload);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};

//비밀번호 초기화
export const putRestPassword = async payload => {
  try {
    console.log(payload, '비밀번호 변경');
    return await baseURL.post('/user/reset/password', payload);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};

//닉네임 중복확인
export const postNicknameCheck = async payload => {
  try {
    return await baseURL.post(`/user/nickname-check?nickname=${payload}`);
  } catch (error) {
    sweetAlert(1000, 'error', error.response.data.msg);
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};
