import { useMemo } from 'react'
import {
  UtensilsCrossed, ShoppingBag, Car, Receipt, Gamepad2,
  HeartPulse, GraduationCap, Banknote, Laptop, MoreHorizontal,
  PieChart
} from 'lucide-react'
import { formatCurrency, CATEGORIES } from '../utils'

const ICON_MAP = {
  UtensilsCrossed, ShoppingBag, Car, Receipt, Gamepad2,
  HeartPulse, GraduationCap, Banknote, Laptop, MoreHorizontal,
}

// Curated high-contrast monochrome & accent palette for category segments
const CATEGORY_COLORS = {
  food: 'hsl(14, 85%, 55%)',
  shopping: 'hsl(210, 85%, 56%)',
  transport: 'hsl(38, 92%, 50%)',
  bills: 'hsl(280, 75%, 60%)',
  entertainment: 'hsl(340, 82%, 58%)',
  healthcare: 'hsl(160, 70%, 45%)',
  education: 'hsl(190, 80%, 45%)',
  salary: 'hsl(145, 65%, 42%)',
  freelance: 'hsl(230, 80%, 65%)',
  other: 'hsl(0, 0%, 55%)',
}

function getCategoryIcon(catValue) {
  const cat = CATEGORIES.find((c) => c.value === catValue)
  if (cat && ICON_MAP[cat.icon]) {
    const Icon = ICON_MAP[cat.icon]
    return <Icon size={14} />
  }
  return <MoreHorizontal size={14} />
}

export default function CategoryBreakdown({
  transactions,
  selectedCategory,
  onSelectCategory,
}) {
  const { categoryStats, totalExpenses } = useMemo(() => {
    const expenseTxns = transactions.filter((t) => t.type === 'expense')
    const total = expenseTxns.reduce((sum, t) => sum + t.amount, 0)

    const map = {}
    expenseTxns.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })

    const stats = Object.entries(map)
      .map(([cat, amount]) => {
        const catInfo = CATEGORIES.find((c) => c.value === cat)
        const percentage = total > 0 ? (amount / total) * 100 : 0
        return {
          category: cat,
          label: catInfo ? catInfo.label : cat,
          amount,
          percentage,
          color: CATEGORY_COLORS[cat] || '#888888',
        }
      })
      .sort((a, b) => b.amount - a.amount)

    return { categoryStats: stats, totalExpenses: total }
  }, [transactions])

  if (categoryStats.length === 0) {
    return null
  }

  return (
    <section className="category-breakdown container" aria-label="Category Spending Breakdown">
      <div className="category-breakdown__card">
        <div className="category-breakdown__header">
          <div className="category-breakdown__title-wrap">
            <PieChart size={16} className="category-breakdown__icon" aria-hidden="true" />
            <h3 className="category-breakdown__title">Expense Distribution</h3>
          </div>
          <span className="category-breakdown__total">
            Total Spent: <strong>{formatCurrency(totalExpenses)}</strong>
          </span>
        </div>

        {/* Visual segmented bar */}
        <div className="category-breakdown__bar" role="progressbar" aria-label="Expenses by category">
          {categoryStats.map((item) => (
            <div
              key={item.category}
              className={`category-breakdown__segment ${
                selectedCategory === item.category ? 'category-breakdown__segment--active' : ''
              }`}
              style={{
                width: `${Math.max(item.percentage, 2)}%`,
                backgroundColor: item.color,
              }}
              title={`${item.label}: ${formatCurrency(item.amount)} (${item.percentage.toFixed(1)}%)`}
              onClick={() =>
                onSelectCategory(selectedCategory === item.category ? 'all' : item.category)
              }
            />
          ))}
        </div>

        {/* Category breakdown items list */}
        <div className="category-breakdown__grid">
          {categoryStats.map((item) => {
            const isSelected = selectedCategory === item.category
            return (
              <button
                type="button"
                key={item.category}
                className={`category-breakdown__chip ${isSelected ? 'category-breakdown__chip--selected' : ''}`}
                onClick={() => onSelectCategory(isSelected ? 'all' : item.category)}
                aria-pressed={isSelected}
                title={`Filter by ${item.label}`}
              >
                <div
                  className="category-breakdown__chip-indicator"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="category-breakdown__chip-icon" aria-hidden="true">
                  {getCategoryIcon(item.category)}
                </span>
                <span className="category-breakdown__chip-label">{item.label}</span>
                <span className="category-breakdown__chip-percent">{item.percentage.toFixed(0)}%</span>
                <span className="category-breakdown__chip-amount">{formatCurrency(item.amount)}</span>
              </button>
            )
          })}
        </div>

        {selectedCategory !== 'all' && (
          <div className="category-breakdown__filter-hint">
            <span>
              Filtered by: <strong>{CATEGORIES.find((c) => c.value === selectedCategory)?.label || selectedCategory}</strong>
            </span>
            <button
              type="button"
              className="category-breakdown__clear-filter"
              onClick={() => onSelectCategory('all')}
            >
              Show all
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
