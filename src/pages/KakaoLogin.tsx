import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postKakaoLogin } from '../core/api/login';

//설정한 리다이렉트 URL

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=a2347db1ceee37de238b04db40b8bb4e&redirect_uri=https://dev.d2hev55rb01409.amplifyapp.com/api/user/kakao/callback&response_type=code`;

const KakaoLogin = () => {
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    'code',
  );

  useEffect(() => {
    if (code) {
      postKakaoLogin({
        code: code,
      })
        .then(res => {
          console.log(res, 'res');
          localStorage.setItem('nickname', res.data.data.nickname);
          localStorage.setItem('id', res.headers.authorization);
          return navigate('/');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [code]);
  return <div>카카오 로그인 진행중...!</div>;
};

export default KakaoLogin;
