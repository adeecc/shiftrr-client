import React, { useMemo } from 'react';
import cn from 'classnames';

import { StarIcon } from 'components/icons';

type Props = {
  value: number;
  setValue?: (val: number) => void;
  className?: string;
  starClassName?: string;
};

const Rating: React.FC<Props> = ({
  value,
  setValue,
  className,
  starClassName,
}) => {
  const finalStartClassName = useMemo(
    () => cn(starClassName, 'h-6 w-6'),
    [starClassName]
  );

  const finalClassName = useMemo(
    () => cn(className, 'text-accent-300 flex'),
    [className]
  );

  if (setValue)
    return (
      <div className={finalClassName}>
        {[...Array(5)].map((_x, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              setValue(i + 1);
            }}
          >
            {value <= i ? (
              <StarIcon className={finalStartClassName} fill="None" />
            ) : (
              <StarIcon className={finalStartClassName} fill="currentColor" />
            )}
          </button>
        ))}
      </div>
    );
  else
    return (
      <div className={finalClassName}>
        {[...Array(5)].map((_x, i) =>
          Math.round(value) <= i ? (
            <StarIcon className={finalStartClassName} fill="None" />
          ) : (
            <StarIcon className={finalStartClassName} fill="currentColor" />
          )
        )}
      </div>
    );
};

export default Rating;
