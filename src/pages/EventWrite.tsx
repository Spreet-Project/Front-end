import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/scss/eventWrite.scss';
import { postEventWrite } from '../core/api/event';
import { useInputs } from '../core/hooks/useInput';
import sweetAlert from '../core/utils/sweetAlert';
import KakaoMapModal from '../components/kakaomap/KakaoMapmodal';

const EventWrite = () => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  // const [inputs, onChangeInput, clearInput] = useInputs();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [eventImage, setEventImage] = useState(null);
  const [location, setLocation] = useState<string>();
  const [fileUrl, setFileUrl] = useState<any>('');

  const onEventWriteSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.length === 0) {
      sweetAlert(1000, 'error', '제목을 입력해주세요');
      return;
    }
    if (location.length === 0) {
      sweetAlert(1000, 'error', '위치를 입력해주세요');
      return;
    }
    if (date.length === 0) {
      sweetAlert(1000, 'error', '날짜를 입력해주세요');
      return;
    }
    if (time.length === 0) {
      sweetAlert(1000, 'error', '시간을 입력해주세요');
      return;
    }
    if (!eventImage) {
      sweetAlert(1000, 'error', '이미지를 추가해주세요');
      return;
    }
    if (content.length === 0) {
      sweetAlert(1000, 'error', '내용을 입력해주세요');
      return;
    }
    const eventWriteData = new FormData();
    eventWriteData.append('title', title);
    eventWriteData.append('content', content);
    eventWriteData.append('location', location);
    eventWriteData.append('date', date);
    eventWriteData.append('time', time);
    eventWriteData.append('file', eventImage);
    // console.log(eventWriteData);
    // for (const value of eventWriteData.values()) {
    //   console.log(value);
    // }
    postEventWrite(eventWriteData)
      .then(res => {
        console.log(res, 'res');
        // navigate('/');
        sweetAlert(1000, 'success', '행사 게시글 작성 성공!');
      })
      .catch(error => {
        sweetAlert(1000, 'error', '행사 게시글 작성 실패');
      });
  };

  // 제목
  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  // 내용
  const onChangeContent = e => {
    setContent(e.target.value);
  };

  // 날짜
  const onchangeDate = e => {
    setDate(e.target.value);
  };

  // 시간
  const onChangeTime = e => {
    setTime(e.target.value);
  };

  // 위치
  const onChangeLocation = e => {
    setLocation(e.target.value);
  };

  // 이미지
  const onChangeEventImage = e => {
    setEventImage(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const resultImage = reader.result;
      // console.log('result', resultImage);
      setFileUrl(resultImage);
    };
  };

  //이미지 리사이징
  // const onChangeEventImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const targetFile = e.target.files[0];
  //   const options = {
  //     maxSizeMB: 10,
  //     maxWidthOrHeight: 600,
  //   };
  // };

  return (
    <div className="eventWrite-content">
      <img src={fileUrl} className="eventWrite-showFile-box" />
      <div className="eventWrite-form-box">
        <input
          type="text"
          name="title"
          placeholder="제목"
          className="eventWrite-input"
          onChange={onChangeTitle}
        />
        <input
          type="text"
          name="location"
          placeholder="상세위치"
          className="eventWrite-input"
          value={location}
          onChange={onChangeLocation}
        />
        <p>정확한 도로명 주소를 기입해주세요</p>
        <button
          onClick={() => {
            setIsShowModal(true);
          }}
          className="eventWrite-btn"
        >
          위치 확인
        </button>
        <input
          type="date"
          className="eventWrite-input-date"
          value={date}
          onChange={onchangeDate}
        />
        <input
          type="time"
          className="eventWrite-input-time"
          value={time}
          onChange={onChangeTime}
        />
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          className="eventWrite-input-file"
          onChange={onChangeEventImage}
        />
        <textarea
          name="content"
          placeholder="내용"
          className="eventWrite-textatea"
          value={content}
          onChange={onChangeContent}
        ></textarea>
        <hr className="eventWrite-hr" />
        <div>
          <button className="eventWrite-btn" onClick={onEventWriteSubmit}>
            저장
          </button>
        </div>
      </div>
      {isShowModal && (
        <KakaoMapModal
          setIsShowModal={setIsShowModal}
          setLocation={setLocation}
          location={location}
        />
      )}
    </div>
  );
};

export default EventWrite;
