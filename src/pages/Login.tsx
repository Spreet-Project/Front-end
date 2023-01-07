import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../core/api/login';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();

  const onClickLogin = e => {
    e.preventDefault();
    // postLogin({
    //   loginId: loginId,
    //   password: password,
    // }).then(res => {
    //   localStorage.setItem('id', res.headers.authorization);
    //   navigate('/');
    // });
  };

  const onChangeLoginId = e => {
    setLoginId(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  return (
    <div className="login_containerWrap">
      <form onSubmit={onClickLogin}>
        <div className="login_form_input">
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
        </div>
        <button className="login_btn">로그인</button>
      </form>
      <hr />
      <div className="login_social_btn">
        <button onClick={() => navigate('/signup')}>회원가입</button>
        <button>네이버 로그인</button>
        <button>카카오 로그인</button>
      </div>
    </div>
  );
};

export default Login;
