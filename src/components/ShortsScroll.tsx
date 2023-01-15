import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/shorts.scss';

const ShortsScroll = ({
  shorts,
  onPostShortsLike,
  setShortsId,
  setIsShowModal,
}): JSX.Element => {
  return (
    <div key={shorts.shortsId} className="shorts-item__scroll">
      <iframe
        width="600px"
        height="600px"
        src={shorts.videoUrl}
        className="shorts-iframe"
      ></iframe>
      <div className="shorts-item__info">
        <p>{shorts.title}</p>
        <p>{shorts.nickname}</p>
        <p>♥︎ {shorts.likeCount}</p>
      </div>

      <div className="shorts-item__btn">
        <div
          className="shorts-btn btn__like"
          onClick={() => {
            onPostShortsLike(shorts.shortsId);
          }}
        >
          {shorts.like ? (
            <span className="material-icons" style={{ color: 'black' }}>
              thumb_up
            </span>
          ) : (
            <span className="material-icons">thumb_up</span>
          )}
        </div>
        <p className="shorts-btn-text text__like">Like</p>
        <div
          className="shorts-btn btn__detail"
          onClick={() => {
            setShortsId(shorts.shortsId);
            setIsShowModal(true);
          }}
        >
          <span className="material-icons">article</span>
        </div>
        <p
          className="shorts-btn-text text__detail"
          onClick={() => {
            setShortsId(shorts.shortsId);
            setIsShowModal(true);
          }}
        >
          Detail
        </p>
      </div>
    </div>
  );
};

export default ShortsScroll;
