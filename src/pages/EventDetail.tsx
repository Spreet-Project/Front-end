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
  getDetailEvent,
  getEventComment,
  postEventComment,
} from '../core/api/event';

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
  // console.log(id);
  const eventId = Number(id.id);
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery(
    ['eventDtail', eventId],
    getDetailEvent,
  );
  //댓글 조회
  const resultComment = useQuery(['eventComment', eventId], getEventComment);

  //댓글 생성
  const postCommentMutaion = useMutation(
    () => postEventComment({ eventId: eventId, content: comment }),
    {
      onSuccess: () => queryClient.invalidateQueries(['eventComment', eventId]),
    },
  );

  //댓글 삭제
  const deleteEventCommentMutaion = useMutation(
    eventCommentId => deleteEventComment(eventCommentId),

    {
      // onSettled: () => queryClient.invalidateQueries(['eventComment', eventId]),
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
            <button
              className="eventDetail-btn"
              onClick={() => {
                // deleteEventDetail
              }}
            >
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
                  <button
                    className="eventDetail-commentWrapper__deleteBtn"
                    onClick={() => {
                      deleteEventCommentMutaion.mutate(comment.eventCommentId);
                    }}
                  >
                    삭제
                  </button>
                  <span className="eventDetail-commentWrapper__time">
                    {comment.createAt}
                  </span>
                </div>
              </div>
              <div className="eventDetail-commentWrapper__like">
                <p className="eventDetail-commentWrapper__cemment">
                  {comment.content}
                </p>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default EventDetail;
