import React, { useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';
import cn from 'classnames';

import { client } from 'lib/api/axiosClient';
import { IRequest, ReviewFor } from 'types';
import { requestStatus } from 'types/request';
import { useUserProfileStore, useUserRequestsStore } from 'lib/store/user';
import { DiscIcon } from 'components/icons';
import CreateReviewFormModal from 'components/reviews/CreateReviewFormModal';

interface Props {
  populatedRequest: IRequest;
  isBuyer: boolean;
}

const RequestRow: React.FC<Props> = ({ populatedRequest, isBuyer = false }) => {
  const profile = useUserProfileStore((state) => state.profile!);

  const [requestReviewModalIsOpen, setRequestReviewModalIsOpen] =
    useState(false);
  const [sellerReviewModalIsOpen, setSellerReviewModalIsOpen] = useState(false);
  const [buyerReviewModalIsOpen, setBuyerReviewModalIsOpen] = useState(false);

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
      <div className="col-span-full place-items-center border-b">
        <Disclosure.Button className="text-left w-full grid grid-cols-7 items-center gap-2">
          <div className="col-span-2 sm:col-span-2 my-2 flex items-center text-semibold text-left">
            <NextLink href={`/profile/${populatedConsumer._id}`}>
              <a className="text-accent-300">{populatedConsumer.username}</a>
            </NextLink>
          </div>
          <div className="col-span-3 sm:col-span-3 my-2 flex items-center text-semibold text-left">
            {populatedRequest.service.name}
          </div>

          <div className="col-span-1 sm:col-span-1 my-2 text-semibold flex justify-center">
            <span
              className={cn(
                populatedRequest.status == requestStatus.requested
                  ? 'text-orange-500'
                  : populatedRequest.status == requestStatus.accepted
                  ? 'text-emerald-500'
                  : 'text-sky-500'
              )}
            >
              <DiscIcon className="h-6 w-6 sm:hidden" />
              <span className="hidden sm:block py- px-2 rounded-lg border border-current">
                {populatedRequest.status}
              </span>
            </span>
          </div>

          <div className="col-span-1 sm:col-span-1 my-2 text-semibold text-center">
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
          <Disclosure.Panel className="col-span-full grid grid-cols-5 gap-3 py-2 items-center border-dotted border-t-2">
            <div className="col-span-3 flex flex-col gap-y-3">
              <span className="font-semibold">Details:</span>
              <span className="text-gray-700">
                {populatedRequest.information}
              </span>
            </div>

            <div className="col-span-2 flex flex-col gap-y-3">
              <div className="flex gap-2">
                <span className="font-semibold">Status:</span>
                <span className="text-gray-700">{populatedRequest.status}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Last Updated on</span>
                <span className="font-light text-gray-700">{dateString}</span>
              </div>
            </div>

            <div className="col-span-full flex gap-3 items-center">
              {isBuyer && populatedRequest.status === requestStatus.requested && (
                <button
                  className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                  onClick={removeRequestHandler}
                >
                  Cancel
                </button>
              )}

              {isBuyer && populatedRequest.status === requestStatus.accepted && (
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

              {isBuyer && populatedRequest.status === requestStatus.completed && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={acceptRequestHandler}
                  >
                    Pay
                  </button>
                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setSellerReviewModalIsOpen(true);
                      console.log('Opening Review Modal');
                    }}
                  >
                    Review Seller
                  </button>
                  <CreateReviewFormModal
                    reviewFor={ReviewFor.seller}
                    isOpen={sellerReviewModalIsOpen}
                    setIsOpen={setSellerReviewModalIsOpen}
                    request={populatedRequest}
                  />

                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setRequestReviewModalIsOpen(true);
                    }}
                  >
                    Review Request
                  </button>
                  <CreateReviewFormModal
                    reviewFor={ReviewFor.request}
                    isOpen={requestReviewModalIsOpen}
                    setIsOpen={setRequestReviewModalIsOpen}
                    request={populatedRequest}
                  />
                </div>
              )}

              {!isBuyer && populatedRequest.status === requestStatus.requested && (
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

              {!isBuyer && populatedRequest.status === requestStatus.accepted && (
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    onClick={completeRequestHandler}
                  >
                    Complete
                  </button>
                </div>
              )}

              {!isBuyer && populatedRequest.status === requestStatus.completed && (
                <div className="flex gap-4 text-gray-600 text-sm">
                  <button
                    className="text-accent-100 hover:text-accent-300 font-semibold transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setBuyerReviewModalIsOpen(true);
                      console.log('Opening Review Modal');
                    }}
                  >
                    Review Buyer
                  </button>
                  <CreateReviewFormModal
                    reviewFor={ReviewFor.buyer}
                    isOpen={buyerReviewModalIsOpen}
                    setIsOpen={setBuyerReviewModalIsOpen}
                    request={populatedRequest}
                  />
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </Transition>
      </div>
    </Disclosure>
  );
};

export default RequestRow;
