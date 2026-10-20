const STORAGE_KEY = 'mono_expenses_transactions'

export const DEMO_TRANSACTIONS = [
  {
    id: 'demo-1',
    title: 'Full-Time Monthly Salary',
    amount: 85000,
    category: 'salary',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    type: 'income',
    createdAt: Date.now() - 2 * 86400000,
  },
  {
    id: 'demo-2',
    title: 'Product Design Retainer',
    amount: 32000,
    category: 'freelance',
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    type: 'income',
    createdAt: Date.now() - 5 * 86400000,
  },
  {
    id: 'demo-3',
    title: 'Workspace Studio Rent',
    amount: 18500,
    category: 'bills',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    type: 'expense',
    createdAt: Date.now() - 3 * 86400000,
  },
  {
    id: 'demo-4',
    title: 'Organic Market & Groceries',
    amount: 4250,
    category: 'food',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    type: 'expense',
    createdAt: Date.now() - 1 * 86400000,
  },
  {
    id: 'demo-5',
    title: 'Fiber Internet & Server Hosting',
    amount: 1999,
    category: 'bills',
    date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    type: 'expense',
    createdAt: Date.now() - 4 * 86400000,
  },
  {
    id: 'demo-6',
    title: 'Mechanical Keyboard & Desk Mat',
    amount: 6400,
    category: 'shopping',
    date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    type: 'expense',
    createdAt: Date.now() - 6 * 86400000,
  },
  {
    id: 'demo-7',
    title: 'Artisan Espresso & Bakery',
    amount: 480,
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    createdAt: Date.now(),
  },
  {
    id: 'demo-8',
    title: 'Metro Smart Card Recharge',
    amount: 1200,
    category: 'transport',
    date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    type: 'expense',
    createdAt: Date.now() - 7 * 86400000,
  },
]

/**
 * Load transactions from localStorage or initialize with demo data
 */
export function loadTransactions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      // First run: save and return starter demo transactions
      saveTransactions(DEMO_TRANSACTIONS)
      return DEMO_TRANSACTIONS
    }
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return DEMO_TRANSACTIONS
  }
}

/**
 * Save transactions to localStorage
 */
export function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch (e) {
    console.error('Failed to save transactions:', e)
  }
}

/**
 * Reset stored transactions back to default demo state
 */
export function resetToDemoData() {
  saveTransactions(DEMO_TRANSACTIONS)
  return DEMO_TRANSACTIONS
}
