import React from 'react';
import RequestCard from './RequestCard';

interface Props {
  isBuyer?: boolean;
  requests?: string[];
}

const RequestCarousel: React.FC<Props> = ({ isBuyer = false, requests }) => {
  return (
    <div className="flex flex-col">
      {requests?.length ? (
        requests!.map((request) => {
          return (
            <RequestCard key={request} isBuyer={isBuyer} requestId={request} />
          );
        })
      ) : (
        <span className="text-gray-500">Wow! Such Empty.</span>
      )}
    </div>
  );
};

export default RequestCarousel;
