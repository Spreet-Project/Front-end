import React from 'react';
import Video from './Video';

const ShortsVideoBox = ({ shorts, shortsId }): JSX.Element => {
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
          <p>{shorts.title}</p>
          <p>{shorts.content}</p>
          <div className="modal-userInform__author">
            <img src={shorts.profileImageUrl} />
            {shorts.nickname}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortsVideoBox;
