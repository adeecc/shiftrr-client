import React, { useEffect, useMemo, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import useSWR from 'swr';

import { client } from 'lib/api/axiosClient';
import Container from 'components/common/Container';
import { SearchIcon } from 'components/icons';
import ServiceCard from 'components/service/ServiceCard';
import { IService } from 'types';

type Props = {};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      protected: true,
    },
  };
};

const ServicesPage: NextPage<Props> = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [searchString, setSearchString] = useState('');

  const { data: servicesData, error: servicesError } = useSWR(
    'api/service',
    client.get
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  const filteredServices = useMemo(() => {
    if (searchString === '') return services;
    else
      return services.filter((value) =>
        value.name
          .concat(value.description)
          .concat(value.seller.name)
          .concat(value.seller.username)
          .toLowerCase()
          .includes(searchString.toLowerCase())
      );
  }, [searchString, services]);

  useEffect(() => {
    setServices(servicesData);
  }, [servicesData, setServices]);

  if (servicesError)
    return (
      <Container>
        <div className="grid w-full place-items-center text-gray-600">
          Something went wrong. Please refresh and try again!
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="grid w-full grid-cols-1 md:grid-cols-6 gap-6 auto-rows-max">
        {/* Header Section */}
        <div className="col-span-full flex flex-col">
          <h3 className="font-semibold text-3xl">Services</h3>
          <span className="text-sm text-gray-500">
            Browse through all the services currently offered.
          </span>
        </div>

        {/* Serarch Bar */}
        <div className="col-span-full flex items-center text-gray-500 hover:text-gray-800 focus-within:text-black rounded">
          <div className="px-4">
            <SearchIcon className="h-6 w-6" />
          </div>
          <input
            type="text"
            placeholder="Search for Services..."
            className="w-full px-4 py-2 focus:text-black rounded-3xl border focus:border-accent-100 focus:outline-none focus:ring-0"
            value={searchString}
            onChange={onChangeHandler}
          />
        </div>

        {/* Search Results */}
        <div className="col-span-full pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-max">
            {filteredServices?.length ? (
              filteredServices?.map((value) => (
                <ServiceCard key={value._id.toString()} service={value} />
              ))
            ) : (
              <div className="text-gray-500">Wow! Such Empty :(</div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ServicesPage;
