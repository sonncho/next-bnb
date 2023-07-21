import React from 'react';
import RegisterRoomConviniences from '../../../components/register/RegisterRoomConviniences';
import RegisterRoomFooter from '../../../components/register/RegisterRoomFooter';

const conviniences = () => {
  return (
    <>
      <RegisterRoomConviniences />

      <RegisterRoomFooter prevHref="/room/register/amenties" nextHref="/room/register/photo" />
    </>
  );
};

export default conviniences;
