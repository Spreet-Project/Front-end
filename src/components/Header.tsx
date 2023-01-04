import React from 'react';
import './header.scss';
// import styled from 'styled-components';

const Header = (): JSX.Element => {
  return (
    <>
      <div className="header">
        <h1 className="header_logo">Spreet</h1>
        <div className="header_btn">
          <button>알림</button>
          <button>소츠</button>
          <button>행사</button>
          <button>로그인</button>
          <button>마이페이지</button>
        </div>
      </div>
    </>
  );
};

export default Header;
