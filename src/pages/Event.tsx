import React, { useRef, useState, useEffect } from 'react';
import { useQuery, useQueries } from 'react-query';
import { getEvent } from '../core/api/event';
import '../assets/styles/scss/event.scss';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from './KakaoLogin';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Event() {
  const navigate = useNavigate();
  //Event행사 가져오기
  const { data, isLoading, isError } = useQuery(['getEvent'], getEvent);

  const mapScript = document.createElement('script');

  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_URL}&autoload=false`;
  document.head.appendChild(mapScript);
  const infowindow = new window.kakao.maps.InfoWindow({});
  const onLoadKakaoMap = () => {
    if (isLoading) return;
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      const geocoder = new window.kakao.maps.services.Geocoder();

      if (!data.data.data) return;
      data.data.data.map(event => {
        geocoder.addressSearch(event.location, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });
            // const infowindow = new window.kakao.maps.InfoWindow({});
            // 인포윈도우로 장소에 대한 설명을 표시합니다
            window.kakao.maps.event.addListener(marker, 'mouseover', () => {
              infowindow.setContent(`<div class=event-modal>
              <img src='${event.eventImageUrl}' class=event-modal__image />
              <p class=event-modal__title >${event.title}</p>
              <div class=event-modal__date >${event.date} 시간: ${event.time}</div>
              <p class=event-modal__location >${event.location}</p>
            </div>`),
                infowindow.open(map, marker);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', () => {
              infowindow.close();
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      });
    });
  };

  if (isLoading) return;
  mapScript.addEventListener('load', onLoadKakaoMap);
  console.log(data, 'event');
  return (
    <>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>;
      <div className="event-sector">
        <div className="event-wrapper">
          {data.data.data.map((event, index) => {
            return (
              <div
                key={index}
                className="event-item"
                onClick={() => {
                  navigate(`/eventDetail/${event.eventId}`);
                }}
              >
                <img src={event.eventImageUrl} className="event-item__image" />
                <div className="event-infrom">
                  <img
                    src={event.profileImageUrl}
                    className="event-item__profile"
                  />
                  <p>{event.title}</p>
                </div>
                {event.location.length > 20 ? (
                  <p className="event-item__location">
                    장소: {event.location.substr(0, 20) + '...'}
                  </p>
                ) : (
                  <p className="event-item__location">장소: {event.location}</p>
                )}

                <span className="event-item__date">날짜: {event.date}</span>
                <span className="event-item__time">시간: {event.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
