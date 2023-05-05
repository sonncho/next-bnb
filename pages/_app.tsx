import App, { AppContext, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import GlobalStyle from '../styles/GlobalStyles';
import Header from '../components/Header';
import { wrapper } from '../store';
import { cookieStringToObject } from '../lib/utils';
import axios from '../lib/api';
import { meAPI } from '../lib/api/auth';
import { userActions } from '../store/user';

const app = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Header />
      <GlobalStyle />
      <Component {...props.pageProps} />
      <div id="root-modal" />
    </Provider>
  );
};

app.getInitialProps = wrapper.getInitialAppProps((store) => async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { isLogged } = store.getState().user;

  try {
    if (!isLogged && cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token;
      const { data } = await meAPI();
      // console.log(data);
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (error) {
    // console.log(error);
  }

  return { ...appInitialProps };
});

export default app;
