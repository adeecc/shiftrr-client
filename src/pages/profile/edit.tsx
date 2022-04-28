import React from 'react';
import type { GetStaticProps, NextPage } from 'next';

import { useUserProfileStore } from 'lib/store/user';
import EditProfile from 'components/user/EditProfile';

type Props = {};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      protected: true,
      // userTypes: ['user'],
    },
  };
};

const EditProfilePage: NextPage<Props> = () => {
  const profile = useUserProfileStore((state) => state.profile!);

  return (
    <>
      <EditProfile {...profile} />
    </>
  );
};

export default EditProfilePage;
