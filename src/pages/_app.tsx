import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

import ProtectedPage from 'components/layout/ProtectedPage';
import GridLayout from 'components/layout/GridLayout';
import { NavItemType } from 'lib/types';

const navItems: NavItemType[] = [
  {
    href: '/service',
    text: 'Hire Talent',
  },
  {
    href: '/work',
    text: 'Find a Job',
  },
  {
    href: '/profile/history',
    text: 'History',
  },
];

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GridLayout navItems={navItems}>
      <ProtectedPage pageProps={pageProps}>
        <Component {...pageProps} />;
      </ProtectedPage>
    </GridLayout>
  );
};

export default App;
