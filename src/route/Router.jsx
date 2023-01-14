import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Write from '../pages/Write';
import Shorts from '../pages/Shorts';
import Feed from '../pages/Feed';
import Layout from './Layout';
import React from 'react';
import ModifyShorts from '../pages/ModifyShorts';
import ModifyFeed from '../pages/ModfiyFeed';
import KaKaoMap from '../pages/KaKaoMap';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<Write />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/modifyShorts/:id" element={<ModifyShorts />} />
        <Route path="/modifyFeed/:id" element={<ModifyFeed />} />
        <Route path="/kakaoMap" element={<KaKaoMap />} />
        <Route path="*" element={<div>이거 404 페이지요</div>} />
      </Routes>
    </Layout>
  );
};

export default Router;
