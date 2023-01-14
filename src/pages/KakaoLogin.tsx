import React, { useEffect } from 'react';
import { getKakaoLogin } from '../core/api/login';

//설정한 리다이렉트 URL
const REDIRECT_URL = 'http://localhost:3000/api/user/kakao/callback';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=a2347db1ceee37de238b04db40b8bb4e&redirect_uri=http://localhost:3000/api/user/kakao/callback&response_type=code`;

const setAccessToken = (accessToken: any) => {
  localStorage.setItem('isLogin', accessToken);
};
const KakaoLogin = () => {
  const code: string | null = new URL(window.location.href).searchParams.get(
    'code',
  );
  console.log(code);

  // useEffect(() => {
  //   if (code) {
  //     getKakaoLogin({
  //       code: code,
  //     }).then(res => {
  //       const cookieData = document.cookie;
  //       console.log(cookieData, '카카오');
  //     });
  //   }
  // });
  return <div>카카오 로그인 진행중....!!!!!!!!</div>;
};

export default KakaoLogin;
