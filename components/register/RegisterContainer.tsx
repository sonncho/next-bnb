import React, { ReactNode } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 430px;
    margin-bottom: 24px;
    line-height: 1.2;
  }
`;

interface IProps {
  title: string;
  subTitle: string;
  desc: string;
  children?: ReactNode;
}

const RegisterContainer = (props: IProps) => {
  const { title, subTitle, desc, children } = props;
  return (
    <Container>
      <h2>{title}</h2>
      <h3>{subTitle}</h3>
      <p className="register-room-step-info">{desc}</p>
      {children}
    </Container>
  );
};

export default RegisterContainer;
