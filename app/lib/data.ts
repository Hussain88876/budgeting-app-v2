import postgres from 'postgres';
import {
  CategoryField,
  ExpensesByCategory,
  TransactionForm,
  TransactionsTable,
  LatestTransactionRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  // Deprecated / Placeholder if still needed
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchExpensesByCategory() {
  try {
    const data = await sql<ExpensesByCategory[]>`
          SELECT
            categories.name AS category,
            SUM(transactions.amount) AS amount
          FROM transactions
          JOIN categories ON transactions.category_id = categories.id
          GROUP BY categories.name
        `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expenses by category.');
  }
}

export async function fetchRecentTransactions() {
  try {
    const data = await sql<LatestTransactionRaw[]>`
      SELECT transactions.amount, categories.name, transactions.id
      FROM transactions
      JOIN categories ON transactions.category_id = categories.id
      ORDER BY transactions.date DESC
      LIMIT 5`;

    const recentTransactions = data.map((transaction) => ({
      ...transaction,
      amount: formatCurrency(transaction.amount),
    }));
    return recentTransactions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recent transactions.');
  }
}

export async function fetchCardData() {
  try {
    const combinedResult = await sql`
      SELECT
        (SELECT COUNT(*) FROM transactions) AS transaction_count,
        (SELECT SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) FROM transactions) AS paid,
        (SELECT SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) FROM transactions) AS pending
    `;

    // Budgets count - removing or repurposing? "Active Budgets" in dashboard.
    // Let's count categories as budgets for now, or just remove.
    const activeBudgetsCount = await sql`SELECT COUNT(*) FROM categories`;

    const numberOfTransactions = Number(combinedResult[0].transaction_count ?? '0');
    const numberOfCustomers = Number(activeBudgetsCount[0].count ?? '0'); // Mapped to 'Active Budgets'
    const totalPaidInvoices = formatCurrency(combinedResult[0].paid ?? '0'); // Income
    const totalPendingInvoices = formatCurrency(combinedResult[0].pending ?? '0'); // Pending

    return {
      numberOfCustomers,
      numberOfInvoices: numberOfTransactions,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTransactions(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const transactions = await sql<TransactionsTable[]>`
      SELECT
        transactions.id,
        transactions.amount,
        transactions.date,
        transactions.status,
        categories.name AS category_name,
        transactions.category_id
      FROM transactions
      JOIN categories ON transactions.category_id = categories.id
      WHERE
        categories.name ILIKE ${`%${query}%`} OR
        transactions.amount::text ILIKE ${`%${query}%`} OR
        transactions.date::text ILIKE ${`%${query}%`} OR
        transactions.status ILIKE ${`%${query}%`}
      ORDER BY transactions.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return transactions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transactions.');
  }
}

export async function fetchTransactionsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM transactions
    JOIN categories ON transactions.category_id = categories.id
    WHERE
      categories.name ILIKE ${`%${query}%`} OR
      transactions.amount::text ILIKE ${`%${query}%`} OR
      transactions.date::text ILIKE ${`%${query}%`} OR
      transactions.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of transactions.');
  }
}

export async function fetchTransactionById(id: string) {
  try {
    const data = await sql<TransactionForm[]>`
      SELECT
        transactions.id,
        transactions.category_id,
        transactions.amount,
        transactions.status
      FROM transactions
      WHERE transactions.id = ${id};
    `;

    const transaction = data.map((t) => ({
      ...t,
      // Convert amount from cents to dollars
      amount: t.amount / 100,
    }));
    return transaction[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaction.');
  }
}

export async function fetchCategories() {
  try {
    const categories = await sql<CategoryField[]>`
      SELECT
        id,
        name
      FROM categories
      ORDER BY name ASC
    `;

    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categories.');
  }
}
