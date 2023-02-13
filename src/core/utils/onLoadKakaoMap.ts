declare global {
  interface Window {
    kakao: any;
  }
}

const onLoadKakaoMapHandler = data => {
  const mapScript = document.createElement('script');

  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_URL}&autoload=false`;
  document.head.appendChild(mapScript);
  const infowindow = new window.kakao.maps.InfoWindow({});

  const onLoadKakaoMap = () =>
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

      console.log(data, 'data');
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
  mapScript.addEventListener('load', onLoadKakaoMap);
};

export default onLoadKakaoMapHandler;
