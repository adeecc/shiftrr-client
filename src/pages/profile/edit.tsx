import React from 'react';
import type { GetStaticProps, NextPage } from 'next';

import { useProfileStore } from 'lib/hooks/useProfileStore';
import EditProfile from 'components/user/EditProfile';

type Props = {};

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      protected: true,
      // userTypes: ['user'],
    },
  };
};

const EditProfilePage: NextPage<Props> = (props) => {
  const profile = useProfileStore((state) => state.profile);

  return (
    <>
      <EditProfile {...profile} />
    </>
  );
};

export default EditProfilePage;
