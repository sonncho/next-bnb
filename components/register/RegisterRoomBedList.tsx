import React from 'react';
import { useSelector } from '../../store';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import RegisterRoomPublicBedTypes from './RegisterRoomPublicBedTypes';

const RegisterRoomBedList = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);
  return (
    <ul className="register-room-bed-type-list-wrapper">
      {bedList.map((bedroom, idx) => (
        <RegisterRoomBedTypes key={`bedroom_${idx}`} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </ul>
  );
};

export default RegisterRoomBedList;
