import React, { useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import shallow from 'zustand/shallow';

import { useUserProfileStore, useUserRequestsStore } from 'lib/store/user';
import Container from 'components/common/Container';
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

const PendingRequestPage: NextPage<Props> = () => {
  const profile = useUserProfileStore((state) => state.profile);
  const { pendingRequests, populateRequests } = useUserRequestsStore(
    (state) => ({
      pendingRequests: state.pendingRequests,
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
