// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Transaction = {
  id: string;
  category_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestTransaction = {
  id: string;
  name: string; // Category Name
  amount: string;
  email?: string; // Optional/Deprecated
  image_url?: string; // Optional/Deprecated
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestTransactionRaw = Omit<LatestTransaction, 'amount'> & {
  amount: number;
};

export type TransactionsTable = {
  id: string;
  category_id: string;
  category_name: string; // Was name
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type ExpensesByCategory = {
  category: string;
  amount: number;
};

export type CategoryField = {
  id: string;
  name: string;
};

export type TransactionForm = {
  id: string;
  category_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
