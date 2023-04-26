import React from 'react';
import styled from 'styled-components';

import CloseXIcon from '../../public/static/svg/auth/modal_close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpendEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import palette from '../../styles/palette';

const ContainerForm = styled.form`
  width: 568px;
  padding: 32px;
  background-color: #fff;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
    input {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 44px 0 11px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      ::placeholder {
        color: ${palette.gray_76};
      }
    }
    svg {
      position: absolute;
      right: 11px;
      top: 16px;
    }
  }
`;

const SignUpModal = () => {
  return (
    <ContainerForm>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <input type="email" placeholder="이메일 주소" name="email" />
        <MailIcon />
      </div>
      <div className="input-wrapper">
        <input type="text" placeholder="이름(예: 길동)" />
        <PersonIcon />
      </div>
      <div className="input-wrapper">
        <input type="text" placeholder="성(예: 홍)" />
        <PersonIcon />
      </div>
      <div className="input-wrapper">
        <input type="password" placeholder="비밀번호 설정하기" />
        <OpendEyeIcon />
      </div>
    </ContainerForm>
  );
};

export default SignUpModal;
