import React, { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { useUserProfileStore } from 'lib/store/user';
import { client } from 'lib/api/axiosClient';
import Profile from 'components/user/Profile';

type Props = {
  id: string;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params?.id || 'whatinthegoddamnedfuck',
      protected: true,
    },
  };
};

const UserPage: NextPage<Props> = (props) => {
  const profile = useUserProfileStore((state) => state.profile);
  const id = props.id;
  const isSelf = useMemo(() => profile?._id == id, [profile?._id, id]);

  const [user, setUser] = useState();

  useEffect(() => {
    const _getUserProfile = async () => {
      const res = await client.get(`api/user/${id}`);
      setUser(res);
    };

    _getUserProfile();
  }, [isSelf, id]);

  return user ? <Profile {...user} /> : <span>Loading Profile...</span>;
};

export default UserPage;
