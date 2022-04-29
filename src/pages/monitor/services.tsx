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

const MonitorServicesPage: NextPage<Props> = (props: Props) => {
  return <div>MonitorServicesPage</div>;
};

export default MonitorServicesPage;
