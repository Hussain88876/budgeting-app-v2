import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import Form from '@/app/ui/income/edit-form';
import { fetchIncomeById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const income = await fetchIncomeById(id);

    if (!income) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Income Info', href: '/dashboard/income' },
                    {
                        label: 'Edit Income',
                        href: `/dashboard/income/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form income={income} />
        </main>
    );
}
