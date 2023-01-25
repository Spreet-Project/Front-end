import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import '../assets/styles/scss/feedShorts.scss';
import FeedsScroll from '../components/FeedsScroll';
import {
  useQueryClient,
  useInfiniteQuery,
  QueryFunctionContext,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import sweetAlert from '../core/utils/sweetAlert';
import FeedShortsModal from '../components/FeedShortsModal';
import { postFeedLike } from '../core/api/feed';
import { baseURL } from '../core/axios/axios';
import { getScrollFeed } from '../core/api/feed';

const FeedShorts = (): JSX.Element => {
  const naviagate = useNavigate();
  const queryClient = useQueryClient();
  const [feedId, setFeedId] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const token = localStorage.getItem('id');
  // const [feedList, setFeedList] = useState(null);
  const [ref, inView] = useInView();

  //처음 렌더링
  const {
    data,
    isLoading,
    isSuccess,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery('getScrollFeed', getScrollFeed, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length === 2) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  useEffect(() => {
    // console.log(inView, 'inView');
    // console.log(hasNextPage, 'hasNextPage');
    // hasNextPage
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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

  const onPostFeedLike = feedId => {
    postFeedLike(feedId).then(res => {
      // sweetAlert(1000, 'success', '좋아요가 반영되었습니다.');
      queryClient.invalidateQueries(['feeds', token]);
    });
  };

  if (isLoading) return;

  // console.log(data.pages, 'pages');
  // if (data.response && data.response.request.status === 401) {
  //   localStorage.removeItem('id');
  // }.

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
      <div className="feed-shorts-cotent">
        <div className="feed-shorts-scroll">
          {data.pages &&
            data.pages.map(page => {
              return page.data.map((feed, feedIndex) => {
                const lastIndex = page.data.length - 1;
                return feedIndex === lastIndex ? (
                  <div ref={ref} key={feed.feedId}>
                    <FeedsScroll
                      feed={feed}
                      onPostFeedLike={onPostFeedLike}
                      setFeedId={setFeedId}
                      setIsShowModal={setIsShowModal}
                    />
                  </div>
                ) : (
                  <FeedsScroll
                    key={feed.feedId}
                    feed={feed}
                    onPostFeedLike={onPostFeedLike}
                    setFeedId={setFeedId}
                    setIsShowModal={setIsShowModal}
                  />
                );
              });
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
