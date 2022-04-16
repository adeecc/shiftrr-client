import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

import ProtectedPage from 'components/layout/ProtectedPage';
import GridLayout from 'components/layout/GridLayout';
import { NavItemType } from 'types';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ProtectedPage pageProps={pageProps}>
      <Component {...pageProps} />
    </ProtectedPage>
  );
};

export default App;
