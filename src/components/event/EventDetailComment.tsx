import React from 'react';

const EventDetailComment = ({
  comment,
  modifyCommentId,
  isCommentModify,
  onCancleModifyComment,
  setIsCommentModify,
  modifyCommentMutation,
  nickname,
  onCheckCommentModify,
  deleteEventCommentMutaion,
  modifyComment,
  onChangeModifyComment,
}): JSX.Element => {
  return (
    <>
      <div className="eventDetail-commentWrapper__profile">
        <div className="eventDetail-commentbox">
          <img
            src={comment.profileImageUrl}
            className="eventDetail-commentWrapper__profileImg"
          ></img>
          <div className="eventDetail-commentWrapper__id">
            {comment.nickname}
            <span className="eventDetail-commentWrapper__time">
              {comment.createAt}
            </span>
          </div>
          <div className="eventDetail-commentWrapper__btn-box">
            {modifyCommentId === comment.eventCommentId && isCommentModify ? (
              <>
                <button
                  className="eventDetail-commentWrapper__deleteBtn"
                  onClick={() => {
                    onCancleModifyComment();
                  }}
                >
                  수정 취소
                </button>
                <button
                  className="eventDetail-commentWrapper__deleteBtn"
                  onClick={() => {
                    setIsCommentModify(false);
                    return modifyCommentMutation.mutate();
                  }}
                >
                  수정 완료
                </button>
              </>
            ) : (
              nickname === comment.nickname && (
                <>
                  <button
                    className="eventDetail-commentWrapper__deleteBtn"
                    onClick={() => {
                      onCheckCommentModify(
                        comment.eventCommentId,
                        comment.content,
                      );
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="eventDetail-commentWrapper__deleteBtn"
                    onClick={() => {
                      deleteEventCommentMutaion.mutate(comment.eventCommentId);
                    }}
                  >
                    삭제
                  </button>
                </>
              )
            )}
          </div>
        </div>
      </div>
      <div className="eventDetail-commentWrapper__like">
        {modifyCommentId === comment.eventCommentId && isCommentModify ? (
          <input
            className="eventDetail-commentWrapper__inputComment"
            value={modifyComment}
            onChange={onChangeModifyComment}
          />
        ) : (
          <p className="eventDetail-commentWrapper__comment">
            {comment.content}
          </p>
        )}
      </div>
    </>
  );
};

export default EventDetailComment;
