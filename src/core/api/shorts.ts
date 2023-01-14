import { instance, baseURL, subURL } from '../axios/axios';
import sweetAlert from '../utils/sweetAlert';

export const postShorts = async payload => {
  console.log(payload);
  return await subURL.post('/shorts', payload);
};

export const postFeed = async payload => {
  console.log(payload);
  return await subURL.post('/feed', payload);
};

export const updateShorts = async payload => {
  try {
    const { id, file, content, title, category } = payload;
    const shortsData = new FormData();
    shortsData.append('file', file);
    shortsData.append('title', title);
    shortsData.append('content', content);
    shortsData.append('category', category);

    return await subURL.put(`/shorts/${id}`, shortsData);
  } catch (error) {
    sweetAlert(1000, 'error', '쇼츠 수정중 에러');
  }
};

export const getShorts = async payload => {
  try {
    const { queryKey } = payload;
    const { category, token } = queryKey[1];
    console.log(payload, 'payload');
    //shorts카테고리별 게시물조회조회
    if (token) {
      return await baseURL.get(`/shorts?category=${category}&page=1&size=10`);
    }
    return await instance.get(`/shorts?category=${category}&page=1&size=10`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
  }
};

export const getFeed = async () => {
  //Feed 최신 게시물 조회
  return await baseURL.get('/feed/recent?page=1&size=10');
};

export const getDetailFeed = async payload => {
  //Feed 상세 게시물 조회
  const { queryKey } = payload;
  const id = queryKey[1];
  return await baseURL.get(`/feed/${id}`);
};

export const deleteShorts = async shortsId => {
  return await baseURL.delete(`/shorts/${shortsId}`);
};

export const getDetailShorts = async payload => {
  //모달창에서 필요한 쇼츠상세 게시물 조회
  const { queryKey } = payload;
  const id = queryKey[1];
  return await instance.get(`/shorts/${id}`);
};

export const postShortsComment = async payload => {
  //모달창에서 댓글 작성
  try {
    const { shortsId, content } = payload;
    return await baseURL.post(`/shorts/${shortsId}/comment`, {
      content: content,
    });
  } catch (error) {
    sweetAlert(1000, 'error', '댓글 입력 오류!');
  }
};

export const deleteShortsComment = async payload => {
  //모달창에서 댓글 작성
  try {
    return await baseURL.delete(`/shorts/comment/${payload}`);
  } catch (error) {
    sweetAlert(1000, 'error', '댓글 입력 오류!');
  }
};

export const modifyShortsComment = async payload => {
  //모달창에서 댓글 수정
  try {
    const { commentId, content } = payload;
    return await baseURL.put(`/shorts/comment/${commentId}`, {
      content: content,
    });
  } catch (error) {
    sweetAlert(1000, 'error', '댓글 수정 오류!');
  }
};

export const postShortLike = async shortsId => {
  //모달창에서 댓글 수정
  try {
    console.log(shortsId);
    return await baseURL.post(`/shorts/like/${shortsId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '좋아요 기능 오류!');
  }
};
