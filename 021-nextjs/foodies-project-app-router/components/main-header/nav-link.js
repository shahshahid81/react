// Note that we are using component so that we have use client directive at the lowest level possible
'use client';

import Link from 'next/link';
import classes from './nav-link.module.css';
import { usePathname } from 'next/navigation';

export default function NavLink({ children, href }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
