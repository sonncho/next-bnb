import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import palette from '../styles/palette';
import useModal from '../hooks/useModal';
import { useSelector } from '../store';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import { authAction } from '../store/auth';
import AuthModal from './auths/AuthModal';

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
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  //** react-outside-click-handler div */
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;

const Header: React.FC = () => {
  const { openModalPortal, ModalPortal, closeModalPortal } = useModal();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isUserMenuOpend, setIsUserMenuOpend] = useState<boolean>(false);

  // console.log(user);

  return (
    <Container>
      <Link href="/" className="header-logo-wrapper">
        <AirbnbLogoIcon className="header-logo" />
        <AirbnbLogoTextIcon />
      </Link>
      {!user.isLogged && ( // 로그인이 아닌경우
        <div className="header-auth-buttons">
          <button
            type="button"
            className="header-sign-up-button"
            onClick={() => {
              dispatch(authAction.setAuthMode('signup'));
              openModalPortal();
            }}
          >
            회원가입
          </button>
          <button
            type="button"
            className="header-login-button"
            onClick={() => {
              dispatch(authAction.setAuthMode('login'));
              openModalPortal();
            }}
          >
            로그인
          </button>
        </div>
      )}
      {user.isLogged && ( // 로그인을 한경우
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUserMenuOpend) {
              setIsUserMenuOpend(false);
            }
          }}
        >
          <button
            className="header-user-profile"
            type="button"
            onClick={() => setIsUserMenuOpend(!isUserMenuOpend)}
          >
            <HamburgerIcon />
            <img src={user.profileImage} className="header-user-profile-image" alt="" />
          </button>
          {isUserMenuOpend && (
            <ul className="header-usermenu">
              <li>숙소 관리</li>
              <li>
                <Link href="/room/register/building">숙소 등록하기</Link>
              </li>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={() => {}}>
                로그아웃
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}

      <ModalPortal>
        <AuthModal closeModal={closeModalPortal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
