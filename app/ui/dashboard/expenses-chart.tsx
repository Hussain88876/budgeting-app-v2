import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchExpensesByCategory } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function ExpensesChart() {
    const expenses = await fetchExpensesByCategory();

    if (!expenses || expenses.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }

    // Calculate total for percentages
    const total = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

    // Generate conic gradient segments
    let currentAngle = 0;
    const segments = expenses.map((expense) => {
        const percentage = (Number(expense.amount) / total) * 100;
        const angle = (percentage / 100) * 360;
        const color = expense.fill; // Use dynamic fill from backend
        const segmentParams = `${color} ${currentAngle}deg ${currentAngle + angle}deg`;
        currentAngle += angle;
        return segmentParams;
    });

    const gradient = `conic-gradient(${segments.join(', ')})`;

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Expenses Breakdown
            </h2>
            <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex flex-col items-center justify-center rounded-md bg-white p-8">
                    {/* Pie Chart Representation */}
                    <div
                        className="rounded-full w-64 h-64 shadow-lg border-4 border-white"
                        style={{ background: gradient }}
                    >
                    </div>

                    {/* Legend */}
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        {expenses.map(exp => (
                            <div key={exp.category} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full`} style={{ background: exp.fill }}></div>
                                <span className="text-sm text-gray-600">{exp.category} ({Math.round((Number(exp.amount) / total) * 100)}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
