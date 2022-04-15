import { client } from 'lib/api/axiosClient';
import { useUserProfileStore } from 'lib/store/user';
import React, { useEffect } from 'react';

type Props = {
  pageProps: any;
};

const ProtectedPage: React.FC<Props> = ({ pageProps, children }) => {
  const { profile, setProfile } = useUserProfileStore((state) => state);

  useEffect(() => {
    const _getUser = async () => {
      const res = await client.get('api/user/me');
      setProfile(res);
    };

    _getUser();
  }, [setProfile]);

  // TODO: Add Singular layout to cover all cases
  if (pageProps.protected && !profile) {
    return (
      <div className="h-screen grid place-items-center">
        <h5 className="text-xl">Loading...</h5>
      </div>
    );
  }

  if (
    pageProps.protected &&
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
  return <>{children}</>;
};

export default ProtectedPage;
