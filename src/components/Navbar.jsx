import { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'

/**
 * Navbar — sticky top bar with geometric logo, brand name, dark mode toggle, and responsive menu.
 */
export default function Navbar({ theme = 'light', onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar" role="banner">
      <div className="navbar__inner container">
        <a href="/" className="navbar__brand" aria-label="MONO / EXPENSES Home">
          <div className="navbar__logo" aria-hidden="true">
            {/* Geometric logo: layered hexagon + activity line */}
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" />
              {/* Dot-matrix accents */}
              <circle cx="6" cy="6" r="1" fill="currentColor" opacity="0.3" />
              <circle cx="26" cy="6" r="1" fill="currentColor" opacity="0.3" />
              <circle cx="6" cy="26" r="1" fill="currentColor" opacity="0.3" />
              <circle cx="26" cy="26" r="1" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
          <h1 className="navbar__title">
            MONO <span>/</span> EXPENSES
          </h1>
        </a>

        <div className="navbar__right">
          <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`} aria-label="Main navigation">
            <a href="#dashboard" className="navbar__link" onClick={() => setMenuOpen(false)}>
              Dashboard
            </a>
            <a href="#summary" className="navbar__link" onClick={() => setMenuOpen(false)}>
              Summary
            </a>
            <a href="#analytics" className="navbar__link" onClick={() => setMenuOpen(false)}>
              Analytics
            </a>
            <a href="#transactions" className="navbar__link" onClick={() => setMenuOpen(false)}>
              Transactions
            </a>
          </nav>

          <button
            type="button"
            className="navbar__theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}
