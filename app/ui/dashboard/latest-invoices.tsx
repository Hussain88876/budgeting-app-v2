import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchRecentTransactions } from '@/app/lib/data';

export default async function RecentTransactions({
  month,
  year,
}: {
  month: string;
  year: string;
}) {
  const recentTransactions = await fetchRecentTransactions(month, year);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[parseInt(month) - 1];

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Transactions ({monthName} {year})
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {recentTransactions.map((transaction, i) => {
            return (
              <div
                key={transaction.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  {/* <Image
                    src={transaction.image_url}
                    alt={`${transaction.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}
                  {/* Using a generic icon or initials could be better if no image, but keeping structure simple */}
                  <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600 font-bold w-10 h-10 flex items-center justify-center">
                    {transaction.name[0]}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {transaction.name}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {transaction.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
