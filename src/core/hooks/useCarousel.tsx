// import { useState, useLayoutEffect, useRef } from "react";

// export const useCarousel = (post, listRef, sldiesDomLength) => {
//   const [transX, setTransX] = useState(0);

//   useLayoutEffect(() => {
//     const getCoordinate = () => {
//       const listLeft = listRef.current.getBoundingClientRect().left;
//       setTransX(listLeft);
//     };
//     getCoordinate();
//   }, []);

//   const handleClickNavBtn = (direction) => {
//     let currentX = listRef.current.getBoundingClientRect().x;
//     let listRef_NodeWidth =
//       post.length > 0
//         ? listRef.current.childNodes[0].getBoundingClientRect().width
//         : 0;
//     //슬라이드에 넣은 데이터 배열의 길이가 0보다 크다면
//     //ref속성으로 이어진 돔요소 listRef에 childNode에 제일 첫번째?
//     //요소의 넓이값을 세팅
//     // console.log(
//     //   "노드의 넓이값",
//     //   listRef.current.childNodes[0].getBoundingClientRect().width
//     // );

//     // 슬라이드 되는 박스 하나의 넓이값 * 3 (전체 넓이?를 제한하는 값?)
//     const slideDistance = listRef_NodeWidth * 2;
//     // console.log("sldiesDomLength", sldiesDomLength.current);
//     //버튼으로 눌렀을때 변화하는 현재넓이제한값?
//     let calculate_distance = 0;
//     // console.log("슬라이드 전체넓이 값?", slideDistance);
//     if (direction === "left") {
//       const limitTransX = sldiesDomLength.current * listRef_NodeWidth;
//       calculate_distance = currentX + slideDistance;
//       // console.log(limitTransX, "limitTransX");
//       // console.log("현재calculate_distance", calculate_distance);
//       if (transX < calculate_distance) {
//         calculate_distance = 0;
//       }
//       // console.log('left버튼 차일드노드"', listRef.current);
//     } else if (direction === "right") {
//       calculate_distance = currentX - slideDistance;
//       // console.log("현재calculate_distance", calculate_distance);
//       const limitTransX = -(sldiesDomLength.current * listRef_NodeWidth);
//       // console.log(limitTransX, "limitTransX");
//       if (limitTransX > calculate_distance) {
//         calculate_distance = 0;
//       }
//     }
//     listRef.current.style.transform = `translateX(${calculate_distance}px)`;
//   };
//   return [handleClickNavBtn];
// };
