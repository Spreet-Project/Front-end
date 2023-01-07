import React, { useEffect, useState } from 'react';
import '../assets/styles/scss/write.scss';
import imageCompression from 'browser-image-compression';

const Write = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const onChangeFile = async e => {
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

  return (
    <div className="write-content">
      <img src={fileUrl} className="write-showFile-box" />
      <div className="write-inform-box">
        <p>제목</p>
        <input type="text" className="title-input" />
        <p>이미지 파일</p>
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          onChange={onChangeFile}
        />
        <p>내용</p>
        <textarea></textarea>
      </div>
      <div className="write-btn-box">
        <button className="write-btn__submit">확인</button>
        <button className="write-btn__goback">이전으로</button>
      </div>
    </div>
  );
};

export default Write;
