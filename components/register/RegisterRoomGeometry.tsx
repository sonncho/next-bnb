import React, { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
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
  .register-room-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }
`;
declare global {
  interface Window {
    kakao: any;
  }
}

const RegisterRoomGeometry = () => {
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    // autoload=false : 스크립트가 전부 로드될떄까지 대기
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const latLang = new window.kakao.maps.LatLng(
          latitude || 37.56666784,
          longitude || 126.9778436
        );
        const options = {
          center: latLang,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = latLang;
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    // 마운트가 끝나면 onLoadKakaoMap 제거
    // return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <Container>
      <h2>핀이 놓인 위치가 정확한가요?</h2>
      <h3>4단계</h3>
      <p>필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</p>

      <div className="register-room-geometry-map-wrapper">
        <div id="map" />
      </div>
    </Container>
  );
};

export default RegisterRoomGeometry;
