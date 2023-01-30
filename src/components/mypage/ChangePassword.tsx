import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sweetAlert from '../../core/utils/sweetAlert';
import { postEmailCheck, putRestPassword } from '../../core/api/mypage';

const ChangePassword = ({ userEmail }): JSX.Element => {
  const [isCheckEmail, setIsCheckEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);
  const [isRegPasswordCheck, setIsRegPasswordCheck] = useState<boolean>(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState<boolean>(false);

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

  const onCheckEmail = () => {
    postEmailCheck(userEmail).then(res => {
      if (!res) {
        return sweetAlert(1000, 'error', '이메일 인증 요청 오류');
      }
      if (res.data.statusCode === 200) {
        sweetAlert(1000, 'success', res.data.msg);
      }
    });
    setIsCheckEmail(true);
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
    // postEmailConfirm({
    //   email: email,
    //   confirmCode: confirmCode,
    // }).then(res => {
    //   if (!res) return;
    //   setEmailCofirm(true);
    // });
  };

  const onResetPassword = () => {
    if (!isRegPasswordCheck) {
      return sweetAlert(1000, 'error', '비밀번호를 확인해주세요');
    }
    if (!isRegPasswordCheck) {
      return sweetAlert(1000, 'error', '형식에 맞는 비밀번호를 입력해주세요');
    }

    putRestPassword({ password }).then(res => {
      console.log(res, '비밀번호 초기화 결과');
    });
  };

  return (
    <div className="findpasword-form">
      <p className="mypage-title">비밀번호 변경</p>

      <div className="findpasword-inner">
        <p className="findpasword-label">이메일</p>
        <div>
          <input
            type="text"
            placeholder="이메일"
            readOnly
            className="findpasword-input user-email"
            value={userEmail}
          />
          <button className="findpasword-btn" onClick={onCheckEmail}>
            인증 요청
          </button>
        </div>
        {isCheckEmail && (
          <div>
            <p className="findpasword-label">인증 번호</p>
            <input
              type="text"
              placeholder="인증 번호"
              className="findpasword-input"
            />
            <button className="findpasword-btn" onClick={onConfirmEmail}>
              확인
            </button>
          </div>
        )}

        <p className="findpasword-label">새로운 비밀번호</p>
        <input
          type="password"
          placeholder="새로운 비밀번호"
          className="findpasword-input"
          value={password}
          onChange={onChangeRegPassword}
        />
        {!isRegPasswordCheck && (
          <p className="findpassword-confirm">
            비밀번호 6~15자, 영문,숫자,특수문자 조합으로 입력해주세요
          </p>
        )}

        <p className="findpasword-label">비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="findpasword-input"
          value={passwordCheck}
          onChange={onChangeCheckPassword}
        />
        {isPasswordCheck ? null : (
          <p className="findpassword-confirm">비밀번호가 일치하지 않습니다.</p>
        )}
      </div>

      <button className="findpasword-btn__modify" onClick={onResetPassword}>
        비밀번호 변경
      </button>
    </div>
  );
};

export default ChangePassword;
