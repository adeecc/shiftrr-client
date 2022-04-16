import React, { useMemo } from 'react';
import NextLink from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';

import { client } from 'lib/api/axiosClient';
import { IRequest } from 'types';
import { requestStatus } from 'types/request';
import { useUserProfileStore, useUserRequestsStore } from 'lib/store/user';

interface Props {
  populatedRequest: IRequest;
  isBuyer: boolean;
}

const RequestCard: React.FC<Props> = ({
  populatedRequest,
  isBuyer = false,
}) => {
  const profile = useUserProfileStore((state) => state.profile!);
  const category = useMemo(() => populatedRequest.status, [populatedRequest]);

  const populateRequests = useUserRequestsStore(
    (state) => state.populateRequests
  );

  const dateString = useMemo(
    () =>
      new Date(populatedRequest.createdAt).toLocaleString(undefined, {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    [populatedRequest]
  );

  const populatedConsumer = useMemo(
    () => (isBuyer ? populatedRequest?.seller : populatedRequest?.buyer),
    [isBuyer, populatedRequest]
  );

  const acceptRequestHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await client.put(`/api/requests/${populatedRequest._id}`, {
      status: requestStatus.accepted,
    });

    populateRequests(profile._id);
  };

  const completeRequestHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await client.put(`/api/requests/${populatedRequest._id}`, {
      status: requestStatus.completed,
    });

    populateRequests(profile._id);
  };

  const removeRequestHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await client.delete(`/api/requests/${populatedRequest._id}`);

    populateRequests(profile._id);
  };

  return (
    <Disclosure>
      <div className="col-span-full border-b">
        <Disclosure.Button className="text-left w-full grid grid-cols-9">
          <div className="col-span-3 sm:col-span-4 py-2 text-semibold text-left">
            <NextLink href={`/profile/${populatedConsumer._id}`}>
              <a className="text-accent-300">{populatedConsumer.username}</a>
            </NextLink>
          </div>
          <div className="col-span-4 sm:col-span-4 py-2 text-semibold text-left">
            {populatedRequest.service.name}
          </div>

          <div className="col-span-2 sm:col-span-1 py-2 text-semibold text-center">
            {populatedRequest.price}
          </div>
        </Disclosure.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          as={React.Fragment}
        >
          {/* <Disclosure.Panel className="col-span-full flex py-2 items-center border-dotted border-t-2">
            <div className="w-8/12 flex flex-col gap-y-3">
              <div className="flex flex-col">
                <span className="font-semibold">Details:</span>
                <span className="text-gray-700">
                  {populatedRequest.information}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Status:</span>
                <span className="text-gray-700">{populatedRequest.status}</span>
              </div>
              <span className="font-light text-sm text-gray-700">
                {dateString}
              </span>
            </div>

            <div className="w-4/12 flex items-center justify-center">
              {isBuyer && category === requestStatus.requested && (
                <button
                  className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                  onClick={removeRequestHandler}
                >
                  Cancel
                </button>
              )}

              {isBuyer && category === requestStatus.accepted && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={acceptRequestHandler}
                  >
                    Pay
                  </button>
                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={removeRequestHandler}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {isBuyer && category === requestStatus.completed && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={acceptRequestHandler}
                  >
                    Pay
                  </button>
                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={removeRequestHandler}
                  >
                    Review
                  </button>
                </div>
              )}

              {!isBuyer && category === requestStatus.requested && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={acceptRequestHandler}
                  >
                    Accept
                  </button>
                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={removeRequestHandler}
                  >
                    Reject
                  </button>
                </div>
              )}

              {!isBuyer && category === requestStatus.accepted && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={completeRequestHandler}
                  >
                    Complete
                  </button>
                </div>
              )}

              {!isBuyer && category === requestStatus.completed && (
                <div className="flex gap-4 text-gray-600 text-sm">
                  <button
                    className="px-2.5 py-1.5 text-accent-300 font-semibold outline-none border border-accent-300 hover:text-white hover:bg-accent-100 transition-colors rounded-md"
                    onClick={completeRequestHandler}
                  >
                    Review!
                  </button>
                </div>
              )}
            </div>          
          </Disclosure.Panel> */}

          <Disclosure.Panel className="col-span-full grid grid-cols-3 gap-3 py-2 items-center border-dotted border-t-2">
            <div className="col-span-2 flex flex-col gap-y-3">
              <span className="font-semibold">Details:</span>
              <span className="text-gray-700">
                {populatedRequest.information}
              </span>
            </div>

            <div className="col-span-1 flex flex-col gap-y-3">
              <div className="flex gap-2">
                <span className="font-semibold">Status:</span>
                <span className="text-gray-700">{populatedRequest.status}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Last Updated on</span>
                <span className="font-light text-sm text-gray-700">
                  {dateString}
                </span>
              </div>
            </div>

            <div className="col-span-full flex gap-3 items-center">
              {isBuyer && category === requestStatus.requested && (
                <button
                  className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                  onClick={removeRequestHandler}
                >
                  Cancel
                </button>
              )}

              {isBuyer && category === requestStatus.accepted && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={acceptRequestHandler}
                  >
                    Pay
                  </button>
                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={removeRequestHandler}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {isBuyer && category === requestStatus.completed && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={acceptRequestHandler}
                  >
                    Pay
                  </button>
                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={removeRequestHandler}
                  >
                    Review
                  </button>
                </div>
              )}

              {!isBuyer && category === requestStatus.requested && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={acceptRequestHandler}
                  >
                    Accept
                  </button>
                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={removeRequestHandler}
                  >
                    Reject
                  </button>
                </div>
              )}

              {!isBuyer && category === requestStatus.accepted && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={completeRequestHandler}
                  >
                    Complete
                  </button>
                </div>
              )}

              {!isBuyer && category === requestStatus.completed && (
                <div className="flex gap-4 text-gray-600 text-sm">
                  <button
                    className="px-2.5 py-1.5 text-accent-300 font-semibold outline-none border border-accent-300 hover:text-white hover:bg-accent-100 transition-colors rounded-md"
                    onClick={completeRequestHandler}
                  >
                    Review!
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </Transition>
      </div>
    </Disclosure>
  );
};

export default RequestCard;
