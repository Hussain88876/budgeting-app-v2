'use client';

import { createIncome } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';

export default function CreateIncomeForm() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useActionState(createIncome as any, initialState);

    return (
        <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-medium">Add Monthly Income</h2>
            <form action={dispatch} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="source" className="mb-2 block text-sm font-medium">
                        Source
                    </label>
                    <input
                        name="source"
                        id="source"
                        placeholder="e.g. Salary, Freelance"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Amount (USD)
                    </label>
                    <input
                        name="amount"
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Add Income</Button>
                </div>
                {state.message && (
                    <p className="text-sm text-red-500">{state.message}</p>
                )}
            </form>
        </div>
    );
}
