import React, { useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';

import { client } from 'lib/api/axiosClient';
import { IRequest, IService, IUser } from '@shiftrr/types/models';
import { CheckIcon, CrossIcon } from 'components/icons';

interface Props {
  requestId: string;
  isBuyer: boolean;
}

const RequestCard: React.FC<Props> = ({ isBuyer = false, requestId }) => {
  const [populatedRequest, setPopulatedRequest] = useState<IRequest>();
  const [populatedService, setPopulatedService] = useState<IService>();
  const [populatedConsumer, setPopulatedConsumer] = useState<IUser>();

  const consumer = useMemo(
    () => (isBuyer ? populatedRequest?.seller : populatedRequest?.buyer),
    [isBuyer, populatedRequest]
  );

  useEffect(() => {
    const populateRequest = async () => {
      const _request = await client.get(`/api/requests/${requestId}`);
      if (!_request) return;

      setPopulatedRequest(_request);

      const _service = await client.get(`/api/service/${_request.service}`);
      setPopulatedService(_service);

      const _client = await client.get(`/api/user/${consumer}`);
      setPopulatedConsumer(_client);
    };

    populateRequest();
  }, [requestId, consumer]);

  const acceptRequestHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await client.put(`/api/requests/${requestId}`, {
      status: 'accepted',
    });
  };

  const removeRequestHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await client.delete(`/api/requests/${requestId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between border rounded">
      <div className="flex flex-col gap-y-1 p-6 sm:max-w-md md:max-w-prose">
        <h5 className="text-xl font-semibold text-gray-500">
          <NextLink href={`/service/${populatedService?._id}`}>
            <a>{populatedService?.name}</a>
          </NextLink>
        </h5>

        <div className="flex gap-1">
          {isBuyer ? <span>Requested to</span> : <span>Requested by</span>}
          <NextLink href={`/profile/${consumer}`}>
            <a className="text-accent-300 font-semibold">
              @{populatedConsumer?.username}
            </a>
          </NextLink>
        </div>
        {populatedRequest?.information}

        <div className="flex items-end mt-5 gap-x-4">
          <span className="text-gray-500">Offered Price</span>
          <h4 className="text-accent-100 text-2xl font-semibold">
            ₹{populatedRequest?.price}
          </h4>
        </div>
      </div>

      {!isBuyer && (
        <div className="grid grid-cols-2 sm:grid-cols-1 w-full max-w-none sm:max-w-[8em] p-6">
          <div className="">
            <button
              onClick={acceptRequestHandler}
              className="flex justify-center items-center text-accent-100 w-full h-full rounded-t border border-accent-100 hover:-translate-x-2 transition-transform"
            >
              <CheckIcon className="h-9 w-9" />
            </button>
          </div>

          <div className="">
            <button
              onClick={removeRequestHandler}
              className="flex justify-center items-center bg-accent-100 text-white w-full h-full rounded-b border border-accent-100 hover:-translate-x-2 transition-transform"
            >
              <CrossIcon className="h-9 w-9" />
            </button>
          </div>
        </div>
      )}

      {isBuyer && (
        <div className="grid grid-cols-1 flex-shrink p-6">
          <div className="">
            <button
              onClick={removeRequestHandler}
              className="flex justify-center items-center text-accent-100 w-full h-full hover:-translate-x-2 transition-transform"
            >
              Cancel Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
