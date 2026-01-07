
import { sql } from '@vercel/postgres';

export default async function DebugPage() {
    const transactions = await sql`SELECT id, date, amount FROM transactions ORDER BY date DESC LIMIT 50`;
    const income = await sql`SELECT id, date, amount FROM income ORDER BY date DESC LIMIT 50`;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Database Debugger</h1>

            <h2 className="text-xl font-bold mt-8 mb-2">Transactions (Top 50)</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto h-96">
                {JSON.stringify(transactions.rows, null, 2)}
            </pre>

            <h2 className="text-xl font-bold mt-8 mb-2">Income (Top 50)</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto h-96">
                {JSON.stringify(income.rows, null, 2)}
            </pre>
        </div>
    );
}
