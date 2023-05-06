import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { authAction } from '../store/auth';
import useModal from '../hooks/useModal';
import AuthModal from './auths/AuthModal';
import palette from '../styles/palette';

const HeaderAuthContainer = styled.div`
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
`;

const HeaderAuths = () => {
  const { openModalPortal, ModalPortal, closeModalPortal } = useModal();
  const dispatch = useDispatch();
  return (
    <>
      <HeaderAuthContainer className="header-auth-buttons">
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
      </HeaderAuthContainer>
      <ModalPortal>
        <AuthModal closeModal={closeModalPortal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
