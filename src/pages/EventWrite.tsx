import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/scss/eventWrite.scss';
import { postEventWrite } from '../core/api/feed';
import { useInputs } from '../core/hooks/useInput';
import sweetAlert from '../core/utils/sweetAlert';

const EventWrite = () => {
  const navigate = useNavigate();
  const [inputs, onChangeInput, clearInput] = useInputs();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState();
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    clearInput();
  }, []);

  const onEventWriteSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventWriteData = new FormData();
    // 이미지 여러개 들어가야함 -> for문 필요
    eventWriteData.append('file', file);
    eventWriteData.append('title', title);
    eventWriteData.append('content', content);
    eventWriteData.append('location', location);
    console.log(eventWriteData);
    for (const value of eventWriteData.values()) {
      console.log(value);
    }
    postEventWrite(eventWriteData)
      .then(res => {
        // navigate('/');
        sweetAlert(1000, 'success', '행사 게시글 작성 성공!');
      })
      .catch(error => {
        sweetAlert(1000, 'error', '행사 게시글 작성 실패');
      });
  };

  const onChangeImgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files[0];
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 600,
    };
  };

  //제목
  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  //위치
  const onChangeLocation = e => {
    setLocation(e.target.value);
  };

  //내용
  const onChangeContent = e => {
    setContent(e.target.value);
  };

  return (
    <div className="eventWrite-content">
      <img src={fileUrl} className="eventWrite-showFile-box" />
      <form className="eventWrite-form-box">
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
          type="file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          className="eventWrite-inputImg"
          onChange={onChangeImgFile}
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
          {/* <button>이전으로</button> */}
        </div>
      </form>
    </div>
  );
};

export default EventWrite;
