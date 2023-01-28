import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

const FindPassword = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="findpasword-form">
      <p className="mypage-title">비밀번호 찾기</p>

      <div className="findpasword-inner">
        <p className="findpasword-label">이메일</p>
        <div>
          <input
            type="text"
            placeholder="이메일"
            readOnly
            className="findpasword-input user-email"
          />
          <button className="findpasword-btn">인증 요청</button>
        </div>

        <div>
          <p className="findpasword-label">인증 번호</p>
          <input
            type="text"
            placeholder="인증 번호"
            className="findpasword-input"
          />
          <button className="findpasword-btn">확인</button>
        </div>

        <p className="findpasword-label">새로운 비밀번호</p>
        <input
          type="password"
          placeholder="새로운 비밀번호"
          className="findpasword-input "
        />

        <p className="findpasword-label">비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="findpasword-input"
        />
      </div>

      <button className="findpasword-btn__modify ">비밀번호 변경</button>
    </div>
  );
};

export default FindPassword;
