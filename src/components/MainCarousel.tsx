import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import '../assets/styles/scss/shorts.scss';
import ShortsModal from '../components/ShortsModal';
import { getShorts, postShortLike } from '../core/api/shorts';
import handleClickSlide from '../core/utils/mainCarousel';

const MainCarousel = ({ data }): JSX.Element => {
  const [shortsId, setShortsId] = useState<number>(0); //모달창넘어갈때 넘겨줄 shorts번호
  const [isShowModal, setIsShowModal] = useState<boolean>(false); //쇼츠 클릭해서 모달창 보여줄지
  console.log(data, 'data');
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
    <div className="rap-row">
      <div className="rap-row__carousel">
        <button
          className="rap-row__button btn--left"
          onClick={() => {
            handleClickSlide('left', data.data.data, rapRef, 2, shortsTransX);
          }}
        >
          {'<'}
        </button>
        <button
          className="rap-row__button btn--right"
          onClick={() => {
            handleClickSlide('right', data.data.data, rapRef, 2, shortsTransX);
          }}
        >
          {'>'}
        </button>
        <div className="rap-item__title"> 랩</div>
        <div className="rap-row__list" ref={rapRef}>
          <div className="rap-item__wrapper">
            {data.data &&
              data.data.data.map(item => {
                return (
                  <div
                    key={item.shortsId}
                    className="rap-item__container"
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
                    <div className="rap-item__shorts-title">
                      제목:
                      {item.title.length > 10
                        ? item.title.slice(0, 30) + '...'
                        : item.title}
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
