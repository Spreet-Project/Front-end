import React, { useState, useEffect } from 'react';
import '../../assets/styles/scss/myPage.scss';
import imageCompression from 'browser-image-compression';
import sweetAlert from '../../core/utils/sweetAlert';
import {
  postNicknameCheck,
  putUserProfile,
  putUserNickname,
} from '../../core/api/mypage';

const UserInform = ({ userInform = null }): JSX.Element => {
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState<string>('');
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  const [isRegNickNameCheck, setIsRegNickNameCheck] = useState<boolean>(false);

  useEffect(() => {
    setProfileImg(userInform.profileImage);
    setNickname(userInform.nickname);
  }, [userInform]);

  const is_userNickName = asValue => {
    const blankExp = /[\s]/g;
    if (blankExp.test(asValue)) {
      return sweetAlert(1000, 'error', '공백을 제거해주세요');
    }
    if (Number(asValue)) {
      return sweetAlert(
        2000,
        'error',
        '알파벳,한글로 시작하는 닉넴임을 입력해주세요',
      );
    }
    const regIdExp =
      // eslint-disable-next-line
      /^[a-zA-Zㄱ-힣]+[a-zA-Zㄱ-힣0-9]{2,10}$/g;
    // 닉네임 2~10 자 알파벳, 한글, 숫자 가능
    const result: boolean = regIdExp.test(asValue);
    return result;
  };

  const handleFileOnChange = async file => {
    const options = { maxSizeMB: 7, maxWidthOrHeight: 200 };
    try {
      const compressedFile = await imageCompression(file, options);
      const resultFile = new File([compressedFile], compressedFile.name, {
        type: compressedFile.type,
      });
      return resultFile;
    } catch (error) {
      sweetAlert(1000, 'error', '파일 변환중 오류!');
    }
  };

  const onProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImg(URL.createObjectURL(e.target.files[0]));
    try {
      const newFile = await handleFileOnChange(e.target.files[0]);

      const userData = new FormData();
      userData.append('file', newFile);
      putUserProfile(userData).then(res => {
        if (!res) {
          return sweetAlert(1000, 'error', '프로필 수정 중 오류!');
        }
        sweetAlert(1000, 'success', res.data.msg);
      });
    } catch (error) {
      sweetAlert(1000, 'error', '파일 변환중 오류!');
    }
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onCheckNickname = () => {
    if (!is_userNickName(nickname)) {
      return setIsRegNickNameCheck(false);
    }
    setIsRegNickNameCheck(true);
    postNicknameCheck(nickname).then(res => {
      if (res.name === 'AxiosError') return;
      sweetAlert(1000, 'success', res.data.msg);
      setCheckNickname(true);
    });
  };

  const onModifyUserInform = () => {
    if (!checkNickname) {
      return sweetAlert(1000, 'error', '닉네임 중복 확인 을 해주세요');
    }
    putUserNickname(nickname).then(res => {
      if (!res) {
        return sweetAlert(1000, 'error', '닉네임 수정 중 오류!');
      }
      if (res.data.statusCode === 200) {
        sweetAlert(1000, 'success', res.data.msg);
        setCheckNickname(false);
      }
    });
  };

  return (
    <div className="mypage-form">
      <p className="mypage-title">회원 정보 수정</p>
      <div className="mypage-profile">
        <img src={profileImg} className="mypage-profile__userimg"></img>
        {!userInform && (
          <div className="material-symbols-outlined mypage-profile__icons">
            add_a_photo
          </div>
        )}
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          onChange={onProfileChange}
          className="mypage-profile__userimg-input"
        ></input>
        <button className="mypage-profile__btn">프로필 이미지 수정</button>
      </div>
      <input
        className="mypage-input input__readonly"
        placeholder="아이디"
        readOnly
        value={userInform.loginId}
      />
      <input
        className="mypage-input input__readonly"
        placeholder="이메일"
        readOnly
        value={userInform.email}
      />
      {checkNickname ? (
        <div>
          <input
            className="mypage-input-nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={onChangeNickname}
            minLength={2}
            maxLength={10}
            readOnly
            style={{ background: 'gray' }}
          />
          <button
            className="mypage-profile__check__btn"
            onClick={onCheckNickname}
          >
            중복 확인
          </button>
        </div>
      ) : (
        <div>
          <input
            className="mypage-input-nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={onChangeNickname}
            minLength={2}
            maxLength={10}
          />
          <button
            className="mypage-profile__check__btn"
            onClick={onCheckNickname}
          >
            중복 확인
          </button>
          {!isRegNickNameCheck && (
            <p className="mypage-profile__checknickname">
              닉네임 2~10 자 알파벳, 한글, 숫자 가능
            </p>
          )}
        </div>
      )}

      <button className="mypage-btn-modify" onClick={onModifyUserInform}>
        닉네임 변경
      </button>
      <hr className="mypage-hr" />
      <button className="mypage-btn-unregister">회원탈퇴</button>
    </div>
  );
};

export default UserInform;
