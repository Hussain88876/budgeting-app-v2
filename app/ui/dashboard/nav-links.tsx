'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BanknotesIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, preserveMonth: true },
  {
    name: 'Transactions',
    href: '/dashboard/transactions',
    icon: BanknotesIcon,
    preserveMonth: true,
  },
  { name: 'Income Info', href: '/dashboard/income', icon: BanknotesIcon, preserveMonth: false },
];

export default function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Build a query string that carries the selected month/year across tabs
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const monthQuery = month && year ? `?month=${month}&year=${year}` : '';

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const href = link.preserveMonth ? `${link.href}${monthQuery}` : link.href;
        return (
          <Link
            key={link.name}
            href={href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
