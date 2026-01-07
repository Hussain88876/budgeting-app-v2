'use client';

import { createIncome, IncomeState } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';

export default function CreateIncomeForm() {
    const initialState: IncomeState = { message: null, errors: {} };
    const [state, dispatch] = useActionState(createIncome, initialState);

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
                        aria-describedby="source-error"
                    />
                    <div id="source-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.source &&
                            state.errors.source.map((error: string) => (
                                <p key={error} className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            ))}
                    </div>
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
                        aria-describedby="amount-error"
                    />
                    <div id="amount-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.amount &&
                            state.errors.amount.map((error: string) => (
                                <p key={error} className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Add Income</Button>
                </div>
            </form>
        </div>
    );
}
