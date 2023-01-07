import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../core/api/login';
import './signUp.scss';

const SignUp = () => {
  const [loginId, setLoginId] = useState();
  const [nickname, setNickname] = useState<any>();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [email, setEmail] = useState();
  const [crewCheck, setCrewCheck] = useState(false);
  const [crewName, setCrewName] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    if (passwordCheck === password) {
      setIsPasswordCheck(true);
    } else {
      setIsPasswordCheck(false);
    }
  }, [passwordCheck]);

  const onClickSignUp = e => {
    e.preventDefault();

    postSignup({
      loginId: loginId,
      nickname: nickname,
      password: password,
      email: email,
      crewCheck: crewCheck,
    }).then(res => {
      // navigate('/login');
    });
  };

  const onChangeLoginId = e => {
    setLoginId(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.taget.value);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePasswordCheck = e => {
    setPasswordCheck(e.target.value);
    console.log(password);
    console.log(passwordCheck);

    // if (passwordCheck === password) {
    //   setIsPasswordCheck(true);
    //   console.log(isPasswordCheck);
    // } else {
    //   setIsPasswordCheck(false);
    // }
  };

  const onChangeCrewName = e => {
    setCrewName(e.target.calue);
  };

  return (
    <div className="signUp_containerWrap">
      <form onSubmit={onClickSignUp}>
        <div className="signUp_email">
          <input
            type="email"
            id="email"
            placeholder="이메일"
            value={email || ''}
            onChange={onChangeEmail}
          />
          <button>이메일 인증</button>
        </div>
        <div className="signUp_id">
          <input
            type="text"
            id="text"
            placeholder="아이디"
            value={loginId || ''}
            onChange={onChangeLoginId}
          />
          <button>중복확인</button>
        </div>
        <div className="signUp_pw">
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password || ''}
            onChange={onChangePassword}
          />
          <input
            type="password"
            id="password"
            placeholder="비밀번호 확인"
            value={passwordCheck || ''}
            onChange={onChangePasswordCheck}
          />
          {isPasswordCheck ? null : <p>비밀번호가 일치하지 않습니다.</p>}
          {/* {crewCheck === true ?  소속팀 : 닉네임} */}
          {crewCheck ? (
            <input
              type="text"
              id="text"
              placeholder="소속팀"
              value={crewName}
              onChange={onChangeCrewName}
            />
          ) : (
            <input
              type="text"
              id="text"
              placeholder="닉네임"
              value={nickname}
              onChange={onChangeNickname}
            />
          )}
          {/* {crewCheck && <input type="text" id="text" placeholder="닉네임" /> */}
        </div>
        <div className="signUp_crew">
          <input
            type="checkbox"
            id="crew"
            onChange={e => {
              setCrewCheck(e.target.checked);
              if (crewCheck) {
                setNickname('');
              } else {
                setCrewName('');
              }
            }}
          />
          <label htmlFor="crew" className="signUp_label">
            [선택] 크루 회원입니다.
          </label>
          <p className="signUp_p">
            크루 회원임을 선택할 경우 인증 절차를 통하여 크루 회원 확인 시 행사
            게시물을 작성할 수 있습니다.
          </p>
        </div>
      </form>
      <hr />
      <button className="signUp_btn">회원가입</button>
    </div>
  );
};

export default SignUp;
