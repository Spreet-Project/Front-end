import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/myPage.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import UserInform from '../components/mypage/UserInform';
import ContentList from '../components/mypage/ContentList';
import FindPassword from '../components/mypage/FindPassword';
import Admin from '../components/mypage/Admin';
import { getUserInform } from '../core/api/mypage';

const MyPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const queryClient = useQueryClient();
  const [logIn, setLogIn] = useState(false);
  const [password, setPassword] = useState(false);
  const [id, setId] = useState(0);

  // const { isLoading, isError, data, error, isFetching } = useQuery(
  //   ['user'], //쿼리 키
  //   getUserInform, //비동기 처리함수(서버에 요청),
  //   {
  //     // suspense: true,
  //     // cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
  //     // staleTime: 5000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
  //     refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
  //   },
  // );

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
      title: '비밀번호 찾기',
    },
    {
      id: 3,
      title: '관리자',
    },
  ];

  // useEffect(() => {
  //   setProfile(data.data.data);
  //   setUserId(data.data.data);
  //   setuser
  // }, []);
  const onsubmitMyPage = e => {
    e.preventDefault();
  };

  const onProfileChange = e => {
    e.preventDefault();
    setProfile(URL.createObjectURL(e.target.files[0]));
  };

  // if (isLoading || isFetching || !data) return;

  // if (data.response && data.response.request.status === 401) {
  //   localStorage.removeItem('id');
  // }

  // console.log(data, 'data');

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
      {id === 0 && (
        <UserInform
          profile={profile}
          onProfileChange={onProfileChange}
          onsubmitMyPage={onsubmitMyPage}
        />
      )}
      {id === 1 && <ContentList />}
      {id === 2 && <FindPassword />}
      {id === 3 && <Admin />}
    </>
  );
};

export default MyPage;
