import React, { useMemo } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { IRequest } from 'types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  // responsive: true,
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

const TotalOrdersChart: React.FC<Props> = ({ requests }) => {
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
        prev[month] += 1;
        return prev;
      }, new Array(12).fill(0));

    return [
      {
        label: new Date().getFullYear().toString(),
        data: groupedByMonth,
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};

export default TotalOrdersChart;
