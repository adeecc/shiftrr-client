import React, { useState } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';

import { IService } from 'types';
import CreateRequestFormModal from 'components/request/CreateRequestFormModal';
import { useUserProfileStore, useUserServicesStore } from 'lib/store/user';
import { client } from 'lib/api/axiosClient';

import { useSWRConfig } from 'swr';

interface Props {
  service: IService;
  className?: string;
}

const ServiceCard: React.FC<Props> = ({ service, className }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { mutate } = useSWRConfig();

  const profile = useUserProfileStore((state) => state.profile);

  const handleDeleteService = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await client.delete(`/api/service/${service._id}`);
    mutate(`api/user/${profile!._id}/services`);
  };

  return (
    <div className="">
      <div
        className={cn(
          'flex flex-col bg-white border rounded-lg shadow',
          className
        )}
      >
        <div className="py-4 flex flex-col px-8 gap-y-2 border">
          <NextLink href={`/service/${service._id}`}>
            <a>
              <h6 className="text-lg font-semibold">{service.name}</h6>
            </a>
          </NextLink>
          <div className="flex flex-col justify-between">
            <span>{service.seller.name}</span>
            <NextLink href={`/profile/${service.seller._id}`}>
              <a className="text-sm text-gray-500">
                @{service.seller.username}
              </a>
            </NextLink>
          </div>
        </div>

        <div className="py-4 px-8 border flex flex-col gap-y-4">
          <span className="text-gray-500 text-xs font-semibold">
            DESCRIPTION
          </span>
          <div className="text-sm text-gray-800">{service.description}</div>
        </div>

        <div className="py-4 px-8 border flex flex-col sm:flex-row justify-between gap-y-4">
          <div className="flex flex-col">
            <h5 className="text-xl font-semibold">
              ₹{service.startingPrice.toFixed(2)}
            </h5>
            <span className="text-xs text-gray-500">starting price</span>
          </div>

          {service.seller._id === profile?._id ? (
            <button
              className="px-4 text-accent-300 font-semibold outline-none border border-accent-300 hover:text-white hover:bg-accent-100 transition-colors rounded-md"
              onClick={handleDeleteService}
            >
              Delete
            </button>
          ) : (
            <button
              className="px-4 text-accent-300 font-semibold outline-none border border-accent-300 hover:text-white hover:bg-accent-100 transition-colors rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setModalIsOpen(true);
              }}
            >
              Book now
            </button>
          )}

          <CreateRequestFormModal
            service={service}
            seller={service!.seller}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
