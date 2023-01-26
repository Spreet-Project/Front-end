import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/shorts.scss';
import ShortsModal from '../components/ShortsModal';
import { getScrollShorts, postShortLike } from '../core/api/shorts';
import { useQueryClient, useQuery, useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import sweetAlert from '../core/utils/sweetAlert';
import ShortsScroll from '../components/ShortsScroll';
import { useInView } from 'react-intersection-observer';

const Shorts = () => {
  const naviagate = useNavigate();
  const queryClient = useQueryClient();
  const [shortsId, setShortsId] = useState<number>(0);
  const [currentCate, setCurrentCate] = useState('RAP');
  const token = localStorage.getItem('id');
  const [ref, inView] = useInView();

  const categoryList = [
    { category: '랩', value: 'RAP' },
    { category: '스트릿 댄스', value: 'STREET_DANCE' },
    { category: 'DJ', value: 'DJ' },
    { category: '그래피티', value: 'GRAFFITI' },
    { category: '비트박스', value: 'BEAT_BOX' },
    { category: '기타', value: 'ETC' },
    { category: '게시글', value: 'feed' },
  ];

  const { data, isLoading, isSuccess, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery(['getScrollShorts', token, currentCate], getScrollShorts, {
      getNextPageParam: (lastPage, pages: any) => {
        console.log(lastPage, 'lastPage');
        if (pages.length === 2 || lastPage.data.data.length < 10) {
          return undefined;
        }
        return pages.length + 1;
      },
    });

  useEffect(() => {
    // console.log(inView, 'inView');
    console.log(hasNextPage, 'hasNextPage');
    // hasNextPage
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const onClickCate = cate => {
    if (cate === 'feed') {
      naviagate('/feeds');
    }
    setCurrentCate(cate);
  };

  const onPostShortsLike = shortsId => {
    postShortLike(shortsId)
      .then(res => {
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

  if (isLoading || !data.pages) return;
  console.log('data', data);

  // if (
  //   data.response &&
  //   (data.response.request.status === 401 ||
  //     data.response.request.status === 400)
  // ) {
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
                      console.log(item);
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
          {data.pages &&
            data.pages.map(page => {
              return page.data.data.map((shorts, shortsIndex) => {
                const lastIndex = page.data.data.length - 1;
                return shortsIndex === lastIndex ? (
                  <div ref={ref} key={shorts.shortsId}>
                    <ShortsScroll
                      key={shorts.shortsId}
                      shorts={shorts}
                      onPostShortsLike={onPostShortsLike}
                      setShortsId={setShortsId}
                      setIsShowModal={setIsShowModal}
                    />
                  </div>
                ) : (
                  <ShortsScroll
                    key={shorts.shortsId}
                    shorts={shorts}
                    onPostShortsLike={onPostShortsLike}
                    setShortsId={setShortsId}
                    setIsShowModal={setIsShowModal}
                  />
                );
              });
            })}
          {/* {data.data.data ? (
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
          )} */}
        </div>
      </div>
      {isShowModal && (
        <ShortsModal setIsShowModal={setIsShowModal} shortsId={shortsId} />
      )}
    </>
  );
};

export default Shorts;
