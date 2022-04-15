import React from 'react';
import type { GetStaticProps, NextPage } from 'next';

import { useUserProfileStore } from 'lib/store/user';
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

const ProfilePage: NextPage<Props> = () => {
  const profile = useUserProfileStore((state) => state.profile!);

  return (
    <>
      <Profile isSelf {...profile} />
    </>
  );
};

export default ProfilePage;
