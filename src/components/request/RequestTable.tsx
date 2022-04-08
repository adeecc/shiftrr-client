import React from 'react';
import cn from 'classnames';

import RequestRow from './RequestRow';
import { IRequest } from 'types';
import { requestStatus } from 'types/request';

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
    <div className="w-full grid grid-cols-1 text-sm">
      <div className="col-span-full grid grid-cols-9 py-4 border-b">
        <span className="col-span-3 sm:col-span-4 font-semibold text-left">
          {isBuyer ? 'Offer To' : 'Offer From'}
        </span>
        <span className="col-span-4 sm:col-span-4 font-semibold text-left">
          To
        </span>
        <span className="col-span-2 sm:col-span-1 font-semibold text-center">
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