import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/scss/eventWrite.scss';
import { postEventWrite } from '../core/api/event';
import sweetAlert from '../core/utils/sweetAlert';
import imageCompression from 'browser-image-compression';
import KakaoMapModal from '../components/kakaomap/KakaoMapmodal';

const EventWrite = () => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
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
    if (title.length > 20) {
      sweetAlert(1000, 'error', '제목은 20이하로 입력해주세요');
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
    postEventWrite(eventWriteData)
      .then(res => {
        if (!res) {
          return sweetAlert(1000, 'error', '행사 게시글 작성 중 오류');
        }
        sweetAlert(1000, 'success', '행사 게시글 작성 성공!');
        navigate('/event');
      })
      .catch(error => {
        sweetAlert(1000, 'error', '행사 게시글 작성 실패');
      });
  };

  // 제목
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 내용
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 날짜
  const onchangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // 시간
  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  // 위치
  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  //리사이징 함수
  const handleFileOnChange = async file => {
    const options = { maxSizeMB: 10, maxWidthOrHeight: 100 };
    try {
      const compressedFile = await imageCompression(file, options);
      const resultFile = new File([compressedFile], compressedFile.name, {
        type: compressedFile.type,
      });
      return resultFile;
    } catch (error) {
      sweetAlert(1000, 'error', '파일 변환중 오류!');
    }
  };

  // 이미지
  const onChangeEventImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newFile = await handleFileOnChange(e.target.files[0]);
      setEventImage(newFile);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const resultImage = reader.result;
        setFileUrl(resultImage);
      };
    } catch (error) {
      sweetAlert(1000, 'error', '파일 변환중 오류!');
    }
  };

  ///다음 검색 주소 검색결과
  const handleComplete = data => {
    const fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      // fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      setLocation(fullAddress);
    }
    //fullAddress -> 전체 주소반환
  };

  return (
    <div className="eventWrite-content">
      <img src={fileUrl} className="eventWrite-showFile-box" />
      <div className="eventWrite-form-box">
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={title}
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
          위치 찾기
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
          handleComplete={handleComplete}
          setIsShowModal={setIsShowModal}
          location={location}
        />
      )}
    </div>
  );
};

export default EventWrite;
