import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import BackArrowIcon from '../../public/static/svg/register/register_room_footer_back_arrow.svg';
import Button from '../common/Button';
import palette from '../../styles/palette';
import useValidateMode from '../../hooks/useValidateMode';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};
  .register-room-footer-back {
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

interface IProps {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}

const RegisterRoomFooter: React.FC<IProps> = ({ prevHref, nextHref, isValid = true }) => {
  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      setValidateMode(false); //! 마운트 해제시 validateMode 초기화
    };
  }, []);

  const onClickNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isValid) {
      e.preventDefault();
      setValidateMode(true);
    }
  };
  return (
    <Container>
      <Link href={prevHref || ''}>
        <span className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </span>
      </Link>
      <Link href={nextHref || ''}>
        <Button color="dark_cyan" onClick={onClickNext}>
          계속
        </Button>
      </Link>
    </Container>
  );
};

export default RegisterRoomFooter;
