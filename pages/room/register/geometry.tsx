import dynamic from 'next/dynamic';
// import RegisterRoomGeometry from '../../../components/register/RegisterRoomGeometry';

const RegisterRoomGeometry = dynamic(import('../../../components/register/RegisterRoomGeometry'), {
  ssr: true,
});

const geometry = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;
