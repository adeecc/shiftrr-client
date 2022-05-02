import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import useSWR from 'swr';

import { client } from 'lib/api/axiosClient';
import Profile from 'components/user/Profile';
import Container from 'components/common/Container';

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
  const id = props.id;

  const [user, setUser] = useState();
  const { data: userData, error: userError } = useSWR(
    `api/user/${id}`,
    client.get
  );

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  if (userError)
    return (
      <Container>
        <div className="grid w-full place-items-center text-gray-600">
          Something went wrong. Please refresh and try again!
        </div>
      </Container>
    );

  return user ? (
    <Profile {...user} />
  ) : (
    <Container>Loading Profile...</Container>
  );
};

export default UserPage;
