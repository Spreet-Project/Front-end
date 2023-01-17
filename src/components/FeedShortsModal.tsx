import React, { useEffect, useState, useRef } from 'react';
import '../assets/styles/scss/feedShortsModal.scss';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import sweetAlert from '../core/utils/sweetAlert';
import { useNavigate } from 'react-router-dom';

import {
  getDetailFeed,
  deleteFeed,
  getFeedComment,
  postFeedComment,
  deleteFeedComment,
  modifyFeedComment,
} from '../core/api/feed';

const FeedShortsModal = ({ setIsShowModal, feedId }): JSX.Element => {
  const navigate = useNavigate();
  const [isCommentModify, setIsCommentModify] = useState(false);
  const [modifyCommentId, setModifyCommentId] = useState(0);
  const [comment, setComment] = useState(''); //댓글 인풋
  const [modifyComment, setModifyComment] = useState(''); //수정 댓글 인풋
  const queryClient = useQueryClient();
  const feedChildRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  queryClient.invalidateQueries(['shortsDetail'], { exact: true });
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['feedDetail', feedId],
    getDetailFeed,
    // {
    //   // suspense: true,
    //   refetchOnMount: 'always',
    // },
  );

  const resultCommnet = useQuery(['feedComment', feedId], getFeedComment);

  const onPaigingBtn = (index: number): void => {
    if (!feedChildRef) return;
    const feedRef_NodeWidth: number =
      data.data.data.imageUrlList.length > 0
        ? feedChildRef.current.getBoundingClientRect().width
        : 0;
    const calculationValue: number =
      -(feedRef_NodeWidth / data.data.data.imageUrlList.length) * index;
    feedRef.current.style.transform = `translateX(${calculationValue}px)`;
  };

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
    navigate(`/modifyFeed/${feedId}`);
  };

  const postCommentMutation = useMutation(
    () => postFeedComment({ feedId: feedId, content: comment }),
    {
      onSuccess: () => queryClient.invalidateQueries(['feedComment', feedId]),
    },
  );
  const deleteShortsMutation = useMutation(feedId => deleteFeed(feedId), {
    // onSettled: () => queryClient.invalidateQueries(['shortsDetail', shortsId]),
  });

  const deleteCommentMutation = useMutation(feedId =>
    deleteFeedComment(feedId),
  );

  const modifyCommentMutation = useMutation(
    commentId =>
      modifyFeedComment({ commentId: commentId, content: modifyComment }),
    {
      onSuccess: () => queryClient.invalidateQueries(['feedComment', feedId]),
    },
  );

  //여기서 useMutaion객체는 변이함수를 반환하게 된다?
  // if (deleteShortsMutation.isSuccess) {
  //   sweetAlert(1000, 'success', '해당 게시글이 삭제되었습니다.');
  // }

  // if (modifyCommentMutation.isSuccess) {
  //   sweetAlert(1000, 'success', '댓글 수정 성공');
  // }

  if (isLoading || !data) return;
  // console.log(resultCommnet);

  return (
    <>
      {isLoading && <div> 로딩중입니다</div>}
      <div className="modal-content">
        <div className="feed-image__row">
          <div className="feed-image__carousel">
            <div className="feed-image__list" ref={feedRef}>
              <div className="feed-image__wrapper" ref={feedChildRef}>
                {data.data.data.imageUrlList &&
                  data.data.data.imageUrlList.map((item, index) => {
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
            <div className="feed-image__paiging">
              {data.data.data.imageUrlList &&
                data.data.data.imageUrlList.map((item, index) => {
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
          <div className="modal-userInform">
            <div className="modal-userInform__title">
              <p>글번호: {feedId}</p>
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
                    comment.commentId === modifyCommentId ? (
                    <div
                      key={comment.commentId}
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
                              comment.commentId,
                            );
                          }}
                        >
                          수정 하기
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={comment.commentId}
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
                          deleteCommentMutation.mutate(comment.commentId);
                        }}
                      >
                        댓글 삭제
                      </button>
                      <button
                        className="modal-comment__btn btn-modify"
                        onClick={() => {
                          onCheckCommentModify(
                            comment.commentId,
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
        {/* {deleteShortsMutation.isError && (
          <div style={{ color: 'red' }}> mutaion 에러</div>
        )} */}
        <button
          className="modal-btn__delete"
          onClick={() => {
            if (!window.confirm('정말 해당 게시글을 삭제하시겠습니까?')) return;
            deleteShortsMutation.mutate(feedId);
          }}
        >
          글 삭제하기
        </button>
      </div>
    </>
  );
};

export default FeedShortsModal;
