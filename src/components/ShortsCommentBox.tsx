import React from 'react';

const ShortsCommentBox = ({
  isCommentModify,
  comment,
  modifyCommentId,
  modifyComment,
  setModifyComment,
  onCancleModifyComment,
  setIsCommentModify,
  modifyCommentMutation,
  deleteCommentMutation,
  onCheckCommentModify,
  loginNickname,
}): JSX.Element => {
  return (
    <>
      {isCommentModify && comment.shortsCommentId === modifyCommentId ? (
        <div className="modal-comment-wrapper">
          <div className="modal-comment__user-author">
            <div className="modal-comment__user-image">
              <img src={comment.profileImageUrl} />
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
                return modifyCommentMutation.mutate(comment.shortsCommentId);
              }}
            >
              수정 하기
            </button>
          </div>
        </div>
      ) : (
        <div key={comment.shortsCommentId} className="modal-comment-wrapper">
          <div className="modal-comment__user-author">
            <div className="modal-comment__user-image">
              <img src={comment.profileImageUrl} />
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
                deleteCommentMutation.mutate(comment.shortsCommentId);
              }}
            >
              삭제
            </button>
          )}
          {comment.nickname === loginNickname && (
            <button
              className="modal-comment__btn btn-modify"
              onClick={() => {
                onCheckCommentModify(comment.shortsCommentId, comment.content);
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

export default ShortsCommentBox;
