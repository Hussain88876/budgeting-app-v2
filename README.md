# FinanceFlow Dashboard 📊

> **Note**: This project is a **demo/playground** created to experiment with and demonstrate modern features of **React** and **Next.js (App Router)**.
##  Features Demonstrated

This project is built to highlight specific technical implementations. Check the code to see how these work in practice:

1.  **Next.js App Router**: Utilizes the modern `app/` directory structure for file-system based routing and layouts.
2.  **Server Actions**: All data mutations (creating, updating, deleting transactions) are handled via Server Actions (`app/lib/actions.ts`), eliminating the need for separate API routes.
3.  **Server vs. Client Components**:
    *   **Server Components**: Used for data fetching (e.g., `app/dashboard/(overview)/page.tsx`) to reduce client bundle size and access the DB directly.
    *   **Client Components**: Used for interactivity (e.g., `app/ui/dashboard/month-selector.tsx`) to handle URL updates and state.
4.  **Streaming & Suspense**: Critical data interactions (like the dashboard cards and charts) are wrapped in `<Suspense>` boundaries with fallback skeletons (`app/ui/skeletons.tsx`) to optimize initial page load performance.
5.  **URL-Based State Management**: Search queries, pagination, and filter selections (Month/Year) are stored in the URL search params (`useSearchParams`), making the application shareable and bookmarkable.
6.  **Authentication**: Secure authentication flow using **NextAuth.js v5** (Beta).
7.  **Database**: Powered by **PostgreSQL** (via Vercel Postgres) for robust relational data management.

## 🛠️ Setup Instructions

To run this project locally, follows these steps:

### 1. Environment Setup
You need a Postgres database and a NextAuth secret. Create a `.env` file in the root directory:

```bash
# .env

# Connection string to your Postgres database (e.g., from Vercel or local)
POSTGRES_URL="postgres://default:password@ep-host.region.postgres.vercel-storage.com:5432/verceldb"

# Secret text for NextAuth encryption (can be any long random string)
AUTH_SECRET="your-super-secret-key-here"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed the Database
Run the seed script to create the necessary tables and populate them with dummy data (including new data for Nov 2025 - Jan 2026):

```bash
# Start the dev server
npm run dev

# In your browser, visit:
http://localhost:3000/seed
```
*Wait for the "Database seeded successfully" message.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔑 Demo Credentials

Use the following credentials to log in and test the application features:

*   **Email**: `user@nextmail.com`
*   **Password**: `password`

_Note: The dashboard allows you to toggle between **January 2026**, **December 2025**, and **November 2025** to see monthly data filtering in action._
