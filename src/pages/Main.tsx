import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useQuery, useQueries } from 'react-query';
import '../assets/styles/scss/main.scss';
import { useNavigate } from 'react-router-dom';
import { getFeed, getMainShorts } from '../core/api/shorts';
import handleClickSlide from '../core/utils/handleClickSlide';
import MainCarousel from '../components/MainCarousel';
import FeedShortsModal from '../components/FeedShortsModal';
import MainVideo from '../components/MainVideo';

const Main = (): JSX.Element => {
  const token = localStorage.getItem('id');
  const feedId = useRef<number>(0);
  const [isShowModal, setIsShowModal] = useState(false);

  const categoryList = [
    { category: '랩', value: 'RAP', color: '#D10536' },
    { category: '스트릿 댄스', value: 'STREET_DANCE', color: '#CA6100' },
    { category: 'DJ', value: 'DJ', color: '#CAC200' },
    { category: '그래피티', value: 'GRAFFITI', color: '#12A443' },
    { category: '비트박스', value: 'BEAT_BOX', color: '#153BFF' },
    { category: '기타', value: 'ETC', color: '#7E0479' },
  ];

  const res: any = useQueries(
    categoryList.map(categroy => {
      return {
        queryKey: ['shortsList', { category: categroy.value, token: token }],
        queryFn: getMainShorts,
        // cacheTime: 5000,
        // staleTime: 5000,
        // refetchOnMount: true,
      };
    }),
  );

  const resFeed: any = useQuery(['getFeed'], getFeed);

  const isUpScrollNum = useRef(0); //게시글 부분 스크롤 위로가는 경우 확인해주는숫자
  const feedRef = useRef<HTMLDivElement>(null); //게시글 스크롤에 사용될 ref
  const spreetRef = useRef<HTMLDivElement>(null); //상단 슬라이드 ref;
  const spreetChidRef = useRef<HTMLDivElement>(null); //상단 페이징 버튼위한 ref
  const [spreetTransX, setspreetTransX] = useState(0);
  const post: string[] = ['red', 'blue', 'green', 'black', 'purple'];

  const sldiesDomLength = useRef(post.length);

  useEffect(() => {
    const getSpreetCordinate = () => {
      if (!spreetRef.current) return;
      const listLeft = spreetRef.current.getBoundingClientRect().left;
      setspreetTransX(listLeft);
    };

    getSpreetCordinate();
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
        }
      });
      if (currTagerIndex === 0) {
        entry.target.style.opacity = 1;
        current.childNodes[currTagerIndex + 1].style.opacity = 0.9;
        current.childNodes[currTagerIndex + 2].style.opacity = 0.6;
        current.childNodes[currTagerIndex + 3].style.opacity = 0.3;
        return;
      }

      // console.log('current', currTagerIndex, 'isUpscroll', isUpScrollNum);
      if (currTagerIndex < isUpScrollNum.current) {
        current.childNodes[currTagerIndex + 1].style.opacity = 0.5;
        current.childNodes[currTagerIndex + 2].style.opacity = 0.9;
        current.childNodes[currTagerIndex + 3].style.opacity = 0.5;
        // return;
      }
      // console.log('첫번째타켓인덱스', current.childNodes[firstEleNum]);
      // console.log(currTagerIndex, '현재 인덱스');
      current.childNodes[firstEleNum].style.opacity = 0.3;
      current.childNodes[firstEleNum + 1].style.opacity = 0.4;
      current.childNodes[firstEleNum + 2].style.opacity = 0.6;
      current.childNodes[firstEleNum + 3].style.opacity = 1;
      current.childNodes[firstEleNum + 4].style.opacity = 0.6;

      if (entry.target === lastTargetEle) {
        current.childNodes[firstEleNum].style.opacity = 0.6;
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
    if (!feedRef.current) return;

    const observer: any = new IntersectionObserver(onScroll, {
      threshold: 0.4,
      rootMargin: '-30px',
    });

    feedRef.current.childNodes.forEach(childNode => {
      observer.observe(childNode);
    });

    return () => observer && observer.disconnect();
  }, [feedRef.current, onScroll]);

  const onPaigingBtn = (index: number): void => {
    if (!spreetChidRef) return;
    const spreetRef_NodeWidth: number =
      post.length > 0 ? spreetChidRef.current.getBoundingClientRect().width : 0;
    const calculationValue: number =
      -(spreetRef_NodeWidth / sldiesDomLength.current) * index;
    spreetRef.current.style.transform = `translateX(${calculationValue}px)`;
  };

  // res.map(response => {
  //   if (response.isSuccess && response.data.status === 200) {
  //     return;
  //   }
  //   if (response.isSuccess && response.data.response.data.statusCode === 400) {
  //     sweetAlert(1000, 'error', '죄송합니다.  다시 로그인 해주세요.');
  //     localStorage.removeItem('id');
  //     return navigate('/login');
  //   }
  // });

  // if (resFeed.response.status === 401) {
  //   sweetAlert(1000, 'error', '죄송합니다.  다시 로그인 해주세요.');
  //   localStorage.removeItem('id');
  //   navigate('/login');
  // }
  if (!res || resFeed.isLoading) return;
  // console.log(res, 'res');
  return (
    <div className="mainsector">
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
                    <>
                      {index === 0 ? (
                        <MainVideo
                          key={index}
                          width={'100%'}
                          height={'500px'}
                          src={'./videos/spreetintro.mp4'}
                        />
                      ) : (
                        <div
                          key={index}
                          className="spreet-item__container"
                          style={{ backgroundColor: item }}
                        >
                          {item}박스입니다.
                        </div>
                      )}
                    </>
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
          {res.map((result, index) => {
            if (result.isLoading || !result.data.data.data[index]) return;
            return (
              <MainCarousel
                key={index}
                data={result.data}
                category={categoryList[index].category}
                color={categoryList[index].color}
              />
            );
          })}
          <div className="feed-content">
            <div className="feed-wrapper" ref={feedRef}>
              {resFeed.data.data.data &&
                resFeed.data.data.data.map((item, index) => {
                  return (
                    <h1
                      key={item.feedId}
                      onClick={() => {
                        feedId.current = item.feedId;
                        setIsShowModal(true);
                      }}
                    >
                      {item.title}
                    </h1>
                  );
                })}
            </div>
          </div>
          {isShowModal && (
            <FeedShortsModal
              setIsShowModal={setIsShowModal}
              feedId={feedId.current}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
