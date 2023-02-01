import React, { useState } from 'react';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/styles/scss/eventDetail.scss';
import {
  deleteEventComment,
  deleteEventDetail,
  getDetailEvent,
  getEventComment,
  modifyEventComment,
  postEventComment,
} from '../core/api/event';
import sweetAlert from '../core/utils/sweetAlert';

interface Event {
  id: number;
  title: string;
  content: string;
  location: string;
  file: FormData;
  nickname: string;
  date: string;
  time: string;
}

const EventDetail = (): JSX.Element => {
  const id = useParams();
  const eventId = Number(id.id);
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const [isCommentModify, setIsCommentModify] = useState<boolean>(false);
  const [modifyCommentId, setModifyCommentId] = useState<number>(0);
  const [modifyComment, setModifyComment] = useState<string>(''); //수정 댓글 인풋

  const { data, isLoading, isError, error } = useQuery(
    ['eventDtail', eventId],
    getDetailEvent,
  );

  //댓글 조회
  const resultComment = useQuery(['eventComment', eventId], getEventComment);

  //게시글 삭제
  const onDeleteEvent = () => {
    deleteEventDetail(eventId).then(res => {
      if (!res) {
        return sweetAlert(1000, 'error', '게시글 삭제 중 오류 발생!');
      }
      sweetAlert(1000, 'succecss', '게시글 삭제 완료!');
      navigate('/event');
    });
  };

  //게시글 수정
  const modifyCommentMutation = useMutation(
    () =>
      modifyEventComment({
        commentId: modifyCommentId,
        content: modifyComment,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(['eventComment', eventId]),
    },
  );

  //댓글 생성
  const postCommentMutaion = useMutation(
    () => postEventComment({ eventId: eventId, content: comment }),
    {
      onSuccess: () => queryClient.invalidateQueries(['eventComment', eventId]),
    },
  );
  // 댓글 수정 중 수정 취소
  const onCancleModifyComment = () => {
    setIsCommentModify(false);
  };

  //댓글 수정하기
  const onCheckCommentModify = (commentId, content) => {
    if (!window.confirm('해당 댓글을 수정하시겠습니까?')) return;
    setModifyComment(content);
    setIsCommentModify(true); //수정중 상태
    setModifyCommentId(commentId);
  };

  const onChangeModifyComment = e => {
    setModifyComment(e.target.value);
  };

  //댓글 삭제
  const deleteEventCommentMutaion = useMutation(
    eventCommentId => deleteEventComment(eventCommentId),
    {
      onSuccess: () => queryClient.invalidateQueries(['eventComment', eventId]),
    },
  );

  if (isLoading || !data || resultComment.isLoading || !resultComment.data)
    return;
  // console.log(data.data.data);
  console.log(resultComment, 'resultComment');

  return (
    <div className="eventDetail-wrapper">
      <div className="eventDetail-eventWrapper">
        <img
          src={data.data.data.eventImageUrl}
          className="eventDetail-img"
        ></img>
        <div className="eventDetail-infoWrapper">
          <h1 className="eventDetail-infoWrapper__title">
            {data.data.data.title}
          </h1>
          <p className="eventDetail-infoWrapper__content">
            {data.data.data.content}
          </p>
          <p className="eventDetail-infoWrapper__location">
            장소: {data.data.data.location}
          </p>
          <p className="eventDetail-infoWrapper__date">
            날짜: {data.data.data.date}
          </p>
          <p className="eventDetail-infoWrapper__time">
            시간: {data.data.data.time}
          </p>
          <div className="eventDetail-infoWrapper-profileImgWrapper">
            <img
              src={data.data.data.profileImageUrl}
              className="eventDetail-infoWrapper__profileImg"
            ></img>
            <p className="eventDetail-infoWrapper__nickname">
              {data.data.data.nickname}
            </p>
          </div>
          <div className="evenDetail-infoWrapper__btn-box">
            <button className="eventDetail-infoWrapper__modifyBtn">수정</button>
            <button
              className="eventDetail-infoWrapper__deleteBtn"
              onClick={onDeleteEvent}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <div className="eventDetail-kakaoMap"></div>
      <div className="eventDtail-commentWrapper-commentWrite">
        <div className="eventDtail-commentWrapper__profile">
          <image className="eventDtail-commentWrapper__profileImg"></image>
        </div>
        <div className="eventDetail-commentWrapper-addWrap">
          <div>
            <input
              className="eventDetail-commentWrapper-inputComment"
              placeholder="Add a comment..."
              type="text"
              name="comment"
              value={comment}
              onChange={e => {
                setComment(e.target.value);
              }}
            />
            <button
              className="eventDetail-commentWrapper__addBtn"
              onClick={() => {
                postCommentMutaion.mutate();
                setComment('');
              }}
            >
              등록
            </button>
          </div>
          <hr className="eventDetail-commentWrapper__hr" />
        </div>
      </div>
      <div className="eventDtail-commentWrapper-commentMap">
        {resultComment.data.data.data &&
          resultComment.data.data.data.map(comment => (
            <>
              <div className="eventDetail-commentWrapper__profile">
                <img
                  src={data.data.data.profileImageUrl}
                  className="eventDetail-commentWrapper__profileImg"
                ></img>
                <div className="eventDetail-commentWrapper__id">
                  {comment.nickname}
                  <div className="eventDetail-commentWrapper__btn-box">
                    {modifyCommentId === comment.eventCommentId &&
                    isCommentModify ? (
                      <>
                        <button
                          className="eventDetail-commentWrapper__deleteBtn"
                          onClick={() => {
                            onCancleModifyComment();
                          }}
                        >
                          수정 취소
                        </button>
                        <button
                          className="eventDetail-commentWrapper__deleteBtn"
                          onClick={() => {
                            setIsCommentModify(false);
                            return modifyCommentMutation.mutate();
                          }}
                        >
                          수정 완료
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="eventDetail-commentWrapper__deleteBtn"
                          onClick={() => {
                            onCheckCommentModify(
                              comment.eventCommentId,
                              comment.content,
                            );
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="eventDetail-commentWrapper__deleteBtn"
                          onClick={() => {
                            deleteEventCommentMutaion.mutate(
                              comment.eventCommentId,
                            );
                          }}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>

                  <span className="eventDetail-commentWrapper__time">
                    {comment.createAt}
                  </span>
                </div>
              </div>
              <div className="eventDetail-commentWrapper__like">
                {modifyCommentId === comment.eventCommentId &&
                isCommentModify ? (
                  <input
                    className="eventDetail-commentWrapper__inputcomment"
                    value={modifyComment}
                    onChange={onChangeModifyComment}
                  />
                ) : (
                  <p className="eventDetail-commentWrapper__comment">
                    {comment.content}
                  </p>
                )}
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default EventDetail;
