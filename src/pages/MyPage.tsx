import React, { useState } from 'react';
import '../assets/styles/scss/myPage.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

const MyPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [logIn, setLogIn] = useState(false);
  const [password, setPassword] = useState(false);

  // const { isLoading, isError, data, error, isFetching } = useQuery(
  //   [], // 쿼리 키
  // );

  const onsubmitMyPage = e => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mypage-sidebar">
        <div className="mypage-category">
          <ul>
            <li>회원정보 수정</li>
            <li>크루 정보</li>
            <li>관리자</li>
          </ul>
        </div>
      </div>
      <form className="mypage-form" onSubmit={onsubmitMyPage}>
        <p className="mypage-p">회원 정보 수정</p>
        <input className="mypage-input" placeholder="아이디" />
        <input className="mypage-input" placeholder="이메일" />
        <div>
          <input className="mypage-input-nickname" placeholder="닉네임" />
          <button className="mypage-btn-confirm">인증 요청</button>
        </div>
        <button className="mypage-btn-modify">수정</button>
        <hr className="mypage-hr" />
        <button className="mypage-btn-unregister">회원탈퇴</button>
      </form>
    </>
  );
};

export default MyPage;
