import axios from 'axios';
import { instance, baseURL, subURL } from '../axios/axios';

export const postShorts = async payload => {
  console.log(payload);
  return await subURL.post('/shorts', payload);
};
export const postFeed = async payload => {
  console.log(payload);
  return await subURL.post('/feed', payload);
};

export const updateShorts = async payload => {
  const { id } = payload;
  return await axios.put(`http://localhost:4000/shorts/${id}`, payload);
};

export const getShorts = async () => {
  //shorts카테고리별 게시물조회조회
  return await instance.get('/shorts?category=RAP&page=1&size=10');
};

export const getFeed = async () => {
  //Feed 최신 게시물 조회
  return await instance.get('/feed/recent');
};
export const deleteShorts = async shortsId => {
  return await axios.delete(`http://localhost:4000/shorts/${shortsId}`);
};

export const getDetailShorts = async payload => {
  //모달창에서 필요한 쇼츠상세 게시물 조회
  const { queryKey } = payload;
  const id = queryKey[1];
  return await instance.get(`/shorts/${id}`);
};
