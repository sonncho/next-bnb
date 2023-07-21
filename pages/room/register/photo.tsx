import React from 'react';
import RegisterRoomPhoto from '../../../components/register/RegisterRoomPhoto';
import RegisterRoomFooter from '../../../components/register/RegisterRoomFooter';
import RegisterContainer from '../../../components/register/RegisterContainer';

const photo = () => {
  return (
    <RegisterContainer
      title="숙소사진 올리기"
      subTitle="7단계"
      desc="게스트가 사진을 보고 숙소의 느낌을 생생히 떠올려볼 수 있도록 해주세요.
    우선 사진 1장을 업로드하고 숙소를 등록한 후에 추가할 수 있습니다."
    >
      <RegisterRoomPhoto />
      <RegisterRoomFooter />
    </RegisterContainer>
  );
};

export default photo;
