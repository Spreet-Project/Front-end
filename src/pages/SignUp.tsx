import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../core/api/login';
import './signUp.scss';
import sweetAlert from '../core/utils/sweetAlert';
const SignUp = () => {
  const [loginId, setLoginId] = useState();
  const [nickname, setNickname] = useState<any>();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [email, setEmail] = useState();
  const [crewCheck, setCrewCheck] = useState(false);
  const [crewName, setCrewName] = useState<any>();
  const [isRegIdlCheck, setIsRegIdCheck] = useState(false);
  const [isRegEmailCheck, setisRegEmailCheck] = useState(false);
  const [isRegNickNameCheck, setIsRegNickNameCheck] = useState(false);
  const [isRegPasswordCheck, setIsRegPasswordCheck] = useState(false);
  const [isRegCrewCheck, setIsRegCrewCheck] = useState(false);

  const navigate = useNavigate();

  const is_userEmail = asValue => {
    const regIdExp =
      // eslint-disable-next-line
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 아이디는 최소 4자 이상, 15자 이하 알파벳 대소문자(a-z, A-Z), 숫자(0-9)로 구성됩니다.
    //  이메일 형식으로 되어 반드시 @와. 이 들어간 완성된 이메일 형식으로 되어야 한다.
    const result: boolean = regIdExp.test(asValue);
    // console.log(result);
    return result;
  };

  const is_userId = asValue => {
    const blankExp = /[\s]/g;
    if (blankExp.test(asValue)) {
      return sweetAlert(1000, 'error', '공백을 제거해주세요');
    }
    console.log(asValue);
    const regIdExp =
      // eslint-disable-next-line
      /^[a-z]+[a-z0-9]{6,20}$/g;
    // 영문자로 시작하는 영문자 또는 숫자 6~20자
    const result: boolean = regIdExp.test(asValue);
    console.log(result);
    return result;
  };

  const is_userNickName = asValue => {
    const blankExp = /[\s]/g;
    if (blankExp.test(asValue)) {
      return sweetAlert(1000, 'error', '공백을 제거해주세요');
    }
    if (Number(asValue)) {
      return sweetAlert(
        2000,
        'error',
        '알파벳,한글로 시작하는 닉넴임을 입력해주세요',
      );
    }
    const regIdExp =
      // eslint-disable-next-line
      /^[a-zA-Zㄱ-힣]+[a-zA-Zㄱ-힣0-9]{2,10}$/g;
    // 닉네임 2~10 자 알파벳, 한글, 숫자 가능
    const result: boolean = regIdExp.test(asValue);
    return result;
  };

  const is_crewName = asValue => {
    const blankExp = /[\s]/g;
    if (blankExp.test(asValue)) {
      return sweetAlert(1000, 'error', '공백을 제거해주세요');
    }
    if (Number(asValue)) {
      return sweetAlert(
        2000,
        'error',
        '알파벳,한글로 시작하는 크루이름을 입력해주세요',
      );
    }
    const regIdExp =
      // eslint-disable-next-line
      /^[a-zA-Zㄱ-힣]+[a-zA-Zㄱ-힣0-9]{2,10}$/g;
    // 크루명은 2~10 자 알파벳, 한글, 숫자 가능
    const result: boolean = regIdExp.test(asValue);
    return result;
  };

  const is_userRegPassword = asValue => {
    const blankExp = /[\s]/g;
    if (blankExp.test(asValue)) {
      return sweetAlert(1000, 'error', '공백을 제거해주세요');
    }
    const regIdExp =
      // eslint-disable-next-line
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{6,15}$/;
    // 비밀번호 6자이상 15자 이하, 알파벳,숫자,특수문자 최소 한가지씩 조합
    const result: boolean = regIdExp.test(asValue);
    return result;
  };

  const onClickSignUp = e => {
    e.preventDefault();
    if (!isRegEmailCheck) {
      return sweetAlert(1000, 'error', '이메일을 확인해주세요');
    }
    if (!isRegIdlCheck) {
      return sweetAlert(1000, 'error', '아이디를 확인해주세요');
    }
    if (!isRegPasswordCheck) {
      return sweetAlert(1000, 'error', '비밀번호를 확인해주세요');
    }
    if (!isPasswordCheck) {
      return sweetAlert(
        1000,
        'error',
        '비밀번호 확인 창의 비밀번호를 확인해주세요.',
      );
    }
    if (crewCheck) {
      if (!isRegCrewCheck) {
        return sweetAlert(1000, 'error', '크루명을 확인해주세요');
      }
    } else {
      if (!isRegNickNameCheck) {
        return sweetAlert(1000, 'error', '닉네임을 확인해주세요');
      }
    }
    sweetAlert(1000, 'success', '회원가입 완료');
    // postSignup({
    //   loginId: loginId,
    //   nickname: nickname,
    //   password: password,
    //   email: email,
    //   crewCheck: crewCheck,
    // }).then(res => {
    //   // navigate('/login');
    // });
  };

  const onChangeLoginId = e => {
    setLoginId(e.target.value);
    const isCheckId = is_userId(e.target.value);
    isCheckId ? setIsRegIdCheck(true) : setIsRegIdCheck(false);
  };

  //비밀번호
  const onChangeRegPassword = e => {
    setPassword(e.target.value);
    const isChecRegPassword = is_userRegPassword(e.target.value);
    isChecRegPassword
      ? setIsRegPasswordCheck(true)
      : setIsRegPasswordCheck(false);
  };

  //비밀번호 확인
  const onChangeCheckPassword = e => {
    setPasswordCheck(e.target.value);
    if (password === e.target.value) {
      setIsPasswordCheck(true);
    } else {
      setIsPasswordCheck(false);
    }
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
    const isCheckNickName = is_userNickName(e.target.value);
    isCheckNickName
      ? setIsRegNickNameCheck(true)
      : setIsRegNickNameCheck(false);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
    const isCheckEmail = is_userEmail(e.target.value);
    isCheckEmail ? setisRegEmailCheck(true) : setisRegEmailCheck(false);
  };

  const onChangeCrewName = e => {
    setCrewName(e.target.calue);
    const isCheckCrewName = is_crewName(e.target.value);
    isCheckCrewName ? setIsRegCrewCheck(true) : setIsRegCrewCheck(false);
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
          {isRegEmailCheck ? null : <p>이메일 형식에 맞지 않습니다.</p>}
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
          {!isRegIdlCheck && (
            <p>아이디는 5~20자 영문으로 시작, 영문 숫자로 입력</p>
          )}
        </div>
        <div className="signUp_pw">
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password || ''}
            onChange={onChangeRegPassword}
          />
          {!isRegPasswordCheck && (
            <p>비밀번호 6~15자, 영문,숫자,특수문자 조합으로 입력해주세요</p>
          )}
          <input
            type="password"
            id="password"
            placeholder="비밀번호 확인"
            value={passwordCheck || ''}
            onChange={onChangeCheckPassword}
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
              value={nickname || ''}
              onChange={onChangeNickname}
            />
          )}
          {!crewCheck && !isRegNickNameCheck && (
            <p>닉네임 2~10자 알파벳,한글로,숫자로 입력해주세요</p>
          )}
          {crewCheck && !isRegCrewCheck && (
            <p>크루명은 2~10자 알파벳,한글로,숫자로 입력해주세요</p>
          )}
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
      <button className="signUp_btn" onClick={onClickSignUp}>
        회원가입
      </button>
    </div>
  );
};

export default SignUp;
