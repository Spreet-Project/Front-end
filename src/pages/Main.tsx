import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
// import { useQuery } from 'react-query';
import axios from 'axios';
import './main.scss';

const getHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const Main = () => {
  // const { isLoading, data, isError, error, isFetching } = useQuery(
  //   'super-heroes',
  //   getHeroes,
  //   {
  //     cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
  //     staleTime: 3000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
  //     refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
  //     refetchOnWindowFocus: true, //기본값 true 데이터가 변경되었다면 변경된 값에따라 화면새로겝반영?
  //   },
  // );
  const rapRef: any = useRef(); //상단 슬라이드 ref;
  const feedList: string[] = [
    '첫번째글',
    '두번째글',
    '세번째글',
    '네번째글',
    '다섯뻔째글',
  ];
  const [feedTransX, setFeedTransX] = useState(0);
  const spreetRef: any = useRef(); //상단 슬라이드 ref;
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
  }, []);

  const handleClickNavBtn = (direction: 'left' | 'right'): void => {
    const currentX = spreetRef.current.getBoundingClientRect().x;
    const spreetRef_NodeWidth =
      post.length > 0
        ? spreetRef.current.childNodes[0].getBoundingClientRect().width
        : 0;
    //슬라이드에 넣은 데이터 배열의 길이가 0보다 크다면
    //ref속성으로 이어진 돔요소 spreetRef에 childNode에 제일 첫번째?
    //요소의 넓이값을 세팅
    // console.log(
    //   '노드의 넓이값',
    //   spreetRef.current.childNodes[0].getBoundingClientRect().width,
    // );
    // 슬라이드 되는 박스 하나의 넓이값 * 3 (전체 넓이?를 제한하는 값?)
    const slideDistance = spreetRef_NodeWidth * 1;
    // console.log('sldiesDomLength', sldiesDomLength.current);
    //버튼으로 눌렀을때 변화하는 현재넓이제한값?
    let calculate_distance = 0;
    // console.log('슬라이드 전체넓이 값?', slideDistance);
    if (direction === 'left') {
      calculate_distance = currentX + slideDistance / sldiesDomLength.current;
      // console.log('현재calculate_distance', calculate_distance);
      if (spreetTransX < calculate_distance) {
        calculate_distance = 0;
      }
      // console.log('left버튼 차일드노드"', spreetRef.current);
    }
    if (direction === 'right') {
      const calculationValue = slideDistance / sldiesDomLength.current;
      calculate_distance = currentX - calculationValue;
      // console.log('현재calculate_distance', calculate_distance);
      if (-slideDistance > calculate_distance - calculationValue) {
        calculate_distance = 0;
      }
    }
    spreetRef.current.style.transform = `translateX(${calculate_distance}px)`;
  };

  const onPaiginBtn = (index: number): void => {
    const spreetRef_NodeWidth: number =
      post.length > 0
        ? spreetRef.current.childNodes[0].getBoundingClientRect().width
        : 0;
    const calculationValue: number =
      -(spreetRef_NodeWidth / sldiesDomLength.current) * index;
    spreetRef.current.style.transform = `translateX(${calculationValue}px)`;
  };

  return (
    <>
      <div className="spreet-row">
        <div className="spreet-row__carousel">
          <button
            className="spreet-row__button btn--left"
            onClick={() => handleClickNavBtn('left')}
          >
            {'<'}
          </button>
          <button
            className="spreet-row__button btn--right"
            onClick={() => handleClickNavBtn('right')}
          >
            {'>'}
          </button>
          <div className="spreet-row__list" ref={spreetRef}>
            <div className="spreet-item-wrapper">
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
        <div className="rap-row">
          <div className="rap-row__carousel">
            <button className="rap-row__button btn--left">{'<'}</button>
            <button className="rap-row__button btn--right">{'>'}</button>
            <div className="rap-row__list" ref={rapRef}>
              <div className="rap-item__wrapper">
                {feedList &&
                  feedList.map((item, index) => {
                    return (
                      <div key={index} className="rap-item__container">
                        {item}박스입니다.
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
