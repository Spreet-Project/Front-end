const handleClickSlide = (
  direction: 'left' | 'right',
  dataList: string[],
  sectorRef: any,
  slideNum: number,
  sectorTransX: any,
): any => {
  if (!sectorRef) return;
  const currentX = sectorRef.current.getBoundingClientRect().x;
  const listRef_NodeWidth =
    sectorRef.current.childNodes[0].getBoundingClientRect().width;
  //슬라이드에 넣은 데이터 배열의 길이가 0보다 크다면
  //ref속성으로 이어진 돔요소 spreetRef에 childNode에 제일 첫번째?
  //요소의 넓이값을 세팅
  // console.log(
  //   '노드의 넓이값',
  //   sectorRef.current.childNodes[0].getBoundingClientRect().width,
  // );
  // 슬라이드 되는 박스 하나의 넓이값 * 3 (전체 넓이?를 제한하는 값?)
  const slideDistance = listRef_NodeWidth * 1;
  //버튼으로 눌렀을때 변화하는 현재넓이제한값?
  let calculate_distance = 0;
  console.log('슬라이드 전체넓이 값?', slideDistance);
  if (direction === 'left') {
    calculate_distance =
      currentX + (slideDistance / dataList.length) * slideNum;
    // console.log('현재calculate_distance', calculate_distance);
    if (sectorTransX < calculate_distance) {
      calculate_distance = 0;
    }
    // console.log('left버튼 차일드노드"', sectorRef.current);
  }
  if (direction === 'right') {
    const calculationValue = (slideDistance / dataList.length) * slideNum;
    // console.log(calculationValue);
    calculate_distance = currentX - calculationValue;
    console.log('현재calculate_distance', calculate_distance);
    if (-slideDistance > calculate_distance) {
      calculate_distance = 0;
    }
    // if (-slideDistance > calculate_distance - calculationValue) {
    //   calculate_distance = 0;
    // }
  }
  sectorRef.current.style.transform = `translateX(${calculate_distance}px)`;
  console.log(sectorRef.current.style.transform);
};

export default handleClickSlide;
