import React, { useRef, useEffect } from 'react';
import '../assets/styles/scss/feedShorts.scss';
import sweetAlert from '../core/utils/sweetAlert';
import { postSubscribe } from '../core/api/subscribe';

const FeedsScroll = ({
  feed,
  setFeedId,
  setIsShowModal,
  onPostFeedLike,
}): JSX.Element => {
  const feedChildRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const onPaigingBtn = (index: number): void => {
    if (!feedChildRef) return;
    const feedRef_NodeWidth: number =
      feed.imageUrlList.length > 0
        ? feedChildRef.current.getBoundingClientRect().width
        : 0;
    const calculationValue: number =
      -(feedRef_NodeWidth / feed.imageUrlList.length) * index;
    feedRef.current.style.transform = `translateX(${calculationValue}px)`;
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
              return (
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
        <p>{feed.nickname}</p>
        <p>♥︎ {feed.feedLike}</p>
      </div>

      <div className="shorts-item__btn">
        <div
          className="shorts-btn btn__like"
          onClick={() => {
            onPostFeedLike(feed.feedId);
          }}
        >
          {feed.like ? (
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
        <button className="subscribe-button">SubsCribe</button>
      </div>
    </div>
  );
};

export default FeedsScroll;
