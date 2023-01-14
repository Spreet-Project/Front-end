import React from 'react';
import '../assets/styles/scss/myPage.scss';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
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
    </>
  );
};

export default MyPage;
