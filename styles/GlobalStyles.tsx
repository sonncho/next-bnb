import reset from 'styled-reset';
import { createGlobalStyle, css } from 'styled-components';
import palette from './palette';

const globalStyles = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
    color: ${palette.black};
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyles};
`;

export default GlobalStyle;
