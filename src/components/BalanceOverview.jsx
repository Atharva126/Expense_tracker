import { formatCurrency, getCurrentDateDisplay } from '../utils'

/**
 * BalanceOverview — hero section with heading, date, and prominent net balance.
 */
export default function BalanceOverview({ balance }) {
  const balanceClass =
    balance > 0
      ? 'hero__balance-amount--positive'
      : balance < 0
        ? 'hero__balance-amount--negative'
        : 'hero__balance-amount--zero'

  return (
    <section className="hero container" id="dashboard" aria-labelledby="hero-heading">
      <div className="hero__meta">
        <span className="hero__date">{getCurrentDateDisplay()}</span>
        <div className="hero__dot-row" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="hero__dot" />
          ))}
        </div>
      </div>

      <h2 id="hero-heading" className="hero__heading">
        Your money, clearly.
      </h2>

      <div className="hero__balance-section">
        <span className="hero__balance-label">Net Balance</span>
        <span className={`hero__balance-amount ${balanceClass}`} aria-live="polite">
          {balance < 0 ? '−' : ''}{formatCurrency(balance)}
        </span>
      </div>
    </section>
  )
}
