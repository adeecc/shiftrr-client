import React from 'react';
import type { GetStaticProps, NextPage } from 'next';

import RequestHistory from 'components/request/RequestHistory';

type Props = {};

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      protected: true,
      // userTypes: ['user'],
    },
  };
};

const RequestHistoryPage: NextPage<Props> = () => {
  return (
    <>
      <RequestHistory />
    </>
  );
};

export default RequestHistoryPage;
