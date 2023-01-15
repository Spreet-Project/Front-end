import React, { useRef, useState, useEffect } from 'react';
import '../assets/styles/scss/shorts.scss';
import ShortsModal from '../components/ShortsModal';
import { getShorts, postShortLike } from '../core/api/shorts';
import handleClickSlide from '../core/utils/handleClickSlide';

const MainCarousel = ({ data, category }): JSX.Element => {
  const [shortsId, setShortsId] = useState<number>(0); //모달창넘어갈때 넘겨줄 shorts번호
  const [isShowModal, setIsShowModal] = useState<boolean>(false); //쇼츠 클릭해서 모달창 보여줄지
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
        <div className="slide-item__title"> {category}</div>
        <div className="slide-item__list" ref={rapRef}>
          <div className="slide-item__wrapper">
            {data.data &&
              data.data.data.map(item => {
                return (
                  <div
                    key={item.shortsId}
                    className="slide-item__container"
                    onClick={() => {
                      setIsShowModal(true);
                      setShortsId(item.id);
                    }}
                  >
                    <iframe
                      width="350px"
                      height="450px"
                      src={item.videoUrl}
                    ></iframe>
                    <div className="slide-item__shorts-title">
                      <p>
                        {item.title.length > 10
                          ? item.title.slice(0, 30) + '...'
                          : item.title}
                      </p>
                      <p> {item.nickname}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          {isShowModal && (
            <ShortsModal setIsShowModal={setIsShowModal} shortsId={shortsId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCarousel;
