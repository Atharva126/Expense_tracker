import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { formatCurrency } from '../utils'

/**
 * FinancialSummary — three-column grid showing total income, total expenses, and net balance.
 */
export default function FinancialSummary({ income, expenses, balance }) {
  return (
    <section className="summary container" id="summary" aria-label="Financial Summary">
      <div className="summary__grid">
        <div className="summary__card summary__card--income">
          <div className="summary__card-label">
            <TrendingUp size={14} />
            Total Income
          </div>
          <div className="summary__card-amount" aria-label={`Total income: ${formatCurrency(income)}`}>
            {formatCurrency(income)}
          </div>
        </div>

        <div className="summary__card summary__card--expense">
          <div className="summary__card-label">
            <TrendingDown size={14} />
            Total Expenses
          </div>
          <div className="summary__card-amount" aria-label={`Total expenses: ${formatCurrency(expenses)}`}>
            {formatCurrency(expenses)}
          </div>
        </div>

        <div className="summary__card">
          <div className="summary__card-label">
            <Wallet size={14} />
            Net Balance
          </div>
          <div
            className="summary__card-amount"
            style={{
              color: balance > 0 ? 'var(--color-income)' : balance < 0 ? 'var(--color-expense)' : 'var(--color-near-black)',
            }}
            aria-label={`Net balance: ${formatCurrency(balance)}`}
          >
            {balance < 0 ? '−' : ''}{formatCurrency(balance)}
          </div>
        </div>
      </div>
    </section>
  )
}
