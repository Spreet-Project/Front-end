import React, { useEffect, useState, useRef } from 'react';
import '../assets/styles/scss/write.scss';
import imageCompression from 'browser-image-compression';
import { useInputs } from '../core/hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { postShorts, postFeed } from '../core/api/shorts';
import sweetAlert from '../core/utils/sweetAlert';

const Write = (): JSX.Element => {
  const navigate = useNavigate();
  const [inputs, onChangeInput, clearInput] = useInputs();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [postImages, setPostImages] = useState([]); //서버로 보낼 이미지 데이터
  const [dettailImages, setDetailImages] = useState([]); //프리뷰 보낼 이미지 데이터
  const [isFeed, setIsFeed] = useState(false);
  const [shortsCate, setShortsCate] = useState('RAP');
  const [feedTransX, setFeedTransX] = useState(0);
  const feedChildRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const { title, content } = inputs;

  useEffect(() => {
    clearInput();

    const getFeedCordinate = () => {
      if (!feedRef.current) return;
      const feedLeft = feedRef.current.getBoundingClientRect().left;
      setFeedTransX(feedLeft);
    };
    getFeedCordinate();
  }, []);

  const onPaigingBtn = (index: number): void => {
    if (!feedChildRef) return;
    const feedRef_NodeWidth: number =
      dettailImages.length > 0
        ? feedChildRef.current.getBoundingClientRect().width
        : 0;
    const calculationValue: number =
      -(feedRef_NodeWidth / dettailImages.length) * index;
    feedRef.current.style.transform = `translateX(${calculationValue}px)`;
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShortsCate(e.target.value);
  };

  const onCheckFeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsFeed(true);
      setFile('');
      setFileUrl('');
    } else {
      setIsFeed(false);
      setPostImages([]);
      setDetailImages([]);
    }
    clearInput();
  };

  const onChangeVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(null);
    setFileUrl(null);
    const videoFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;
    if (videoFile.size > maxSize) {
      return sweetAlert(
        1000,
        'error',
        '영상사이즈는 10MB 이하로 등록 가능합니다.',
      );
    }
    const videoUrl = URL.createObjectURL(videoFile);
    setFile(e.target.files[0]);
    setFileUrl(videoUrl);
  };

  const handleFileOnChange = async file => {
    const options = { maxSizeMB: 10, maxWidthOrHeight: 600 };
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

  const handleUrlOnChange = async compressedFile => {
    try {
      const url = await imageCompression.getDataUrlFromFile(compressedFile);
      return url;
    } catch (error) {
      sweetAlert(1000, 'error', '파일 변환중 오류!');
    }
  };

  const onChangeImgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (postImages || dettailImages) {
      setPostImages([]);
      setDetailImages([]);
    }
    const fileArr = e.target.files;

    const feedImageLength = fileArr.length;
    if (feedImageLength > 5) {
      sweetAlert(2000, 'error', '사진은 5장을 초과할 수 없습니다.');
      return;
    }

    try {
      for (let i = 0; i < feedImageLength; i++) {
        const newFile = await handleFileOnChange(fileArr[i]);
        const newFileUrl = await handleUrlOnChange(newFile);
        setPostImages(file => [...file, newFile]);
        setDetailImages(url => [...url, newFileUrl]);
      }
    } catch (error) {
      sweetAlert(1000, 'error', '파일 변환중 오류!');
    }
  };

  const onShortsSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (title.length === 0) {
      sweetAlert(1000, 'error', '제목을 확인해주세요(공백제거)');
      return;
    }
    if (title.length > 20) {
      return sweetAlert(1000, 'error', '제목은 20자 이하로 작성해주세요.');
    }
    if (!file) {
      sweetAlert(1000, 'error', '영상을 추가해주세요');
      return;
    }
    if (content.length === 0) {
      sweetAlert(1000, 'error', '내용을 입력해주세요');
      return;
    }
    const shortsData = new FormData();
    shortsData.append('file', file);
    shortsData.append('title', title);
    shortsData.append('content', content);
    shortsData.append('category', shortsCate);
    postShorts(shortsData)
      .then(res => {
        sweetAlert(1000, 'success', '쇼츠 작성 성공!');
        navigate('/');
      })
      .catch(error => {
        if (error.response.data.statusCode === 401) {
          sweetAlert(1000, 'error', '죄송합니다. 로그인을 다시해주세요.');
          return navigate('/login');
        }
        sweetAlert(1000, 'error', '쇼츠 작성 실패');
      });
  };

  const onFeedSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (title.length === 0) {
      return sweetAlert(1000, 'error', '제목을 확인해주세요(공백제거)');
    }
    if (title.length > 20) {
      return sweetAlert(1000, 'error', '제목은 20자 이하로 작성해주세요.');
    }
    if (postImages.length === 0) {
      return sweetAlert(1000, 'error', '이미지를 추가해주세요');
    }
    if (content.length === 0) {
      return sweetAlert(1000, 'error', '내용을 입력해주세요');
    }
    const feedData: any = new FormData();
    for (const feed of Array.from(postImages)) {
      feedData.append('file', feed);
    }
    feedData.append('title', title);
    feedData.append('content', content);
    postFeed(feedData)
      .then(res => {
        sweetAlert(1000, 'success', '피드 작성 성공!');
        navigate('/');
      })
      .catch(error => {
        sweetAlert(1000, 'error', '피드 작성 실패');
      });
  };

  return (
    <div className="write-content">
      {isFeed ? (
        <div className="feed-image__row">
          <div className="feed-image__carousel">
            <div className="feed-image__list" ref={feedRef}>
              <div className="feed-image__wrapper" ref={feedChildRef}>
                {dettailImages &&
                  dettailImages.map((item, index) => {
                    return (
                      <img
                        key={index}
                        src={item}
                        className="feed-image__container"
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="feed-image__paiging">
            {dettailImages &&
              dettailImages.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="carousel-paging__btn"
                    onClick={() => {
                      onPaigingBtn(index);
                    }}
                  ></button>
                );
              })}
          </div>
        </div>
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
            <option value="STREET_DANCE">스트릿 댄스</option>
            <option value="GRAFFITI">그래피티</option>
            <option value="ETC">기타</option>
          </select>
        )}
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
              multiple
              onChange={onChangeImgFile}
            />
          </>
        ) : (
          <>
            <p>영상 파일</p>
            <input type="file" accept="video/*" onChange={onChangeVideoFile} />
          </>
        )}

        <textarea
          name="content"
          value={content || ''}
          onChange={onChangeInput}
          placeholder="내용을 입력해주세요"
        ></textarea>
        <div className="write-checkfeed">
          <input type="checkbox" onChange={onCheckFeed} id="checkFeed" />
          <label htmlFor="checkFeed" className="checkFeed">
            피드게시물로 작성
          </label>
        </div>

        <hr className="write-hr"></hr>
        {isFeed ? (
          <button className="write-btn__submit" onClick={onFeedSubmit}>
            확인
          </button>
        ) : (
          <button className="write-btn__submit" onClick={onShortsSubmit}>
            확인
          </button>
        )}
      </div>
    </div>
  );
};

export default Write;
