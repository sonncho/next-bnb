import React from 'react';

import { useDispatch } from 'react-redux';

import { amentityList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';

import RegisterContainer from './RegisterContainer';
import CheckboxGroup from '../common/CheckboxGroup';

const RegisterRoomAmentities = () => {
  const dispatch = useDispatch();
  const amentities = useSelector((state) => state.registerRoom.amentities);

  const onChangeAmentities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmentities(selected));
  };
  return (
    <RegisterContainer
      title="어떤 편의 시설을 제공하시나요?"
      subTitle="5단계"
      desc="일반적으로 게스트가 기대하는 편의시설 목록입니다. 숙소를 등록한 후 언제든 편의시설을 추가할
    수 있어요."
    >
      <div className="regsiter-room-amentities-checkbox-group-wrapper">
        <CheckboxGroup value={amentities} onChange={onChangeAmentities} options={amentityList} />
      </div>
    </RegisterContainer>
  );
};

export default RegisterRoomAmentities;
