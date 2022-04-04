import { IUser } from 'types';
import React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

import {
  InboxIcon,
  PhoneIcon,
  RightArrowIcon,
  StarIcon,
} from 'components/icons';

interface Props extends IUser {}

const SellerProfileCard: React.FC<Props> = ({
  name,
  _id,
  username,
  profilePicture,
  sellerProfile,
  bio,
  email,
  contactNumber,
}) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center border-b">
        <div className="flex flex-col">
          <h3 className="text-3xl font-semibold">{name}</h3>
          <div className="flex justify-between">
            <NextLink href={`/profile/${_id}`}>
              <a className="text-accent-300">@{username}</a>
            </NextLink>
          </div>
        </div>

        <div className="relative">
          <NextImage
            src={
              profilePicture ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }
            width="64px"
            height="64px"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <span className="font-semibold text-gray-600">
          {sellerProfile.domain}
        </span>
        <div className="flex gap-x-1 items-center">
          <StarIcon className="h-3 w-3 text-accent-100" />
          <span className="font-semibold text-gray-500">
            {sellerProfile.rating}
          </span>
        </div>
      </div>

      <span className="text-gray-800">
        {'"'}
        {bio}
        {'"'}
      </span>

      <div className="flex flex-col gap-y-2 text-sm">
        <h5 className="text-xl text-gray-600 pb-2">Contacts</h5>
        <div className="flex items-center gap-x-2">
          <InboxIcon className="h-4 w-4" />
          {email}
        </div>
        <div className="flex items-center gap-x-2">
          <PhoneIcon className="h-4 w-4" />
          {contactNumber}
        </div>
      </div>

      <div className="flex flex-col gap-y-2 text-sm">
        <h5 className="text-xl text-gray-600 pb-2">Skills</h5>

        <div className="flex gap-1 flex-wrap">
          {sellerProfile?.skills?.map((value) => (
            <div
              key={value}
              className="px-3 py-1 text-xs text-gray-600 rounded-3xl border border-accent-100"
            >
              {value}
            </div>
          ))}
        </div>
      </div>

      <NextLink href={`/profile/${_id}`}>
        <a className="text-gray-600 flex gap-1 items-center hover:translate-x-2 transition-all">
          View Full Profile
          <RightArrowIcon className="h-4 w-4" />
        </a>
      </NextLink>
    </div>
  );
};

export default SellerProfileCard;
