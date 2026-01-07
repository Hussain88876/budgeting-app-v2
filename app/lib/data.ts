import { sql } from '@vercel/postgres';
import {
  CategoryField,
  Category,
  Transaction,
  Income,
  Revenue, // Keep for legacy chart if needed, or remove? Keeping for safe measure.
  RecentTransactionRaw,
  RecentTransaction,
  ExpensesByCategory, // keeping
  TransactionsTableType,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchRecentTransactions(month: string, year: string) {
  try {
    const data = await sql<RecentTransactionRaw>`
      SELECT transactions.amount, categories.name, categories.image_url, transactions.id
      FROM transactions
      JOIN categories ON transactions.category_id = categories.id
      WHERE to_char(transactions.date, 'MM') = ${month}
        AND to_char(transactions.date, 'YYYY') = ${year}
      ORDER BY transactions.date DESC
      LIMIT 5`;

    const recentTransactions = data.rows.map((transaction) => ({
      ...transaction,
      amount: formatCurrency(transaction.amount),
    }));
    return recentTransactions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the recent transactions.');
  }
}

export async function fetchCardData(month: string, year: string) {
  try {
    // 1. Total Transactions Count for the selected month
    const transactionCountPromise = sql`
      SELECT COUNT(*) FROM transactions
      WHERE to_char(date, 'MM') = ${month}
        AND to_char(date, 'YYYY') = ${year}
    `;

    // 2. Total Monthly Income (Sum of income for the selected month)
    const incomePromise = sql`
      SELECT SUM(amount) FROM income
      WHERE to_char(date, 'MM') = ${month}
        AND to_char(date, 'YYYY') = ${year}
    `;

    const data = await Promise.all([
      transactionCountPromise,
      incomePromise,
    ]);

    const numberOfTransactions = Number(data[0].rows[0].count ?? '0');
    const totalIncome = formatCurrency(data[1].rows[0].sum ?? '0');

    return {
      numberOfTransactions,
      totalMonthlyIncome: totalIncome,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_per_PAGE = 6;
export async function fetchFilteredTransactions(
  query: string,
  currentPage: number,
  month: string,
  year: string,
) {
  const offset = (currentPage - 1) * ITEMS_per_PAGE;

  try {
    const transactions = await sql<TransactionsTableType>`
      SELECT
        transactions.id,
        transactions.amount,
        transactions.date,
        categories.name AS category_name,
        categories.image_url
      FROM transactions
      JOIN categories ON transactions.category_id = categories.id
      WHERE
        (
          categories.name ILIKE ${`%${query}%`} OR
          transactions.date::text ILIKE ${`%${query}%`} OR
          transactions.amount::text ILIKE ${`%${query}%`}
        )
        AND to_char(transactions.date, 'MM') = ${month}
        AND to_char(transactions.date, 'YYYY') = ${year}
      ORDER BY transactions.date DESC
      LIMIT ${ITEMS_per_PAGE} OFFSET ${offset}
    `;

    return transactions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transactions.');
  }
}

export async function fetchTransactionsPages(
  query: string,
  month: string,
  year: string,
) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM transactions
    JOIN categories ON transactions.category_id = categories.id
    WHERE
      (
        categories.name ILIKE ${`%${query}%`} OR
        transactions.date::text ILIKE ${`%${query}%`} OR
        transactions.amount::text ILIKE ${`%${query}%`}
      )
      AND to_char(transactions.date, 'MM') = ${month}
      AND to_char(transactions.date, 'YYYY') = ${year}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_per_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of transactions.');
  }
}

export async function fetchTransactionById(id: string) {
  try {
    const data = await sql<Transaction>`
      SELECT
        transactions.id,
        transactions.category_id,
        transactions.amount,
        transactions.date
      FROM transactions
      WHERE transactions.id = ${id};
    `;

    const transaction = data.rows.map((transaction) => ({
      ...transaction,
      // Convert amount from cents to dollars
      amount: transaction.amount / 100,
    }));

    return transaction[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaction.');
  }
}

export async function fetchCategories() {
  try {
    const data = await sql<CategoryField>`
      SELECT
        id,
        name
      FROM categories
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categories.');
  }
}

export async function fetchExpensesByCategory(month: string, year: string) {
  try {
    // Sum amounts by category for the selected month
    const data = await sql<ExpensesByCategory>`
      SELECT
        categories.name as category,
        SUM(transactions.amount) as amount
      FROM transactions
      JOIN categories ON transactions.category_id = categories.id
      WHERE to_char(transactions.date, 'MM') = ${month}
        AND to_char(transactions.date, 'YYYY') = ${year}
      GROUP BY categories.name
    `;

    // Add fill colors manually or via logic
    const results = data.rows.map((row, index) => {
      const colors = ['#3b82f6', '#ef4444', '#22c55e', '#eab308', '#a855f7']; // Simple palette
      return {
        ...row,
        amount: Number(row.amount), // Ensure number
        fill: colors[index % colors.length]
      }
    });

    return results;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch expenses by category');
  }
}

export async function fetchIncome() {
  try {
    const data = await sql<Income>`
            SELECT * FROM income
            ORDER BY date DESC
        `;
    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch income.');
  }
}

export async function fetchIncomeById(id: string) {
  try {
    const data = await sql<Income>`
      SELECT * FROM income WHERE id = ${id}
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch income.');
  }
}
