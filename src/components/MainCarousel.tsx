import React, { useRef, useState, useEffect } from 'react';
import '../assets/styles/scss/shorts.scss';

import handleClickSlide from '../core/utils/handleClickSlide';
import Video from './Video';

const MainCarousel = ({ data, category, color }): JSX.Element => {
  const rapRef = useRef<HTMLDivElement>(null); //하단 메인 슬라이드 ref;
  const [shortsTransX, setShortsTransX] = useState(0);

  useEffect(() => {
    const getFeedCordinate = () => {
      if (!rapRef.current) return;
      const rapLeft = rapRef.current.getBoundingClientRect().left;
      setShortsTransX(rapLeft);
    };

    getFeedCordinate();
  }, []);

  return (
    <div className="slide-row">
      <div className="slide-row__carousel">
        <button
          className="slide-row__button btn--left"
          onClick={() => {
            handleClickSlide('left', data.data.data, rapRef, 2, shortsTransX);
          }}
        >
          {'<'}
        </button>
        <button
          className="slide-row__button btn--right"
          onClick={() => {
            handleClickSlide('right', data.data.data, rapRef, 2, shortsTransX);
          }}
        >
          {'>'}
        </button>
        <div className="slide-item__title" style={{ color: `${color}` }}>
          {category}
        </div>
        <div className="slide-item__list" ref={rapRef}>
          <div className="slide-item__wrapper">
            {data.data &&
              data.data.data.map(item => {
                return (
                  <>
                    <div key={item.shortsId} className="slide-item__container">
                      <div key={item.shortsId} className="slide-item__bg"></div>
                      <Video
                        width={'400px'}
                        height={'500px'}
                        src={item.videoUrl}
                      />
                      <div className="slide-item__shorts-title">
                        <p>
                          {item.title.length > 10
                            ? item.title.slice(0, 30) + '...'
                            : item.title}
                        </p>
                        <div className="user-profile">
                          <div className="user-image">
                            <img src={item.profileImageUrl} />
                          </div>
                          {item.nickname}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCarousel;
