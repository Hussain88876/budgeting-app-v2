import Form from '@/app/ui/transactions/create-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchCategories } from '@/app/lib/data'; // was fetchCustomers

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transactions', href: '/dashboard/transactions' },
          {
            label: 'Create Transaction',
            href: '/dashboard/transactions/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}