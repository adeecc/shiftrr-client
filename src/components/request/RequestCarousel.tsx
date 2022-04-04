import React from 'react';
import { IRequest } from 'types';
import RequestCard from './RequestCard';

interface Props {
  isBuyer?: boolean;
  requests?: IRequest[];
}

const RequestCarousel: React.FC<Props> = ({ isBuyer = false, requests }) => {
  return (
    <div className="flex flex-col">
      {requests?.length ? (
        requests!.map((request) => {
          return (
            <RequestCard
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
  );
};

export default RequestCarousel;
