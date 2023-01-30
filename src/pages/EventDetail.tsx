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
          <h1 className="eventDetail-title">{data.data.data.title}</h1>
          <p className="eventDetail-content">{data.data.data.content}</p>
          <p className="eventDetail-location">{data.data.data.location}</p>
          <p className="eventDetail-date">{data.data.data.date}</p>
          <p className="eventDetail-time">{data.data.data.time}</p>
          <div>
            <img
              src={data.data.data.profileImageUrl}
              className="eventDetail-commentWrapper__profileImg"
            ></img>
          </div>
          <div className="evenDetail-btnWrapper">
            <button className="eventDetail-btn">수정</button>
            <button className="eventDetail-btn" onClick={onDeleteEvent}>
              삭제
            </button>
          </div>
        </div>
      </div>
      <div className="eventDetail-map"></div>
      <div className="eventDtail-commentWrite">
        <div className="eventDtail-profileWrapper">
          <image className="eventDtail-profile"></image>
        </div>
        <div className="eventDetail-addWrapper">
          <div>
            <input
              className="eventDetail-inputComment"
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
          <hr className="eventDetail-hr" />
        </div>
      </div>
      <div className="eventDtail-commentWrapper">
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
                    className="eventDetail-commentWrapper__cemment"
                    value={modifyComment}
                    onChange={onChangeModifyComment}
                  />
                ) : (
                  <p className="eventDetail-commentWrapper__cemment">
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
