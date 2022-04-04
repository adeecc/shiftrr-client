import React, { useMemo } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';

import { IService } from 'types';

interface Props extends IService {
  className?: string;
}

const ServiceCard: React.FC<Props> = ({
  _id,
  seller,
  name,
  description,
  rating,
  startingPrice,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-between h-96 bg-white border rounded-lg p-6 shadow origin-center hover:scale-[1.01] transition-transform',
        className
      )}
    >
      <div className="">
        <NextLink href={`/profile/${seller}`}>
          <a className="text-xs font-semibold text-gray-600">
            @{seller.username}
          </a>
        </NextLink>
        <NextLink href={`/service/${_id}`}>
          <a>
            <h6 className="font-semibold text-lg text-accent-200">{name}</h6>
          </a>
        </NextLink>
      </div>

      <div className="">
        <div className="text-sm text-gray-800 pt-12 pb-4 border-b border-gray-500">
          {[...description].slice(0, 100)}
          {description.length > 100 && '...'}
        </div>
        <div className=" font-semibold pt-4 text-gray-600 flex justify-between items-center">
          <span className="text-accent-300">{rating}/5</span>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Starting At</span>
            <span>₹{startingPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
