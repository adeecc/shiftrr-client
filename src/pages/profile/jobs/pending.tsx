import React, { useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import shallow from 'zustand/shallow';
import useSWR from 'swr';

import { useUserProfileStore, useUserRequestsStore } from 'lib/store/user';
import Container from 'components/common/Container';
import RequestTable from 'components/request/RequestTable';
import { client } from 'lib/api/axiosClient';

type Props = {};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      protected: true,
    },
  };
};

const PendingRequestPage: NextPage<Props> = () => {
  const profile = useUserProfileStore((state) => state.profile);
  const { pendingRequests, setRequests } = useUserRequestsStore(
    (state) => ({
      pendingRequests: state.pendingRequests,
      setRequests: state.setRequests,
    }),
    shallow
  );

  const { data: requestsData, error: requestsError } = useSWR(
    `api/user/${profile!._id}/requests`,
    client.get
  );

  useEffect(() => {
    if (requestsData) setRequests(requestsData);
  }, [profile, requestsData, setRequests]);

  return (
    <Container>
      <div className="grid w-full grid-cols-1 md:grid-cols-6 gap-5 auto-rows-max">
        {/* Header Section */}
        <div className="col-span-full flex flex-col">
          <h3 className="font-semibold text-3xl">Pending Offers</h3>
          <span className="text-sm text-gray-500">
            Sercvice requests you have not replied to
          </span>
        </div>

        <div className="col-span-full">
          <div className="flex flex-col p-6 gap-4 bg-white border rounded-lg shadow">
            <div className="overflow-x-auto">
              <RequestTable requests={pendingRequests} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PendingRequestPage;
