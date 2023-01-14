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
      <div className="eventWrite-inform-box">
        <p>제목</p>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          onChange={onChangeTitle}
        />
        <p>상세 위치</p>
        <input
          type="text"
          name="location"
          placeholder="위치를 입력해주세요"
          onChange={onChangeLocation}
        />
        <p>이미지 파일</p>
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          onChange={onChangeImgFile}
        />
        <p>내용</p>
        <textarea
          name="content"
          placeholder="내용을 입력해주세요"
          onChange={onChangeContent}
        ></textarea>
      </div>
      <div className="evnetWrite-btn-box">
        <button onClick={onEventWriteSubmit}>확인</button>
        <button>이전으로</button>
      </div>
    </div>
  );
};

export default EventWrite;
