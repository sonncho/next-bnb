import dynamic from 'next/dynamic';
import RegisterRoomFooter from '../../../components/register/RegisterRoomFooter';

const RegisterRoomGeometry = dynamic(import('../../../components/register/RegisterRoomGeometry'), {
  ssr: true,
});

const geometry = () => {
  return (
    <>
      <RegisterRoomGeometry />
      <RegisterRoomFooter prevHref="/room/register/location" nextHref="/room/register/amentities" />
    </>
  );
};

export default geometry;
