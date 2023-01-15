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
    const videoUrl = URL.createObjectURL(videoFile);
    setFile(e.target.files[0]);
    setFileUrl(videoUrl);
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShortsCate(e.target.value);
  };

  const updateMutation = useMutation(() => {
    if (!file) {
      sweetAlert(1000, 'error', '영상파일을 추가해주세요.');
      return;
    }
    const newShorts: Shorts = {
      id: shortsId,
      title: title,
      content: content,
      category: shortsCate,
      file: file,
    };

    console.log(newShorts);
    return updateShorts(newShorts);
  });

  if (updateMutation.isSuccess) {
    sweetAlert(1000, 'success', '해당 게시글이 수정되었습니다.');
  }

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
      </div>
      <div className="write-btn-box">
        <button
          className="write-btn__submit"
          onClick={() => {
            updateMutation.mutate();
          }}
        >
          확인
        </button>
        <button className="write-btn__goback">이전으로</button>
      </div>
    </div>
  );
};

export default ModifyShorts;
