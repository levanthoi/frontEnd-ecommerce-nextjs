import type { AppProps } from 'next/app';
// import { wrapper } from '@/redux/store';
import { Provider } from 'react-redux';
import '@/styles/reset.css';
import '@/styles/globals.css';
import store from '@/redux/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
// export default wrapper.withRedux(App);
