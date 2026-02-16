'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

/** Generate the last `count` months starting from today (most recent first). */
function generateMonthOptions(count = 12) {
    const now = new Date();
    const options: { value: string; label: string }[] = [];
    for (let i = 0; i < count; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = String(d.getFullYear());
        options.push({
            value: `${mm}-${yyyy}`,
            label: `${MONTH_NAMES[d.getMonth()]} ${yyyy}`,
        });
    }
    return options;
}

export default function MonthSelector() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const options = useMemo(() => generateMonthOptions(12), []);

    // Default to the current month/year (first option)
    const currentMonth = searchParams.get('month') || options[0].value.split('-')[0];
    const currentYear = searchParams.get('year') || options[0].value.split('-')[1];

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
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
