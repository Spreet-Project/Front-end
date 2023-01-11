import sweetAlert from '../utils/sweetAlert';
import { instance } from '../axios/axios';
import axios from 'axios';

export const postLogin = async post => {
  try {
    const data = await instance.post('/user/login', post);
    if (data.data.statusCode === 200) {
      sweetAlert(1000, 'success', '로그인 성공');
    }
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '로그인 실패');
  }
};

export const postSignup = async post => {
    const data = await instance.post('/user/signup', post);
    sweetAlert(1000, 'success', '회원가입 성공');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '회원가입 실패');
  }
};

export const postEmailConfirm = async post => {
  try {
    console.log(post, 'axios email 인증 보내기 전');
    const data = await instance.post('/user/email-confirm', post);
    sweetAlert(1000, 'success', '인증번호 전송완료');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '');
  }
};

export const postEmailCheck = async post => {
  try {
    console.log(post, 'axios email 인증확인 보내기 전');
    const data = await instance.post('/user/email-check', post);
    sweetAlert(1000, 'success', '이메일 인증 확인완료');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '');
  }
};

export const postIdCheck = async post => {
  try {
    console.log(post, 'axios 아이디 중복확인 보내기 전');
    const data = await instance.post('/user', post);
    sweetAlert(1000, 'success', '중복확인 완료');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '');
  }
};

export const postNicknameCheck = async post => {
  try {
    console.log(post, 'axios 닉네임 중복확인 보내기 전');
    const data = await instance.post('/user', post);
    sweetAlert(1000, 'success', '중복확인 완료');
    return data;
  } catch (error) {
    sweetAlert(1000, 'error', '');
  }
};

// export const postLogout = async (post) => {
//   try {
//     const data = await instance.post("/api/logout", post);
//     // sweetAlert(1000, "success", "회원가입 성공");
//     return data;
//   } catch (error) {
//     sweetAlert(1000, "error", "로그아웃 실패");
//   }
// };

// export const postSignout = async (post) => {
//   try {
//     const data = await instance.put("/api/withdrawal", post);
//     sweetAlert(1000, "success", "회원탈퇴 성공");
//     return data;
//   } catch (error) {
//     sweetAlert(1000, "error", "로그아웃 실패");
//   }
// };
