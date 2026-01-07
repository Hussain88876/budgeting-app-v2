import { lusitana } from '@/app/ui/fonts';
import { fetchIncome } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import CreateIncomeForm from '@/app/ui/income/create-form';
import { UpdateIncome, DeleteIncome } from '@/app/ui/income/buttons';

export default async function Page() {
    const income_list = await fetchIncome();

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Income Info</h1>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Add Income Form */}
                {/* Add Income Form */}
                <CreateIncomeForm />

                {/* Income List */}
                <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h2 className="mb-4 text-xl font-medium">Your Monthly Income</h2>
                    {income_list.length === 0 ? (
                        <p className="text-gray-500">No income sources added yet.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {income_list.map((inc) => (
                                <div key={inc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{inc.source}</p>
                                        <p className="text-xs text-gray-500">{inc.date ? new Date(inc.date).toLocaleDateString() : ''}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-medium text-green-600">{formatCurrency(inc.amount)}</p>
                                        <div className="flex gap-2">
                                            <UpdateIncome id={inc.id} />
                                            <DeleteIncome id={inc.id} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
