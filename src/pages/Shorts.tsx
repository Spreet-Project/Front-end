import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/shorts.scss';
import ShortsModal from '../components/ShortsModal';
import { getShorts, postShortLike } from '../core/api/shorts';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import sweetAlert from '../core/utils/sweetAlert';

const Shorts = () => {
  const naviagate = useNavigate();
  const queryClient = useQueryClient();
  const [shortsId, setShortsId] = useState<number>(0);
  const [currentCate, setCurrentCate] = useState('RAP');
  const token = localStorage.getItem('id');
  const categoryList = [
    { category: '랩', value: 'RAP' },
    { category: '스트릿 댄스', value: 'STREET_DANCE' },
    { category: 'DJ', value: 'DJ' },
    { category: '그래피티', value: 'GRAFFITI' },
    { category: '비트박스', value: 'BEAT_BOX' },
    { category: '기타', value: 'ETC' },
    { category: '게시글', value: 'feed' },
  ];

  const onClickCate = cate => {
    setCurrentCate(cate);
  };

  const { isLoading, isError, data, error, isFetching } = useQuery(
    ['shorts', { category: currentCate, token: token }], //쿼리 키
    getShorts, //비동기 처리함수(서버에 요청),
    {
      // suspense: true,
      cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
      staleTime: 5000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
      refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
    },
  );

  // const postShortsLikeMutation = useMutation(
  //   shortsId => postShortLike(shortsId),
  //   {
  //     onSettled: () => queryClient.invalidateQueries(['shorts', currentCate]),
  //   },
  // );
  const onPostShortsLike = shortsId => {
    postShortLike(shortsId)
      .then(res => {
        console.log(res, 'res');
        // sweetAlert(1000, 'success', '좋아요가 반영되었습니다.');
        queryClient.invalidateQueries([
          'shorts',
          { category: currentCate, token: token },
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [isShowModal, setIsShowModal] = useState(false);

  if (isLoading) return;
  if (isFetching) return;
  if (!data) {
    return;
  }
  // console.log(data);
  return (
    <>
      {isLoading || (isFetching && <div> 로딩중입니다</div>)}
      <div className="shorts-sidebar">
        <div className="shorts-category">
          <ul>
            {categoryList &&
              categoryList.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      console.log(item.value);
                      onClickCate(item.value);
                    }}
                  >
                    {item.category}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="shorts-cotent">
        <div className="shorts-scroll">
          {data.data.data ? (
            data.data.data.map(shorts => {
              return (
                <div key={shorts.shortsId} className="shorts-item__scroll">
                  <iframe
                    width="600px"
                    height="600px"
                    src={shorts.videoUrl}
                    className="shorts-iframe"
                  ></iframe>
                  <div className="shorts-item__info">
                    <p>{shorts.title}</p>
                    <p>{shorts.nickname}</p>
                    <p>♥︎ {shorts.likeCount}</p>
                  </div>

                  <div className="shorts-item__btn">
                    <div
                      className="shorts-btn btn__like"
                      onClick={() => {
                        onPostShortsLike(shorts.shortsId);
                      }}
                    >
                      {shorts.like ? (
                        <span
                          className="material-icons"
                          style={{ color: 'black' }}
                        >
                          thumb_up
                        </span>
                      ) : (
                        <span className="material-icons">thumb_up</span>
                      )}
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
            })
          ) : (
            <div className="">게시물이 없네요 ㅠㅠ</div>
          )}
        </div>
      </div>
      {isShowModal && (
        <ShortsModal setIsShowModal={setIsShowModal} shortsId={shortsId} />
      )}
    </>
  );
};

export default Shorts;
