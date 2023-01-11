import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/scss/write.scss';
import imageCompression from 'browser-image-compression';
import { useInputs } from '../core/hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { postShorts } from '../core/api/shorts';
import sweetAlert from '../core/utils/sweetAlert';

const Write = () => {
  const navigate = useNavigate();
  const [inputs, onChangeInput, clearInput] = useInputs();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [isFeed, setIsFeed] = useState(false);
  const [shortsCate, setShortsCate] = useState('RAP');

  const { title, content } = inputs;

  useEffect(() => {
    clearInput();
  }, []);

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setShortsCate(e.target.value);
  };

  const onCheckFeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsFeed(true);
      setFileUrl('');
    } else {
      setIsFeed(false);
      setFileUrl('');
    }
    clearInput();
  };

  const onChangeVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoFile = e.target.files[0];
    const videoUrl = URL.createObjectURL(videoFile);
    // console.log(videoUrl);
    setFile(e.target.files[0]);
    setFileUrl(videoUrl);
  };

  const onChangeImgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files[0];
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 600,
    };

    try {
      const compressedFile = await imageCompression(targetFile, options);
      setFile(compressedFile);
      // const imageUrl = URL.createObjectURL(compressedFile);
      // console.log('imageUrl', imageUrl);
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then(res => {
        setFileUrl(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onShortsSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const shortsData = new FormData();
    shortsData.append('file', file);
    shortsData.append('title', title);
    shortsData.append('content', content);
    shortsData.append('category', shortsCate);
    console.log(shortsData);
    for (const value of shortsData.values()) {
      console.log(value);
    }
    postShorts(shortsData)
      .then(res => {
        // navigate('/');
        sweetAlert(1000, 'success', '쇼츠 작성 성공!');
      })
      .catch(error => {
        sweetAlert(1000, 'error', '쇼츠 작성 실패');
      });
  };

  const onFeedSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newFeed = {
      id: 10,
      title: title,
      file: fileUrl,
      content: content,
    };
    console.log(newFeed);
    // const feedData = new FormData();
    // feedData.append('file', fileUrl);
    // console.log(fileUrl);
    // postShorts(newFeed);
    // navigate('/');
  };

  return (
    <div className="write-content">
      <div className="write-checkFeed">
        <input type="checkbox" onChange={onCheckFeed} id="checkFeed" />
        <label htmlFor="checkFeed" className="checkFeed">
          피드게시물로 작성
        </label>
      </div>
      {isFeed ? (
        <img src={fileUrl} className="write-showFile-box" />
      ) : (
        <iframe src={fileUrl} className="write-showFile-box"></iframe>
      )}

      <div className="write-inform-box">
        {!isFeed && (
          <select
            name="shorts-category"
            className="write-category"
            onChange={onChangeCategory}
          >
            <option value="RAP">랩</option>
            <option value="DJ">디제잉</option>
            <option value="BEAT_BOX">비트박스</option>
            <option value="STEET_DANCE">스트릿 댄스</option>
            <option value="GRAFFITI">그래피티</option>
            <option value="ETC">기타</option>
          </select>
        )}

        <p>제목</p>
        <input
          type="text"
          className="title-input"
          name="title"
          value={title || ''}
          onChange={onChangeInput}
          placeholder="제목을 입력해주세요"
        />
        {isFeed ? (
          <>
            <p>이미지 파일</p>
            <input
              type="file"
              accept="image/jpg, image/png, image/jpeg, image/gif"
              onChange={onChangeImgFile}
            />
          </>
        ) : (
          <>
            <p>영상 파일</p>
            <input type="file" accept="video/*" onChange={onChangeVideoFile} />
          </>
        )}

        <p>내용</p>
        <textarea
          name="content"
          value={content || ''}
          onChange={onChangeInput}
          placeholder="내용을 입력해주세요"
        ></textarea>
      </div>
      <div className="write-btn-box">
        {isFeed ? (
          <button className="write-btn__submit" onClick={onFeedSubmit}>
            확인
          </button>
        ) : (
          <button className="write-btn__submit" onClick={onShortsSubmit}>
            확인
          </button>
        )}

        <button className="write-btn__goback">이전으로</button>
      </div>
    </div>
  );
};

export default Write;
