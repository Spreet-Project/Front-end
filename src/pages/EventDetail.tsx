import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/scss/eventDetail.scss';

const EventDetail = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div>이미지</div>
        <div>
          <h2>행사정보</h2>
          <p>행사내용</p>
        </div>
        <button>버튼</button>
      </div>
      <div>2</div>
      <div>3</div>
    </div>
  );
};

export default EventDetail;
