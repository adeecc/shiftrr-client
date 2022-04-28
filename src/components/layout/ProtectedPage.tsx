import React, { useState, useEffect } from 'react';

import { useUserProfileStore } from 'lib/store/user';
import { client } from 'lib/api/axiosClient';
import GridLayout from 'components/layout/GridLayout';

type Props = {
  pageProps: any;
};

const ProtectedPage: React.FC<Props> = ({ pageProps, children }) => {
  const { profile, setProfile } = useUserProfileStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const _getUser = async () => {
      const res = await client.get('api/user/me');
      setIsLoading(false);

      if (res) {
        setProfile(res);
      }
    };

    _getUser();
  }, [setProfile]);

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
    pageProps.profileTypes &&
    pageProps.profileTypes.indexOf(profile.role) === -1
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
