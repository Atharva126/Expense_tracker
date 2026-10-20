/**
 * Category configuration with associated icons
 */
export const CATEGORIES = [
  { value: 'food', label: 'Food', icon: 'UtensilsCrossed' },
  { value: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
  { value: 'transport', label: 'Transport', icon: 'Car' },
  { value: 'bills', label: 'Bills', icon: 'Receipt' },
  { value: 'entertainment', label: 'Entertainment', icon: 'Gamepad2' },
  { value: 'healthcare', label: 'Healthcare', icon: 'HeartPulse' },
  { value: 'education', label: 'Education', icon: 'GraduationCap' },
  { value: 'salary', label: 'Salary', icon: 'Banknote' },
  { value: 'freelance', label: 'Freelance', icon: 'Laptop' },
  { value: 'other', label: 'Other', icon: 'MoreHorizontal' },
]

export const TRANSACTION_TYPES = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
]

/**
 * Format a number as Indian Rupees
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))
}

/**
 * Format a date string to a human-friendly label
 */
export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format current date for display
 */
export function getCurrentDateDisplay() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayISO() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Generate a simple unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/**
 * Get category label from value
 */
export function getCategoryLabel(value) {
  const cat = CATEGORIES.find(c => c.value === value)
  return cat ? cat.label : value
}

/**
 * Check if a date string falls within a specified period
 * 'all' | 'this-month' | 'this-week'
 */
export function isWithinPeriod(dateString, period) {
  if (!period || period === 'all') return true
  const itemDate = new Date(dateString + 'T00:00:00')
  const now = new Date()

  if (period === 'this-month') {
    return (
      itemDate.getFullYear() === now.getFullYear() &&
      itemDate.getMonth() === now.getMonth()
    )
  }

  if (period === 'this-week') {
    const startOfWeek = new Date(now)
    const day = now.getDay()
    const diff = now.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    return itemDate >= startOfWeek && itemDate <= endOfWeek
  }

  return true
}

/**
 * Export transactions to CSV file
 */
export function exportToCSV(transactions) {
  if (!transactions || transactions.length === 0) {
    return false
  }

  const headers = ['ID', 'Date', 'Title', 'Type', 'Category', 'Amount']
  const rows = transactions.map((t) => [
    `"${t.id}"`,
    `"${t.date}"`,
    `"${(t.title || '').replace(/"/g, '""')}"`,
    `"${t.type}"`,
    `"${getCategoryLabel(t.category)}"`,
    t.amount,
  ])

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `mono-expenses-${getTodayISO()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  return true
}
