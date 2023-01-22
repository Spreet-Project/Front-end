import React, { useRef, useState, useEffect } from 'react';
import { useQuery, useQueries } from 'react-query';
import { getEvent } from '../core/api/event';
import '../assets/styles/scss/event.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Event() {
  const locationList = [
    '경기도 부천시 역곡로 13번길',
    '서울특별시 영등포구 여의도동 84-1',
    '서울 종로구 홍지문2길20 상명대학교',
    '서울 성북구 정릉로77 국민대학교',
    '광주 광역시 동구 광산동 74',
    '경기 부천시 심곡동 498',
    '서울 마포구 와우산로 121',
    '경기 부천시 중동로248번길 31',
    '서울특별시 마포구 와우산로21길 31',
  ];

  const { data, isLoading, isError } = useQuery(['getEvent'], getEvent);
  const mapScript = document.createElement('script');

  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_URL}&autoload=false`;

  document.head.appendChild(mapScript);

  const onLoadKakaoMap = () => {
    if (isLoading) return;
    const eventList = data.data.data;
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

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div class=event-modal>
                <img src='${event.eventImageUrl}' class=event-modal__eventimage />
                <div class=event-modal__inform>
                  <p>행사제목:${event.title}</p> 
                  <p>날짜:${event.date}</p>
                  <p>시간:${event.time}</p>
                  <div class=event-modal__userform >
                    <img src='${event.profileImageUrl}' class=event-modal__profileimg />
                    <p>${event.nickname}</p>
                  </div>
                </div> 
              </div>`,
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      });
    });
  };

  mapScript.addEventListener('load', onLoadKakaoMap);
  if (isLoading) return;
  console.log(data, 'event');
  return (
    <>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>;
      <div className="event-sector">
        <div className="event-wrapper">
          {locationList.map((item, index) => {
            return (
              <div key={index} className="event-item">
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
