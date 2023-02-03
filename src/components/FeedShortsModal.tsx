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
import FeedImageBox from './FeedImageBox';
import FeedCommentBox from './FeedCommentBox';

const FeedShortsModal = ({ setIsShowModal, feedId }): JSX.Element => {
  const navigate = useNavigate();
  const [isCommentModify, setIsCommentModify] = useState(false);
  const [modifyCommentId, setModifyCommentId] = useState(0);
  const [comment, setComment] = useState(''); //댓글 인풋
  const [modifyComment, setModifyComment] = useState(''); //수정 댓글 인풋
  const queryClient = useQueryClient();
  const loginNickname = useRef<string>(null);

  useEffect(() => {
    loginNickname.current = localStorage.getItem('nickname');
  }, []);

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
  const deleteFeedMutation = useMutation(feedId => deleteFeed(feedId), {
    onSuccess: () => {
      setIsShowModal(false), queryClient.invalidateQueries(['getFeed']);
    },
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
  if (deleteFeedMutation.isSuccess) {
    sweetAlert(1000, 'success', '해당 게시글이 삭제되었습니다.');
    navigate('/feeds');
  }

  if (isLoading || !data) return;
  console.log(data);
  return (
    <>
      {isLoading && <div> 로딩중입니다</div>}
      <div className="modal-content">
        <FeedImageBox feed={data.data.data} />
        <div className="modal-comment">
          <div className="modal-comment__comment-box">
            {resultCommnet.data.data.data &&
              resultCommnet.data.data.data.map(comment => {
                return (
                  <FeedCommentBox
                    key={comment.shortsCommentId}
                    profileImageUrl={data.data.data.profileImageUrl}
                    isCommentModify={isCommentModify}
                    comment={comment}
                    modifyCommentId={modifyCommentId}
                    modifyComment={modifyComment}
                    setModifyComment={setModifyComment}
                    onCancleModifyComment={onCancleModifyComment}
                    setIsCommentModify={setIsCommentModify}
                    modifyCommentMutation={modifyCommentMutation}
                    deleteCommentMutation={deleteCommentMutation}
                    onCheckCommentModify={onCheckCommentModify}
                    loginNickname={loginNickname.current}
                  />
                );
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
        {data.data.data.nickname === loginNickname.current && (
          <button className="modal-btn__modify" onClick={onClickModify}>
            글 수정하기
          </button>
        )}
        {data.data.data.nickname === loginNickname.current && (
          <button
            className="modal-btn__delete"
            onClick={() => {
              if (!window.confirm('정말 해당 게시글을 삭제하시겠습니까?'))
                return;
              deleteFeedMutation.mutate(feedId);
            }}
          >
            글 삭제하기
          </button>
        )}
      </div>
    </>
  );
};

export default FeedShortsModal;
