import { db } from '@vercel/postgres';
import {
  categories,
  transactions,
  users,
  revenue,
  income,
} from '../lib/placeholder-data';
import bcrypt from 'bcrypt';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedCategories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCategories = await Promise.all(
    categories.map(
      (category) => client.sql`
        INSERT INTO categories (id, name, image_url)
        VALUES (${category.id}, ${category.name}, ${category.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCategories;
}

async function seedTransactions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Removed status column
  await client.sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category_id UUID NOT NULL,
      amount INT NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedTransactions = await Promise.all(
    transactions.map(
      (transaction) => client.sql`
        INSERT INTO transactions (category_id, amount, date)
        VALUES (${transaction.category_id}, ${transaction.amount}, ${transaction.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedTransactions;
}

async function seedIncome() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS income (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      source VARCHAR(255) NOT NULL,
      amount INT NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedIncome = await Promise.all(
    income.map(
      (inc) => client.sql`
        INSERT INTO income (source, amount, date)
        VALUES (${inc.source}, ${inc.amount}, ${inc.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedIncome;
}


async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;

    // DROP tables to ensure fresh schema
    await client.sql`DROP TABLE IF EXISTS revenue, income, transactions, categories, users`;

    await seedUsers();
    await seedCategories();
    await seedTransactions();
    await seedIncome();
    await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
