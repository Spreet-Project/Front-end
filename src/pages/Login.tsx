import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../core/api/login';
import '../assets/styles/scss/login.scss';
import sweetAlert from '../core/utils/sweetAlert';

const Login = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onClickLogin = e => {
    e.preventDefault();
    const blankExp = /[\s]/g;
    if (!blankExp.test(loginId) && loginId.length === 0) {
      return sweetAlert(1000, 'error', '아이디를 입력해주세요');
    }
    if (!blankExp.test(password) && password.length === 0) {
      return sweetAlert(1000, 'error', '비밀번호를 입력해주세요');
    }

    postLogin({
      loginId: loginId,
      password: password,
    }).then(res => {
      // console.log(res);
      if (!res) {
        return sweetAlert(1000, 'error', '로그인 실패');
      }
      localStorage.setItem('nickname', res.data.data.nickname);
      localStorage.setItem('id', res.headers.authorization);
      localStorage.setItem('userRole', res.data.data.userRole);
      navigate('/');
    });
  };

  const onChangeLoginId = e => {
    setLoginId(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  return (
    <div className="login-containerWrap">
      <form className="login-form" onSubmit={onClickLogin}>
        <input
          type="text"
          id="userId"
          placeholder="아이디"
          value={loginId || ''}
          onChange={onChangeLoginId}
        />
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          value={password || ''}
          onChange={onChangePassword}
        />

        <button className="login-btn" onClick={onClickLogin}>
          로그인
        </button>
        <p
          className="login-findPassword"
          onClick={() => {
            navigate('/findpassword');
          }}
        >
          비밀번호를 잊었나요?
        </p>
        <hr className="login-hr" />
        <div>
          <button
            className="login-signup-btn"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </button>
        </div>
        <div className="login-social-btn">
          <button
            className="login-naver"
            onClick={e => {
              e.preventDefault();
              window.location.href =
                'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=eF_JzIGRrOBli_bLicf5&redirect_uri=https://www.spreet.co.kr/api/user/naver/callback&state=hello';
            }}
          ></button>
          <button
            className="login-kakao"
            onClick={e => {
              e.preventDefault();
              window.location.href =
                'https://kauth.kakao.com/oauth/authorize?client_id=a2347db1ceee37de238b04db40b8bb4e&redirect_uri=https://www.spreet.co.kr/api/user/kakao/callback&response_type=code';
            }}
          ></button>
        </div>
      </form>
    </div>
  );
};

export default Login;
