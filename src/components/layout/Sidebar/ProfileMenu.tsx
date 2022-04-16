import React, { Fragment } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { Menu, Transition } from '@headlessui/react';

import { ProfileIcon, SelectorIcon } from 'components/icons';
import NavItem from './NavItem';
import { useUserProfileStore } from 'lib/store/user';

type Props = {};

const ProfileMenu: React.FC<Props> = () => {
  const profile = useUserProfileStore((state) => state.profile);
  return (
    <Menu as="div" className="relative">
      <span className="sr-only">Open user menu</span>
      <div className="flex items-center gap-x-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <NextImage src={profile!.profilePicture} width="64px" height="64px" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold">{profile?.name}</span>
          <NextLink href={`/profile/${profile?._id}`}>
            <a>
              <span className="text-gray-700">@{profile?.username}</span>
            </a>
          </NextLink>
        </div>

        <Menu.Button className="">
          <SelectorIcon className="h-4 w-4" />
        </Menu.Button>
      </div>

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
          <Menu.Items className="origin-top-right absolute right-0 mt-1 w-48 flex flex-col py-3 gap-y-2 rounded bg-white ring-2 ring-accent-300 ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Menu.Button className="text-left">
                <NavItem
                  href={`/profile/${profile._id}`}
                  className="px-4 py-2 text-sm"
                >
                  {profile.username}
                </NavItem>
              </Menu.Button>
            </Menu.Item>
            <Menu.Item>
              <Menu.Button className="text-left">
                <NavItem
                  href="/profile/edit"
                  className="px-4 py-2 text-sm text-gray-700"
                >
                  Edit Profile
                </NavItem>
              </Menu.Button>
            </Menu.Item>
            <Menu.Item>
              <Menu.Button className="text-left">
                <NavItem
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/logout`}
                  className="px-4 py-2 text-sm text-gray-700"
                >
                  Logout
                </NavItem>
              </Menu.Button>
            </Menu.Item>
          </Menu.Items>
        ) : (
          <Menu.Items className="origin-top-right absolute right-0 mt-1 w-48 flex flex-col rounded bg-white ring-2 ring-accent-300 ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Menu.Button className="text-left">
                <NavItem
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`}
                  className="px-4 py-2 text-sm text-gray-700"
                >
                  Login
                </NavItem>
              </Menu.Button>
            </Menu.Item>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
