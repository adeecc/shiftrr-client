import React from 'react';
import cn from 'classnames';

import RequestRow from './RequestRow';
import { IRequest } from 'types';

interface Props {
  requests: IRequest[];
  isBuyer?: boolean;
  limitHeight?: boolean;
}

const RequestTable: React.FC<Props> = ({
  requests,
  isBuyer = false,
  limitHeight = false,
}) => {
  return (
    <div className="w-full grid grid-cols-1 text-xs sm:text-sm">
      <div className="col-span-full grid grid-cols-7 gap-2 py-4 border-b">
        <span className="col-span-2 sm:col-span-2 font-semibold text-left">
          {isBuyer ? 'Offer To' : 'Offer From'}
        </span>
        <span className="col-span-3 sm:col-span-3 font-semibold text-left">
          Service
        </span>
        <span className="col-span-1 sm:col-span-1 font-semibold text-center">
          Status
        </span>
        <span className="col-span-1 sm:col-span-1 font-semibold text-center">
          Price
        </span>
      </div>

      <div className={cn('overflow-auto', limitHeight ? 'max-h-64 ' : '')}>
        {requests?.length ? (
          requests!.map((request) => {
            return (
              <RequestRow
                key={request._id}
                isBuyer={isBuyer}
                populatedRequest={request}
              />
            );
          })
        ) : (
          <span className="text-gray-500">Wow! Such Empty.</span>
        )}
      </div>
    </div>
  );
};

export default RequestTable;
