import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/scss/feedShorts.scss';
import FeedsScroll from '../components/FeedsScroll';
import { useQueryClient, useInfiniteQuery, useMutation } from 'react-query';
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
  const [sort, setSort] = useState<string>('new');
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const token: string = localStorage.getItem('id');
  const scrollRef = useRef<HTMLDivElement>();

  const [ref, inView] = useInView();

  //처음 렌더링
  const { data, isLoading, isSuccess, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery(['getScrollFeed', token, sort], getScrollFeed, {
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      scrollRef.current.scrollTop = 0;
    }
  }, [data]);

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

  // const postFeedLikeMutation = useMutation(
  //   feedId =>
  //     postFeedLike(feedId).then(res => {
  //       if (!res) {
  //         return sweetAlert(1000, 'error', ' 로그인이 필요합니다!');
  //       }
  //       if (res.data.msg === '좋아요 성공') {
  //         sweetAlert(1000, 'success', res.data.msg);
  //       } else {
  //         sweetAlert(1000, 'error', res.data.msg);
  //       }
  //     }),
  //   {
  //     onSuccess: () => {
  //       const getQuery = queryClient.invalidateQueries([
  //         'getScrollFeed',
  //         token,
  //       ]);
  //       console.log(getQuery);
  //     },
  //   },
  // );

  // const modifyCommentMutation = useMutation(
  //   commentId =>
  //     modifyFeedComment({ commentId: commentId, content: modifyComment }),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(['feedComment', feedId]),
  //   },
  // );

  const onPostFeedLike = feedId => {
    postFeedLike(feedId).then(res => {
      if (!res) {
        return sweetAlert(1000, 'error', ' 로그인이 필요합니다!');
      }
      if (res.data.msg === '좋아요 성공') {
        sweetAlert(1000, 'success', res.data.msg);
      } else {
        sweetAlert(1000, 'error', res.data.msg);
      }

      queryClient.invalidateQueries(['getScrollFeed', token]);
    });
  };

  //구독 요청
  const onSubscribe = userNickname => {
    postSubscribe(userNickname).then(res => {
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
        <div className="feed-sortbtn">
          <button
            onClick={() => {
              setSort('popular');
            }}
          >
            인기글
          </button>
          <button
            onClick={() => {
              setSort('new');
            }}
          >
            최신글
          </button>
        </div>
        <div className="feed-shorts-scroll" ref={scrollRef}>
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
