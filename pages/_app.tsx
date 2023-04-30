import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import GlobalStyle from '../styles/GlobalStyles';
import Header from '../components/Header';
import { wrapper } from '../store';

const app = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </Provider>
  );
};

export default app;
