import React, { useRef, useState, useLayoutEffect } from 'react';
import './shortsModal.scss';

const ShortsModal = ({ setIsShowModal }): JSX.Element => {
  const commentList: string[] = [
    '첫번째 댓글',
    '두번째 댓글',
    '세번째 댓글',
    '네번째 댓글',
  ];
  // const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className="modal-content">
      <div className="modal-video">
        <p className="modal-video__title">영상 제목들어갈 예정!</p>
        <p className="modal-video__author">작성자:닉네임</p>
      </div>
      <div className="modal-comment">
        {commentList &&
          commentList.map((comment, index) => {
            return (
              <div key={index} className="modal-comment-wrapper">
                <div className="modal-comment__user-author">작성자: 닉네임</div>
                <div className="modal-comment__user-comment">{comment}</div>
              </div>
            );
          })}

        <div className="modal-comment-write">
          <input type="text" />
          <button className="comment-btn__post">Post</button>
        </div>
      </div>
      <button
        className="modal-btn__close"
        onClick={() => {
          setIsShowModal(false);
        }}
      >
        X
      </button>
    </div>
  );
};

export default ShortsModal;
