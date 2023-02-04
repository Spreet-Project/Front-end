import React from 'react';
import '../../assets/styles/scss/kakaoMapModal.scss';
import DeaumPostCode from 'react-daum-postcode';

const KakaoMapModal = ({
  handleComplete,
  setIsShowModal,
  location,
}): JSX.Element => {
  // 다음 주소 검색창 닫기 함수
  const mapScript = document.createElement('script');
  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_URL}&autoload=false`;

  document.head.appendChild(mapScript);
  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(location, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div class=map-modal>
            행사 장소
          </div>`,
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    });
  };
  mapScript.addEventListener('load', onLoadKakaoMap);

  return (
    <div className="event-modal-content">
      <div id="map"></div>
      <button
        className="modal-btn__close"
        onClick={() => {
          setIsShowModal(false);
        }}
      >
        x
      </button>
      <div className="event-modal-postcode">
        <DeaumPostCode
          autoClose={false}
          onComplete={handleComplete}
          style={{ width: '400px', height: '400px' }}
        />

        <div className="event-modal__btn-box">
          <p>* 마커가 나오지 않았다면 상세주소를 입력했는지 확인해주세요!</p>
          <div className="event-mdoal-btn">
            <button
              className="event-btn__confirm"
              onClick={() => {
                setIsShowModal(false);
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KakaoMapModal;
