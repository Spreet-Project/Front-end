import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/myPage.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import sweetAlert from '../core/utils/sweetAlert';
import {
  postEmailConfirm,
  putResetPassword,
  postResetPasswordEmail,
} from '../core/api/login';
const FindPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const [isCheckEmail, setIsCheckEmail] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);
  const [isRegPasswordCheck, setIsRegPasswordCheck] = useState<boolean>(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState<boolean>(false);
  const [confirmCode, setConfirmCode] = useState<string>('');
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);

  const onChangeRegPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const isChecRegPassword = is_userRegPassword(e.target.value);
    isChecRegPassword
      ? setIsRegPasswordCheck(true)
      : setIsRegPasswordCheck(false);
  };

  const onChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    if (password === e.target.value) {
      setIsPasswordCheck(true);
    } else {
      setIsPasswordCheck(false);
    }
  };

  const onChangeUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const onCheckEmail = () => {
    if (isEmailConfirm)
      return sweetAlert(1000, 'error', '이미 중복확인 처리되었습니다.');
    if (isEmailLoading) {
      return sweetAlert(1000, 'error', '이메일 인증 번호를 보내는 중 입니다.');
    }
    setIsEmailLoading(true);
    postResetPasswordEmail(userEmail).then(res => {
      setIsEmailLoading(false);
      if (!res) {
        return sweetAlert(1000, 'error', res.data.msg);
      }
      if (res.data.statusCode === 200) {
        sweetAlert(1000, 'success', res.data.msg);
        setIsCheckEmail(true);
      }
    });
  };

  const onChangeConfirmCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmCode(e.target.value);
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

  const onConfirmEmail = () => {
    if (isEmailConfirm)
      return sweetAlert(1000, 'error', '이미 중복확인 처리되었습니다.');

    postEmailConfirm({
      email: userEmail,
      confirmCode: confirmCode,
    }).then(res => {
      if (!res) return;
      if (res.name === 'AxiosError') return;
      sweetAlert(1000, 'success', '인증 확인되었습니다.');
      setIsEmailConfirm(true);
    });
  };

  const onResetPassword = () => {
    if (!isRegPasswordCheck) {
      return sweetAlert(1000, 'error', '비밀번호를 확인해주세요');
    }
    if (!isRegPasswordCheck) {
      return sweetAlert(1000, 'error', '형식에 맞는 비밀번호를 입력해주세요');
    }
    if (!passwordCheck) {
      return sweetAlert(1000, 'error', '비밀번호가 일치하지 않습니다.');
    }

    putResetPassword({
      email: userEmail,
      password,
      emailConfirm: isEmailConfirm,
    }).then(res => {
      // console.log(res, '비밀번호 초기화 결과');
      if (!res) {
        return sweetAlert(1000, 'error', res.data.msg);
      }
      sweetAlert(1000, 'success', '비밀번호 초기화 성공');
      navigate('/login');
    });
  };

  return (
    <div className="changepassword-form">
      <p className="mypage-title">비밀번호 변경</p>

      <div className="changepassword-inner">
        <p className="changepassword-label">이메일</p>
        <div>
          <input
            type="text"
            placeholder="이메일"
            className="changepassword-input"
            value={userEmail}
            onChange={onChangeUserEmail}
          />
          <button className="changepassword-btn" onClick={onCheckEmail}>
            인증 요청
          </button>
        </div>
        {isCheckEmail && (
          <div>
            <p className="changepassword-label">인증 번호</p>
            <input
              type="text"
              placeholder="인증 번호"
              className="changepassword-input"
              value={confirmCode}
              readOnly
              style={{ background: 'darkgray' }}
              onChange={onChangeConfirmCode}
            />
            <button className="changepassword-btn" onClick={onConfirmEmail}>
              확인
            </button>
          </div>
        )}

        <p className="changepassword-label">새로운 비밀번호</p>
        <input
          type="password"
          placeholder="새로운 비밀번호"
          className="changepassword-input"
          value={password}
          onChange={onChangeRegPassword}
        />
        {!isRegPasswordCheck && (
          <p className="changepassword-confirm">
            비밀번호 6~15자, 영문,숫자,특수문자 조합으로 입력해주세요
          </p>
        )}

        <p className="changepassword-label">비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="changepassword-input"
          value={passwordCheck}
          onChange={onChangeCheckPassword}
        />
        {isPasswordCheck ? null : (
          <p className="changepassword-confirm">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
      </div>
      <hr className="changepassword-hr" />
      <button className="changepassword-btn__modify" onClick={onResetPassword}>
        비밀번호 변경
      </button>
    </div>
  );
};

export default FindPassword;
