import React, { useMemo } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { IRequest } from 'types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'chartArea' as const,
    },
    title: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

interface Props {
  requests: IRequest[];
}

const SalesValueChart: React.FC<Props> = ({ requests }) => {
  const labels = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  const datasets = useMemo(() => {
    const groupedByMonth = requests
      .filter(
        (value) =>
          new Date(value.updatedAt).getFullYear() == new Date().getFullYear()
      )
      .reduce<number[]>((prev, current) => {
        const month = new Date(current.updatedAt).getMonth();
        prev[month] += current.price;
        return prev;
      }, new Array(12).fill(0));

    return [
      {
        label: new Date().getFullYear().toString(),
        data: groupedByMonth,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        fill: true,
        tension: 0.4,
      },
    ];
  }, [requests]);

  const data = useMemo(
    () => ({
      labels,
      datasets,
    }),
    [labels, datasets]
  );

  return <Line options={options} data={data} />;
};

export default SalesValueChart;
