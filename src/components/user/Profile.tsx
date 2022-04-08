import React, { useEffect, useMemo, useState } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

import shallow from 'zustand/shallow';

import type { IRequest, IService, IUser } from 'types';
import Container from 'components/common/Container';
import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import CreateServiceForm from 'components/service/CreateServiceForm';
import {
  useUserProfileStore,
  useUserServicesStore,
  useUserRequestsStore,
} from 'lib/store/user';
import { client } from 'lib/api/axiosClient';
import ServiceCard from 'components/service/ServiceCard';
import RequestTable from 'components/request/RequestTable';
import { RightArrowIcon } from 'components/icons';

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
  isSelf = false,
  profilePicture,
  name,
  username,
  email,
  contactNumber,
  bio,
  credits,
  role,
  status,
  sellerProfile,
  ...props
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const isAdmin = useUserProfileStore((state) => state.isAdmin);
  const canBan = useMemo(() => isAdmin && !isSelf, [isAdmin, isSelf]);
  const isBanned = useMemo(() => status === 'banned', [status]);

  const { pendingRequests, requested, populateRequests } = useUserRequestsStore(
    (state) => ({
      pendingRequests: state.pendingRequests,
      requested: state.requested,
      populateRequests: state.populateRequests,
    }),
    shallow
  );

  const [isPopulatingService, setIsPopulatingService] = useState(true);
  const [isPopulatingRequests, setIsPopulatingRequests] = useState(true);

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
      const services = res.filter((service) => service.seller._id === _id);

      setServices(services);
      setIsPopulatingService(false);
    };

    if (isSelf) populateServices();
  }, [modalIsOpen, _id, setServices, isSelf]); // modalIsOpen as parameter so the service can be populated whenever the modal closes. Ideally, extract our the service platform to a different component

  useEffect(() => {
    const _populateRequests = async () => {
      populateRequests(_id);
      setIsPopulatingRequests(false);
    };

    if (isSelf) _populateRequests();
  }, [_id, populateRequests, isSelf]);

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
          <div className="flex flex-col p-6 gap-4 border bg-white rounded-lg">
            <div className="flex justify-between pb-4 border-b border-gray-300">
              <div className="flex flex-col">
                <h4 className="font-semibold text-2xl">Gigs</h4>
                <span className="text-sm text-gray-500">
                  Publically Offered Gigs
                </span>
              </div>

              {isSelf && (
                <div className="">
                  <button
                    className="px-3 py-2 text-accent-300 font-semibold outline-none border border-accent-300 hover:text-white hover:bg-accent-100 transition-colors rounded-md"
                    onClick={() => setModalIsOpen(true)}
                  >
                    Add a Gig
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    setIsOpen={setModalIsOpen}
                    title="Add a Gig"
                  >
                    <CreateServiceForm />
                  </Modal>
                </div>
              )}
            </div>
            {services.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service?._id}
                    {...service}
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

        {/* Requests */}
        {isSelf && (
          <div className="col-span-full">
            <div className="flex flex-col p-6 gap-4 bg-white border rounded-lg shadow">
              <div className="border-b border-gray-300 pb-4">
                <h4 className="font-semibold text-2xl">Offers to You</h4>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Requests made to you
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    View Request History
                    <NextLink href="/profile/history">
                      <a className="h-4 w-4">
                        <RightArrowIcon className="h-4 w-4 text-accent-100" />
                      </a>
                    </NextLink>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <RequestTable limitHeight requests={pendingRequests} />
              </div>
            </div>
          </div>
        )}

        {/* Requested */}
        {isSelf && (
          <div className="col-span-full">
            <div className="flex flex-col p-6 gap-4 bg-white border rounded-lg shadow">
              <div className="border-b border-gray-300 pb-4">
                <h4 className="font-semibold text-2xl">Offers you have Made</h4>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Requests you have made
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    View Request History
                    <NextLink href="/profile/history">
                      <a className="h-4 w-4">
                        <RightArrowIcon className="h-4 w-4 text-accent-100" />
                      </a>
                    </NextLink>
                  </div>
                </div>
              </div>
              <RequestTable isBuyer limitHeight requests={requested} />
            </div>
          </div>
        )}

        {/* Buyer Ratings */}
        <div className="col-span-full md:col-span-3">
          <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow">
            <h5 className="font-semibold text-xl pb-2 border-b">
              Reviews from Buyers
            </h5>
            <div className="flex flex-col">
              <span className="text-gray-500">No reviews yet</span>
              {/* TODO: Add Reviews */}
            </div>
          </div>
        </div>
        {/* Seller Ratings */}
        <div className="col-span-full md:col-span-3">
          <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow">
            <h5 className="font-semibold text-xl pb-2 border-b">
              Reviews from Sellers
            </h5>
            <div className="flex flex-col">
              <span className="text-gray-500">No reviews yet</span>
              {/* TODO: Add Reviews */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
