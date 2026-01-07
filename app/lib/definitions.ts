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
  email: string;
  id: string;
};

export type RecentTransaction = {
  id: string;
  name: string;
  image_url: string;
  email: string;
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
  status: 'pending' | 'paid'; // Keeping temporarily to avoid break in edit form before I update it, but plan is to remove. 
  // Wait, if I remove it from DB, I should remove it here.
  // actually, let's remove it. I will fix the form in the same 'Turn' or subsequent steps.
};
// Redefining TransactionForm to NOT have status
export type TransactionFormClean = {
  id: string;
  category_id: string;
  amount: number;
};
