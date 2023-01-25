import React from 'react';
import '../assets/styles/scss/crewInform.scss';

const CrewInform = () => {
  return (
    <div>
      <div className="crewInform-sidebar">
        <div className="crewInform-category">
          <ul>
            <li>회원정보 수정</li>
            <li>작성한 게시글</li>
          </ul>
        </div>
      </div>
      <form>
        <p>회원정보 수정</p>
        <input placeholder="아이디" />
        <input placeholder="닉네임" />
        <div>
          <input placeholder="이메일" />
          <button>인증요청</button>
        </div>
        <button>수정</button>
        <hr />
        <button>회원탈퇴</button>
      </form>
    </div>
  );
};

export default CrewInform;
