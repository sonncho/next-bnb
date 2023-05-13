import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import palette from '../../styles/palette';
import Selector from '../common/Selector';
import { largeBuildingTypeList } from '../../lib/staticData';
import { registerRoomActions } from '../../store/registerRoom';
import { useSelector } from '../../store';

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
`;

const disabledLargeBuildingTypeOptions = ['하나를 선택해주세요.'];

const RegisterRoomBuilding = () => {
  const dispatch = useDispatch();

  const largeBuildingType = useSelector((state) => state.registerRoom.largeBuildingType);
  const buildingType = useSelector((state) => state.registerRoom.buildingType);

  const onChangeLargeBuildingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBuildingType(e.target.value));
  };

  //* 건물 유형 옵션
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case '아파트': {
        const { apartmentBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBuildingType(apartmentBuildingTypeList[0]));
        return apartmentBuildingTypeList;
      }
      case '주택': {
        const { houseBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBuildingType(houseBuildingTypeList[0]));
        return houseBuildingTypeList;
      }
      case '별채': {
        const { secondaryUnitBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBuildingType(secondaryUnitBuildingTypeList[0]));
        return secondaryUnitBuildingTypeList;
      }
      case '독특한 숙소': {
        const { uniqueSpaceBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBuildingType(uniqueSpaceBuildingTypeList[0]));
        return uniqueSpaceBuildingTypeList;
      }
      case 'B&B': {
        const { bnbBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBuildingType(bnbBuildingTypeList[0]));
        return bnbBuildingTypeList;
      }
      case '부티크호텔': {
        const { boutiqueBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBuildingType(boutiqueBuildingTypeList[0]));
        return boutiqueBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  const onChangeBuildingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBuildingType(e.target.value));
  };

  return (
    <Container>
      <h2>등록하실 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue="하나를 선택해주세요."
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={buildingType || ''}
          disabled={!largeBuildingType}
          label="건물 유형을 선택하세요."
          options={detailBuildingOptions}
          onChange={onChangeBuildingType}
        />
      </div>
    </Container>
  );
};

export default RegisterRoomBuilding;
