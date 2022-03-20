import React from 'react';
import type { GetStaticProps, NextPage } from 'next';

import { useProfileStore } from 'lib/hooks/useProfileStore';
import Profile from 'components/user/Profile';

type Props = {};

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      protected: true,
      // userTypes: ['user'],
    },
  };
};

const ProfilePage: NextPage<Props> = (props) => {
  const profile = useProfileStore((state) => state.profile);

  return (
    <>
      <Profile isSelf {...profile} />
    </>
  );
};

export default ProfilePage;
