import React, { useState } from 'react';
import styled from 'styled-components';

import CloseXIcon from '../../public/static/svg/auth/modal_close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpendEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import Input from '../common/Input';
import palette from '../../styles/palette';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/staticData';

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
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthdate-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-birthday-info {
    margin-bottom: 16px;
    font-size: 14px;
    color: ${palette.charcoal};
  }
  .sign-up-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-birthday-year-selector {
      width: 33.33333%;
    }
  }
`;

const SignUpModal = () => {
  const [email, setEmail] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangeLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };
  const onChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  return (
    <ContainerForm>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          icon={<MailIcon />}
          name="email"
          onChange={onChangeEmail}
          value={email}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름(예: 길동)"
          type="text"
          icon={<PersonIcon />}
          name="lastname"
          onChange={onChangeLastname}
          value={lastname}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성(예: 홍)"
          type="text"
          icon={<PersonIcon />}
          name="firstname"
          onChange={onChangeFirstname}
          value={firstname}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? 'password' : 'text'}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpendEyeIcon onClick={toggleHidePassword} />
            )
          }
          name="password"
          onChange={onChangePassword}
          value={password}
        />
      </div>

      <p className="sign-up-birthdate-label">생일</p>
      <p className="sign-up-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 에어비앤비 이용자에게
        공개되지 않습니다.
      </p>

      <div className="sign-up-birthday-selectors">
        <div className="sign-up-birthday-month-selector">
          <Selector options={monthList} disabledOptions={['월']} defaultValue="월" />
        </div>
        <div className="sign-up-birthday-day-selector">
          <Selector options={dayList} disabledOptions={['일']} defaultValue="일" />
        </div>
        <div className="sign-up-birthday-year-selector">
          <Selector options={yearList} disabledOptions={['년']} defaultValue="년" />
        </div>
      </div>
    </ContainerForm>
  );
};

export default SignUpModal;
