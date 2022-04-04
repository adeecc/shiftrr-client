import React from 'react';

import { type NavItemType } from 'lib/types';
import { Logo } from 'components/icons';
import NavItem from './NavItem';
import ProfileMenu from './ProfileMenu';
import MobileNav from './MobileNav';

const Navbar: React.FC<{ navItems: NavItemType[] }> = ({ navItems }) => {
  return (
    <>
      <MobileNav navItems={navItems} />
      <nav className="fixed top-0 inset-x-0 z-50 hidden md:flex md:justify-between h-24 items-center bg-white border-gray-300 border-b">
        <div className="flex w-full h-full max-w-7xl mx-auto px-8 justify-between items-center ">
          <div className="flex items-center gap-x-12">
            <NavItem href="/">
              <Logo className="h-10 w-10" />
            </NavItem>

            <div className="flex items-center gap-x-6">
              {navItems.map(({ href, text }) => (
                <NavItem key={href} href={href}>
                  {text}
                </NavItem>
              ))}
            </div>
          </div>

          <ProfileMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
