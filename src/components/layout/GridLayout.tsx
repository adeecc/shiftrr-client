import React from 'react';

import Sidebar, { MobileSidebar } from 'components/layout/Sidebar';

type Props = {};

const GridLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <MobileSidebar />
      <div className="fixed inset-y-0 left-0 hidden lg:block w-0 lg:w-80 min-h-screen">
        <div className="h-screen bg-white shadow-sm">
          <Sidebar />
        </div>
      </div>
      <div className="lg:pl-80 w-full bg-gray-100 overflow-auto">
        {children}
      </div>
    </>
  );
};

export default GridLayout;
