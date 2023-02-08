import React, { useRef, useState } from 'react';
import '../assets/styles/scss/feedShorts.scss';
import sweetAlert from '../core/utils/sweetAlert';

const FeedsScroll = ({
  feed,
  setFeedId,
  setIsShowModal,
  onPostFeedLike,
  onSubscribe,
}): JSX.Element => {
  const username = localStorage.getItem('nickname');
  const feedChildRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const [currPaigingIDX, setCurrPaigingIDX] = useState<number>(0);

  const onPaigingBtn = (index: number): void => {
    if (!feedChildRef) return;
    const feedRef_NodeWidth: number =
      feed.imageUrlList.length > 0
        ? feedChildRef.current.getBoundingClientRect().width
        : 0;
    const calculationValue: number =
      -(feedRef_NodeWidth / feed.imageUrlList.length) * index;
    feedRef.current.style.transform = `translateX(${calculationValue}px)`;
    setCurrPaigingIDX(index);
  };

  // const onSubscirbe = () => {
  //   postSubscribe();
  // };

  return (
    <div key={feed.feedId} className="feed-shorts-item__scroll">
      <div className="feed-image__row">
        <div className="feed-image__carousel">
          <div className="feed-image__list" ref={feedRef}>
            <div className="feed-image__wrapper" ref={feedChildRef}>
              {feed.imageUrlList &&
                feed.imageUrlList.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={item}
                      className="feed-image__container"
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="feed-image__paiging">
          {feed.imageUrlList &&
            feed.imageUrlList.map((item, index) => {
              return currPaigingIDX === index ? (
                <button
                  key={index}
                  className="carousel-paging__btn"
                  onClick={() => {
                    onPaigingBtn(index);
                  }}
                  style={{ background: 'gray' }}
                ></button>
              ) : (
                <button
                  key={index}
                  className="carousel-paging__btn"
                  onClick={() => {
                    onPaigingBtn(index);
                  }}
                ></button>
              );
            })}
        </div>
      </div>

      <div className="shorts-item__info">
        <p>{feed.title}</p>
        <div className="user-profile">
          <div className="user-image">
            <img src={feed.profileImageUrl} />
          </div>
          <p>{feed.nickname}</p>
        </div>
        <div className="user-like">
          <span className="user-like__heart">♥︎</span>
          <span>{feed.feedLike}</span>
        </div>
      </div>

      <div className="shorts-item__btn">
        <div
          className="shorts-btn btn__like"
          onClick={() => {
            onPostFeedLike(feed.feedId);
          }}
        >
          {feed.liked ? (
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
            setFeedId(feed.feedId);
            setIsShowModal(true);
          }}
        >
          <span className="material-icons">article</span>
        </div>
        <p
          className="shorts-btn-text text__detail"
          onClick={() => {
            setFeedId(feed.feedId);
            setIsShowModal(true);
          }}
        >
          Detail
        </p>
        {username !== feed.nickname && (
          <>
            <div className="shorts-btn btn__subscribe">
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  console.log(feed);
                  onSubscribe(feed.nickname);
                }}
              >
                subscriptions
              </span>
            </div>
            <p
              className="shorts-btn-text text__subscribe"
              onClick={() => {
                onSubscribe(feed.nickname);
              }}
            >
              Subscribe
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default FeedsScroll;
