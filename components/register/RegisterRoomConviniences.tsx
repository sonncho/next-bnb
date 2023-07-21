import React from 'react';
import { useDispatch } from 'react-redux';
import CheckboxGroup from '../common/CheckboxGroup';
import { convinienceList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import RegisterContainer from './RegisterContainer';

const RegisterRoomConviniences = () => {
  const dispatch = useDispatch();
  const conviniences = useSelector((state) => state.registerRoom.conveniences);

  const onConviniences = (selected: string[]) => {
    dispatch(registerRoomActions.setConveniences(selected));
  };

  return (
    <RegisterContainer
      title="게스트가 어떤 공간을 사용할 수 있나요?"
      subTitle="6단계"
      desc="등록하고자 하는 숙소에서 게스트가 이용 가능한 공용 공간을 선택하세요."
    >
      <div className="register-room-conviniences-checkbox-group-wrapper">
        <CheckboxGroup value={conviniences} options={convinienceList} onChange={onConviniences} />
      </div>
    </RegisterContainer>
  );
};

export default RegisterRoomConviniences;
