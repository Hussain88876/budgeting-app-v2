import CardWrapper from '@/app/ui/dashboard/cards';
import ExpensesChart from '@/app/ui/dashboard/expenses-chart'; // New Pie Chart
import RecentTransactions from '@/app/ui/dashboard/latest-invoices'; // Renamed component inside? No, file is still latest-invoices.tsx. I should check/update it.
import MonthSelector from '@/app/ui/dashboard/month-selector';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page(props: {
  searchParams?: Promise<{
    month?: string;
    year?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const month = searchParams?.month || '01';
  const year = searchParams?.year || '2026';

  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <MonthSelector />
        </Suspense>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense key={month + year + 'cards'} fallback={<CardsSkeleton />}>
          <CardWrapper month={month} year={year} />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense key={month + year + 'chart'} fallback={<RevenueChartSkeleton />}>
          <ExpensesChart month={month} year={year} />
        </Suspense>
        <Suspense key={month + year + 'latest'} fallback={<LatestInvoicesSkeleton />}>
          <RecentTransactions month={month} year={year} />
        </Suspense>
      </div>
    </main>
  );
}