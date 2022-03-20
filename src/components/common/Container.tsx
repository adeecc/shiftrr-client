import React from 'react';
import cn from 'classnames';

type Props = {
  className?: string;
};

const Container: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'flex w-full h-full max-w-7xl mx-auto mt-24 md:mt-28 px-4 sm:px-6 md:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
