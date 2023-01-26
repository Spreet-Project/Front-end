import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/styles/scss/eventDetail.scss';
import { getDetailEvent } from '../core/api/event';

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
  console.log(id);
  const eventId = Number(id.id);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(
    ['eventDtail', eventId],
    getDetailEvent,
  );

  return (
    <div className="eventDetail-wrapper">
      <div className="eventDetail-eventWrapper">
        <div className="eventDetail-img"></div>
        <div className="eventDetail-infoWrapper">
          <h1 className="eventDetail-title">행사정보</h1>
          <p className="eventDetail-content">항해 수료 기념행사...</p>
          <p className="eventDetail-location">
            경기도 안양시 동안구 평촌동 중앙공원
          </p>
          <p className="eventDetail-date">2023. 02. 17.</p>
          <p className="eventDetail-time">오후 5:00</p>
          <div className="evenDetail-btnWrapper">
            <button className="eventDetail-btn">수정</button>
            <button className="eventDetail-btn">삭제</button>
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
            />
            <button className="eventDetail-commentWrapper__btn">등록</button>
          </div>
          <hr className="eventDetail-hr" />
        </div>
      </div>
      <div className="eventDtail-commentWrapper">
        <div className="eventDetail-commentWrapper__profile">
          <image className="eventDetail-commentWrapper__profileImg"></image>
          <div className="eventDetail-commentWrapper__id">
            아이디
            <span className="eventDetail-commentWrapper__time">오후 5:00</span>
          </div>
        </div>
        <div className="eventDetail-commentWrapper__like">
          <p className="eventDetail-commentWrapper__cemment">
            댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용
            댓글내용 댓글내용 댓글내용
          </p>
          <span className="material-icons">thumb_up</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
