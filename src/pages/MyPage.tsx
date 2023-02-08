import React, { useState } from 'react';
import '../assets/styles/scss/myPage.scss';
import { useQuery } from 'react-query';
import UserInform from '../components/mypage/UserInform';
import ContentList from '../components/mypage/ContentList';
import ChangePassword from '../components/mypage/ChangePassword';
import Admin from '../components/mypage/Admin';
import { getUserInform } from '../core/api/mypage';
const MyPage = () => {
  const userRole = localStorage.getItem('userRole');
  const isSocial = Boolean(localStorage.getItem('isSocial'));
  const [id, setId] = useState(0);

  const { isLoading, isError, data, error, isFetching } = useQuery(
    ['user'], //쿼리 키
    getUserInform, //비동기 처리함수(서버에 요청),
    {
      // suspense: true,
      // cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
      // staleTime: 5000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
      refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
    },
  );

  const tabList = [
    {
      id: 0,
      title: '회원정보 수정',
    },
    {
      id: 1,
      title: '게시글',
    },
    !isSocial && {
      id: 2,
      title: '비밀번호 변경',
    },
    userRole === 'ROLE_ADMIN' && {
      id: 3,
      title: '관리자',
    },
  ];

  if (isLoading || !data.data.data) return;
  // console.log(data, 'data');
  return (
    <>
      <div className="mypage-sidebar">
        <div className="mypage-category">
          <ul>
            {tabList.map(item =>
              item.title !== '관리자' ? (
                <li key={item.id} onClick={() => setId(item.id)}>
                  {item.title}
                </li>
              ) : (
                userRole === 'ROLE_ADMIN' && (
                  <li key={item.id} onClick={() => setId(item.id)}>
                    {item.title}
                  </li>
                )
              ),
            )}
          </ul>
        </div>
      </div>

      {data.data.data && id === 0 && <UserInform userInform={data.data.data} />}
      {id === 1 && <ContentList />}
      {data.data.data && id === 2 && !isSocial && (
        <ChangePassword userEmail={data.data.data.email} />
      )}
      {id === 3 && <Admin />}
    </>
  );
};

export default MyPage;
