import React from 'react';
import styled from 'styled-components';
import { RootState, useSelector } from '../../store';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

const Container = styled.div`
  width: 568px;
  /* height: 614px; */
  /* background-color: white; */
  z-index: 11;
`;

interface IProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);
  return (
    <Container>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && <LoginModal closeModal={closeModal} />}
    </Container>
  );
};

export default AuthModal;
