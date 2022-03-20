import React from 'react';
import NextLink from 'next/link';
import cn from 'classnames';

type Props = {
  href: string;
  white?: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({
  href,
  white,
  className,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a
        className={cn(
          white ? 'bg-white' : 'bg-accent-100 text-white',
          'px-3 py-2 rounded-md',
          className
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Button;
