import React, { useEffect, useMemo, useState } from 'react';
import NextImage from 'next/image';

import shallow from 'zustand/shallow';

import { IBuyerReview, ISellerReview, IService, IUser, ReviewFor } from 'types';
import Container from 'components/common/Container';
import Button from 'components/common/Button';
import { useUserProfileStore, useUserServicesStore } from 'lib/store/user';
import { client } from 'lib/api/axiosClient';
import ServiceCard from 'components/service/ServiceCard';
import ReviewCard from 'components/reviews/ReviewCard';
import { StarIcon } from 'components/icons';

type PersonalInformationProps = {
  email: string;
  contactNumber: string;
  bio: string;
  credits: number;
  domain: string;
};

const PersonalInformationCard: React.FC<PersonalInformationProps> = ({
  email,
  contactNumber,
  bio,
  credits,
  domain,
}) => {
  return (
    <div className="col-span-full md:col-span-4">
      <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow">
        <div className="border-b border-gray-300 pb-4">
          <h4 className="font-semibold text-2xl">About</h4>
          <span className="text-sm text-gray-500">
            Personal Details and Information
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          <div className="flex flex-col col-span-1">
            <span className="text-gray-500 text-sm">Domain</span>
            <span className="">{domain}</span>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-gray-500 text-sm">Email Address</span>
            <span className="">{email}</span>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-gray-500 text-sm">Credits</span>
            <span className="">{credits}</span>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-gray-500 text-sm">Phone</span>
            <span className="">{contactNumber}</span>
          </div>
          <div className="flex flex-col col-span-full">
            <span className="text-gray-500 text-sm">Bio</span>
            <span className="">{bio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  const [isPopulatingService, setIsPopulatingService] = useState(true);

  const [sellerReviews, setSellerReviews] = useState<ISellerReview[]>([]);
  const [buyerReviews, setBuyerReviews] = useState<IBuyerReview[]>([]);

  const [isLoadingSellerReviews, setIsLoadingSellerReviews] = useState(true);

  const [isLoadingBuyerReviews, setIsLoadingBuyerReviews] = useState(true);

  const overallSellerRating = useMemo(() => {
    if (sellerReviews?.length === 0) {
      return '-';
    }

    const total = sellerReviews.reduce(
      (prevTotal, currentValue) => prevTotal + currentValue.rating,
      0
    );

    return (total / sellerReviews.length).toFixed(2);
  }, [sellerReviews]);

  const overallBuyerRating = useMemo(() => {
    if (buyerReviews?.length === 0) {
      return '-';
    }

    const total = buyerReviews.reduce(
      (prevTotal, currentValue) => prevTotal + currentValue.rating,
      0
    );

    return (total / buyerReviews.length).toFixed(2);
  }, [buyerReviews]);

  const { services, setServices } = useUserServicesStore(
    (state) => ({
      services: state.services,
      setServices: state.setServices,
    }),
    shallow
  );

  const toggleBanUser = () => {
    client.put(`/api/user/${_id}`, {
      status: isBanned ? 'active' : 'banned',
    });
  };

  useEffect(() => {
    const populateServices = async () => {
      const res: IService[] = await client.get('api/service');

      setServices(res.filter((service) => service.seller._id === _id));
      setIsPopulatingService(false);
    };

    populateServices();
  }, [_id, setServices]);

  useEffect(() => {
    const populateSellerReviews = async () => {
      const res: ISellerReview[] = await client.get(
        `api/reviews/seller/ofseller/${_id}`
      );

      setSellerReviews(res);
      setIsLoadingSellerReviews(false);
    };

    populateSellerReviews();
  }, [_id]);

  useEffect(() => {
    const populateBuyerReviews = async () => {
      const res: IBuyerReview[] = await client.get(
        `api/reviews/buyer/ofbuyer/${_id}`
      );

      setBuyerReviews(res);
      setIsLoadingBuyerReviews(false);
    };

    populateBuyerReviews();
  }, [_id]);

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
        <div className="col-span-full md:col-span-2 ">
          <div className="w-full p-6 flex flex-col gap-4 border bg-white rounded-lg shadow">
            <div className="">
              <h4 className="font-semibold text-2xl">Skills</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {sellerProfile.skills?.map((value) => (
                <div
                  key={value}
                  className="px-3 py-1 text-xs text-gray-600 rounded-3xl border border-accent-100"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Offered */}

        <div className="col-span-full">
          <div className="flex flex-col gap-4 rounded-lg">
            <div className="flex justify-between p-6 rounded-t-lg border-b bg-white border-gray-300">
              <div className="flex flex-col ">
                <h4 className="font-semibold text-2xl">Services</h4>
                <span className="text-sm text-gray-500">
                  Publically Offered Services
                </span>
              </div>
            </div>
            {services.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service?._id}
                    service={service}
                    className="h-auto"
                  />
                ))}
              </div>
            ) : (
              <span className="flex h-full items-center text-gray-500">
                {isPopulatingService ? 'Loading...' : 'Wow so empty :('}
              </span>
            )}
          </div>
        </div>

        {/* Buyer Ratings */}
        <div className="col-span-full md:col-span-3">
          <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow">
            <div className="flex justify-between items-center pb-4 border-b">
              <h5 className="text-xl font-semibold"> Reviews from Buyers</h5>
              <div className="flex gap-2 items-center">
                <StarIcon className="h-6 w-6 text-accent-300" />
                {overallBuyerRating}/5
              </div>
            </div>
            <div className="flex flex-col">
              {isLoadingSellerReviews ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : sellerReviews.length ? (
                <div className="flex flex-col gap-y-5">
                  {sellerReviews.map((review) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      reviewFor={ReviewFor.seller}
                    />
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-500">No reviews yet</span>
              )}
            </div>
          </div>
        </div>
        {/* Seller Ratings */}
        <div className="col-span-full md:col-span-3">
          <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow">
            <div className="flex justify-between items-center pb-4 border-b">
              <h5 className="text-xl font-semibold"> Reviews from Sellers</h5>
              <div className="flex gap-2 items-center">
                <StarIcon className="h-6 w-6 text-accent-300" />
                {overallSellerRating}/5
              </div>
            </div>
            <div className="flex flex-col">
              {isLoadingBuyerReviews ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : buyerReviews.length ? (
                <div className="flex flex-col gap-y-5">
                  {buyerReviews.map((review) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      reviewFor={ReviewFor.buyer}
                    />
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-500">No reviews yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
