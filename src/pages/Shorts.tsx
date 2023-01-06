import React, { useRef, useState, useLayoutEffect } from 'react';
import './shorts.scss';
import ShortsModal from '../components/ShortsModal';

const Shorts = () => {
  const shortsList: string[] = ['첫번째글', '두번째글', '세번째글', '네번째글'];
  const commentList: string[] = [
    '첫번째 댓글',
    '두번째 댓글',
    '세번째 댓글',
    '네번째 댓글',
  ];
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <div className="shorts-cotent">
      <div className="shorts-sidebar">
        <div className="shorts-category">
          <ul>
            <li>전체</li>
            <li>랩</li>
            <li>스트릿댄스</li>
            <li>DJ</li>
            <li>그래피티</li>
            <li>비트박스</li>
            <li>기타</li>
            <li>게시글</li>
          </ul>
        </div>
      </div>
      <div className="shorts-scroll">
        {shortsList &&
          shortsList.map((shorts, index) => {
            return (
              <div key={index} className="shorts-item__scroll">
                {shorts}
                <div className="shorts-item__btn">
                  <div className="shorts-btn btn__like">
                    <span className="material-icons">thumb_up</span>
                  </div>
                  <p className="shorts-btn-text text__like">Like</p>
                  <div
                    className="shorts-btn btn__detail"
                    onClick={() => {
                      setIsShowModal(true);
                    }}
                  >
                    <span className="material-icons">article</span>
                  </div>
                  <p
                    className="shorts-btn-text text__detail"
                    onClick={() => {
                      setIsShowModal(true);
                    }}
                  >
                    Detail
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {isShowModal && <ShortsModal setIsShowModal={setIsShowModal} />}
    </div>
  );
};

export default Shorts;
