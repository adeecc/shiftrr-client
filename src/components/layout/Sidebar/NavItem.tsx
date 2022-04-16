import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import cn from 'classnames';

const NavItem: React.FC<{ href: string; className?: string }> = ({
  href,
  className,
  children,
}) => {
  const router = useRouter();
  const isActive = router.asPath == href;
  return (
    <NextLink href={href} passHref>
      <a
        className={cn(
          className,
          isActive ? 'font-semibold text-accent-300' : 'font-semibold',
          'sm:py-2 hover:text-accent-200 transition-all'
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default NavItem;
