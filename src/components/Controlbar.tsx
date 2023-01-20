// import React, { useState, memo } from 'react';

// import ProgressBar from './ProgressBar';

// // import styles from './controlbar.module.scss';

// interface IProps {
//   onProgressChange: (percent: number) => void;
//   onPlayIconClick: () => void;
//   startTime: number;
//   totalTime: number;
//   currentTime: number;
//   showControl: boolean;
//   nowPlaying: boolean;
//   videoElement: HTMLVideoElement | null;
// }

// const Controlbar: React.FC<IProps> = ({
//   onProgressChange,
//   onPlayIconClick,
//   totalTime,
//   currentTime,
//   startTime,
//   showControl,
//   nowPlaying,
//   videoElement,
// }) => {
//   const [volumeClicked, setVolumeClicked] = useState(false);

//   const toTimeString = (second: number) => {
//     const date = new Date(second * 1000);

//     const mm = date.getUTCMinutes();
//     const ss = date.getSeconds();

//     const formattedMinute = mm + ':';
//     const formattedSecond = (ss < 10 ? '0' : '') + ss;

//     return formattedMinute + formattedSecond;
//   };

//   // const playControlClassProps = classNames(styles.playWrapper, {
//   //   [styles.fadeIn]: showControl,
//   // });
//   // const controlBarClassProps = classNames(styles.controlBar, {
//   //   [styles.fadeIn]: showControl,
//   // });
//   // const startTimeClassProps = classNames(styles.text, styles.startTime);
//   // const endTimeClassProps = classNames(styles.text, styles.endTime);

//   // volume 클릭 관련 함수
//   const handleVolume = () => {
//     if (volumeClicked) {
//       if (videoElement) {
//         videoElement.muted = true;
//       }
//       setVolumeClicked(false);
//     } else {
//       if (videoElement) {
//         videoElement.muted = false;
//       }
//       setVolumeClicked(true);
//     }
//   };

//   // 마우스를 올렸을때 실행되는 함수
//   const onMouseUp = () => {
//     if (videoElement) {
//       // controller를 옮긴 시점에 currentTime이 최신화 되지 않아, 이를 위해 수정
//       videoElement.currentTime = currentTime;
//       nowPlaying ? videoElement.play() : videoElement.pause();
//     }
//   };

//   // 마우스를 내렸을때 실행되는 함수
//   const onMouseDown = () => {
//     if (videoElement) {
//       videoElement.pause();
//     }
//   };

//   return (
//     <>
//       <div className="controlbar-wrapper">
//         <span className="controlbar-videotime">{toTimeString(startTime)}</span>
//         <ProgressBar
//           max={totalTime}
//           value={currentTime}
//           onChange={onProgressChange}
//           onMouseDown={onMouseDown}
//           onMouseUp={onMouseUp}
//         />
//         <span className="controlbar-videotime">{toTimeString(totalTime)}</span>
//         {/* <img
//           // className={styles.volume}
//           src={volumeClicked ? volumeIcon : muteIcon}
//           onClick={handleVolume}
//         /> */}
//       </div>
//       <div className="controlbar-videoplay">
//         <div className="controlbar-videoplay__icon">
//           <img
//             className="playicon"
//             src={nowPlaying ? pauseIcon : playIcon}
//             onClick={onPlayIconClick}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default memo(Controlbar);
