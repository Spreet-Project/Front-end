import React from 'react';
import Video from './Video';

const ShortsVideoBox = ({ shorts, shortsId }): JSX.Element => {
  console.log(shorts);
  return (
    <div className="modal-video">
      <div className="modal-userInform">
        <Video
          width="100%"
          height="600px"
          src={shorts.videoUrl}
          className="modal__video"
        />
        <div className="modal-userInform__title">
          <p>제목: {shorts.title}</p>
          <p> 내용:{shorts.content}</p>
          <p className="modal-userInform__author">작성자:{shorts.nickname}</p>
        </div>
      </div>
    </div>
  );
};

export default ShortsVideoBox;
