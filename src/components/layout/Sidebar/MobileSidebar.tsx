import React, { Fragment, useState, useEffect } from 'react';
import NextLink from 'next/link';

import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';

import styles from 'styles/mobile-menu.module.css';

import { Logo, MenuIcon } from 'components/icons';
import ProfileMenu from './ProfileMenu';
import Sidebar from '.';

type Props = {};

const MobileSidebar: React.FC<Props> = ({}) => {
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
    <div className="lg:hidden">
      <nav className="h-20 items-center bg-white border-gray-300 border-b">
        <div className="flex w-full h-full px-10 mx-auto justify-between items-center ">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            type="button"
            className={cn(styles.burger, '')}
          >
            <MenuIcon className="h-8 w-8 absolute" />
          </button>
          <NextLink href="/">
            <a>
              <Logo className="h-10 w-10" />
            </a>
          </NextLink>
          <ProfileMenu />
        </div>
      </nav>

      <Transition.Root show={isMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 lg:hidden overflow-hidden"
          onClose={toggleMenu}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="pointer-events-auto relative w-screen max-w-md">
                <div className="flex h-full flex-col bg-white shadow-xl">
                  <Sidebar />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MobileSidebar;
