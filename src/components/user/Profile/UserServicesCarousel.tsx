import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import useSWR from 'swr';

import { useUserServicesStore } from 'lib/store/user';
import { IService } from 'types';
import { client } from 'lib/api/axiosClient';
import ServiceCard from 'components/service/ServiceCard';

type Props = {
  userId: string;
};

const UserServicesCarousel: React.FC<Props> = ({ userId }) => {
  const { services, setServices } = useUserServicesStore(
    (state) => ({
      services: state.services,
      setServices: state.setServices,
    }),
    shallow
  );

  const { data: servicesData, error: servicesError } = useSWR<IService[]>(
    `api/user/${userId}/services`,
    client.get
  );

  useEffect(() => {
    setServices(servicesData);
  }, [userId, servicesData, setServices]);

  return (
    <div className="col-span-full">
      <div className="flex flex-col gap-4 rounded-lg">
        <div className="flex justify-between p-6 rounded-t-lg border-b bg-white border-gray-300">
          <div className="flex flex-col ">
            <h4 className="font-semibold text-2xl">Services</h4>
            <span className="text-sm text-gray-500">
              Publically Offered Services
            </span>
          </div>
        </div>
        {services?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {services.map((service) => (
              <ServiceCard
                key={service?._id}
                service={service}
                className="h-auto"
              />
            ))}
          </div>
        ) : (
          <span className="flex h-full items-center text-gray-500">
            Wow so empty :(
          </span>
        )}
      </div>
    </div>
  );
};

export default UserServicesCarousel;
