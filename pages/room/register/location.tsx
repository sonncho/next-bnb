import React from 'react';
import RegisterRoomLocation from '../../../components/register/RegisterRoomLocation';
import RegisterRoomFooter from '../../../components/register/RegisterRoomFooter';

const Location = () => {
  return (
    <>
      <RegisterRoomLocation />
      <RegisterRoomFooter prevHref="/room/register/bathroom" nextHref="/room/register/geometry" />
    </>
  );
};

export default Location;
