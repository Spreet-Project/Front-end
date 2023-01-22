import React, { useRef } from 'react';

const FeedImageBox = ({ feed, feedId }): JSX.Element => {
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

  return (
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
      <div className="modal-userInform">
        <div className="modal-userInform__title">
          <p>{feed.title}</p>
          <p> 내용:{feed.content}</p>
          <div className="modal-userInform__author">
            <img src={feed.profileImageUrl} />
            {feed.nickname}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedImageBox;
