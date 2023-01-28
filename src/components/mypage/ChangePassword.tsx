import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

const ChangePassword = (): JSX.Element => {
  return (
    <div className="changepasword-form">
      <p className="mypage-title">비밀번호 찾기</p>

      <div className="changepasword-inner">
        <p className="changepasword-label">이메일</p>
        <div>
          <input
            type="text"
            placeholder="이메일"
            readOnly
            className="changepasword-input user-email"
            value="qweqwewq@naver.com"
          />
          <button className="changepasword-btn">인증 요청</button>
        </div>

        <div>
          <p className="changepasword-label">인증 번호</p>
          <input
            type="text"
            placeholder="인증 번호"
            className="changepasword-input"
          />
          <button className="changepasword-btn">확인</button>
        </div>

        <p className="changepasword-label">새로운 비밀번호</p>
        <input
          type="password"
          placeholder="새로운 비밀번호"
          className="changepasword-input "
        />

        <p className="changepasword-label">비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="changepasword-input"
        />
      </div>

      <button className="changepasword-btn__modify ">비밀번호 변경</button>
    </div>
  );
};

export default ChangePassword;
