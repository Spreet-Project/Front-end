import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/feedShorts.scss';
import FeedsScroll from '../components/FeedsScroll';
import { useQueryClient, useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import FeedShortsModal from '../components/FeedShortsModal';
import sweetAlert from '../core/utils/sweetAlert';
import { postFeedLike, getScrollFeed } from '../core/api/feed';
import { postSubscribe } from '../core/api/subscribe';

const FeedShorts = (): JSX.Element => {
  const naviagate = useNavigate();
  const queryClient = useQueryClient();
  const [feedId, setFeedId] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const token = localStorage.getItem('id');
  // const [feedList, setFeedList] = useState(null);
  const [ref, inView] = useInView();

  //처음 렌더링
  const { data, isLoading, isSuccess, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery(['getScrollFeed', token], getScrollFeed, {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.data) return;
        if (lastPage.data.length < 10 || !lastPage.data.data) {
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
      if (!res) {
        return sweetAlert(1000, 'error', ' 로그인이 필요합니다!');
      }
      sweetAlert(1000, 'success', '좋아요가 반영되었습니다.');
      queryClient.invalidateQueries(['getScrollFeed', token]);
    });
  };

  //구독 요청
  const onSubscribe = userNickname => {
    postSubscribe(userNickname).then(res => {
      console.log(res);
      if (!res) return;
      sweetAlert(1000, 'success', '구독 성공');
    });
  };

  if (isLoading || !data.pages) return;
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
              if (!page.data) return;
              return page.data.map((feed, feedIndex) => {
                const lastIndex = page.data.length - 1;
                return feedIndex === lastIndex ? (
                  <div ref={ref} key={feed.feedId}>
                    <FeedsScroll
                      feed={feed}
                      onPostFeedLike={onPostFeedLike}
                      setFeedId={setFeedId}
                      setIsShowModal={setIsShowModal}
                      onSubscribe={onSubscribe}
                    />
                  </div>
                ) : (
                  <FeedsScroll
                    key={feed.feedId}
                    feed={feed}
                    onPostFeedLike={onPostFeedLike}
                    setFeedId={setFeedId}
                    setIsShowModal={setIsShowModal}
                    onSubscribe={onSubscribe}
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
