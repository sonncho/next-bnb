import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import palette from '../../styles/palette';
import Button from '../common/Button';
import NavigationIcon from '../../public/static/svg/register/navigation.svg';
import Selector from '../common/Selector';
import { countryList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import Input from '../common/Input';
import { getLocationInfoApi } from '../../lib/api/map';

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
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-rooom-location-button-wrapper {
    width: 176px;
    margin-bottom: 24px;
  }
  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-city-district {
    max-width: 385px;
    display: flex;
    margin-bottom: 24px;
    > div:first-child {
      margin-right: 24px;
    }
  }
  .register-room-location-street-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-detail-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-postcode {
    max-width: 385px;
  }
`;

const RegisterLocation = () => {
  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector((state) => state.registerRoom.streetAddress);
  const detailAddress = useSelector((state) => state.registerRoom.detailAddress);
  const postcode = useSelector((state) => state.registerRoom.postcode);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 나라변경시
  const onChangeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(event.target.value));
  };

  // 시/도 변경시
  const onChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(event.target.value));
  };

  // 시/군/구 변경시
  const onChangeDistrict = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(event.target.value));
  };

  // 도로명주소 변경시
  const onChangeStreetAddress = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setStreetAddress(event.target.value));
  };

  // 동호수 변경시
  const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDetailAddress(event.target.value));
  };

  // 우편번호 변경시
  const onChangePostcode = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(event.target.value));
  };

  //* 현재 위치 불러오기에 성공했을 떄
  const onSuccessGetLocation = async ({
    coords,
  }: {
    coords: { latitude: number; longitude: number };
  }) => {
    console.log('here');
    try {
      const { data } = await getLocationInfoApi({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      console.log(data);

      dispatch(registerRoomActions.setCountry(data.country));
      dispatch(registerRoomActions.setCity(data.city));
      dispatch(registerRoomActions.setDistrict(data.district));
      dispatch(registerRoomActions.setStreetAddress(data.streetAddress));
      dispatch(registerRoomActions.setPostcode(data.postcode));
      dispatch(registerRoomActions.setLatitude(data.latitude));
      dispatch(registerRoomActions.setLongitude(data.longitude));

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  //* 현재 위치 사용 클릭 시
  const onClickGetCurrentLocation = () => {
    setIsLoading(true);
    window.navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
      // eslint-disable-next-line no-alert
      alert(e?.message);
    });
  };

  return (
    <Container>
      <h2>숙소의 위치를 알려주세요.</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">
        정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
      </p>
      <div className="register-rooom-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {isLoading ? '불러오는 중...' : '현재 위치 사용'}
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          disabledOptions={['국가/지역 선택']}
          value={country || '국가/지역 선택'}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="시/도" value={city || ''} onChange={onChangeCity} />
        <Input label="시/군/구" value={district || ''} onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input label="도로명주소" value={streetAddress || ''} onChange={onChangeStreetAddress} />
      </div>
      <div className="register-room-location-detail-address">
        <Input
          label="동호수(선택사항)"
          value={detailAddress || ''}
          onChange={onChangeDetailAddress}
          useValidation={false}
        />
      </div>
      <div className="register-room-location-postcode">
        <Input label="우편번호" value={postcode || ''} onChange={onChangePostcode} />
      </div>
    </Container>
  );
};

export default RegisterLocation;
