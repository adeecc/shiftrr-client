import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';

import { useUserProfileStore, useUserRequestsStore } from 'lib/store/user';
import Container from 'components/common/Container';
import RequestTable from './RequestTable';
import { requestStatus } from 'types/request';

type Props = {};

const RequestHistory: React.FC<Props> = (props) => {
  const profile = useUserProfileStore((state) => state.profile);
  const { acceptedRequests, completedRequests, populateRequests } =
    useUserRequestsStore(
      (state) => ({
        acceptedRequests: state.acceptedRequests,
        completedRequests: state.completedRequests,
        populateRequests: state.populateRequests,
      }),
      shallow
    );

  useEffect(() => {
    populateRequests(profile!._id);
  }, [profile, populateRequests]);

  return (
    <Container>
      <div className="grid w-full grid-cols-1 md:grid-cols-6 gap-5 auto-rows-max">
        {/* Header Section */}
        <div className="col-span-full flex flex-col">
          <h3 className="font-semibold text-3xl">Request History</h3>
          <span className="text-sm text-gray-500">
            Browse through all your previous requests
          </span>
        </div>

        <div className="col-span-full">
          <div className="flex flex-col p-6 gap-4 bg-white border rounded-lg shadow">
            <div className="border-b border-gray-300 pb-4">
              <h4 className="font-semibold text-2xl">Ongoing Requests</h4>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Requests you have accepted
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <RequestTable requests={acceptedRequests} />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <div className="flex flex-col p-6 gap-4 bg-white border rounded-lg shadow">
            <div className="border-b border-gray-300 pb-4">
              <h4 className="font-semibold text-2xl">Fulfilled Requests</h4>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Requests you have completed
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <RequestTable requests={completedRequests} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RequestHistory;
