import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/myPage.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import UserInform from '../components/mypage/UserInform';
import ContentList from '../components/mypage/ContentList';
import FindPassword from '../components/mypage/ChangePassword';
import Admin from '../components/mypage/Admin';
import { getUserInform } from '../core/api/mypage';
import sweetAlert from '../core/utils/sweetAlert';

const MyPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [logIn, setLogIn] = useState(false);
  const [password, setPassword] = useState(false);
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
    {
      id: 2,
      title: '비밀번호 변경',
    },
    {
      id: 3,
      title: '관리자',
    },
  ];

  if (data && data.response && data.name === 'AxiosError') {
    localStorage.removeItem('id');
    sweetAlert(1000, 'error', '죄송합니다 다시 로그인해주세요');
    navigate('/login');
  }
  if (isLoading || !data) return;

  return (
    <>
      <div className="mypage-sidebar">
        <div className="mypage-category">
          <ul>
            {tabList.map(item => (
              <li key={item.id} onClick={() => setId(item.id)}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {id === 0 && <UserInform userInform={data.data.data} />}
      {id === 1 && <ContentList />}
      {id === 2 && <FindPassword userEmail={data.data.data.email} />}
      {id === 3 && <Admin />}
    </>
  );
};

export default MyPage;
