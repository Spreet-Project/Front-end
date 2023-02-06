import sweetAlert from '../utils/sweetAlert';
import { instance, baseURL, subURL } from '../axios/axios';

export const getUserInform = async () => {
  try {
    //shorts카테고리별 게시물조회조회
    return await baseURL.get('/mypage');
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
    return await baseURL.post(`/mypage/send-email?email=${payload}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};

//마이페이지 이메일 인증 번호 확인
export const postEmailConfirm = async payload => {
  try {
    //Email 인증요청
    return await baseURL.post('/confirm-email', payload);
  } catch (error) {
    console.log(error);
    if (error.response.data.statusCode === 400) {
      sweetAlert(1000, 'error', error.response.data.msg);
    }
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};

export const putUserNickname = async nickname => {
  try {
    //유저 닉네임 수정
    return await baseURL.put('/mypage/edit/nickname', {
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
    return await subURL.put('/mypage/edit/profile-image', payload);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};

//마이페이지에서 비밀번호 초기화
export const putResetPassword = async payload => {
  try {
    return await baseURL.put('/mypage/edit/password', payload);
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

//마이페이지 회원이 작성한 게시글 목록
export const getUserPost = async payload => {
  try {
    // console.log(payload, 'payload');
    const { pageParam = 1, queryKey } = payload;
    const [category] = [queryKey[1]];
    // console.log(category);
    return await baseURL.get(
      `/mypage/post?classification=${category}&page=${pageParam}`,
    );
  } catch (error) {
    sweetAlert(1000, 'error', error.response.data.msg);
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '죄송합니다 로그인해주세요!');
    }
    return error;
  }
};
