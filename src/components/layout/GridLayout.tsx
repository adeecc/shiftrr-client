import React from 'react';
import Navbar from './Navbar';

import { type NavItemType } from 'lib/types';

type Props = {
  navItems: NavItemType[];
};

const GridLayout: React.FC<Props> = ({ navItems, children }) => {
  return (
    <>
      <Navbar navItems={navItems} />
      <div className="grid">{children}</div>
    </>
  );
};

export default GridLayout;
