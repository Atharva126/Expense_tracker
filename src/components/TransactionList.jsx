import { Inbox } from 'lucide-react'
import { TransactionTableRow, TransactionCard } from './TransactionItem'

/**
 * TransactionList — renders the appropriate view (table for desktop, cards for mobile)
 * with an empty state when no transactions match.
 */
export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <section className="transactions container" id="transactions">
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            <Inbox size={24} />
          </div>
          <h3 className="empty-state__title">No transactions yet</h3>
          <p className="empty-state__description">
            Add your first income or expense to start tracking your finances.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="transactions container" id="transactions" aria-label="Transaction list">
      <div className="transactions__header">
        <h3 className="transactions__title">Recent Activity</h3>
        <span className="transactions__count">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Desktop: Table view */}
      <div className="transactions__table-wrap">
        <table className="transactions__table" role="table" aria-label="Transactions table">
          <thead>
            <tr>
              <th scope="col">Transaction</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <TransactionTableRow
                key={t.id}
                transaction={t}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card view */}
      <div className="transactions__cards" role="list" aria-label="Transactions list">
        {transactions.map((t) => (
          <TransactionCard
            key={t.id}
            transaction={t}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  )
}
