import React, { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';
import shallow from 'zustand/shallow';

import { IService } from 'types';

import {
  useUserProfileStore,
  useUserRequestsStore,
  useUserServicesStore,
} from 'lib/store/user';
import { client } from 'lib/api/axiosClient';

import Container from 'components/common/Container';
import { PlusIcon, RightArrowIcon } from 'components/icons';
import CreateServiceFormModal from 'components/service/CreateServiceFormModal';
import ServiceCard from 'components/service/ServiceCard';
import RequestTable from 'components/request/RequestTable';

type Props = {};

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      protected: true,
      // userTypes: ['user'],
    },
  };
};

const ProfilePage: NextPage<Props> = () => {
  const profile = useUserProfileStore((state) => state.profile!);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isPopulatingService, setIsPopulatingService] = useState(true);
  const [isPopulatingRequests, setIsPopulatingRequests] = useState(true);

  const { services, setServices } = useUserServicesStore(
    (state) => ({
      services: state.services,
      setServices: state.setServices,
    }),
    shallow
  );

  const { acceptedRequests, requested, populateRequests } =
    useUserRequestsStore(
      (state) => ({
        acceptedRequests: state.acceptedRequests,
        requested: state.requested,
        populateRequests: state.populateRequests,
      }),
      shallow
    );

  useEffect(() => {
    const populateServices = async () => {
      const res: IService[] = await client.get('api/service');
      const services = res.filter(
        (service) => service.seller._id === profile._id
      );

      setServices(services);
      setIsPopulatingService(false);
    };

    populateServices();
  }, [modalIsOpen, profile._id, setServices]); // modalIsOpen as parameter so the service can be populated whenever the modal closes. Ideally, extract our the service platform to a different component

  useEffect(() => {
    const _populateRequests = async () => {
      populateRequests(profile._id);
      setIsPopulatingRequests(false);
    };

    _populateRequests();
  }, [profile._id, populateRequests]);

  return (
    <>
      <Container>
        <div className="grid w-full grid-cols-1 md:grid-cols-6 gap-5 auto-rows-max">
          {/* Header Section */}
          <div className="col-span-full">
            <h2 className="text-4xl font-semibold">Dashboard</h2>
          </div>

          <div className="col-span-full">
            <div className="flex flex-col gap-4 rounded-lg">
              <div className="flex justify-between p-6 rounded-t-lg border-b bg-white border-gray-300">
                <div className="flex flex-col ">
                  <h4 className="font-semibold text-2xl">My Services</h4>
                  <span className="text-sm text-gray-500">
                    Publically Offered Services
                  </span>
                </div>

                <div className="">
                  <button
                    className="px-2 py-2 text-accent-300 font-semibold outline-none hover:text-white hover:bg-accent-100 transition-colors rounded-md"
                    onClick={() => setModalIsOpen(true)}
                  >
                    <PlusIcon className="h-6 w-6" />
                  </button>
                  <CreateServiceFormModal
                    isOpen={modalIsOpen}
                    setIsOpen={setModalIsOpen}
                  />
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

          {/* Requests */}
          <div className="col-span-full">
            <div className="flex flex-col p-6 gap-4 bg-white border rounded-lg shadow">
              <div className="border-b border-gray-300 pb-4">
                <h4 className="font-semibold text-2xl">Current Jobs</h4>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Jobs you are currently doing
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    View Request History
                    <NextLink href="/profile/jobs/history">
                      <a className="h-4 w-4">
                        <RightArrowIcon className="h-4 w-4 text-accent-100" />
                      </a>
                    </NextLink>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                {acceptedRequests?.length ? (
                  <RequestTable requests={acceptedRequests} />
                ) : (
                  <span className="flex h-full items-center text-gray-500">
                    {isPopulatingRequests ? 'Loading...' : 'Wow so empty :('}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Requested */}
          <div className="col-span-full">
            <div className="flex flex-col p-6 gap-4 bg-white border rounded-lg shadow">
              <div className="border-b border-gray-300 pb-4">
                <h4 className="font-semibold text-2xl">Offers You Made</h4>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Requests you made to other sellers
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    View Request History
                    <NextLink href="/profile/jobs/history">
                      <a className="h-4 w-4">
                        <RightArrowIcon className="h-4 w-4 text-accent-100" />
                      </a>
                    </NextLink>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                {requested?.length ? (
                  <RequestTable isBuyer requests={requested} />
                ) : (
                  <span className="flex h-full items-center text-gray-500">
                    {isPopulatingRequests ? 'Loading...' : 'Wow so empty :('}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProfilePage;
