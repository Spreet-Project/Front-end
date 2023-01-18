import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  postEmailCheck,
  postEmailConfirm,
  postIdCheck,
  postNicknameCheck,
  postSignup,
} from '../core/api/login';
import '../assets/styles/scss/signUp.scss';
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
  const [confirmCode, setConfirmCode] = useState();
  const [longinIdCheck, setLoginIdCheck] = useState(false);
  const [emailConfirm, setEmailCofirm] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);

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
    const regIdExp =
      // eslint-disable-next-line
      /^[a-zA-Z]+[a-zA-z0-9]{6,20}$/g;
    // 영문자로 시작하는 영문자 또는 숫자 6~20자
    const result: boolean = regIdExp.test(asValue);
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

  const onSubmitSignUp = e => {
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
    postSignup({
      loginId: loginId,
      nickname: nickname,
      password: password,
      email: email,
      userRole: crewCheck ? 'ROLE_CREW' : 'ROLE_USER',
      //crewCheck가 true라면 ROLE_CREW false라면 ROLE_USER
      // crewCheck === true ? ROLE_CREW : ROLE_USER
    }).then(res => {
      // navigate('/login');
    });
  };

  const onClickIdCheck = e => {
    e.preventDefault();
    postIdCheck({
      loginId: loginId,
    }).then(res => {
      setLoginIdCheck(true);
    });
  };

  // 이일 중복확인 버튼
  const onClickEmailConfirm = e => {
    e.preventDefault();
    postEmailConfirm({
      email: email,
    }).then(res => {
      setEmailCofirm(true);
    });
  };

  // 이메일 인증확인 버튼
  const onClickEmailCheck = e => {
    e.preventDefault();
    postEmailCheck({
      email: email,
      confirmCode: confirmCode,
    }).then(res => {
      setEmailCheck(true);
    });
  };

  // 닉네임 중복확인 버튼
  const onClickNicknameCheck = e => {
    e.preventDefault();
    postNicknameCheck({
      nickname: nickname,
    }).then(res => {
      setNicknameCheck(true);
    });
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

  //닉네임
  const onChangeNickname = e => {
    setNickname(e.target.value);
    const isCheckNickName = is_userNickName(e.target.value);
    isCheckNickName
      ? setIsRegNickNameCheck(true)
      : setIsRegNickNameCheck(false);
  };

  //이메일
  const onChangeEmail = e => {
    setEmail(e.target.value);
    const isCheckEmail = is_userEmail(e.target.value);
    isCheckEmail ? setisRegEmailCheck(true) : setisRegEmailCheck(false);
  };

  //이메일 인증 확인
  const onChangeEmailCheck = e => {
    console.log(onChangeEmailCheck);
    setConfirmCode(e.target.value);
    // const isCheckEmail = is_userEmail(e.target.value);
    // isCheckEmail ? setisRegEmailCheck(true) : setisRegEmailCheck(false);
  };

  //크루
  const onChangeCrewName = e => {
    setCrewName(e.target.value);
    const isCheckCrewName = is_crewName(e.target.value);
    isCheckCrewName ? setIsRegCrewCheck(true) : setIsRegCrewCheck(false);
  };

  return (
    <div className="signUp-containerWrap">
      <form className="signUp-form" onSubmit={onSubmitSignUp}>
        <input
          type="email"
          placeholder="이메일"
          className="signUp-input"
          value={email || ''}
          onChange={onChangeEmail}
        />
        <button
          type="button"
          className="signUp-input-btn"
          onClick={onClickEmailConfirm}
        >
          이메일 인증
        </button>
        {isRegEmailCheck ? null : (
          <p className="signUp-confirm">이메일 형식에 맞지 않습니다.</p>
        )}

        <input
          type="text"
          placeholder="이메일 인증번호 입력"
          className="signUp-input"
          onChange={onChangeEmailCheck}
        />
        <button
          type="button"
          className="signUp-input-btn"
          onClick={onClickEmailCheck}
        >
          확인
        </button>
        {/* <p className="signUp_p">이메일 인증번호를 입력해 주세요.</p> */}
        <input
          type="text"
          placeholder="아이디"
          className="signUp-input"
          value={loginId || ''}
          onChange={onChangeLoginId}
        />
        <button
          type="button"
          className="signUp-input-btn"
          onClick={onClickIdCheck}
        >
          중복확인
        </button>
        {!isRegIdlCheck && (
          <p className="signUp-confirm">
            아이디는 5~20자 영문으로 시작, 영문 숫자로 입력
          </p>
        )}
        <div className="signUp-pw">
          <input
            type="password"
            placeholder="비밀번호"
            className="signUp-inputPw"
            value={password || ''}
            onChange={onChangeRegPassword}
          />
          {!isRegPasswordCheck && (
            <p className="signUp-confirm">
              비밀번호 6~15자, 영문,숫자,특수문자 조합으로 입력해주세요
            </p>
          )}
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="signUp-inputPw"
            value={passwordCheck || ''}
            onChange={onChangeCheckPassword}
          />
          {isPasswordCheck ? null : (
            <p className="signUp-confirm">비밀번호가 일치하지 않습니다.</p>
          )}
          {/* {crewCheck === true ?  소속팀 : 닉네임} */}
          {crewCheck ? (
            <input
              type="text"
              placeholder="소속팀"
              className="signUp-input"
              value={crewName}
              onChange={onChangeCrewName}
            />
          ) : (
            <input
              type="text"
              placeholder="닉네임"
              className="signUp-input"
              value={nickname || ''}
              onChange={onChangeNickname}
            />
          )}
          <button className="signUp-input-btn" onClick={onClickNicknameCheck}>
            중복확인
          </button>
        </div>
        {!crewCheck && !isRegNickNameCheck && (
          <p className="signUp-confirm">
            닉네임 2~10자 알파벳,한글로,숫자로 입력해주세요
          </p>
        )}
        {crewCheck && !isRegCrewCheck && (
          <p className="signUp-confirm">
            크루명은 2~10자 알파벳,한글로,숫자로 입력해주세요
          </p>
        )}
        <div className="signUp-crew">
          <input
            className="signUp-checkbox"
            type="checkbox"
            onChange={e => {
              setCrewCheck(e.target.checked);
              if (crewCheck) {
                setNickname('');
              } else {
                setCrewName('');
              }
            }}
          />
          <label htmlFor="crew" className="signUp-label">
            [선택] 크루 회원입니다.
          </label>
          <p className="signUp-p">
            크루 회원임을 선택할 경우 인증 절차를 통하여 행사 게시물을 작성할 수
            있습니다.
          </p>
        </div>
        <hr className="signUp-hr" />
        <button className="signUp-btn">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
