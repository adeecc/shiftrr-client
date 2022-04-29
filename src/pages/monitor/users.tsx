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

const MonitorUsersPage: NextPage<Props> = (props: Props) => {
  return <div>MonitorUsersPage</div>;
};

export default MonitorUsersPage;
