import { Trash2, Pencil } from 'lucide-react'
import {
  UtensilsCrossed, ShoppingBag, Car, Receipt, Gamepad2,
  HeartPulse, GraduationCap, Banknote, Laptop, MoreHorizontal,
} from 'lucide-react'
import { formatCurrency, formatDate, getCategoryLabel, CATEGORIES } from '../utils'

const ICON_MAP = {
  UtensilsCrossed, ShoppingBag, Car, Receipt, Gamepad2,
  HeartPulse, GraduationCap, Banknote, Laptop, MoreHorizontal,
}

function getCategoryIcon(categoryValue) {
  const cat = CATEGORIES.find(c => c.value === categoryValue)
  if (cat && ICON_MAP[cat.icon]) {
    const Icon = ICON_MAP[cat.icon]
    return <Icon size={16} />
  }
  return <MoreHorizontal size={16} />
}

/**
 * TransactionItem — a single row in the desktop table view.
 */
export function TransactionTableRow({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === 'income'

  return (
    <tr>
      <td>
        <div className="transaction__title-cell">
          <div className={`transaction__icon transaction__icon--${transaction.type}`}>
            {getCategoryIcon(transaction.category)}
          </div>
          <span className="transaction__name">{transaction.title}</span>
        </div>
      </td>
      <td>
        <span className="transaction__category">{getCategoryLabel(transaction.category)}</span>
      </td>
      <td>
        <span className="transaction__date">{formatDate(transaction.date)}</span>
      </td>
      <td>
        <span className={`transaction__amount transaction__amount--${transaction.type}`}>
          {isIncome ? '+' : '−'} {formatCurrency(transaction.amount)}
        </span>
      </td>
      <td>
        <div className="transaction__actions">
          {onEdit && (
            <button
              className="transaction__action-btn transaction__action-btn--edit"
              onClick={() => onEdit(transaction)}
              aria-label={`Edit ${transaction.title}`}
              title="Edit transaction"
            >
              <Pencil size={15} />
            </button>
          )}
          <button
            className="transaction__action-btn transaction__action-btn--delete"
            onClick={() => onDelete(transaction)}
            aria-label={`Delete ${transaction.title}`}
            title="Delete transaction"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}

/**
 * TransactionCard — mobile-friendly card view of a single transaction.
 */
export function TransactionCard({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === 'income'

  return (
    <div className="transaction-card">
      <div className={`transaction__icon transaction__icon--${transaction.type}`}>
        {getCategoryIcon(transaction.category)}
      </div>
      <div className="transaction-card__info">
        <div className="transaction-card__top">
          <span className="transaction-card__title">{transaction.title}</span>
          <span className={`transaction-card__amount transaction__amount--${transaction.type}`}>
            {isIncome ? '+' : '−'} {formatCurrency(transaction.amount)}
          </span>
        </div>
        <div className="transaction-card__bottom">
          <span className="transaction-card__category">{getCategoryLabel(transaction.category)}</span>
          <span className="transaction-card__dot" aria-hidden="true" />
          <span className="transaction-card__date">{formatDate(transaction.date)}</span>
        </div>
      </div>
      <div className="transaction-card__actions">
        {onEdit && (
          <button
            className="transaction-card__action-btn transaction-card__action-btn--edit"
            onClick={() => onEdit(transaction)}
            aria-label={`Edit ${transaction.title}`}
            title="Edit transaction"
          >
            <Pencil size={16} />
          </button>
        )}
        <button
          className="transaction-card__action-btn transaction-card__action-btn--delete"
          onClick={() => onDelete(transaction)}
          aria-label={`Delete ${transaction.title}`}
          title="Delete transaction"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
