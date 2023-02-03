import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNaverLogin } from '../core/api/login';
import sweetAlert from '../core/utils/sweetAlert';

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=eF_JzIGRrOBli_bLicf5&redirect_uri=https://www.spreet.co.kr/api/user/naver/callback&state=hello`;
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
      }).then(res => {
        if (!res || res.name === 'AxiosError') {
          sweetAlert(1000, 'error', '네이버 로그인 실패');
          return navigate('/login');
        }
        localStorage.setItem('nickname', res.data.data.nickname);
        localStorage.setItem('id', res.headers.authorization);
        return navigate('/');
      });
    }
  }, [code, state]);

  return <div>네이버 로그인 진행중...!</div>;
};

export default NaverLogin;
