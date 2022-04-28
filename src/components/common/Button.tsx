import React from 'react';
import NextLink from 'next/link';
import cn from 'classnames';

type Props = {
  href: string;
  className?: string;
};

const Button: React.FC<Props> = ({ href, className, children }) => {
  return (
    <NextLink href={href}>
      <a
        className={cn(
          'px-3 py-2 text-accent-300 font-semibold outline-none border border-accent-300 hover:text-white hover:bg-accent-100 transition-colors rounded-md',
          className
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Button;
