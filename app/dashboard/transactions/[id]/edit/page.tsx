import Form from '@/app/ui/transactions/edit-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchTransactionById, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [transaction, categories] = await Promise.all([
    fetchTransactionById(id),
    fetchCategories(),
  ]);

  if (!transaction) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transactions', href: '/dashboard/transactions' },
          {
            label: 'Edit Transaction',
            href: `/dashboard/transactions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form transaction={transaction} categories={categories} />
    </main>
  );
}