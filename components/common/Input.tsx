import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import palette from '../../styles/palette';

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    display: block;
    margin-bottom: 8px;
    span {
      display: block;
      margin-bottom: 8px;
    }
  }
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px ' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan};
    }
  }
  svg {
    position: absolute;
    right: 11px;
    transform: translate(0, -50%);
    top: 50%;
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        & :focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.dark_cyan};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: String;
  icon?: JSX.Element;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Input: React.FC<IProps> = ({
  label,
  icon,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}) => {
  const validateMode = useSelector((state: any) => state.common.validateMode);
  return (
    <Container iconExist={!!icon} isValid={isValid} useValidation={validateMode && useValidation}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {label && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label>
          <span>{label}</span>
          <input {...props} />
        </label>
      )}
      {!label && <input {...props} />}

      {icon}
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default React.memo(Input);
