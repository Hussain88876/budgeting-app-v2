import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  income: CurrencyDollarIcon, // New icon for Income
};

export default async function CardWrapper() {
  const {
    numberOfTransactions,
    totalMonthlyIncome, // New data
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Monthly Income" value={totalMonthlyIncome} type="income" />
      <Card title="Total Transactions" value={numberOfTransactions} type="invoices" />
      {/* Removed Pending and Active Budgets cards as requested */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'income';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
      {/* Visual indicator for Monthly if type is income */}
      {type === 'income' && <p className="text-xs text-gray-500 text-center mt-1">Total for this month</p>}
    </div>
  );
}
