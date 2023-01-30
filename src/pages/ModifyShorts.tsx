import React, { useEffect, useState } from 'react';
import '../assets/styles/scss/write.scss';
import { useInputs } from '../core/hooks/useInput';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { getDetailShorts, updateShorts } from '../core/api/shorts';
import sweetAlert from '../core/utils/sweetAlert';

interface Shorts {
  id: number;
  title: string;
  content: string;
  category: string;
  file: FormData;
}

const ModifyShorts = (): JSX.Element => {
  const id = useParams();
  const shortsId = Number(id.id);
  const navigate = useNavigate();
  const [shortsCate, setShortsCate] = useState('RAP');
  const [inputs, onChangeInput, clearInput, setInputs] = useInputs();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const { data, isLoading, isError, error } = useQuery(
    ['shortsDetail', shortsId],
    getDetailShorts,
  );

  const { title, content } = inputs;

  useEffect(() => {
    if (!isLoading) {
      setInputs({
        title: data.data.data.title,
        content: data.data.data.content,
      });
      setFileUrl(data.data.data.videoUrl);
    }
  }, [isLoading]);

  const onChangeVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUrl('');
    const videoFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;
    if (videoFile.size > maxSize) {
      return sweetAlert(
        1000,
        'error',
        '영상사이즈는 10MB 이내로 등록 가능합니다.',
      );
    }
    const videoUrl = URL.createObjectURL(videoFile);
    setFile(e.target.files[0]);
    setFileUrl(videoUrl);
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShortsCate(e.target.value);
  };

  const onShortsSubmit = () => {
    if (title.length === 0) {
      return sweetAlert(1000, 'error', '제목을 확인해주세요(공백제거)');
    }
    if (!file) {
      return sweetAlert(1000, 'error', '영상파일을 추가해주세요.');
    }
    if (content.length === 0) {
      return sweetAlert(1000, 'error', '내용을 입력해주세요');
    }
    console.log(file);
    const newShorts: Shorts = {
      id: shortsId,
      title: title,
      content: content,
      category: shortsCate,
      file: file,
    };

    updateShorts(newShorts).then(res => {
      sweetAlert(1000, 'success', '피드 수정 성공!');
      navigate('/');
    });
  };

  return (
    <div className="write-content">
      <iframe src={fileUrl} className="write-showFile-box"></iframe>
      <div className="write-inform-box">
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
        <p>제목</p>
        <input
          type="text"
          className="title-input"
          name="title"
          value={title || ''}
          onChange={onChangeInput}
          placeholder="제목을 입력해주세요"
        />
        <p>영상 파일</p>
        <input type="file" accept="video/*" onChange={onChangeVideoFile} />
        <p>내용</p>
        <textarea
          name="content"
          value={content || ''}
          onChange={onChangeInput}
          placeholder="내용을 입력해주세요"
        ></textarea>

        <hr className="write-hr"></hr>

        <button className="write-btn__submit" onClick={onShortsSubmit}>
          확인
        </button>
      </div>
    </div>
  );
};

export default ModifyShorts;
