import React, { useEffect, useMemo, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Container from 'components/common/Container';
import CollectionCard from 'components/collections/CollectionCard';
import {
  LineChartIcon,
  MoneyIcon,
  TicketIcon,
  UserAddIcon,
} from 'components/icons';
import { IPageHit, IRequest, IUser } from 'types';
import { client } from 'lib/api/axiosClient';
import { requestStatus } from 'types/request';
import SalesValueChart from 'components/collections/SalesValueChart';
import TotalOrdersChart from 'components/collections/TotalOrdersChar';

type Props = {};

type PageHitStat = {
  pageName: string;
  visitors: number;
  unique: number;
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      protected: true,
      // userTypes: ['user'],
    },
  };
};

const CollectionsPage: NextPage<Props> = () => {
  const [trafficData, setTrafficData] = useState<IPageHit[]>([]);
  const [newUserData, setNewUserData] = useState<IUser[]>([]);
  const [salesData, setSalesData] = useState<IRequest[]>([]);
  const [ordersData, setOrdersData] = useState<IRequest[]>([]);
  const [serviceData, setServiceData] = useState([]);

  const getCountStats = (
    data: any[],
    initialValue: any = 0,
    reduction = (prev: any, _curr: any): any => prev + 1
  ) => {
    const obj = data?.reduce<Record<string, number>>((prev, item) => {
      const date = new Date(item.updateAt);
      const group = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;

      prev[group] = prev[group] || initialValue;
      prev[group] = reduction(prev[group], item);
      return prev;
    }, {} as Record<string, number>);

    const dataByMonth = Object.entries(obj).sort();
    const statThisMonth = (dataByMonth.at(-1)?.at(1) as number) || 0;
    const statLastMonth = (dataByMonth.at(-2)?.at(1) as number) || 0;

    return {
      stat: statThisMonth,
      delta: (100 * (statThisMonth - statLastMonth)) / (statLastMonth || 1),
    };
  };

  const trafficStats = useMemo(() => getCountStats(trafficData), [trafficData]);
  const newUserStats = useMemo(() => getCountStats(newUserData), [newUserData]);
  const newSalesStats = useMemo(
    () =>
      getCountStats(
        salesData,
        0,
        (prev: number, curr: IRequest) => prev + curr.price
      ),
    [salesData]
  );
  const newServiceStats = useMemo(
    () => getCountStats(serviceData),
    [serviceData]
  );

  const pageHitStats = useMemo(() => {
    const groupedByLogicalEnpoint = trafficData.reduce((prev, curr) => {
      const group = curr.logicalEndpoint;
      if (!prev[group]) prev[group] = [];
      prev[group].push(curr);
      return prev;
    }, {} as Record<string, IPageHit[]>);

    let res: PageHitStat[] = [];
    for (const key in groupedByLogicalEnpoint) {
      res.push({
        pageName: key,
        visitors: groupedByLogicalEnpoint[key].length,
        unique: new Set(groupedByLogicalEnpoint[key].map((item) => item.userId))
          .size,
      });
    }

    return res.sort((a, b) => {
      if (a.pageName < b.pageName) return -1;
      else if (a.pageName == b.pageName) return 0;
      else return 1;
    });
  }, [trafficData]);

  useEffect(() => {
    const fetchTrafficData = async () => {
      const res = await client.get('api/pagehits');
      setTrafficData(res);
    };

    fetchTrafficData();
  }, []);

  useEffect(() => {
    const fetchNewUserData = async () => {
      const res = await client.get('api/user');
      setNewUserData(res);
    };

    fetchNewUserData();
  }, []);

  useEffect(() => {
    const fetchRequestData = async () => {
      const res: IRequest[] = await client.get('api/requests');
      setSalesData(
        res?.filter((item) => item.status === requestStatus.completed)
      );
      setOrdersData(
        res?.filter((item) => item.status !== requestStatus.completed)
      );
    };

    fetchRequestData();
  }, []);

  useEffect(() => {
    const fetchTrafficDate = async () => {
      const res = await client.get('api/service');
      setServiceData(res);
    };

    fetchTrafficDate();
  }, []);

  return (
    <Container>
      <div className="flex flex-col w-full gap-6">
        {/* Header Section */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-3xl">Collections</h3>
          <span className="text-sm text-gray-500">
            Data collections for the admin
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <CollectionCard
            title="TRAFFIC"
            Icon={LineChartIcon}
            prefix="hits"
            {...trafficStats}
            comparedTo="previous month"
          />
          <CollectionCard
            title="NEW USERS"
            Icon={UserAddIcon}
            {...newUserStats}
            comparedTo="previous month"
          />
          <CollectionCard
            title="SALES"
            Icon={MoneyIcon}
            prefix="₹"
            {...newSalesStats}
            comparedTo="previous month"
          />
          <CollectionCard
            title="NEW SERVICES"
            Icon={TicketIcon}
            {...newServiceStats}
            comparedTo="previous month"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-8 gap-4">
          <div className="col-span-full xl:col-span-8 bg-white rounded p-8">
            <div className="flex flex-col pb-8">
              <h4 className="text-2xl font-semibold">Sales Value</h4>
              <span className="text-gray-500">
                Sales value over the past year
              </span>
            </div>
            <div className="relative h-96">
              <SalesValueChart requests={salesData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-8 gap-4 auto-rows-max">
          <div className="col-span-full xl:col-span-5">
            <div className="bg-white rounded p-8">
              <div className="flex flex-col pb-8">
                <h4 className="text-2xl font-semibold">Page Visits</h4>
                <span className="text-gray-500">
                  Page Visits over the past month
                </span>
              </div>
              <div className="grid grid-cols-5 py-3 border-b">
                <div className="col-span-3 text-gray-500 font-semibold text-sm">
                  PAGE NAME
                </div>
                <div className="col-span-1 text-gray-500 font-semibold text-sm">
                  VISITORS
                </div>
                <div className="col-span-1 text-gray-500 font-semibold text-sm">
                  UNIQUE VISITORS
                </div>
              </div>
              {pageHitStats?.map((item) => (
                <div key={item.pageName} className="grid grid-cols-5 py-2">
                  <div className="col-span-3 text-sm font-semibold">
                    {item.pageName}
                  </div>
                  <div className="col-span-1 text-sm">{item.visitors}</div>
                  <div className="col-span-1 text-sm">{item.unique}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-full xl:col-span-3">
            <div className="bg-white rounded p-8">
              <div className="flex flex-col pb-8">
                <h4 className="text-2xl font-semibold">Orders</h4>
                <span className="text-gray-500">
                  Orders per month over the past year
                </span>
              </div>
              <div className="relative h-80">
                <TotalOrdersChart requests={ordersData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CollectionsPage;
