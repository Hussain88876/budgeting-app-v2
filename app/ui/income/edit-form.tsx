'use client';

import { Income } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { updateIncome } from '@/app/lib/actions';
import Link from 'next/link';
import { useActionState } from 'react';

export default function EditIncomeForm({ income }: { income: Income }) {
    const initialState = { message: null, errors: {} };
    const updateIncomeWithId = updateIncome.bind(null, income.id);
    const [state, dispatch] = useActionState(updateIncomeWithId as any, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">

                {/* Source */}
                <div className="mb-4">
                    <label htmlFor="source" className="mb-2 block text-sm font-medium">
                        Source
                    </label>
                    <input
                        id="source"
                        name="source"
                        defaultValue={income.source}
                        placeholder="e.g. Salary"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                </div>

                {/* Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Amount (USD)
                    </label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        defaultValue={income.amount / 100} // Convert cents to dollars for display
                        placeholder="0.00"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/income"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Update Income</Button>
            </div>
        </form>
    );
}
