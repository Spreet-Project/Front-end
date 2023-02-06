import React, { useRef } from 'react';

const FeedCommentBox = ({
  isCommentModify,
  comment,
  modifyCommentId,
  modifyComment,
  setModifyComment,
  profileImageUrl,
  onCancleModifyComment,
  setIsCommentModify,
  modifyCommentMutation,
  deleteCommentMutation,
  onCheckCommentModify,
  loginNickname,
}): JSX.Element => {
  return (
    <>
      {isCommentModify && comment.commentId === modifyCommentId ? (
        <div key={comment.commentId} className="modal-comment-wrapper">
          <div className="modal-comment__user-author">
            <div className="modal-comment__user-image">
              <img src={profileImageUrl} />
            </div>
            {comment.nickname} &nbsp;
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
                return modifyCommentMutation.mutate(comment.commentId);
              }}
            >
              수정 하기
            </button>
          </div>
        </div>
      ) : (
        <div key={comment.commentId} className="modal-comment-wrapper">
          <div className="modal-comment__user-author">
            <div className="modal-comment__user-image">
              <img src={profileImageUrl} />
            </div>
            {comment.nickname} &nbsp;
            <span className="modal-comment__date">
              {comment.modifiedAt.slice(0, 10)}
            </span>
          </div>
          <div className="modal-comment__user-comment">{comment.content}</div>

          {comment.nickname === loginNickname && (
            <button
              className="modal-comment__btn btn-delete"
              onClick={() => {
                if (!window.confirm('정말 해당 댓글을 삭제하시겠습니까?'))
                  return;
                deleteCommentMutation.mutate(comment.commentId);
              }}
            >
              삭제
            </button>
          )}

          {comment.nickname === loginNickname && (
            <button
              className="modal-comment__btn btn-modify"
              onClick={() => {
                onCheckCommentModify(comment.commentId, comment.content);
              }}
            >
              수정
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FeedCommentBox;
