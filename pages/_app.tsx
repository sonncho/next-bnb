import { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyles';
import Header from '../components/Header';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

export default app;
