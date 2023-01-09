import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/scss/write.scss';
import imageCompression from 'browser-image-compression';
import { useInputs } from '../core/hooks/useInput';
import sweetAlert from '../core/utils/sweetAlert';

export const postFeed = payload => {
  try {
    axios.post('http://localhost:4000/feed', payload);
    return sweetAlert(1000, 'success', '피드 작성 성공');
  } catch (error) {
    return sweetAlert(1000, 'error', error.response.data.msg);
  }
};

const Write = () => {
  const [inputs, onChangeInput, clearInput] = useInputs();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const { feedTitle, feedContent } = inputs;

  useEffect(() => {
    clearInput();
  }, []);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files[0];
    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 600,
    };

    try {
      const compressedFile = await imageCompression(targetFile, options);
      setFile(compressedFile);
      // const imgUrl = URL.createObjectURL(compressedFile);
      // console.log('imgUrl', imgUrl);
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then(res => {
        setFileUrl(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFeedSubmit = () => {
    const newFeed = {
      id: 9,
      title: feedTitle,
      content: feedContent,
    };
    // const feedData = new FormData();
    // feedData.append('file', fileUrl);
    // console.log(fileUrl);
    postFeed(newFeed);
  };

  return (
    <div className="write-content">
      <img src={fileUrl} className="write-showFile-box" />
      <div className="write-inform-box">
        <p>제목</p>
        <input
          type="text"
          className="title-input"
          name="feedTitle"
          value={feedTitle || ''}
          onChange={onChangeInput}
          placeholder="제목을 입력해주세요"
        />
        <p>이미지 파일</p>
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          onChange={onChangeFile}
        />
        <p>내용</p>
        <textarea
          name="feedContent"
          value={feedContent || ''}
          onChange={onChangeInput}
          placeholder="내용을 입력해주세요"
        ></textarea>
      </div>
      <div className="write-btn-box">
        <button className="write-btn__submit" onClick={onFeedSubmit}>
          확인
        </button>
        <button className="write-btn__goback">이전으로</button>
      </div>
    </div>
  );
};

export default Write;
