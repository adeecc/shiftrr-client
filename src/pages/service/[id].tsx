import React, { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { useUserProfileStore } from 'lib/store/user';
import { client } from 'lib/api/axiosClient';
import Container from 'components/common/Container';
import { IService } from 'types';

import SellerProfileCard from 'components/user/SellerProfileCard';
import Modal from 'components/common/Modal';
import { useRouter } from 'next/router';
import { StarIcon } from 'components/icons';
import CreateRequestForm from 'components/request/CreateRequestForm';

type Props = {
  id: string;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params?.id || 'whatinthegoddamnedfuck',
    },
  };
};

const ServiceDetailPage: NextPage<Props> = ({ id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const profile = useUserProfileStore((state) => state.profile);

  const [service, setService] = useState<IService>();
  const [isServiceLoading, setIsServiceLoading] = useState(true);

  const router = useRouter();

  const isSeller = useMemo(
    () => profile?._id == service?.seller,
    [profile?._id, service?.seller]
  );

  useEffect(() => {
    const _getServiceDetail = async () => {
      const _service = await client.get(`api/service/${id}`);
      setService(_service);
      setIsServiceLoading(false);
    };

    _getServiceDetail();
  }, [id]);

  const deleteGigHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await client.delete(`api/service/${id}`);
    console.log(res);
    router.push('/profile');
  };

  const requestGigHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  return (
    <Container>
      <div className="grid grid-cols-5 w-full gap-4 auto-rows-max">
        {/* Gig Details */}
        <div className="col-span-full md:col-span-3">
          <div className="flex flex-col gap-y-4 rounded-lg bg-white p-6">
            {isServiceLoading ? (
              'Loading...'
            ) : service ? (
              <div className="flex flex-col gap-y-4">
                <div className="grid grid-cols-4 gap-4 items-center pb-4 border-b">
                  <div className="col-span-3 flex items-center gap-x-2">
                    <h2 className="text-4xl font-semibold">{service?.name}</h2>
                  </div>
                  <div className="col-span-1 justify-self-end">
                    {isSeller ? (
                      <button
                        className="px-3 py-2 text-accent-300 font-semibold outline-none border border-accent-300 hover:text-white hover:bg-accent-100 transition-colors rounded-md"
                        onClick={deleteGigHandler}
                      >
                        Delete Gig
                      </button>
                    ) : (
                      <>
                        <button
                          className="px-3 py-2 text-accent-300 font-semibold outline-none border border-accent-300 hover:text-white hover:bg-accent-100 transition-colors rounded-md"
                          onClick={requestGigHandler}
                        >
                          Book this Gig
                        </button>
                        <Modal
                          isOpen={modalIsOpen}
                          setIsOpen={setModalIsOpen}
                          title="Book the Gig"
                        >
                          <CreateRequestForm
                            service={service!}
                            seller={service!.seller}
                          />
                        </Modal>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-2xl font-semibold">About the Service</h4>
                  {service?.description}
                </div>

                <div className="flex items-end justify-end gap-4">
                  <span className="font-semibold text-gray-600">
                    Starting At
                  </span>
                  <h4 className="text-3xl text-accent-100 font-semibold ">
                    ₹{service?.startingPrice}
                  </h4>
                </div>
              </div>
            ) : (
              'Service Not Found :('
            )}
          </div>
        </div>

        {/* Seller Details */}
        <div className="col-span-full md:col-span-2">
          <div className="rounded-lg bg-white p-6">
            {isServiceLoading
              ? 'Loading...'
              : service &&
                service.seller && <SellerProfileCard {...service.seller} />}
          </div>
        </div>

        {/* Comments and Reviews */}
        <div className="col-span-full">
          <div className="rounded-lg bg-white p-6 gap-4 flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b">
              <h2 className="text-4xl font-semibold">Ratings and Reviews</h2>
              <div className="flex gap-2 items-center">
                <StarIcon className="h-6 w-6 text-accent-300" />
                {/* {service?.rating?.toFixed(2)} TODO: Add Cumulative Rating */}
              </div>
            </div>
            <div className="text-gray-600">No Reviews Yet :(</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ServiceDetailPage;
