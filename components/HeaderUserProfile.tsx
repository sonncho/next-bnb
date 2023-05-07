import Link from 'next/link';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';
import { useSelector } from '../store';
import palette from '../styles/palette';

const UserProfileBtn = styled.button`
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
`;
const UserMenuList = styled.ul`
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
`;

const HeaderUserProfile = () => {
  const dispatch = useDispatch();
  const userProfileImage = useSelector((state) => state.user.profileImage);
  const [isUserMenuOpend, setIsUserMenuOpend] = useState<boolean>(false);
  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUserMenuOpend) {
          setIsUserMenuOpend(false);
        }
      }}
    >
      <UserProfileBtn type="button" onClick={() => setIsUserMenuOpend(!isUserMenuOpend)}>
        <HamburgerIcon />
        <img src={userProfileImage} className="header-user-profile-image" alt="" />
      </UserProfileBtn>
      {isUserMenuOpend && (
        <UserMenuList>
          <li>숙소 관리</li>
          <li>
            <Link href="/room/register/building">숙소 등록하기</Link>
          </li>
          <div className="header-usermenu-divider" />
          <li role="presentation" onClick={logout}>
            로그아웃
          </li>
        </UserMenuList>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
