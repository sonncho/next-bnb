import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import palette from '../styles/palette';
import useModal from '../hooks/useModal';
import SignUpModal from './auths/SignUpModal';

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
    h1 {
      font-size: 21px;
      font-weight: bold;
      color: ${palette.main_pink};
    }
  }
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

const Header: React.FC = () => {
  const { openModalPortal, ModalPortal } = useModal();
  return (
    <Container>
      <Link href="/" className="header-logo-wrapper">
        <AirbnbLogoIcon className="header-logo" />
        <AirbnbLogoTextIcon />
      </Link>
      <div className="header-auth-buttons">
        <button type="button" className="header-sign-up-button" onClick={openModalPortal}>
          회원가입
        </button>
        <button type="button" className="header-login-button">
          로그인
        </button>
      </div>

      <ModalPortal>
        <SignUpModal />
      </ModalPortal>
    </Container>
  );
};

export default Header;
