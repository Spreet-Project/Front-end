import sweetAlert from '../utils/sweetAlert';
import { instance } from '../axios/axios';

export const postLogin = async post => {
  try {
    const data = await instance.post('/user/login', post);
    if (data.data.statusCode === 200) {
      sweetAlert(1000, 'success', '로그인 성공');
    }
    return data;
  } catch (error) {
    if (error.response.data.msg === '크루회원 승인 대기 중입니다.') {
      sweetAlert(1000, 'error', '크루회원 승인 대기 중입니다.');
    }
  }
};

export const postSignup = async post => {
  try {
    // console.log(post);
    const data = await instance.post('/user/signup', post);
    sweetAlert(1000, 'success', '회원가입 성공');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '회원가입 실패');
    return error;
  }
};

export const postEmailCheck = async post => {
  try {
    console.log(post, 'axios email 인증확인 보내기 전');
    const data = await instance.post(`/user/send-email?email=${post.email}`);
    sweetAlert(1000, 'success', '이메일 인증 확인완료');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '이메일 인증 에러');
    return error;
  }
};

export const postEmailConfirm = async post => {
  try {
    const data = await instance.post('/confirm-email', post);
    sweetAlert(1000, 'success', '인증번호 전송완료');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '인증 에러');
    return error;
  }
};

export const postIdCheck = async post => {
  try {
    // console.log(post, 'axios 아이디 중복확인 보내기 전');
    const data = await instance.post(`/user/id-check?loginId=${post.loginId}`);
    sweetAlert(1000, 'success', '중복확인 완료');
    return data;
  } catch (error) {
    sweetAlert(2000, 'error', error.response.data.msg);
  }
};

export const postNicknameCheck = async post => {
  try {
    // console.log(post, 'axios 닉네임 중복확인 보내기 전');
    const data = await instance.post(
      `/user/nickname-check?nickname=${post.nickname}`,
    );
    sweetAlert(1000, 'success', '중복확인 완료');
    return data;
  } catch (error) {
    sweetAlert(2000, 'error', error.response.data.msg);
  }
};

export const postKakaoLogin = async code => {
  try {
    // console.log(code, 'axios code 확인');
    const data = await instance.get(`/user/kakao/callback?code=${code.code}`);
    sweetAlert(1000, 'success', '카카오 로그인 완료');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '카카오 로그인 실패');
    return error;
  }
};

export const getNaverLogin = async code => {
  try {
    // console.log(code, 'axios code 확인');
    const data = await instance.get(
      `/user/naver/callback?code=${code.code}&state=${code.state}`,
    );
    sweetAlert(1000, 'success', '네이버 로그인 완료');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '네이버 로그인 실패');
    return error;
  }
};

//비밀번호 재발급을 위한 이메일 인증 요청
export const postResetPasswordEmail = async payalod => {
  try {
    // console.log(payalod, 'axios code 확인');
    const data = await instance.post(
      `/user/reset-password/send-email?email=${payalod}`,
    );
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', error.response.data.msg);
  }
};

//비밀번호 재발급
export const putResetPassword = async payalod => {
  try {
    // console.log(payalod, 'axios code 확인');
    const data = await instance.put('/user/reset-password', payalod);
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', error.response.data.msg);
    return error;
  }
};

// export const postSignout = async (post) => {
//   try {
//     const data = await instance.put("/api/withdrawal", post);
//     sweetAlert(1000, "success", "회원탈퇴 성공");
//     return data;
//   } catch (error) {
//     sweetAlert(1000, "error", "로그아웃 실패");
//   }
// };
