import React from 'react';
import '../assets/styles/scss/header.scss';
import { useNavigate } from 'react-router-dom';
import sweetAlert from '../core/utils/sweetAlert';
import { getSubscribe } from '../core/api/subscribe';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const token = localStorage.getItem('id');
  const userRole = localStorage.getItem('userRole');
  const onLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('nickname');
    localStorage.removeItem('userRole');
    sweetAlert(1000, 'success', '로그아웃 되었습니다');
    navigate('/');
  };

  const onClcikSubsCribe = () => {
    if (!token) {
      return sweetAlert(1000, 'error', '로그인이 필요합니다.');
    }
    getSubscribe().then(res => {
      console.log(res, 'subscribeRES');
    });
  };
  return (
    <>
      <div className="header">
        <div className="header_inner">
          <p
            className="header_logo"
            onClick={() => {
              navigate('/');
            }}
          >
            <img />
          </p>
          <div className="header_btn">
            {/* <button onClick={onClcikSubsCribe} className="letter-spacing__5">
              알림
            </button> */}
            <button
              onClick={() => {
                navigate('/shorts');
              }}
            >
              쇼츠
            </button>
            <button
              onClick={() => {
                navigate('/event');
              }}
            >
              행사
            </button>
            {token ? (
              <button onClick={onLogout}>로그아웃</button>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </button>
            )}
            {token && (
              <button
                onClick={() => {
                  if (!localStorage.getItem('id')) {
                    sweetAlert(1000, 'error', '로그인 해주세요!');
                    return navigate('/login');
                  }
                  navigate('/write');
                }}
              >
                글 작성
              </button>
            )}

            {token &&
              (userRole === 'ROLE_APPROVED_CREW' ||
                userRole === 'ROLE_ADMIN') && (
                <button
                  onClick={() => {
                    if (!localStorage.getItem('id')) {
                      sweetAlert(1000, 'error', '로그인 해주세요!');
                      return navigate('/login');
                    }
                    navigate('/eventWrite');
                  }}
                >
                  행사 작성
                </button>
              )}

            {token && (
              <button
                onClick={() => {
                  if (!localStorage.getItem('id')) {
                    sweetAlert(1000, 'error', '로그인 해주세요!');
                    return navigate('/login');
                  }
                  navigate('/mypage');
                }}
              >
                마이페이지
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
