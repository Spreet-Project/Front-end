import React from 'react';

const ShortsVideoBox = ({ shorts, shortsId }): JSX.Element => {
  console.log(shorts);
  return (
    <div className="modal-video">
      <div className="modal-userInform">
        <iframe width="450px" height="350px" src={shorts.videoUrl}></iframe>
        <div className="modal-userInform__title">
          <p>글번호: {shortsId}</p>
          <p>글제목: {shorts.title}</p>
          <p> 내용:{shorts.content}</p>
        </div>
        <p className="modal-userInform__author">작성자:{shorts.nickname}</p>
      </div>
    </div>
  );
};

export default ShortsVideoBox;
