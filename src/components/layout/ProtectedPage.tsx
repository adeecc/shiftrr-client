import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import { useUserProfileStore } from 'lib/store/user';
import { client } from 'lib/api/axiosClient';
import GridLayout from 'components/layout/GridLayout';
import { IUser } from 'types';

type Props = {
  pageProps: any;
};

const ProtectedPage: React.FC<Props> = ({ pageProps, children }) => {
  const { profile, setProfile } = useUserProfileStore((state) => state);
  const { data, error } = useSWR<IUser>('api/user/me', client.get);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const _getUser = async () => {
      setIsLoading(false);

      if (!error && data) {
        setProfile(data);
      }
    };

    _getUser();
  }, [data, error, setProfile]);

  if (!pageProps.protected) {
    return <>{children}</>;
  }

  if (pageProps.protected && isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <h5 className="text-xl">Loading...</h5>
      </div>
    );
  }

  if (pageProps.protected && !isLoading && !profile) {
    return (
      <div className="h-screen grid place-items-center">
        <h5 className="text-xl">Please Login to continue...</h5>
      </div>
    );
  }

  if (
    pageProps.protected &&
    !isLoading &&
    profile &&
    pageProps.userTypes &&
    pageProps.userTypes.indexOf(profile.role) === -1
  ) {
    return (
      <div className="h-screen grid place-items-center">
        <h5 className="text-xl">
          <b>Authorization Error!</b> You do not have credentials required to
          view this page.
        </h5>
      </div>
    );
  }

  return <GridLayout>{children}</GridLayout>;
};

export default ProtectedPage;
