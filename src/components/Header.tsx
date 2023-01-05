import React from 'react';
import './header.scss';
import { useNavigate } from 'react-router-dom';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="header_inner">
          <h1 className="header_logo">Spreet</h1>
          <div className="header_btn">
            <button>알림</button>
            <button
              onClick={() => {
                navigate('/shorts');
              }}
            >
              쇼츠
            </button>
            <button>행사</button>
            <button>로그인</button>
            <button>마이페이지</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
