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

const RequestHistoryPage: NextPage<Props> = () => {
  const profile = useUserProfileStore((state) => state.profile);
  const { completedRequests, setRequests } = useUserRequestsStore(
    (state) => ({
      completedRequests: state.completedRequests,
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

  if (requestsError)
    return (
      <Container>
        Unknown Error Occurred. Please Refresh the page and try again.
      </Container>
    );

  return (
    <Container>
      <div className="grid w-full grid-cols-1 md:grid-cols-6 gap-5 auto-rows-max">
        {/* Header Section */}
        <div className="col-span-full flex flex-col">
          <h3 className="font-semibold text-3xl">Job History</h3>
          <span className="text-sm text-gray-500">
            Browse through all your completed jobs
          </span>
        </div>

        <div className="col-span-full">
          <div className="flex flex-col p-6 gap-4 bg-white border rounded-lg shadow">
            <div className="overflow-x-auto">
              <RequestTable requests={completedRequests} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RequestHistoryPage;
