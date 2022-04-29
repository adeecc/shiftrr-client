import React from 'react';
import cn from 'classnames';

import { ArrowDownRightIcon, ArrowUpRightIcon } from 'components/icons';

interface Props {
  title: string;
  Icon: (props: JSX.IntrinsicElements['svg']) => JSX.Element;
  prefix?: string;
  stat: number;
  delta: number;
  comparedTo: string;
}

const CollectionCard: React.FC<Props> = ({
  title,
  Icon,
  prefix = '',
  stat,
  delta,
  comparedTo,
}) => {
  return (
    <div className="col-span-1 flex flex-col justify-between h-28 bg-white rounded p-4 ">
      <div className="col-span-full flex justify-between text-gray-500 ">
        <span className="font-semibold text-xs">{title}</span>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        {/* Data */}
        <div className="flex items-baseline">
          <span className="text-sm text-gray-600 pr-1">{prefix}</span>
          <span className="text-2xl font-semibold pr-3">
            {stat.toLocaleString()}
          </span>
          <div
            className={cn(
              'flex gap-1 items-end',
              delta > 0 ? 'text-teal-500' : 'text-rose-500'
            )}
          >
            {delta.toFixed(2)}%
            {delta > 0 ? (
              <ArrowUpRightIcon className="h-4 w-4" />
            ) : (
              <ArrowDownRightIcon className="h-4 w-4" />
            )}
          </div>
        </div>
        <span className="text-gray-400 text-xs">Compared to {comparedTo}</span>
      </div>
    </div>
  );
};

export default CollectionCard;
