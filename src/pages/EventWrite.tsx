import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/scss/eventWrite.scss';
import { postEventWrite } from '../core/api/event';
import { useInputs } from '../core/hooks/useInput';
import sweetAlert from '../core/utils/sweetAlert';

const EventWrite = () => {
  const navigate = useNavigate();
  const [inputs, onChangeInput, clearInput] = useInputs();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [eventImage, setEventImage] = useState(null);
  const [location, setLocation] = useState();
  const [fileUrl, setFileUrl] = useState('');

  // useEffect(() => {
  // clearInput();
  // }, []);

  const onEventWriteSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newEnvet = {
      title: title,
      content: content,
      location: location,
      date: date,
      time: time,
      file: eventImage,
    };

    // const eventWriteData = new FormData();

    // console.log(typeof date, typeof time, typeof eventImage);
    // eventWriteData.append('title', title);
    // eventWriteData.append('content', content);
    // eventWriteData.append('location', location);
    // eventWriteData.append('date', date);
    // eventWriteData.append('time', time);
    // eventWriteData.append('file', eventImage);
    // console.log(eventWriteData);
    // for (const value of eventWriteData.values()) {
    //   console.log(value);
    // }
    postEventWrite(newEnvet)
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
    setEventImage(e.target.value);
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
          onChange={onChangeLocation}
        />
        <input
          type="date"
          className="eventWrite-input-date"
          onChange={onchangeDate}
        />
        <input
          type="time"
          className="eventWrite-input-time"
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
          onChange={onChangeContent}
        ></textarea>
        <hr className="eventWrite-hr" />
        <div>
          <button className="eventWrite-btn" onClick={onEventWriteSubmit}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventWrite;
