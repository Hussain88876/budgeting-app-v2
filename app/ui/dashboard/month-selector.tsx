'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

interface MonthOption {
    month: string; // "01"–"12"
    year: string;  // "2026"
}

export default function MonthSelector({ availableMonths }: { availableMonths: MonthOption[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Default to the first (most recent) available month
    const defaultMonth = availableMonths[0]?.month ?? String(new Date().getMonth() + 1).padStart(2, '0');
    const defaultYear = availableMonths[0]?.year ?? String(new Date().getFullYear());

    const currentMonth = searchParams.get('month') || defaultMonth;
    const currentYear = searchParams.get('year') || defaultYear;

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
                {availableMonths.map((opt) => (
                    <option key={`${opt.month}-${opt.year}`} value={`${opt.month}-${opt.year}`}>
                        {MONTH_NAMES[parseInt(opt.month, 10) - 1]} {opt.year}
                    </option>
                ))}
            </select>
        </div>
    );
}
