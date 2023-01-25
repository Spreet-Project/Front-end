import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/scss/eventDetail.scss';

const EventDetail = () => {
  const navigate = useNavigate();

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
          <p className="eventDetail-time">17:00</p>
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
        <div className="eventDetail-commentWrapper">
          <input
            className="eventDetail-inputComment"
            placeholder="Add a comment..."
          />
          <hr className="eventDetail-hr" />
        </div>
      </div>
      <div>
        <div>
          <image>프로필</image>
          <div>
            id <span>시간</span>
          </div>
        </div>
        <div>
          <p>내용</p>
          <span>좋아요</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
