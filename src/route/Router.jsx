import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Write from '../pages/Write';
import Shorts from '../pages/Shorts';
import Feed from '../pages/FeedShorts';
import Layout from './Layout';
import React from 'react';
import ModifyShorts from '../pages/ModifyShorts';
import ModifyFeed from '../pages/ModfiyFeed';
import Event from '../pages/Event';
import EventWrite from '../pages/EventWrite';
import KakaoLogin from '../pages/KakaoLogin';
import MyPage from '../pages/MyPage';
import FeedShorts from '../pages/FeedShorts';
import NaverLogin from '../pages/NaverLogin';
import EventDetail from '../pages/EventDetail';
import UserInform from '../components/mypage/UserInform';
import CrewInform from '../components/mypage/CrewInform';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/api/user/kakao/callback/*" element={<KakaoLogin />} />
        <Route path="/api/user/naver/callback/*" element={<NaverLogin />} />
        <Route path="/write" element={<Write />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/feeds" element={<FeedShorts />} />
        <Route path="/modifyShorts/:id" element={<ModifyShorts />} />
        <Route path="/modifyFeed/:id" element={<ModifyFeed />} />
        <Route path="/event" element={<Event />} />
        <Route path="/eventWrite" element={<EventWrite />} />
        <Route path="/eventDetail" element={<EventDetail />} />
        <Route path="/modify/:id" element={<ModifyShorts />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="userinform" element={<UserInform />} />
          {/* <Route path="crewinform" element={<CrewInform />} /> */}
        </Route>
        <Route path="*" element={<div>이거 404 페이지요</div>} />
      </Routes>
    </Layout>
  );
};

export default Router;
