import React from 'react';
import './write.scss';

const Write = () => {
  return (
    <div className="write-content">
      <div className="write-showFile-box"></div>
      <div className="write-inform-box">
        <p>제목</p>
        <input type="text" className="title-input" />
        <p>이미지 파일</p>
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
        />
        <p>내용</p>
        <textarea></textarea>
      </div>
    </div>
  );
};

export default Write;
