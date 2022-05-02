import React, { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { IReview, ReviewFor } from 'types';
import { StarIcon } from 'components/icons';
import ReviewCard from 'components/reviews/ReviewCard';
import { client } from 'lib/api/axiosClient';

type Props = {
  userId: string;
  reviewFor: ReviewFor;
};

const UserReviewList: React.FC<Props> = ({ userId, reviewFor }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  const overallRating = useMemo(() => {
    if (reviews?.length === 0) {
      return '-';
    }

    const total = !reviews
      ? 0
      : reviews?.reduce(
          (prevTotal, currentValue) => prevTotal + currentValue.rating,
          0
        );

    return (total / reviews.length).toFixed(2);
  }, [reviews]);

  const { data: reviewsData, error: reviewsError } = useSWR(
    `api/reviews/seller/ofseller/${userId}`,
    client.get
  );

  useEffect(() => {
    if (reviewsData) setReviews(reviewsData);
  }, [userId, reviewsData]);

  return (
    <div className="col-span-full md:col-span-3">
      <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow">
        <div className="flex justify-between items-center pb-4 border-b">
          <h5 className=" font-semibold text-gray-500">
            REVIEWS FROM {reviewFor.toUpperCase()}
          </h5>
          <div className="flex gap-2 items-center">
            <StarIcon className="h-6 w-6 text-accent-300" />
            {overallRating}/5
          </div>
        </div>
        <div className="flex flex-col">
          {reviews.length ? (
            <div className="flex flex-col gap-y-5">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  reviewFor={ReviewFor.seller}
                />
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-500">No reviews yet</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReviewList;
