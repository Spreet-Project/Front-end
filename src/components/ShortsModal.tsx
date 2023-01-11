import React from 'react';
import '../assets/styles/scss/shortsModal.scss';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import sweetAlert from '../core/utils/sweetAlert';
import { Navigate, useNavigate } from 'react-router-dom';

import { deleteShorts, getDetailShorts, getShorts } from '../core/api/shorts';

const ShortsModal = ({ setIsShowModal, shortsId }): JSX.Element => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(
    ['shortsDetail', shortsId],
    getDetailShorts,
    {
      // suspense: true,
    },
  );

  const commentList: string[] = [
    '첫번째 댓글',
    '두번째 댓글',
    '세번째 댓글',
    '네번째 댓글',
  ];

  const onClickModify = () => {
    if (!window.confirm('해당글을 수정하시겠습니까?')) return;
    navigate(`/modify/${shortsId}`);
  };

  const deleteMutation = useMutation(shortsId => deleteShorts(shortsId));

  //여기서 useMutaion객체는 변이함수를 반환하게 된다?
  if (deleteMutation.isSuccess) {
    sweetAlert(1000, 'success', '해당 게시글이 삭제되었습니다.');
  }

  if (isLoading) return;
  if (!data) {
    return;
  }

  console.log(data);
  return (
    <>
      {isLoading && <div> 로딩중입니다</div>}
      <div className="modal-content">
        <div className="modal-video">
          <div className="modal-userInform">
            <iframe
              width="450px"
              height="450px"
              src={data.data.data.videoUrl}
            ></iframe>
            <p className="modal-userInform__title">
              <p>글번호: {shortsId}</p>
              <p>글제목: {data.data.data.title}</p>
              <p> 내용:{data.data.data.content}</p>
            </p>
            <p className="modal-userInform__author">작성자:닉네임 </p>
          </div>
        </div>
        <div className="modal-comment">
          {commentList &&
            commentList.map((comment, index) => {
              return (
                <div key={index} className="modal-comment-wrapper">
                  <div className="modal-comment__user-author">
                    작성자: 닉네임
                  </div>
                  <div className="modal-comment__user-comment">{comment}</div>
                </div>
              );
            })}

          <div className="modal-comment-write">
            <input type="text" />
            <button className="comment-btn__post">Post</button>
          </div>
          <div className="modal-triangle"></div>
        </div>
        <button
          className="modal-btn__close"
          onClick={() => {
            setIsShowModal(false);
          }}
        >
          X
        </button>
        <button className="modal-btn__modify" onClick={onClickModify}>
          글 수정하기
        </button>
        {deleteMutation.isError && (
          <div style={{ color: 'red' }}> mutaion 에러</div>
        )}
        <button
          className="modal-btn__delete"
          onClick={() => deleteMutation.mutate(shortsId)}
        >
          글 삭제하기
        </button>
      </div>
    </>
  );
};

export default ShortsModal;
