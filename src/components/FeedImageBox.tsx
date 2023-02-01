import React, { useRef, useState } from 'react';

const FeedImageBox = ({ feed }): JSX.Element => {
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
              return currPaigingIDX === index ? (
                <button
                  key={index}
                  className="carousel-paging__btn"
                  onClick={() => {
                    onPaigingBtn(index);
                  }}
                  style={{ border: '3px solid gray' }}
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
      <div className="modal-userInform">
        <div className="modal-userInform__content">
          <p className="modal-content__title">{feed.title}</p>
          <p className="modal-content__detail">{feed.content}</p>
        </div>
        <div className="modal-userInform__author">
          <img src={feed.profileImageUrl} />
          {feed.nickname}
        </div>
      </div>
    </div>
  );
};

export default FeedImageBox;
