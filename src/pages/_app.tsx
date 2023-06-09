import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// import { wrapper } from '@/redux/store';
import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';
import '@/styles/reset.css';
import '@/styles/globals.css';
import store from '@/redux/store';
// import AdminLayout from '@/layouts/admin/AdminLayout';
// import WebLayout from '@/layouts/user/webLayout';

const WebLayout = dynamic(() => import('@/layouts/user/webLayout'), {
  ssr: false,
});
const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let Layout = WebLayout;
  if (router.asPath?.includes('/admin')) {
    Layout = AdminLayout;
    if (router.asPath?.includes('/admin/login')) Layout = React.Fragment;
  }
  return (
    <Provider store={store}>
      <Layout>
        <NextNProgress />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
// export default wrapper.withRedux(App);
