'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  categoryId: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  date: z.string(),
});

export type State = {
  errors?: {
    categoryId?: string[];
    amount?: string[];
  };
  message?: string | null;
};

const CreateTransaction = FormSchema.omit({ id: true, date: true });

export async function createTransaction(prevState: State, formData: FormData) {
  const validatedFields = CreateTransaction.safeParse({
    categoryId: formData.get('categoryId'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Transaction.',
    };
  }

  const { categoryId, amount } = validatedFields.data;

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    // Removed status from INSERT
    await sql`
      INSERT INTO transactions (category_id, amount, date)
      VALUES (${categoryId}, ${amountInCents}, ${date})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Transaction.',
    };
  }

  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
}

const UpdateTransaction = FormSchema.omit({ id: true, date: true });


export async function updateTransaction(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateTransaction.safeParse({
    categoryId: formData.get('categoryId'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Transaction.',
    };
  }

  const { categoryId, amount } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    // Removed status from UPDATE
    await sql`
      UPDATE transactions
      SET category_id = ${categoryId}, amount = ${amountInCents}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Transaction.' };
  }

  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
}

export async function deleteTransaction(id: string): Promise<void> {
  try {
    await sql`DELETE FROM transactions WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }
  revalidatePath('/dashboard/transactions');
}


// INCOME ACTIONS
const IncomeSchema = z.object({
  id: z.string(),
  source: z.string().min(1, { message: 'Please enter a source.' }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
});

export type IncomeState = {
  errors?: {
    source?: string[];
    amount?: string[];
  };
  message?: string | null;
};

const CreateIncome = IncomeSchema.omit({ id: true });

export async function createIncome(prevState: IncomeState, formData: FormData) {
  const validatedFields = CreateIncome.safeParse({
    source: formData.get('source'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Income.',
    };
  }

  const { source, amount } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO income (source, amount, date)
      VALUES (${source}, ${amountInCents}, ${date})
    `;
  } catch (err) {
    console.error(err);
    return {
      message: 'Database Error: Failed to Create Income.',
    };
  }

  revalidatePath('/dashboard/income');
  revalidatePath('/dashboard');
  redirect('/dashboard/income');
}


export async function updateIncome(
  id: string,
  prevState: IncomeState,
  formData: FormData,
) {
  const validatedFields = CreateIncome.safeParse({
    source: formData.get('source'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Income.',
    };
  }

  const { source, amount } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE income
      SET source = ${source}, amount = ${amountInCents}
      WHERE id = ${id}
    `;
  } catch (err) {
    console.error(err);
    return { message: 'Database Error: Failed to Update Income.' };
  }

  revalidatePath('/dashboard/income');
  revalidatePath('/dashboard');
  redirect('/dashboard/income');
}

export async function deleteIncome(id: string) {
  try {
    await sql`DELETE FROM income WHERE id = ${id}`;
  } catch (err) {
    console.error(err);
  }
  revalidatePath('/dashboard/income');
  revalidatePath('/dashboard');
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}