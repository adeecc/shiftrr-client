import React from 'react';
import { GetStaticProps, NextPage } from 'next';

type Props = {};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      protected: true,
      userTypes: ['admin'],
    },
  };
};

const MonitorRequestsPage: NextPage<Props> = (props: Props) => {
  return <div>MonitorRequestsPage</div>;
};

export default MonitorRequestsPage;
