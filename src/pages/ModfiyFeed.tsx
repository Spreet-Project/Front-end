import React, { useEffect, useState, useRef } from 'react';
import '../assets/styles/scss/write.scss';
import imageCompression from 'browser-image-compression';
import { useInputs } from '../core/hooks/useInput';
import { useNavigate, useParams } from 'react-router-dom';
import sweetAlert from '../core/utils/sweetAlert';
import { useMutation, useQuery } from 'react-query';
import { getDetailFeed, updateFeed } from '../core/api/feed';

interface Feed {
  id: number;
  title: string;
  content: string;
  file: FormData;
}

const ModifyFeed = (): JSX.Element => {
  const id = useParams();
  const feedId = Number(id.id);
  const navigate = useNavigate();
  const [inputs, onChangeInput, clearInput, setInputs] = useInputs();
  const [postImages, setPostImages] = useState([]); //서버로 보낼 이미지 데이터
  const [dettailImages, setDetailImages] = useState([]); //프리뷰 보낼 이미지 데이터
  const [feedTransX, setFeedTransX] = useState(0);
  const feedChildRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const { title, content } = inputs;

  const { data, isLoading, isError, error } = useQuery(
    ['feedDetail', feedId],
    getDetailFeed,
  );

  useEffect(() => {
    console.log(data);
    if (!isLoading) {
      setInputs({
        title: data.data.data.title,
        content: data.data.data.content,
      });
      setDetailImages([...data.data.data.imageUrlList]);
    }

    const getFeedCordinate = () => {
      if (!feedRef.current) return;
      const feedLeft = feedRef.current.getBoundingClientRect().left;
      setFeedTransX(feedLeft);
    };
    getFeedCordinate();
  }, [isLoading]);

  if (isLoading) return;

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

  const onFeedSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(postImages);
    // console.log(dettailImages);
    if (title.length === 0) {
      sweetAlert(1000, 'error', '제목을 확인해주세요(공백제거)');
    }
    if (postImages.length === 0) {
      sweetAlert(1000, 'error', '이미지를 추가해주세요');
    }
    if (content.length === 0) {
      sweetAlert(1000, 'error', '내용을 입력해주세요');
    }
    const feedData: any = new FormData();
    for (const feed of Array.from(postImages)) {
      console.log(feed);
      feedData.append('file', feed);
    }
    feedData.append('title', title);
    feedData.append('content', content);
    updateFeed(feedData, feedId).then(res => {
      console.log(res);
      sweetAlert(1000, 'success', '피드 수정 성공!');
    });
    // navigate('/');
  };

  if (!data) return;

  return (
    <div className="write-content">
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

      <div className="write-inform-box">
        <p>제목</p>
        <input
          type="text"
          className="title-input"
          name="title"
          value={title || ''}
          onChange={onChangeInput}
          placeholder="제목을 입력해주세요"
        />
        <p>이미지 파일</p>
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          multiple
          onChange={onChangeImgFile}
        />
        <p>내용</p>
        <textarea
          name="content"
          value={content || ''}
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

export default ModifyFeed;
