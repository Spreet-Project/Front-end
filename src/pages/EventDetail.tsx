import React, { useEffect, useState } from 'react';
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
  deleteEventDetail,
  getDetailEvent,
  getEventComment,
  modifyEventComment,
  postEventComment,
} from '../core/api/event';
import sweetAlert from '../core/utils/sweetAlert';
import EventDetailComment from '../components/event/EventDetailComment';

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
  const eventId = Number(id.id);
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const [isCommentModify, setIsCommentModify] = useState<boolean>(false);
  const [modifyCommentId, setModifyCommentId] = useState<number>(0);
  const [modifyComment, setModifyComment] = useState<string>(''); //수정 댓글 인풋
  const nickname = localStorage.getItem('nickname');

  const { data, isLoading, isError, error } = useQuery(
    ['eventDtail', eventId],
    getDetailEvent,
  );

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

      const imageSrc = '../images/kakaoMarker.png'; // 마커이미지의 주소입니다
      const imageSize = new window.kakao.maps.Size(32, 28); // 마커이미지의 크기입니다
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        data.data.data.location,
        function (result, status) {
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

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            const infowindow = new window.kakao.maps.InfoWindow({
              content:
                '<div style="text-align:center;" class="map-modal">행사 장소</div>',
            });
            infowindow.open(map, marker);

            window.kakao.maps.event.addListener(marker, 'click', () => {
              window.open(
                `https://map.kakao.com/link/to/${result[0].address.address_name},${result[0].y},${result[0].x}`,
                '__blank',
              );
            });
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        },
      );
    });
  };

  //댓글 조회
  const resultComment = useQuery(['eventComment', eventId], getEventComment);

  useEffect(() => {
    //댓글 부분 리렌더링으로 과부화?로 인한 useEffect
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, [data]);

  //게시글 삭제
  const onDeleteEvent = () => {
    deleteEventDetail(eventId).then(res => {
      if (!res) {
        return sweetAlert(1000, 'error', '게시글 삭제 중 오류 발생!');
      }
      sweetAlert(1000, 'succecss', '게시글 삭제 완료!');
      navigate('/event');
    });
  };

  //게시글 댓글 수정
  const modifyCommentMutation = useMutation(
    () =>
      modifyEventComment({
        commentId: modifyCommentId,
        content: modifyComment,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(['eventComment', eventId]),
    },
  );

  //댓글 생성
  const postCommentMutaion = useMutation(
    () => postEventComment({ eventId: eventId, content: comment }),
    {
      onSuccess: () => queryClient.invalidateQueries(['eventComment', eventId]),
    },
  );
  // 댓글 수정 중 수정 취소
  const onCancleModifyComment = () => {
    setIsCommentModify(false);
  };

  //댓글 수정하기
  const onCheckCommentModify = (commentId, content) => {
    if (!window.confirm('해당 댓글을 수정하시겠습니까?')) return;
    setModifyComment(content);
    setIsCommentModify(true); //수정중 상태
    setModifyCommentId(commentId);
  };

  const onChangeModifyComment = e => {
    setModifyComment(e.target.value);
  };

  //댓글 삭제
  const deleteEventCommentMutaion = useMutation(
    eventCommentId => deleteEventComment(eventCommentId),
    {
      onSuccess: () => queryClient.invalidateQueries(['eventComment', eventId]),
    },
  );

  if (isLoading || !data || resultComment.isLoading || !resultComment.data)
    return;
  // console.log(data.data.data);
  // console.log(resultComment, 'resultComment');

  return (
    <div className="eventDetail-wrapper">
      <div className="eventDetail-eventWrapper">
        <img
          src={data.data.data.eventImageUrl}
          className="eventDetail-img"
        ></img>
        <div className="eventDetail-infoWrapper">
          <h1 className="eventDetail-infoWrapper__title">
            {data.data.data.title}
          </h1>
          <p className="eventDetail-infoWrapper__content">
            {data.data.data.content}
          </p>
          <p className="eventDetail-infoWrapper__date">
            날짜: {data.data.data.date}
          </p>
          <p className="eventDetail-infoWrapper__time">
            시간: {data.data.data.time}
          </p>
          <p className="eventDetail-infoWrapper__location">
            장소: {data.data.data.location}
          </p>
          <div className="eventDetail-infoWrapper-profileImgWrapper">
            <img
              src={data.data.data.profileImageUrl}
              className="eventDetail-infoWrapper__profileImg"
            ></img>
            <p className="eventDetail-infoWrapper__nickname">
              {data.data.data.nickname}
            </p>
          </div>
          {nickname === data.data.data.nickname && (
            <div className="evenDetail-infoWrapper__btn-box">
              <button
                className="eventDetail-infoWrapper__modifyBtn"
                onClick={() => {
                  navigate(`/modifyEvent/${data.data.data.eventId}`);
                }}
              >
                수정
              </button>
              <button
                className="eventDetail-infoWrapper__deleteBtn"
                onClick={onDeleteEvent}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <div id="map" className="eventDetail-kakaoMap"></div>
      <div className="eventDtail-commentWrapper-commentWrite">
        <div className="eventDtail-commentWrapper__profile">
          <image className="eventDtail-commentWrapper__profileImg"></image>
        </div>
        <div className="eventDetail-commentWrapper-addWrap">
          <div>
            <input
              className="eventDetail-commentWrapper__inputComment"
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
          <hr className="eventDetail-commentWrapper__hr" />
        </div>
      </div>
      <div className="eventDtail-commentWrapper-commentMap">
        {resultComment.data.data.data &&
          resultComment.data.data.data.map(comment => (
            <EventDetailComment
              key={comment.eventCommentId}
              comment={comment}
              modifyCommentId={modifyCommentId}
              isCommentModify={isCommentModify}
              onCancleModifyComment={onCancleModifyComment}
              setIsCommentModify={setIsCommentModify}
              modifyCommentMutation={modifyCommentMutation}
              nickname={nickname}
              onCheckCommentModify={onCheckCommentModify}
              deleteEventCommentMutaion={deleteEventCommentMutaion}
              modifyComment={modifyComment}
              onChangeModifyComment={onChangeModifyComment}
            />
          ))}
      </div>
    </div>
  );
};

export default EventDetail;
