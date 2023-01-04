import React from 'react';
import Header from '../components/Header';
// 풋터 추가해야함!

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      {/* 풋터 */}
    </>
  );
};

export default Layout;
