import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from 'styles/mobile-menu.module.css';

import { CrossIcon, Logo, MenuIcon } from 'components/icons';
import { NavItemType } from 'lib/types';

import NavItem from './NavItem';
import ProfileMenu from './ProfileMenu';

const MobileNav: React.FC<{ navItems: NavItemType[] }> = ({ navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
      setIsMenuOpen(false);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed z-50 md:hidden',
        isMenuOpen ? 'inset-0' : 'top-0 inset-x-0'
      )}
    >
      <nav className="h-20 items-center bg-white border-gray-300 border-b">
        <div className="flex w-full h-full px-10 mx-auto justify-between items-center ">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            type="button"
            className={cn(styles.burger, '')}
          >
            <MenuIcon className="h-8 w-8 absolute" data-hide={isMenuOpen} />
            <CrossIcon className="h-8 w-8 absolute" data-hide={!isMenuOpen} />
          </button>
          <NavItem href="/">
            <Logo className="h-10 w-10" />
          </NavItem>
          <ProfileMenu />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="flex flex-col justify-center space-y-10 h-full p-10 bg-white">
          {navItems.map(({ href, text }) => (
            <NavItem
              key={href}
              href={href}
              className="w-full py-2 border-b-2  border-accent-100 motion-safe:animate-slide-in"
            >
              {text}
            </NavItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
