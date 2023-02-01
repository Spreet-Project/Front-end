import React from 'react';
import '../assets/styles/scss/shorts.scss';
import Video from './Video';
import sweetAlert from '../core/utils/sweetAlert';

const ShortsScroll = ({
  shorts,
  onPostShortsLike,
  setShortsId,
  setIsShowModal,
}): JSX.Element => {
  return (
    <div key={shorts.shortsId} className="shorts-item__scroll">
      <Video width="100%" height="650px" src={shorts.videoUrl} />
      <div className="shorts-item__info">
        <p>{shorts.title}</p>
        <div className="user-profile">
          <div className="user-image">
            <img src={shorts.profileImageUrl} />
          </div>
          <p>{shorts.nickname}</p>
        </div>
        <div className="user-like">
          <span className="user-like__heart">♥︎</span>
          <span>{shorts.likeCount}</span>
        </div>
      </div>

      <div className="shorts-item__btn">
        <div
          className="shorts-btn btn__like"
          onClick={() => {
            onPostShortsLike(shorts.shortsId);
          }}
        >
          {shorts.liked ? (
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
        <div className="shorts-btn btn__subscribe">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              sweetAlert(1000, 'error', '서비스 준비 중 입니다.');
            }}
          >
            subscriptions
          </span>
        </div>
        <p
          className="shorts-btn-text text__subscribe"
          onClick={() => {
            sweetAlert(1000, 'error', '서비스 준비 중 입니다.');
          }}
        >
          Subscribe
        </p>
      </div>
    </div>
  );
};

export default ShortsScroll;
