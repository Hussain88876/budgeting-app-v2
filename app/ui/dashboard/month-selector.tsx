'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function MonthSelector() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Default to January 2026 if not specified
    const currentMonth = searchParams.get('month') || '01';
    const currentYear = searchParams.get('year') || '2026';

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [month, year] = e.target.value.split('-');
        const params = new URLSearchParams(searchParams);
        if (month && year) {
            params.set('month', month);
            params.set('year', year);
        } else {
            params.delete('month');
            params.delete('year');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2 mb-4">
            <label htmlFor="month-select" className="text-sm font-medium text-gray-700">
                Select Month:
            </label>
            <select
                id="month-select"
                className="block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                value={`${currentMonth}-${currentYear}`}
                onChange={handleMonthChange}
            >
                <option value="01-2026">January 2026</option>
                <option value="12-2025">December 2025</option>
                <option value="11-2025">November 2025</option>
            </select>
        </div>
    );
}
