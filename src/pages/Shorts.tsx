import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/shorts.scss';
import ShortsModal from '../components/ShortsModal';
import { getShorts, postShortLike, getFeed } from '../core/api/shorts';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import sweetAlert from '../core/utils/sweetAlert';
import ShortsScroll from '../components/ShortsScroll';

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

  const onClickCate = cate => {
    if (cate === 'feed') {
      naviagate('/feeds');
    }
    setCurrentCate(cate);
  };

  const onPostShortsLike = shortsId => {
    postShortLike(shortsId)
      .then(res => {
        // console.log(res, 'res');
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

  if (isLoading || isFetching || !data) return;
  console.log(data);
  if (data.response && data.response.request.status === 401) {
    localStorage.removeItem('id');
  }
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
                <ShortsScroll
                  key={shorts.shortsId}
                  shorts={shorts}
                  onPostShortsLike={onPostShortsLike}
                  setShortsId={setShortsId}
                  setIsShowModal={setIsShowModal}
                />
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
