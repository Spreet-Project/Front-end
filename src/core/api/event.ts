import sweetAlert from '../utils/sweetAlert';
import { instance, baseURL, subURL } from '../axios/axios';

export const getEvent = async () => {
  //Feed 최신 게시물 조회
  try {
    // console.log(payload, 'payload');
    //event행사 게시물조회조회
    return await instance.get('/event');
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    return error;
  }
};

export const postEventWrite = async payload => {
  try {
    return await subURL.post('/event', payload);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
  }
};

export const getDetailEvent = async payload => {
  try {
    //객체 구조 분해 할당
    const { queryKey } = payload;
    //배열 구조 분해 할당
    const [eventId] = [queryKey[1]];
    return await instance.get(`/event/${eventId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
  }
};

export const getEventComment = async payload => {
  try {
    //객체 구조 분해 할당
    const { queryKey } = payload;
    //배열 구조 분해 할당
    const [eventId] = [queryKey[1]];
    return await baseURL.get(`/event/${eventId}/comment`);
  } catch (error) {
    if (error.response.request.status === 401) {
      sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
  }
};

export const postEventComment = async payload => {
  //행사 디테일 댓글 작성
  try {
    const { eventId, content } = payload;
    return await baseURL.post(`/event/${eventId}/comment`, {
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

//행사 댓글 삭제
export const deleteEventComment = async commentId => {
  try {
    console.log(commentId);

    return await baseURL.delete(`/event/comment/${commentId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '댓글 삭제 오류!');
    return error;
  }
};

//행사 게시글 수정
export const putModifyEvent = async payload => {
  try {
    // console.log(payload, 'payload');
    const { eventId, eventWriteData } = payload;
    console.log(eventId, eventWriteData);
    return await subURL.put(`/event/${eventId}`, eventWriteData);
  } catch (error) {
    sweetAlert(1000, 'error', '행사 게시글 수정 오류!');
  }
};

//행사 상세페이지 게시글 삭제
export const deleteEventDetail = async eventId => {
  try {
    console.log(eventId, 'payload');

    return await baseURL.delete(`/event/${eventId}`);
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '게시글 삭제 오류!');
    return error;
  }
};

//행사 상제페이지 게시글 댓글 수정
export const modifyEventComment = async payload => {
  try {
    const { commentId, content } = payload;
    return await baseURL.put(`/event/comment/${commentId}`, { content });
  } catch (error) {
    if (error.response.request.status === 401) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다!');
    }
    sweetAlert(1000, 'error', '댓글 수정 중 오류!');
    return error;
  }
};
