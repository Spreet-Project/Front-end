import React, { useRef, useState, useLayoutEffect } from 'react';
import '../assets/styles/scss/shorts.scss';
import ShortsModal from '../components/ShortsModal';
import { getShorts } from '../core/api/shorts';
import { useQuery } from 'react-query';

const Shorts = () => {
  const [shortsId, setShortsId] = useState<number>(0);
  const { isLoading, isError, data, error, isFetching } = useQuery(
    'shorts', //쿼리 키
    getShorts, //비동기 처리함수(서버에 요청),
    {
      // suspense: true,
      cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
      staleTime: 5000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
      refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
    },
  );

  const [isShowModal, setIsShowModal] = useState(false);

  if (isLoading) return;
  if (!data) {
    return;
  }
  console.log(data);
  return (
    <>
      {isLoading && <div> 로딩중입니다</div>}
      <div className="shorts-sidebar">
        <div className="shorts-category">
          <ul>
            <li>전체</li>
            <li>랩</li>
            <li>스트릿댄스</li>
            <li>DJ</li>
            <li>그래피티</li>
            <li>비트박스</li>
            <li>기타</li>
            <li>게시글</li>
          </ul>
        </div>
      </div>
      <div className="shorts-cotent">
        <div className="shorts-scroll">
          {data &&
            data.data.data.map(shorts => {
              return (
                <div key={shorts.shortsId} className="shorts-item__scroll">
                  <iframe
                    width="600px"
                    height="600px"
                    src={shorts.videoUrl}
                    allow="autoplay;"
                  ></iframe>
                  <div className="shorts-item__info">
                    <p>제목:{shorts.title}</p>
                    <p>닉네임:{shorts.nickname}</p>
                  </div>

                  <div className="shorts-item__btn">
                    <div className="shorts-btn btn__like">
                      <span className="material-icons">thumb_up</span>
                    </div>
                    <p className="shorts-btn-text text__like">Like</p>
                    <div
                      className="shorts-btn btn__detail"
                      onClick={() => {
                        setShortsId(shorts.shortsId);
                        setIsShowModal(true);
                      }}
                    >
                      <span className="material-icons">article</span>
                    </div>
                    <p
                      className="shorts-btn-text text__detail"
                      onClick={() => {
                        setShortsId(shorts.shortsId);
                        setIsShowModal(true);
                      }}
                    >
                      Detail
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {isShowModal && (
        <ShortsModal setIsShowModal={setIsShowModal} shortsId={shortsId} />
      )}
    </>
  );
};

export default Shorts;
