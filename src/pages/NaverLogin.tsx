import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getNaverLogin } from '../core/api/login';

const REDIREXT_URL = '';

export const NAVER_AUTH_URL = ``;

const NaverLogin = () => {
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    'code',
  );

  //   useEffect(() => {
  //     if (code) {
  //       getNaverLogin({
  //         code: code,
  //       })
  //         .then(res => {
  //           // console.log(res);
  //           localStorage.setItem('id', res.headers.authorization);
  //           return navigate('/');
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     }
  //   }, [code]);

  //   return <div>네이버 로그인 진행중...!!!</div>;
};

export default NaverLogin;
