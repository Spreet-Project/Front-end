import React, { useEffect, useState } from 'react';
import '../assets/styles/scss/shortsModal.scss';
import axios from 'axios';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import sweetAlert from '../core/utils/sweetAlert';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  deleteShorts,
  getDetailShorts,
  postShortsComment,
  deleteShortsComment,
  modifyShortsComment,
  getShortsComment,
} from '../core/api/shorts';

const ShortsModal = ({ setIsShowModal, shortsId }): JSX.Element => {
  const navigate = useNavigate();
  const [isCommentModify, setIsCommentModify] = useState(false);
  const [modifyCommentId, setModifyCommentId] = useState(0);
  const [comment, setComment] = useState(''); //댓글 인풋
  const [modifyComment, setModifyComment] = useState(''); //수정 댓글 인풋
  const queryClient = useQueryClient();

  queryClient.invalidateQueries(['shortsDetail'], { exact: true });
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['shortsDetail', shortsId],
    getDetailShorts,
    // {
    //   // suspense: true,
    //   refetchOnMount: 'always',
    // },
  );

  const resultCommnet = useQuery(['shortsComment', shortsId], getShortsComment);

  const onCancleModifyComment = () => {
    setIsCommentModify(false);
  };

  const onCheckCommentModify = (commentId, content) => {
    if (!window.confirm('해당 댓글을 수정하시겠습니까?')) return;
    setModifyComment(content);
    setIsCommentModify(true);
    setModifyCommentId(commentId);
  };

  const onClickModify = () => {
    if (!window.confirm('해당 글을 수정하시겠습니까?')) return;
    navigate(`/modifyShorts/${shortsId}`);
  };

  const postCommentMutation = useMutation(
    () => postShortsComment({ shortsId: shortsId, content: comment }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['shortsComment', shortsId]),
    },
  );
  const deleteShortsMutation = useMutation(shortsId => deleteShorts(shortsId), {
    // onSettled: () => queryClient.invalidateQueries(['shortsDetail', shortsId]),
  });

  const deleteCommentMutation = useMutation(
    shortsId => deleteShortsComment(shortsId),
    // {
    //   onSettled: () =>
    //     queryClient.invalidateQueries(['shortsComment', shortsId]),
    // },
  );

  const modifyCommentMutation = useMutation(
    commentId =>
      modifyShortsComment({ commentId: commentId, content: modifyComment }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['shortsComment', shortsId]),
    },
  );

  //여기서 useMutaion객체는 변이함수를 반환하게 된다?
  if (deleteShortsMutation.isSuccess) {
    sweetAlert(1000, 'success', '해당 게시글이 삭제되었습니다.');
  }

  // if (deleteCommentMutation.isSuccess) {
  //   sweetAlert(1000, 'success', '해당 댓글이 삭제되었습니다.');
  // }

  // if (modifyCommentMutation.isSuccess) {
  //   sweetAlert(1000, 'success', '댓글 수정 성공');
  // }

  if (isLoading || resultCommnet.isLoading) return;
  if (!data || !resultCommnet) return;
  return (
    <>
      {isLoading && <div> 로딩중입니다</div>}
      <div className="modal-content">
        <div className="modal-video">
          <div className="modal-userInform">
            <iframe
              width="450px"
              height="350px"
              src={data.data.data.videoUrl}
            ></iframe>
            <div className="modal-userInform__title">
              <p>글번호: {shortsId}</p>
              <p>글제목: {data.data.data.title}</p>
              <p> 내용:{data.data.data.content}</p>
            </div>
            <p className="modal-userInform__author">
              작성자:{data.data.data.nickname}
            </p>
          </div>
        </div>
        <div className="modal-comment">
          <div className="modal-comment__comment-box">
            {resultCommnet.data.data.data &&
              resultCommnet.data.data.data.map(comment => {
                // console.log(comment);
                {
                  return isCommentModify &&
                    comment.shortsCommentId === modifyCommentId ? (
                    <div
                      key={comment.shortsCommentId}
                      className="modal-comment-wrapper"
                    >
                      <div className="modal-comment__user-author">
                        {comment.commentId}
                        작성자:{comment.nickname} &nbsp;
                        <span className="modal-comment__date">
                          {comment.modifiedAt.slice(0, 10)}
                        </span>
                      </div>
                      <input
                        className="modal-comment__user-comment modify-input"
                        value={modifyComment}
                        onChange={e => {
                          setModifyComment(e.target.value);
                        }}
                      />
                      <div>
                        <button
                          className="modal-comment__btn btn-cancel"
                          onClick={onCancleModifyComment}
                        >
                          수정 취소
                        </button>
                        <button
                          className="modal-comment__btn btn-modify"
                          onClick={() => {
                            setIsCommentModify(false);
                            return modifyCommentMutation.mutate(
                              comment.shortsCommentId,
                            );
                          }}
                        >
                          수정 하기
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={comment.shortsCommentId}
                      className="modal-comment-wrapper"
                    >
                      <div className="modal-comment__user-author">
                        {comment.commentId}
                        작성자:{comment.nickname} &nbsp;
                        <span className="modal-comment__date">
                          {comment.modifiedAt.slice(0, 10)}
                        </span>
                      </div>
                      <div className="modal-comment__user-comment">
                        {comment.content}
                      </div>
                      <button
                        className="modal-comment__btn btn-delete"
                        onClick={() => {
                          if (
                            !window.confirm(
                              '정말 해당 댓글을 삭제하시겠습니까?',
                            )
                          )
                            return;
                          deleteCommentMutation.mutate(comment.shortsCommentId);
                        }}
                      >
                        댓글 삭제
                      </button>
                      <button
                        className="modal-comment__btn btn-modify"
                        onClick={() => {
                          onCheckCommentModify(
                            comment.shortsCommentId,
                            comment.content,
                          );
                        }}
                      >
                        댓글 수정
                      </button>
                    </div>
                  );
                }
              })}
          </div>

          <div className="modal-comment-write">
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={e => {
                setComment(e.target.value);
              }}
            />
            <button
              className="comment-btn__post"
              onClick={() => {
                postCommentMutation.mutate();
                setComment('');
              }}
            >
              Post
            </button>
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
        {deleteShortsMutation.isError && (
          <div style={{ color: 'red' }}> mutaion 에러</div>
        )}
        <button
          className="modal-btn__delete"
          onClick={() => {
            if (!window.confirm('정말 해당 게시글을 삭제하시겠습니까?')) return;
            deleteShortsMutation.mutate(shortsId);
          }}
        >
          글 삭제하기
        </button>
      </div>
    </>
  );
};

export default ShortsModal;
