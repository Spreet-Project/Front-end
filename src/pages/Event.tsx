import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getEvent } from '../core/api/event';
import '../assets/styles/scss/event.scss';
import { useNavigate } from 'react-router-dom';
import onLoadKakaoMapHandler from '../core/utils/onLoadKakaoMap';

export default function Event(): JSX.Element {
  const navigate = useNavigate();
  const [currentLocal, setCurrentLocal] = useState<string>('all');
  //Event행사 가져오기
  const { data, isLoading, isError } = useQuery(
    ['getEvent', currentLocal],
    getEvent,
  );

  const onChangeLocal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value === currentLocal);
    setCurrentLocal(e.target.value);
  };

  useEffect(() => {
    onLoadKakaoMapHandler(data);
  }, [data]);

  if (!data || isLoading) return;

  return (
    <>
      <div id="map" style={{ width: '100%', height: '600px' }}></div>;
      <div className="event-sector">
        <select
          name="local-category"
          className="local-category"
          onChange={onChangeLocal}
          value={currentLocal}
        >
          <option value="all">전체</option>
          <option value="A01">서울</option>
          <option value="A02">경기</option>
          <option value="A03">인천</option>
          <option value="A04">강원</option>
          <option value="A05">충북</option>
          <option value="A06">충남</option>
          <option value="A07">대전</option>
          <option value="A08">경북</option>
          <option value="A09">경남</option>
          <option value="A10">대구</option>
          <option value="A11">울산</option>
          <option value="A12">부산</option>
          <option value="A13">전북</option>
          <option value="A14">전남</option>
          <option value="A15">광주</option>
          <option value="A16">제주</option>
        </select>
        <div className="event-wrapper">
          {data.data.data &&
            data.data.data.map((event, index) => {
              return (
                <div
                  key={index}
                  className="event-item"
                  onClick={() => {
                    navigate(`/eventDetail/${event.eventId}`);
                  }}
                >
                  <img
                    src={event.eventImageUrl}
                    className="event-item__image"
                  />
                  <div className="event-infrom">
                    <img
                      src={event.profileImageUrl}
                      className="event-item__profile"
                    />
                    <p>{event.title}</p>
                  </div>
                  <span className="event-item__date">날짜: {event.date}</span>
                  <span className="event-item__time">시간: {event.time}</span>
                  {event.location.length > 20 ? (
                    <p className="event-item__location">
                      장소: {event.location.substr(0, 20) + '...'}
                    </p>
                  ) : (
                    <p className="event-item__location">
                      장소: {event.location}
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
