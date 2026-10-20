import { Search, Plus, Download, RotateCcw } from 'lucide-react'
import { CATEGORIES, TRANSACTION_TYPES } from '../utils'

/**
 * FilterBar — search input, quick period pills, category/type dropdowns, export CSV, and add-transaction button.
 */
export default function FilterBar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  typeFilter,
  onTypeChange,
  periodFilter,
  onPeriodChange,
  onAddClick,
  onExportCSV,
  onResetDemo,
}) {
  return (
    <section className="filter-bar container" aria-label="Filter transactions">
      <div className="filter-bar__period-row">
        <div className="filter-bar__period-pills" role="radiogroup" aria-label="Filter by time period">
          <button
            type="button"
            className={`filter-bar__period-pill ${periodFilter === 'all' ? 'filter-bar__period-pill--active' : ''}`}
            onClick={() => onPeriodChange('all')}
            role="radio"
            aria-checked={periodFilter === 'all'}
          >
            All Time
          </button>
          <button
            type="button"
            className={`filter-bar__period-pill ${periodFilter === 'this-month' ? 'filter-bar__period-pill--active' : ''}`}
            onClick={() => onPeriodChange('this-month')}
            role="radio"
            aria-checked={periodFilter === 'this-month'}
          >
            This Month
          </button>
          <button
            type="button"
            className={`filter-bar__period-pill ${periodFilter === 'this-week' ? 'filter-bar__period-pill--active' : ''}`}
            onClick={() => onPeriodChange('this-week')}
            role="radio"
            aria-checked={periodFilter === 'this-week'}
          >
            This Week
          </button>
        </div>

        <div className="filter-bar__quick-actions">
          <button
            type="button"
            className="filter-bar__icon-btn"
            onClick={onExportCSV}
            title="Export transactions as CSV"
            aria-label="Export transactions as CSV"
          >
            <Download size={14} />
            <span className="filter-bar__icon-btn-text">Export CSV</span>
          </button>
          <button
            type="button"
            className="filter-bar__icon-btn filter-bar__icon-btn--subtle"
            onClick={onResetDemo}
            title="Reset to sample demo data"
            aria-label="Reset to sample demo data"
          >
            <RotateCcw size={14} />
            <span className="filter-bar__icon-btn-text">Reset Demo</span>
          </button>
        </div>
      </div>

      <div className="filter-bar__inner">
        <div className="filter-bar__search">
          <Search className="filter-bar__search-icon" size={16} aria-hidden="true" />
          <input
            id="search-transactions"
            type="search"
            className="filter-bar__search-input"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search transactions by title"
          />
        </div>

        <div className="filter-bar__controls">
          <select
            id="filter-category"
            className="filter-bar__select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <select
            id="filter-type"
            className="filter-bar__select"
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            aria-label="Filter by type"
          >
            <option value="all">All Types</option>
            {TRANSACTION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <button
          id="add-transaction-btn"
          className="filter-bar__add-btn"
          onClick={onAddClick}
          aria-label="Add new transaction"
        >
          <Plus size={16} />
          <span>Add Transaction</span>
        </button>
      </div>
    </section>
  )
}
