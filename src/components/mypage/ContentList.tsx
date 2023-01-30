import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  useMutation,
} from 'react-query';
import { getUserPost } from '../../core/api/mypage';
import { useInView } from 'react-intersection-observer';
import { deleteFeed } from '../../core/api/feed';
import { deleteShorts } from '../../core/api/shorts';

const ContentList = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentCate, setCurrentCate] = useState('shorts');
  const [ref, inView] = useInView();
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery(['getUserpost', currentCate], getUserPost, {
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

  const contentCate = [
    {
      cate: '쇼츠',
      value: 'shorts',
    },
    {
      cate: '피드',
      value: 'feed',
    },
    {
      cate: '행사',
      value: 'event',
    },
  ];

  const onClickModify = postId => {
    if (!window.confirm('해당 글을 수정하시겠습니까?')) return;
    if (currentCate === 'shorts') {
      return navigate(`/modifyShorts/${postId}`);
    }
    if (currentCate === 'feed') {
      return navigate(`/modifyFeed/${postId}`);
    }
  };

  const onClickDelete = postId => {
    if (!window.confirm('정말 해당 게시글을 삭제하시겠습니까?')) return;
    if (currentCate === 'shorts') {
      return deleteShortsMutation.mutate(postId);
    }
    if (currentCate === 'feed') {
      return deleteFeedMutation.mutate(postId);
    }
  };
  const deleteShortsMutation = useMutation(shortsId => deleteShorts(shortsId), {
    onSettled: shortsId =>
      queryClient.invalidateQueries(['getUserpost', shortsId]),
  });

  const deleteFeedMutation = useMutation(feedId => deleteFeed(feedId), {
    onSettled: feedId => queryClient.invalidateQueries(['getUserpost', feedId]),
  });

  if (isLoading || !data) return;
  console.log(data, 'data');

  return (
    <div className="contentList-form">
      <ul className="contentList-category">
        {contentCate.map((cate, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setCurrentCate(cate.value);
              }}
            >
              {cate.cate}
            </li>
          );
        })}
      </ul>
      {data.pages &&
        data.pages.map(page => {
          if (!page.data.data) return;
          return page.data.data.map((item, itemIndex) => {
            const lastIndex = page.data.data.length - 1;
            return itemIndex === lastIndex ? (
              <div ref={ref} key={item.id}>
                <div key={itemIndex} className="contentList-commentbox">
                  <p className="contentList-title">{item.title}</p>
                  <ul className="contentList-commentbox__infrom">
                    <li className="contentList-inform__cate">
                      {item.category}
                    </li>
                    <li> 작성자</li>
                    <li> 2023-01-01 13:15</li>
                    <li className="contentList-btn">
                      <button
                        className="contentList-btn__modify"
                        onClick={() => {
                          onClickModify(item.id);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="contentList-btn__delete"
                        onClick={() => {
                          onClickDelete(item.id);
                        }}
                      >
                        삭제
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div key={itemIndex} className="contentList-commentbox">
                <p className="contentList-title">{item.title}</p>
                <ul className="contentList-commentbox__infrom">
                  <li className="contentList-inform__cate">{item.category}</li>
                  <li> 작성자</li>
                  <li> 2023-01-01 13:15</li>
                  <li className="contentList-btn">
                    <button
                      className="contentList-btn__modify"
                      onClick={() => {
                        onClickModify(item.id);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="contentList-btn__delete"
                      onClick={() => {
                        onClickDelete(item.id);
                      }}
                    >
                      삭제
                    </button>
                  </li>
                </ul>
              </div>
            );
          });
        })}
    </div>
  );
};

export default ContentList;
