import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNaverLogin } from '../core/api/login';

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=eF_JzIGRrOBli_bLicf5&redirect_uri=http://localhost:3000/api/user/naver/callback&state=hello`;
// Math.random().toString(36).substring(3, 14);

const NaverLogin = () => {
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    'code',
  );

  const state: string | null = new URL(window.location.href).searchParams.get(
    'state',
  );

  useEffect(() => {
    if (code && state) {
      getNaverLogin({
        code: code,
        state: state,
      })
        .then(res => {
          // console.log(res);
          localStorage.setItem('id', res.headers.authorization);
          // return navigate('/');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [code, state]);

  return <div>네이버 로그인 진행중...!</div>;
};

export default NaverLogin;
