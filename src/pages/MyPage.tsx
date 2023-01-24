import React, { useState, useEffect } from 'react';
import '../assets/styles/scss/myPage.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import UserInform from '../components/UserInform';

const MyPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const queryClient = useQueryClient();
  const [logIn, setLogIn] = useState(false);
  const [password, setPassword] = useState(false);
  const [id, setId] = useState(0);
  const data = [
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

  return (
    <>
      <div className="mypage-sidebar">
        <div className="mypage-category">
          <ul>
            {data.map(item => (
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
    </>
  );
};

export default MyPage;
