import React, { useState } from 'react';
import './signUp.scss';

const SignUp = () => {
  const [crewCheck, setCrewCheck] = useState(false);
  // const crewCheckHandler = () => {
  //   if (crewCheck !== false) {
  //     return;
  //   } else {
  //   }
  // };

  return (
    <div className="signUp_containerWrap">
      <form>
        <div className="signUp_email">
          <input type="email" id="email" placeholder="이메일" />
          <button>중복확인</button>
        </div>
        <div className="signUp_id">
          <input type="text" id="text" placeholder="아이디" />
          <button>중복확인</button>
        </div>
        <div className="signUp_pw">
          <input type="password" id="password" placeholder="비밀번호" />
          <input type="password" id="password" placeholder="비밀번호 확인" />
          {/* {crewCheck === true ?  소속팀 : 닉네임} */}
          {crewCheck ? (
            <input type="text" id="text" placeholder="소속팀" />
          ) : (
            <input type="text" id="text" placeholder="닉네임" />
          )}
          {/* {crewCheck && <input type="text" id="text" placeholder="닉네임" /> */}
        </div>
        <div className="signUp_crew">
          <input
            type="checkbox"
            id="crew"
            onChange={e => {
              setCrewCheck(e.target.checked);
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
