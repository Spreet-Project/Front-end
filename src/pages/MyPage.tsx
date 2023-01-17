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
            <li>회원 정보</li>
            <li>크루 정보</li>
            <li>관리자</li>
          </ul>
        </div>
      </div>
      <form onSubmit={onsubmitMyPage}>
        <div className="mypage-form">
          <p>회원 정보 수정</p>
          <input placeholder="아이디" />
          <input />
          <div>
            <input />
            <button>인증 요청</button>
          </div>
          <button>수정</button>
        </div>
      </form>
    </>
  );
};

export default MyPage;
