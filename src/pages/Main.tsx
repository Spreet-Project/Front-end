import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import '../assets/styles/scss/main.scss';
import ShortsModal from '../components/ShortsModal';
import { useNavigate } from 'react-router-dom';

export const getFeeds = () => {
  return axios.get('http://localhost:4000/feed');
};

export const getShorts = () => {
  return axios.get('http://localhost:4000/shorts');
};

// {
//   // cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
//   // staleTime: 5000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
//   // refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
//   // refetchOnWindowFocus: true, //기본값 true 데이터가 변경되었다면 변경된 값에따라 화면새로겝반영?
// suspense: true,
// },

const Main = (): JSX.Element => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [shortsId, setShortsId] = useState<number>(0); //모달창넘어갈때 넘겨줄 shorts번호

  const { isLoading, isError, data, error, isFetching } = useQuery(
    'shorts', //쿼리 키
    getShorts, //비동기 처리함수(서버에 요청),
    {
      suspense: true,
    },
  );

  const isUpScrollNum = useRef(0); //게시글 부분 스크롤 위로가는 경우 확인해주는숫자
  const feedRef = useRef<HTMLDivElement>(null); //게시글 스크롤에 사용될 ref
  const rapRef = useRef<HTMLDivElement>(null); //하단 메인 슬라이드 ref;
  const [feedTransX, setFeedTransX] = useState(0);
  const spreetRef = useRef<HTMLDivElement>(null); //상단 슬라이드 ref;
  const spreetChidRef = useRef<HTMLDivElement>(null); //상단 페이징 버튼위한 ref
  const [spreetTransX, setspreetTransX] = useState(0);
  const post: string[] = ['red', 'blue', 'green', 'black', 'purple'];
  const sldiesDomLength = useRef(post.length);

  useLayoutEffect(() => {
    const getSpreetCordinate = () => {
      const listLeft = spreetRef.current.getBoundingClientRect().left;
      setspreetTransX(listLeft);
    };
    const getFeedCordinate = () => {
      const rapLeft = rapRef.current.getBoundingClientRect().left;
      setFeedTransX(rapLeft);
    };

    getSpreetCordinate();
    getFeedCordinate();
  }, [rapRef, spreetRef]);

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
    let observer: any;

    if (feedRef.current) {
      observer = new IntersectionObserver(onScroll, {
        threshold: 0.4,
        rootMargin: '-30px',
      });

      feedRef.current.childNodes.forEach(childNode => {
        observer.observe(childNode);
      });
    }

    return () => observer && observer.disconnect();
  }, [onScroll]);

  if (isLoading) return;

  const onPaiginBtn = (index: number): void => {
    // spreetRef.current.childNodes[0].getBoundingClientRect().width;
    const spreetRef_NodeWidth: number =
      post.length > 0 ? spreetChidRef.current.getBoundingClientRect().width : 0;
    const calculationValue: number =
      -(spreetRef_NodeWidth / sldiesDomLength.current) * index;
    spreetRef.current.style.transform = `translateX(${calculationValue}px)`;
  };

  const handleClickSlide = (
    direction: 'left' | 'right',
    dataList: string[],
    sectorRef: any,
    slideNum: number,
  ): void => {
    const currentX = sectorRef.current.getBoundingClientRect().x;
    const listRef_NodeWidth =
      sectorRef.current.childNodes[0].getBoundingClientRect().width;
    //슬라이드에 넣은 데이터 배열의 길이가 0보다 크다면
    //ref속성으로 이어진 돔요소 spreetRef에 childNode에 제일 첫번째?
    //요소의 넓이값을 세팅
    // console.log(
    //   '노드의 넓이값',
    //   sectorRef.current.childNodes[0].getBoundingClientRect().width,
    // );
    // 슬라이드 되는 박스 하나의 넓이값 * 3 (전체 넓이?를 제한하는 값?)
    const slideDistance = listRef_NodeWidth * 1;
    //버튼으로 눌렀을때 변화하는 현재넓이제한값?
    let calculate_distance = 0;
    // console.log('슬라이드 전체넓이 값?', slideDistance);
    if (direction === 'left') {
      calculate_distance =
        currentX + (slideDistance / dataList.length) * slideNum;
      // console.log('현재calculate_distance', calculate_distance);
      if (feedTransX < calculate_distance) {
        calculate_distance = 0;
      }
      // console.log('left버튼 차일드노드"', sectorRef.current);
    }
    if (direction === 'right') {
      const calculationValue = (slideDistance / dataList.length) * slideNum;
      calculate_distance = currentX - calculationValue;
      // console.log('현재calculate_distance', calculate_distance);
      // console.log('현재sectoreRef', sectorRef);
      if (-slideDistance > calculate_distance) {
        calculate_distance = 0;
      }
      // if (-slideDistance > calculate_distance - calculationValue) {
      //   calculate_distance = 0;
      // }
    }
    sectorRef.current.style.transform = `translateX(${calculate_distance}px)`;
  };

  if (!data) {
    return;
  }

  return (
    <>
      {isLoading || (isFetching && <div> 로딩중이요</div>)}
      <div className="spreet-row">
        <div className="spreet-row__carousel">
          <button
            className="spreet-row__button btn--left"
            onClick={() => handleClickSlide('left', post, spreetRef, 1)}
          >
            {'<'}
          </button>
          <button
            className="spreet-row__button btn--right"
            onClick={() => handleClickSlide('right', post, spreetRef, 1)}
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
                    onPaiginBtn(index);
                  }}
                ></button>
              );
            })}
        </div>
      </div>
      <div className="main-content">
        <div className="main-inner">
          <div className="rap-row">
            <div className="rap-row__carousel">
              <button
                className="rap-row__button btn--left"
                onClick={() => {
                  handleClickSlide('left', data.data, rapRef, 8);
                }}
              >
                {'<'}
              </button>
              <button
                className="rap-row__button btn--right"
                onClick={() => {
                  handleClickSlide('right', data.data, rapRef, 8);
                }}
              >
                {'>'}
              </button>
              <div className="rap-item__title"> 랩</div>
              <div className="rap-row__list" ref={rapRef}>
                <div className="rap-item__wrapper">
                  {data.data &&
                    data.data.map(item => {
                      return (
                        <div
                          key={item.id}
                          className="rap-item__container"
                          onClick={() => {
                            setIsShowModal(true);
                            setShortsId(item.id);
                          }}
                        >
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
          </div>
          <div className="feed-content">
            <div className="feed-wrapper" ref={feedRef}>
              {data &&
                data.data.map(data => {
                  return (
                    <h1
                      key={data.id}
                      onClick={() => {
                        navigate(`/feed/:id=${data.id}`);
                      }}
                    >
                      {data.title}
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
