import React from 'react';
import Video from './Video';

const ShortsVideoBox = ({ shorts, shortsId }): JSX.Element => {
  return (
    <div className="modal-video">
      <div className="modal-userInform">
        <Video
          width="100%"
          height="400px"
          src={shorts.videoUrl}
          className="modal__video"
        />
        <div className="modal-userInform__content">
          <p className="modal-content__title">{shorts.title}</p>
          <p className="modal-content__detail">{shorts.content}</p>
        </div>
        <div className="modal-userInform__author">
          <img src={shorts.profileImageUrl} />
          <span className="modal-userInform__nickname">{shorts.nickname}</span>
        </div>
      </div>
    </div>
  );
};

export default ShortsVideoBox;
