const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: 'password',
  },
];

const categories = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Housing',
    image_url: '/customers/amy-burns.png', // Legacy image paths
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Food',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Transportation',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Entertainment',
    image_url: '/customers/michael-novosti.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Health',
    image_url: '/customers/michael-novosti.png',
  },
];

const transactions = [
  {
    category_id: categories[0].id,
    amount: 150000, // 1500.00
    date: '2024-01-05',
  },
  {
    category_id: categories[1].id,
    amount: 25000, // 250.00
    date: '2024-01-06',
  },
  {
    category_id: categories[2].id,
    amount: 12050, // 120.50
    date: '2024-01-07',
  },
  {
    category_id: categories[3].id,
    amount: 8000, // 80.00
    date: '2024-01-07',
  },
  {
    category_id: categories[1].id,
    amount: 5000,
    date: '2024-02-05',
  },
  {
    category_id: categories[4].id,
    amount: 12000,
    date: '2024-02-06',
  },
];

const income = [
  {
    source: 'Salary',
    amount: 500000, // 5000.00
    date: '2024-01-01',
  },
  {
    source: 'Freelance',
    amount: 80000, // 800.00
    date: '2024-01-15',
  }
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, categories, transactions, income, revenue };
