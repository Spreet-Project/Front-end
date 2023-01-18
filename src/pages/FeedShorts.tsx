import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/feedShorts.scss';
import FeedsScroll from '../components/FeedsScroll';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import sweetAlert from '../core/utils/sweetAlert';
import FeedShortsModal from '../components/FeedShortsModal';
import { postFeedLike, getFeed } from '../core/api/feed';

const FeedShorts = () => {
  const naviagate = useNavigate();
  const queryClient = useQueryClient();
  const [feedId, setFeedId] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState(false);

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
    if (cate !== 'feed') {
      naviagate('/shorts');
    }
  };

  const { isLoading, isError, data, error, isFetching } = useQuery(
    ['feeds', token],
    getFeed,
    {
      //     // suspense: true,
      cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
      staleTime: 5000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
      refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
    },
  );

  const onPostFeedLike = feedId => {
    postFeedLike(feedId).then(res => {
      // console.log(res, 'res');
      // sweetAlert(1000, 'success', '좋아요가 반영되었습니다.');
      queryClient.invalidateQueries(['feeds', token]);
    });
  };

  if (isLoading || isFetching || !data) return;
  // console.log(data);
  // if (data.response && data.response.request.status === 401) {
  //   localStorage.removeItem('id');
  // }

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
          {data.data.data.map(feed => {
            return (
              <FeedsScroll
                key={feed.feedId}
                feed={feed}
                onPostFeedLike={onPostFeedLike}
                setFeedId={setFeedId}
                setIsShowModal={setIsShowModal}
              />
            );
          })}
        </div>
      </div>
      {isShowModal && (
        <FeedShortsModal setIsShowModal={setIsShowModal} feedId={feedId} />
      )}
    </>
  );
};

export default FeedShorts;
