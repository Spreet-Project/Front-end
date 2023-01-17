import sweetAlert from '../utils/sweetAlert';
import { instance, baseURL, subURL } from '../axios/axios';

export const postEventWrite = async payload => {
  console.log(payload);
  return await subURL.post('/eventWrite', payload);
};

export const postFeed = async payload => {
  return await subURL.post('/feed', payload);
};

export const getFeed = async () => {
  //Feed 최신 게시물 조회
  try {
    return await instance.get('/feed/recent?page=1&size=10');
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    return error;
  }
};

export const getDetailFeed = async payload => {
  //Feed 상세 게시물 조회
  const { queryKey } = payload;
  const id = queryKey[1];
  return await baseURL.get(`/feed/${id}`);
};

export const getFeedComment = async payload => {
  //모달창에서 필요한 피드상세 댓글 조회
  const { queryKey } = payload;
  const id = queryKey[1];
  return await instance.get(`/feed/${id}/comment`);
};

export const deleteFeed = async feedId => {
  try {
    return await baseURL.delete(`/feed/${feedId}`);
  } catch (error) {
    sweetAlert(1000, 'error', '피드게시물 삭제 오류!');
    return error;
  }
};

export const updateFeed = async payload => {
  try {
    //payload에서 feed게시물 id받기
    return await subURL.put(`/feed/${payload.id}`, payload);
  } catch (error) {
    sweetAlert(1000, 'error', '쇼츠 수정중 에러');
  }
};

export const postFeedComment = async payload => {
  //모달창에서 댓글 작성
  try {
    const { feedId, content } = payload;
    return await baseURL.post(`/feed/${feedId}/comment`, {
      content: content,
    });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '댓글 입력 오류!');
  }
};

export const deleteFeedComment = async payload => {
  //모달창에서 댓글 삭제
  try {
    console.log('payload', payload);
    return await baseURL.delete(`/feed/comment/${payload}`);
  } catch (error) {
    sweetAlert(1000, 'error', '댓글 삭제 오류!');
  }
};

export const modifyFeedComment = async payload => {
  //모달창에서 댓글 수정
  try {
    const { commentId, content } = payload;
    return await baseURL.put(`/feed/comment/${commentId}`, {
      content: content,
    });
  } catch (error) {
    sweetAlert(1000, 'error', '댓글 수정 오류!');
  }
};

export const postFeedLike = async feedId => {
  //모달창에서 피드 좋아요
  try {
    // console.log(feedId);
    return await baseURL.post(`/feed/like/${feedId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '좋아요 기능 오류!');
  }
};
