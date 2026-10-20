import { useState, useEffect, useMemo, useCallback } from 'react'
import Navbar from './components/Navbar'
import BalanceOverview from './components/BalanceOverview'
import FinancialSummary from './components/FinancialSummary'
import CategoryBreakdown from './components/CategoryBreakdown'
import FilterBar from './components/FilterBar'
import TransactionList from './components/TransactionList'
import TransactionForm from './components/TransactionForm'
import UndoToast from './components/UndoToast'
import Footer from './components/Footer'
import { loadTransactions, saveTransactions, resetToDemoData } from './storage'
import { isWithinPeriod, exportToCSV } from './utils'

export default function App() {
  // --- Theme State ---
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('mono_theme')
      if (saved) return saved
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    } catch {
      // Fallback if localStorage or matchMedia fails
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('mono_theme', theme)
    } catch (e) {
      console.warn('Failed to save theme:', e)
    }
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // --- Transactions State ---
  const [transactions, setTransactions] = useState(() => loadTransactions())
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('all')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [deletedTransaction, setDeletedTransaction] = useState(null)
  const [showToast, setShowToast] = useState(false)

  // --- Persist to localStorage ---
  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  // --- Computed values (overall metrics) ---
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    }
  }, [transactions])

  // --- Filtered & sorted transactions ---
  const filteredTransactions = useMemo(() => {
    let result = [...transactions]

    // Filter by period (all time, this month, this week)
    if (periodFilter !== 'all') {
      result = result.filter((t) => isWithinPeriod(t.date, periodFilter))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase()
      result = result.filter((t) => t.title.toLowerCase().includes(query))
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter)
    }

    // Filter by type
    if (typeFilter !== 'all') {
      result = result.filter((t) => t.type === typeFilter)
    }

    // Sort by date (newest first), then by createdAt
    result.sort((a, b) => {
      const dateDiff = new Date(b.date) - new Date(a.date)
      if (dateDiff !== 0) return dateDiff
      return (b.createdAt || 0) - (a.createdAt || 0)
    })

    return result
  }, [transactions, searchQuery, categoryFilter, typeFilter, periodFilter])

  // --- Handlers ---
  function handleAddTransaction(transaction) {
    setTransactions((prev) => [transaction, ...prev])
  }

  function handleEditTransaction(transaction) {
    setEditingTransaction(transaction)
    setIsFormOpen(true)
  }

  function handleUpdateTransaction(updated) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    )
    setEditingTransaction(null)
  }

  const handleDeleteTransaction = useCallback((transaction) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transaction.id))
    setDeletedTransaction(transaction)
    setShowToast(true)
  }, [])

  function handleUndo() {
    if (deletedTransaction) {
      setTransactions((prev) => [deletedTransaction, ...prev])
      setDeletedTransaction(null)
    }
  }

  function handleToastDismiss() {
    setShowToast(false)
    setDeletedTransaction(null)
  }

  function handleFormClose() {
    setIsFormOpen(false)
    setEditingTransaction(null)
  }

  function handleExportCSV() {
    const success = exportToCSV(filteredTransactions)
    if (!success) {
      alert('No transactions matching the current filter to export.')
    }
  }

  function handleResetDemo() {
    if (window.confirm('Reset all transactions back to default demo data?')) {
      const demo = resetToDemoData()
      setTransactions(demo)
      setCategoryFilter('all')
      setTypeFilter('all')
      setPeriodFilter('all')
      setSearchQuery('')
    }
  }

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <BalanceOverview balance={balance} />

        <hr className="divider divider--subtle container" />

        <FinancialSummary
          income={totalIncome}
          expenses={totalExpenses}
          balance={balance}
        />

        <div id="analytics">
          <CategoryBreakdown
            transactions={transactions}
            selectedCategory={categoryFilter}
            onSelectCategory={setCategoryFilter}
          />
        </div>

        <hr className="divider container" />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          periodFilter={periodFilter}
          onPeriodChange={setPeriodFilter}
          onAddClick={() => {
            setEditingTransaction(null)
            setIsFormOpen(true)
          }}
          onExportCSV={handleExportCSV}
          onResetDemo={handleResetDemo}
        />

        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </main>

      <Footer />

      <TransactionForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onAdd={handleAddTransaction}
        onUpdate={handleUpdateTransaction}
        transactionToEdit={editingTransaction}
      />

      {showToast && (
        <UndoToast
          message={`"${deletedTransaction?.title}" deleted`}
          onUndo={handleUndo}
          onDismiss={handleToastDismiss}
        />
      )}
    </>
  )
}
