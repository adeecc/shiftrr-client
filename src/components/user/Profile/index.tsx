import React, { useMemo } from 'react';
import NextImage from 'next/image';

import shallow from 'zustand/shallow';

import { IUser, ReviewFor } from 'types';
import Container from 'components/common/Container';
import Button from 'components/common/Button';
import { useUserProfileStore } from 'lib/store/user';
import { client } from 'lib/api/axiosClient';
import PersonalInformationCard from './PersonalInformationCard';
import SkillCard from './SkillCard';
import UserServicesCarousel from './UserServicesCarousel';
import UserReviewList from './UserReviewList';

interface Props extends IUser {
  isSelf?: boolean;
}

const Profile: React.FC<Props> = ({
  _id,
  profilePicture,
  name,
  username,
  email,
  contactNumber,
  bio,
  credits,
  status,
  sellerProfile,
}) => {
  const { profile, isAdmin } = useUserProfileStore(
    (state) => ({ profile: state.profile, isAdmin: state.isAdmin }),
    shallow
  );

  const isSelf = useMemo(() => profile?._id === _id, [profile, _id]);
  const canBan = useMemo(() => isAdmin && !isSelf, [isAdmin, isSelf]);
  const isBanned = useMemo(() => status === 'banned', [status]);

  const toggleBanUser = () => {
    client.put(`api/user/${_id}`, {
      status: isBanned ? 'active' : 'banned',
    });
  };

  return (
    <Container>
      <div className="grid w-full grid-cols-1 md:grid-cols-6 gap-5 auto-rows-max">
        {/* Header Section */}
        <div className="col-span-full">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-x-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <NextImage src={profilePicture} width="64px" height="64px" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-x-1 items-center">
                  <h3 className="font-semibold text-3xl">{name}</h3>
                  {isAdmin && (
                    <span className="font-semibold text-gray-500 text-xs">
                      (admin)
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-700">@{username}</span>
              </div>
            </div>
            {isSelf && <Button href="/profile/edit">Edit Profile</Button>}
            {canBan && (
              <button
                className="bg-accent-100 text-white px-3 py-2 rounded-md"
                onClick={() => toggleBanUser()}
              >
                {isBanned ? 'Unban' : 'Soft Ban User'}
              </button>
            )}
          </div>
        </div>

        {/* Information and Bio */}
        <PersonalInformationCard
          email={email}
          contactNumber={contactNumber || '-'}
          bio={bio || '-'}
          credits={credits}
          domain={sellerProfile.domain || '-'}
        />

        {/* Skills */}
        <SkillCard sellerProfile={sellerProfile} />

        {/* Services Offered */}
        <UserServicesCarousel userId={_id} />

        {/* Buyer Ratings */}
        <UserReviewList userId={_id} reviewFor={ReviewFor.buyer} />

        {/* Seller Ratings */}
        <UserReviewList userId={_id} reviewFor={ReviewFor.seller} />
      </div>
    </Container>
  );
};

export default Profile;
