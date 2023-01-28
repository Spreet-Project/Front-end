import React, { useState, useEffect } from 'react';
import '../../assets/styles/scss/myPage.scss';
import { useQuery, useQueryClient } from 'react-query';
import imageCompression from 'browser-image-compression';
import sweetAlert from '../../core/utils/sweetAlert';
import {
  postNicknameCheck,
  putUserProfile,
  putUserNickname,
} from '../../core/api/mypage';

const UserInform = ({ userInform }): JSX.Element => {
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState<string>('');
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  const [postImg, setPostImg] = useState(null);

  useEffect(() => {
    setProfileImg(userInform.profileImage);
    setNickname(userInform.nickname);
  }, [userInform]);

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
      });
    } catch (error) {
      sweetAlert(1000, 'error', '파일 변환중 오류!');
    }
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onCheckNickname = () => {
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
      <div>
        <input
          className="mypage-input-nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={onChangeNickname}
        />
        <button
          className="mypage-profile__check__btn"
          onClick={onCheckNickname}
        >
          중복 확인
        </button>
      </div>

      <button className="mypage-btn-modify" onClick={onModifyUserInform}>
        수정
      </button>
      <hr className="mypage-hr" />
      <button className="mypage-btn-unregister">회원탈퇴</button>
    </div>
  );
};

export default UserInform;
