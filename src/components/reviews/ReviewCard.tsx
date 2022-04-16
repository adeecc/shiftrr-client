import React, { useEffect, useMemo, useState } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

import { IBuyerReview, IRequestReview, ISellerReview, ReviewFor } from 'types';
import Rating from './Rating';

type Props = {
  review: IRequestReview | ISellerReview | IBuyerReview;
  reviewFor: ReviewFor;
};

const ReviewCard: React.FC<Props> = ({ review, reviewFor }) => {
  const poster = useMemo(
    () => (reviewFor === ReviewFor.buyer ? review.seller : review.buyer),
    [reviewFor, review]
  );

  return (
    <div className="min-h-[8rem] grid grid-cols-4 items-center">
      <div className="col-span-1">
        <div className="flex flex-col gap-y-2 items-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <NextImage src={poster.profilePicture} width="64px" height="64px" />
          </div>
          <NextLink href={`/profile/${poster._id}`}>
            <a className="text-xs text-accent-300 font-semibold hover:text-accent-100">
              @{poster.username}
            </a>
          </NextLink>
          <Rating
            value={review.rating}
            starClassName="h-4 w-4"
            className="text-gray-600"
          />
        </div>
      </div>
      <div className="col-span-3 ml-16 text-sm text-gray-900">
        {review.comment}
      </div>
    </div>
  );
};

export default ReviewCard;
