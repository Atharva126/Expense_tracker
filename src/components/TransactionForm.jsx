import { useState, useRef, useEffect } from 'react'
import { X, TrendingUp, TrendingDown } from 'lucide-react'
import { CATEGORIES, generateId, getTodayISO } from '../utils'

const initialFormState = {
  title: '',
  amount: '',
  category: 'food',
  date: getTodayISO(),
  type: 'expense',
}

/**
 * TransactionForm — dialog-based form for adding or editing a transaction.
 */
export default function TransactionForm({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  transactionToEdit = null,
}) {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const dialogRef = useRef(null)
  const titleInputRef = useRef(null)

  const isEditMode = Boolean(transactionToEdit)

  // Sync form data whenever transactionToEdit or isOpen changes
  useEffect(() => {
    if (isOpen) {
      if (transactionToEdit) {
        setForm({
          title: transactionToEdit.title || '',
          amount: String(transactionToEdit.amount || ''),
          category: transactionToEdit.category || 'food',
          date: transactionToEdit.date || getTodayISO(),
          type: transactionToEdit.type || 'expense',
        })
      } else {
        setForm({ ...initialFormState, date: getTodayISO() })
      }
      setErrors({})
    }
  }, [isOpen, transactionToEdit])

  // Show/hide dialog
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
      setTimeout(() => titleInputRef.current?.focus(), 100)
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  // Light-dismiss fallback
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const handleClick = (e) => {
        if (e.target !== dialog) return
        const rect = dialog.getBoundingClientRect()
        const isDialogContent =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        if (!isDialogContent) {
          handleClose()
        }
      }
      dialog.addEventListener('click', handleClick)
      return () => dialog.removeEventListener('click', handleClick)
    }
  }, [])

  // Handle dialog close event (ESC or closedby)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleDialogClose = () => {
      resetForm()
      onClose()
    }
    dialog.addEventListener('close', handleDialogClose)
    return () => dialog.removeEventListener('close', handleDialogClose)
  }, [onClose])

  function resetForm() {
    setForm({ ...initialFormState, date: getTodayISO() })
    setErrors({})
  }

  function handleClose() {
    resetForm()
    onClose()
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  function validate() {
    const newErrors = {}

    if (!form.title.trim()) {
      newErrors.title = 'Please enter a title'
    } else if (form.title.trim().length > 100) {
      newErrors.title = 'Title must be 100 characters or fewer'
    }

    const amount = parseFloat(form.amount)
    if (!form.amount || isNaN(amount)) {
      newErrors.amount = 'Please enter a valid amount'
    } else if (amount <= 0) {
      newErrors.amount = 'Amount must be greater than zero'
    } else if (amount > 99999999) {
      newErrors.amount = 'Amount is too large'
    }

    if (!form.date) {
      newErrors.date = 'Please select a date'
    }

    if (!form.category) {
      newErrors.category = 'Please select a category'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    if (isEditMode) {
      onUpdate({
        ...transactionToEdit,
        title: form.title.trim(),
        amount: parseFloat(form.amount),
        category: form.category,
        date: form.date,
        type: form.type,
      })
    } else {
      const transaction = {
        id: generateId(),
        title: form.title.trim(),
        amount: parseFloat(form.amount),
        category: form.category,
        date: form.date,
        type: form.type,
        createdAt: Date.now(),
      }
      onAdd(transaction)
    }

    handleClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      closedby="any"
      aria-labelledby="form-dialog-title"
    >
      <div className="dialog__header">
        <h2 id="form-dialog-title" className="dialog__title">
          {isEditMode ? 'Edit Transaction' : 'New Transaction'}
        </h2>
        <button
          className="dialog__close"
          onClick={handleClose}
          aria-label="Close dialog"
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      <form className="dialog__body" onSubmit={handleSubmit} noValidate>
        {/* Type Toggle */}
        <div className="form__group">
          <label className="form__label">Type</label>
          <div className="form__type-toggle">
            <button
              type="button"
              className={`form__type-btn ${form.type === 'income' ? 'form__type-btn--active-income' : ''}`}
              onClick={() => handleChange('type', 'income')}
              aria-pressed={form.type === 'income'}
            >
              <TrendingUp size={14} />
              Income
            </button>
            <button
              type="button"
              className={`form__type-btn ${form.type === 'expense' ? 'form__type-btn--active-expense' : ''}`}
              onClick={() => handleChange('type', 'expense')}
              aria-pressed={form.type === 'expense'}
            >
              <TrendingDown size={14} />
              Expense
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="form__group">
          <label htmlFor="txn-title" className="form__label">Title</label>
          <input
            id="txn-title"
            ref={titleInputRef}
            type="text"
            className={`form__input ${errors.title ? 'form__input--error' : ''}`}
            placeholder="e.g., Grocery shopping"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            maxLength={100}
            autoComplete="off"
          />
          {errors.title && <p className="form__error" role="alert">{errors.title}</p>}
        </div>

        {/* Amount & Date */}
        <div className="form__row">
          <div className="form__group">
            <label htmlFor="txn-amount" className="form__label">Amount (₹)</label>
            <input
              id="txn-amount"
              type="number"
              className={`form__input ${errors.amount ? 'form__input--error' : ''}`}
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              min="0.01"
              step="0.01"
              inputMode="decimal"
            />
            {errors.amount && <p className="form__error" role="alert">{errors.amount}</p>}
          </div>

          <div className="form__group">
            <label htmlFor="txn-date" className="form__label">Date</label>
            <input
              id="txn-date"
              type="date"
              className={`form__input ${errors.date ? 'form__input--error' : ''}`}
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            {errors.date && <p className="form__error" role="alert">{errors.date}</p>}
          </div>
        </div>

        {/* Category */}
        <div className="form__group">
          <label htmlFor="txn-category" className="form__label">Category</label>
          <select
            id="txn-category"
            className={`form__select ${errors.category ? 'form__select--error' : ''}`}
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="form__error" role="alert">{errors.category}</p>}
        </div>

        <button type="submit" className="form__submit" id="submit-transaction">
          {isEditMode ? 'Save Changes' : 'Add Transaction'}
        </button>
      </form>
    </dialog>
  )
}
