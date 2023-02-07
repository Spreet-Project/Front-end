import React, { memo, useEffect, useRef, useState } from 'react';

import '../assets/styles/scss/video.scss';

interface IProps {
  className?: string;
  src: string;
  width: string;
  height: string;
}

const Video: React.FC<IProps> = ({ width, height, src }) => {
  const [nowPlaying, setNowPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControl, setShowControl] = useState(false);

  const ref = useRef<HTMLVideoElement>(null);

  const totalTime = (ref && ref.current && ref.current.duration) || 0;
  const videoElement = ref && ref.current;

  const videoSrc = src || '';
  const startTime = Math.floor(currentTime);

  const [volumeClicked, setVolumeClicked] = useState(false);
  const [volumeNum, setVolumeNum] = useState<number>(
    videoElement && (videoElement.volume * 10) / 2,
  );

  const percentNum = (currentTime / totalTime || 0) * 100;

  // 동영상 시간 업데이트 함수
  const addTimeUpdate = () => {
    const observedVideoElement = ref && ref.current;
    if (observedVideoElement) {
      observedVideoElement.addEventListener('timeupdate', function () {
        setCurrentTime(observedVideoElement.currentTime);
      });
      // 컴포넌트가 처음 마운트 될 때 동영상 시작 할지 말지 여부 (여기서는 시작되게 했음)
      setNowPlaying(true);
      // observedVideoElement.play();
    }
  };

  useEffect(() => {
    addTimeUpdate();
    if (videoElement) {
      videoElement.volume = 0.5;
    }
  }, []);

  // progress 이동시켰을때 실행되는 함수
  const onProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseInt(e.target.value, 10);

    if (!showControl) {
      setShowControl(true);
    }

    if (videoElement) {
      const playingTime = videoElement.duration * (percent / 100);
      setCurrentTime(playingTime);
      //현재 영상시간 바꾸기
      videoElement.currentTime = playingTime;
    }
  };

  // play icon 클릭했을떄 실행되는 함수
  const onPlayIconClick = () => {
    if (videoElement) {
      if (nowPlaying) {
        setNowPlaying(false);
        videoElement.pause();
      } else {
        setNowPlaying(true);
        videoElement.play();
      }
    }
  };

  // control bar visible 관련 함수
  const handleControlVisible = () => {
    if (!showControl) {
      setShowControl(true);
      setTimeout(() => {
        setShowControl(false);
      }, 2000);
    }
  };

  // volume 클릭 관련 함수
  const handleVolume = () => {
    if (volumeClicked) {
      if (videoElement) {
        videoElement.muted = true;
        videoElement.volume = 0;
        setVolumeNum(0);
      }
      setVolumeClicked(false);
    } else {
      if (videoElement) {
        videoElement.muted = false;
        videoElement.volume = 0.5;
        setVolumeNum(5);
      }
      setVolumeClicked(true);
    }
  };

  const onChangeVolumeNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currNumber = Number(e.target.value);
    if (currNumber !== 0) {
      videoElement.muted = false;
      setVolumeClicked(true);
      setVolumeNum(5);
    } else {
      videoElement.muted = true;
      setVolumeClicked(false);
    }
    videoElement.volume = currNumber / 10;
    setVolumeNum(currNumber);
  };

  // 마우스를 올렸을때 실행되는 함수
  const onMouseUp = () => {
    if (videoElement) {
      // controller를 옮긴 시점에 currentTime이 최신화 되지 않아, 이를 위해 수정
      videoElement.currentTime = currentTime;
      nowPlaying ? videoElement.play() : videoElement.pause();
    }
  };

  // 마우스를 내렸을때 실행되는 함수
  const onMouseDown = () => {
    if (videoElement) {
      videoElement.pause();
    }
  };

  const toTimeString = (second: number) => {
    const date = new Date(second * 1000);

    const mm = date.getUTCMinutes();
    const ss = date.getSeconds();

    const formattedMinute = mm + ':';
    const formattedSecond = (ss < 10 ? '0' : '') + ss;

    return formattedMinute + formattedSecond;
  };

  return (
    <div className="video-wrapper">
      <video
        className="video-item__video"
        muted={true}
        ref={ref}
        onClick={handleControlVisible}
        style={{ width: `${width}`, height: `${height}`, borderRadius: '20px' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="progressbar-wrapper">
        <div className="progressbar-item">
          <span className="progressbar-videotime__start">
            {toTimeString(startTime)}
          </span>
          <input
            onChange={onProgressChange}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            type="range"
            min="0"
            max="100"
            step="1"
            value={percentNum}
            className="progressbar-controller"
          />
          <span className="progressbar-videotime__end">
            {toTimeString(totalTime)}
          </span>
          {volumeClicked ? (
            <span
              className="material-symbols-outlined volume-icon"
              onClick={handleVolume}
            >
              volume_mute
            </span>
          ) : (
            <span
              className="material-symbols-outlined volume-icon"
              onClick={handleVolume}
            >
              volume_off
            </span>
          )}
          <input
            onChange={onChangeVolumeNum}
            type="range"
            min="0"
            max="10"
            step="1"
            value={volumeNum}
            className="main-volumebar-controller"
          />
        </div>
      </div>

      <div className="controlbar-videoplay__icon">
        {nowPlaying ? (
          <span
            className="material-symbols-outlined playicon"
            onClick={onPlayIconClick}
          >
            pause_circle
          </span>
        ) : (
          <span
            className="material-symbols-outlined playicon"
            onClick={onPlayIconClick}
          >
            play_circle
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(Video);
