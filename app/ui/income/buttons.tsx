import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteIncome } from '@/app/lib/actions';

export function CreateIncome() {
    return (
        <Link
            href="/dashboard/income/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Add Income</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateIncome({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/income/${id}/edit`}
            className="rounded-md border p-1 hover:bg-gray-200"
        >
            <PencilIcon className="w-4 h-4 text-gray-500" />
        </Link>
    );
}

export function DeleteIncome({ id }: { id: string }) {
    const deleteIncomeWithId = deleteIncome.bind(null, id);

    return (
        <form action={deleteIncomeWithId}>
            <button className="rounded-md border p-1 hover:bg-gray-200">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-4 h-4 text-gray-500" />
            </button>
        </form>
    );
}
