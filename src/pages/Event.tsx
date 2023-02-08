import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getEvent } from '../core/api/event';
import '../assets/styles/scss/event.scss';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Event() {
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
      const imageSrc = './images/kakaoMarker.png'; // 마커이미지의 주소입니다
      const imageSize = new window.kakao.maps.Size(32, 28); // 마커이미지의 크기입니다
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

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
              image: markerImage,
            });
            // const infowindow = new window.kakao.maps.InfoWindow({});
            // 인포윈도우로 장소에 대한 설명을 표시합니다
            window.kakao.maps.event.addListener(marker, 'mouseover', () => {
              infowindow.setContent(`<div style="border:2px solid #d10536;" class=event-modal>
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

            window.kakao.maps.event.addListener(marker, 'click', () => {
              window.open(
                `https://map.kakao.com/link/to/${result[0].address.address_name},${result[0].y},${result[0].x}`,
                '__blank',
              );
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      });
    });
  };
  useEffect(() => {
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, [data]);
  if (isLoading) return;

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
