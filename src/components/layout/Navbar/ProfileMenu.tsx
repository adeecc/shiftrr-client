import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ProfileIcon } from 'components/icons';
import NavItem from './NavItem';
import { useProfileStore } from 'lib/hooks/useProfileStore';

type Props = {};

const ProfileMenu: React.FC<Props> = () => {
  const profile = useProfileStore((state) => state.profile);
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="">
        <span className="sr-only">Open user menu</span>
        <ProfileIcon className="h-8 w-8" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {profile ? (
          <Menu.Items className="origin-top-right absolute right-0 mt-1 w-48 flex flex-col rounded bg-white ring-2 ring-accent-300 ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <NavItem href="/profile" className="px-4 py-2 text-sm">
                {profile.username}
              </NavItem>
            </Menu.Item>
            <Menu.Item>
              <NavItem
                href="/profile/edit"
                className="px-4 py-2 text-sm text-gray-700"
              >
                Edit Profile
              </NavItem>
            </Menu.Item>
            <Menu.Item>
              <NavItem
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/logout`}
                className="px-4 py-2 text-sm text-gray-700"
              >
                Logout
              </NavItem>
            </Menu.Item>
          </Menu.Items>
        ) : (
          <Menu.Items className="origin-top-right absolute right-0 mt-1 w-48 flex flex-col rounded bg-white ring-2 ring-accent-300 ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <NavItem
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`}
                className="px-4 py-2 text-sm text-gray-700"
              >
                Login
              </NavItem>
            </Menu.Item>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
