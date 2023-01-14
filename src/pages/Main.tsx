import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import { useQuery } from 'react-query';
import '../assets/styles/scss/main.scss';
import ShortsModal from '../components/ShortsModal';
import { useNavigate } from 'react-router-dom';
import { getFeed, getShorts } from '../core/api/shorts';
import handleClickSlide from '../core/utils/mainCarousel';
import MainCarousel from '../components/MainCarousel';

const Main = (): JSX.Element => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [shortsId, setShortsId] = useState<number>(0); //모달창넘어갈때 넘겨줄 shorts번호
  const token = localStorage.getItem('id');

  const { isLoading, isError, data, error, isFetching } = useQuery(
    ['shorts', { category: 'STREET_DANCE', token: token }], //쿼리 키
    getShorts, //비동기 처리함수(서버에 요청),
    {
      // suspense: true,
      cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
      staleTime: 5000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
      refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
      // refetchOnWindowFocus: true, //기본값 true 데이터가 변경되었다면 변경된 값에따라 화면새로겝반영?
    },
  );

  const isUpScrollNum = useRef(0); //게시글 부분 스크롤 위로가는 경우 확인해주는숫자
  const feedRef = useRef<HTMLDivElement>(null); //게시글 스크롤에 사용될 ref
  const rapRef = useRef<HTMLDivElement>(null); //하단 메인 슬라이드 ref;
  const [shortsTransX, setShortsTransX] = useState(0);
  const spreetRef = useRef<HTMLDivElement>(null); //상단 슬라이드 ref;
  const spreetChidRef = useRef<HTMLDivElement>(null); //상단 페이징 버튼위한 ref
  const [spreetTransX, setspreetTransX] = useState(0);
  const post: string[] = ['red', 'blue', 'green', 'black', 'purple'];
  const feedList = [
    '첫번째글',
    '두번째글',
    '3번째글',
    '4번째글',
    '5반째글',
    '6번째글',
    '7번째글',
    '8번째글',
    '9번째글',
    '10번째글',
    '11번째글',
    '12번째글',
    '13번째글',
    '14번째글',
    '15번째글',
    '16번째글',
  ];

  const sldiesDomLength = useRef(post.length);

  useEffect(() => {
    const getSpreetCordinate = () => {
      if (!spreetRef.current) return;
      const listLeft = spreetRef.current.getBoundingClientRect().left;
      setspreetTransX(listLeft);
    };
    // const getFeedCordinate = () => {
    //   if (!rapRef.current) return;
    //   const rapLeft = rapRef.current.getBoundingClientRect().left;
    //   setShortsTransX(rapLeft);
    // };

    getSpreetCordinate();
    // getFeedCordinate();
  }, []);

  const onScroll = useCallback(([entry]: any) => {
    const { current }: any = feedRef;
    let currTagerIndex: number; //현재 타켓이 되는 게시글index
    const lastIndex = current.childNodes.length - 1;
    const lastTargetEle = current.childNodes[lastIndex];
    if (entry.isIntersecting) {
      let firstEleNum: number; //한번에 보여질 게시글 수
      // console.log(entry, '객체');
      // console.log(entry.target, '현재타겟');
      current.childNodes.forEach((item: any, index: number) => {
        if (item === entry.target) {
          currTagerIndex = index;
          firstEleNum = index - 4; //첫번째인덱스를 체크
          // entry.target.style.opacity = 1;
        }
      });
      if (currTagerIndex === 0) {
        entry.target.style.opacity = 1;
        current.childNodes[currTagerIndex + 1].style.opacity = 0.9;
        current.childNodes[currTagerIndex + 2].style.opacity = 0.7;
        current.childNodes[currTagerIndex + 3].style.opacity = 0.5;
        return;
      }

      // console.log('current', currTagerIndex, 'isUpscroll', isUpScrollNum);
      if (currTagerIndex < isUpScrollNum.current) {
        current.childNodes[currTagerIndex + 1].style.opacity = 0.6;
        current.childNodes[currTagerIndex + 2].style.opacity = 1;
        current.childNodes[currTagerIndex + 3].style.opacity = 0.6;
        // return;
      }
      // console.log('첫번째타켓인덱스', current.childNodes[firstEleNum]);
      // console.log(currTagerIndex, '현재 인덱스');
      current.childNodes[firstEleNum].style.opacity = 0.3;
      current.childNodes[firstEleNum + 1].style.opacity = 0.5;
      current.childNodes[firstEleNum + 2].style.opacity = 0.6;
      current.childNodes[firstEleNum + 3].style.opacity = 1;
      current.childNodes[firstEleNum + 4].style.opacity = 0.6;

      if (entry.target === lastTargetEle) {
        current.childNodes[firstEleNum].style.opacity = 0.5;
        current.childNodes[lastIndex].style.opacity = 1;
        current.childNodes[lastIndex - 1].style.opacity = 0.8;
        current.childNodes[lastIndex - 2].style.opacity = 0.7;
        current.childNodes[lastIndex - 3].style.opacity = 0.6;
        // console.log('마지막?', lastTargetEle);
      }

      isUpScrollNum.current = currTagerIndex;
      // console.log(isUpScrollNum.current, '위로체크 숫자');
    } else {
      entry.target.style.opacity = 0.1;
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!feedRef.current) return;

    const observer: any = new IntersectionObserver(onScroll, {
      threshold: 0.4,
      rootMargin: '-30px',
    });

    feedRef.current.childNodes.forEach(childNode => {
      observer.observe(childNode);
    });

    return () => observer && observer.disconnect();
  }, [isLoading, feedRef.current, onScroll]);

  const onPaigingBtn = (index: number): void => {
    // spreetRef.current.childNodes[0].getBoundingClientRect().width;
    if (!spreetChidRef) return;
    const spreetRef_NodeWidth: number =
      post.length > 0 ? spreetChidRef.current.getBoundingClientRect().width : 0;
    const calculationValue: number =
      -(spreetRef_NodeWidth / sldiesDomLength.current) * index;
    spreetRef.current.style.transform = `translateX(${calculationValue}px)`;
  };

  if (isLoading) return;
  if (!data) return;
  console.log(data);
  return (
    <>
      {isLoading || (isFetching && <div> 로딩중이요</div>)}
      <div className="spreet-row">
        <div className="spreet-row__carousel">
          <button
            className="spreet-row__button btn--left"
            onClick={() =>
              handleClickSlide('left', post, spreetRef, 1, spreetTransX)
            }
          >
            {'<'}
          </button>
          <button
            className="spreet-row__button btn--right"
            onClick={() =>
              handleClickSlide('right', post, spreetRef, 1, spreetTransX)
            }
          >
            {'>'}
          </button>
          <div className="spreet-row__list" ref={spreetRef}>
            <div className="spreet-item-wrapper" ref={spreetChidRef}>
              {post &&
                post.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="spreet-item__container"
                      style={{ backgroundColor: item }}
                    >
                      {item}박스입니다.
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="spreet-row__paiging">
          {post &&
            post.map((item, index) => {
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

      <div className="main-content">
        <div className="main-inner">
          <MainCarousel data={data} />
          {/* <div className="rap-row">
            <div className="rap-row__carousel">
              <button
                className="rap-row__button btn--left"
                onClick={() => {
                  handleClickSlide(
                    'left',
                    data.data.data,
                    rapRef,
                    1,
                    shortsTransX,
                  );
                }}
              >
                {'<'}
              </button>
              <button
                className="rap-row__button btn--right"
                onClick={() => {
                  handleClickSlide(
                    'right',
                    data.data.data,
                    rapRef,
                    1,
                    shortsTransX,
                  );
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
                  <ShortsModal
                    setIsShowModal={setIsShowModal}
                    shortsId={shortsId}
                  />
                )}
              </div>
            </div>
          </div> */}

          <div className="feed-content">
            <div className="feed-wrapper" ref={feedRef}>
              {feedList &&
                feedList.map((item, index) => {
                  return (
                    <h1
                      key={index}
                      // onClick={() => {
                      //   navigate(`/feed/:id=${data.id}`);
                      // }}
                    >
                      {item}
                    </h1>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
