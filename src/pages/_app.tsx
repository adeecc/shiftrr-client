import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

import ProtectedPage from 'components/layout/ProtectedPage';
import { client } from 'lib/api/axiosClient';
import { useRouter } from 'next/router';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    client.post('api/pagehits', {
      endpoint: router.asPath,
      logicalEndpoint: router.pathname,
    });
  }, [router.asPath, router.pathname]);

  return (
    <ProtectedPage pageProps={pageProps}>
      <Component {...pageProps} />
    </ProtectedPage>
  );
};

export default App;
