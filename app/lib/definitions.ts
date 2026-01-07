export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Category = {
  id: string;
  name: string;
  image_url: string;
};

export type Transaction = {
  id: string;
  category_id: string;
  amount: number;
  date: string;
};

export type Income = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

export type Revenue = {
  month: string;
  revenue: number;
}; // Keeping for now as legacy, but might replace with Income later if needed.

export type RecentTransactionRaw = {
  amount: number;
  name: string;
  image_url: string;
  id: string;
};

export type RecentTransaction = {
  id: string;
  name: string;
  image_url: string;
  amount: string;
};

export type ExpensesByCategory = {
  category: string;
  amount: number;
  fill: string;
};

export type TransactionsTableType = {
  id: string;
  category_id: string;
  name: string;
  email: string; // Legacy field from join, can be category name
  image_url: string;
  date: string;
  amount: number;
  category_name: string; // Explicitly adding this for clarity
};

export type CategoryField = {
  id: string;
  name: string;
};

export type TransactionForm = {
  id: string;
  category_id: string;
  amount: number;
};
