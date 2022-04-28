import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import cn from 'classnames';

import {
  CollectionIcon,
  JobHistoryIcon,
  Logo,
  PendingOffersIcon,
  TicketIcon,
  UsersIcon,
} from 'components/icons';

import MobileSidebar from './MobileSidebar';
import ProfileMenu from './ProfileMenu';
import { useUserProfileStore, useUserRequestsStore } from 'lib/store/user';
import shallow from 'zustand/shallow';

type NavItemProps = {
  href: string;
  className?: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, className, children }) => {
  const router = useRouter();
  const isActive = router.asPath == href;
  return (
    <NextLink href={href} passHref>
      <a
        className={cn(
          className,
          isActive ? 'bg-gray-100 text-accent-300' : 'bg-none',
          'hover:text-accent-100'
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};

type Props = {};

const Sidebar: React.FC<Props> = () => {
  const { profile, isAdmin } = useUserProfileStore((state) => ({
    profile: state.profile,
    isAdmin: state.isAdmin,
  }));

  const { pendingRequests, populateRequests } = useUserRequestsStore(
    (state) => ({
      pendingRequests: state.pendingRequests,
      populateRequests: state.populateRequests,
    }),
    shallow
  );

  useEffect(() => {
    populateRequests(profile!._id);
    // Load count of num pending requests
  }, [populateRequests, profile]);

  return (
    <>
      <div className="flex flex-col gap-y-7">
        {/* Header */}
        <NextLink href="/" passHref>
          <a className="flex items-center gap-x-4 px-6 pt-6">
            <Logo className="h-14 w-14" />
            <h3 className="text-3xl font-semibold text-black">shiftrr.</h3>
          </a>
        </NextLink>

        <div className="px-6">
          <ProfileMenu />
        </div>

        <div className="flex flex-col p-1">
          {/* Actionable Items: Dashboard, History, Edit Profile, etc */}
          <NavItem
            href="/dashboard"
            className="flex items-center gap-x-4 py-3 rounded px-5"
          >
            <CollectionIcon className="h-6 w-6" />
            Dashboard
          </NavItem>

          <NavItem
            href="/service"
            className="flex items-center gap-x-4 py-3 rounded px-5"
          >
            <TicketIcon className="h-6 w-6" />
            All Services
          </NavItem>

          <NavItem
            href="/profile/jobs/pending"
            className="flex justify-between items-center gap-x-4 px-5 py-1 rounded"
          >
            <div className="flex gap-x-4">
              <PendingOffersIcon className="h-6 w-6" />
              Pending Offers
            </div>
            <span className="text-gray-500 font-semibold bg-gray-100 px-2 py-2 rounded">
              {pendingRequests?.length}
            </span>
          </NavItem>

          <NavItem
            href="/profile/jobs/history"
            className="flex items-center gap-x-4 py-3 rounded px-5"
          >
            <JobHistoryIcon className="h-6 w-6" />
            Job History
          </NavItem>
        </div>

        {/* Admin Items: List, Ban, etc */}
        {isAdmin && (
          <div className="flex flex-col p-1">
            <NavItem
              href="/collections"
              className="flex items-center gap-x-4 py-3 rounded px-5"
            >
              <CollectionIcon className="h-6 w-6" />
              Collections
            </NavItem>

            <NavItem
              href="/service"
              className="flex items-center gap-x-4 py-3 rounded px-5"
            >
              <UsersIcon className="h-6 w-6" />
              Review Users
            </NavItem>

            <NavItem
              href="/profile/jobs/pending"
              className="flex justify-between items-center gap-x-4 px-5 py-1 rounded"
            >
              <div className="flex gap-x-4">
                <PendingOffersIcon className="h-6 w-6" />
                Review Services
              </div>
              <span className="text-gray-500 font-semibold bg-gray-100 px-2 py-2 rounded">
                {pendingRequests?.length}
              </span>
            </NavItem>

            <NavItem
              href="/profile/jobs/history"
              className="flex items-center gap-x-4 py-3 rounded px-5"
            >
              <JobHistoryIcon className="h-6 w-6" />
              Review Requests
            </NavItem>
          </div>
        )}

        {/* Navigable Items: Service, User List View*/}
      </div>
    </>
  );
};

export default Sidebar;
export { MobileSidebar };
