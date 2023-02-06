import React, { useState } from 'react';
import { useQuery } from 'react-query';
import '../../assets/styles/scss/myPage.scss';
import {
  getCrewList,
  putCrewAccess,
  putCrewCancel,
  putCrewReject,
} from '../../core/api/admin';
import sweetAlert from '../../core/utils/sweetAlert';

const Admin = (): JSX.Element => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { isLoading, isError, data, error, isFetching } = useQuery(
    ['getCrew'], //쿼리 키
    getCrewList, //비동기 처리함수(서버에 요청),
    {
      // suspense: true,
      // cacheTime: 5000, //캐시를 몇초까지 저장해줄건지? 기본 5분?
      // staleTime: 5000, //재검색을 트리거? 기존에 있던 데이터처리를 어떻게할건지?
      refetchOnMount: true, //쿼리데이터가 오래되었는지 확인하는여부?
    },
  );

  const onSuccessCrew = (userId: number) => {
    putCrewAccess(userId).then(res => {
      if (!res) return;
      sweetAlert(1000, 'success', '크루 승인 성공');
    });
  };

  const onRejectCrew = (userId: number) => {
    putCrewReject(userId).then(res => {
      if (!res) return;
      sweetAlert(1000, 'success', '크루 거절 성공');
    });
  };

  const onCancleCrew = (userId: number) => {
    putCrewCancel(userId).then(res => {
      if (!res) return;
      sweetAlert(1000, 'success', '크루 취소 성공');
    });
  };

  const onChangeAdminPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPassword(e.target.value);
  };

  //admin인지 확인하는 부분
  const onClickAdminPass = (e: React.MouseEvent<HTMLInputElement>) => {
    if (adminPassword === process.env.REACT_APP_ADMIN_PASS) {
      sweetAlert(1000, 'success', '환영합니다 관리자님!');
      setIsAdmin(true);
    }
  };

  if (isLoading || !data) return;

  return (
    <div className="contentList-form">
      {isAdmin ? (
        <>
          {data.data.data &&
            data.data.data.map(user => {
              return (
                <div key={user.userId} className="contentList-commentbox">
                  <p className="contentList-title"></p>
                  <ul className="contentList-commentbox__infrom">
                    <li className="contentList-inform__cate">
                      {user.nickname}
                    </li>
                    <li className="contentList-btn">
                      <button
                        className="contentList-btn__modify"
                        onClick={() => {
                          onSuccessCrew(user.userId);
                        }}
                      >
                        승인
                      </button>
                      <button
                        className="contentList-btn__delete"
                        onClick={() => {
                          onRejectCrew(user.userId);
                        }}
                      >
                        거절
                      </button>
                      <button
                        className="contentList-btn__delete"
                        onClick={() => {
                          onCancleCrew(user.userId);
                        }}
                      >
                        취소
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
        </>
      ) : (
        <div className="admin-form">
          <input
            type="password"
            value={adminPassword}
            onChange={onChangeAdminPass}
            className="admin-password"
          />
          <button onClick={onClickAdminPass}>확인</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
