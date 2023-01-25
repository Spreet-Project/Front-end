import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

const ContentList = (): JSX.Element => {
  const contentList = [
    '첫번째',
    '두번째',
    '세번째',
    '네번째',
    '다섯번째',
    '여섯번째',
    '일곱 번째',
    '여덟 번째',
    '아홉 번째',
    '열 번째',
  ];
  return (
    <div className="contentList-form">
      {contentList.map((content, index) => {
        return (
          <div key={index} className="contentList-commentbox">
            <p className="contentList-title">{content}</p>
            <ul className="contentList-commentbox__infrom">
              <li className="contentList-inform__cate">카테고리</li>
              <li> 작성자</li>
              <li> 2023-01-01 13:15</li>
              <li className="contentList-btn">
                <button className="contentList-btn__modify">수정</button>
                <button className="contentList-btn__delete">삭제</button>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ContentList;
