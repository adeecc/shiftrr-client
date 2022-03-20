import React, { useEffect, useMemo, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';

import { useServicesStore } from 'lib/hooks/useServicesStore';
import Container from 'components/common/Container';
import { SearchIcon } from 'components/icons';
import ServiceCard from 'components/service/ServiceCard';
import { client } from 'lib/api/axiosClient';

type Props = {};

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      protected: true,
      // userTypes: ['user'],
    },
  };
};

const ServicesPage: NextPage = (props: Props) => {
  const { services, setServices } = useServicesStore((state) => state);

  const [searchString, setSearchString] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  const filteredServices = useMemo(() => {
    if (!searchString || searchString === '') return services;
    else
      return services.filter((value) =>
        value.name
          .concat(value.description)
          .toLowerCase()
          .includes(searchString)
      );
  }, [searchString, services]);

  useEffect(() => {
    const _getServices = async () => {
      const res = await client.get('api/service');
      setServices(res);
    };

    _getServices();
  }, [setServices]);

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
            // onBlur={() => setShowResults(false)}
            // onFocus={() => setShowResults(true)
          />
        </div>

        {/* Search Results */}
        <div className="col-span-full pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredServices?.length ? (
              filteredServices?.map((value, index) => (
                <ServiceCard key={value._id.toString()} {...value} />
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
