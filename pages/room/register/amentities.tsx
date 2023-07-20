import React from 'react';
import RegisterRoomAmentities from '../../../components/register/RegisterRoomAmentities';
import RegisterRoomFooter from '../../../components/register/RegisterRoomFooter';

const amentities = () => {
  return (
    <>
      <RegisterRoomAmentities />;
      <RegisterRoomFooter
        prevHref="/room/register/location"
        nextHref="/room/register/conviniences"
      />
    </>
  );
};

export default amentities;
