# MONO / EXPENSES

<p align="center">
  <img src="public/favicon.svg" width="64" height="64" alt="Mono Expenses Logo" />
</p>

<p align="center">
  <strong>A minimal, high-precision expense tracker designed with Apple & Nothing OS design language.</strong>
</p>

<p align="center">
  <a href="https://atharva126.github.io/Expense_tracker/"><strong>View Live Demo »</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-black?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6.3-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Design-Nothing%20OS%20%2F%20Apple-lightgrey?style=for-the-badge" alt="Design Aesthetic" />
  <img src="https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=for-the-badge&logo=github" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## ✦ Overview

**MONO / EXPENSES** is a modern personal finance tracking web application built with a focus on simplicity, speed, and typography. Drawing inspiration from the stark elegance of **Apple's human interface** and **Nothing OS's dot-matrix aesthetic**, it removes visual clutter so you can focus on what matters: your cash flow.

All transactions and user preferences are persisted locally in your browser (`localStorage`) with zero external database dependencies or telemetry.

---

## ✦ Key Features

- **⚡ Real-Time Balance Overview**: Live calculation of total balance, income, expenses, and savings rate.
- **🏷️ Interactive Category Breakdown**: Visual progress bars mapping expenditure distributions with instant category filtering.
- **🔍 Smart Filtering & Instant Search**:
  - Full-text search on transaction titles and notes.
  - Multi-criteria filters: Type (`All`, `Income`, `Expense`), Category, and Timeframe (`All Time`, `This Month`, `This Week`).
- **✏️ Full CRUD with Modal Workflows**:
  - Add and edit transactions with preset quick amounts ($10, $25, $50, $100).
  - Categorization with custom icons (Housing, Food, Transport, Tech, Health, Entertainment, etc.).
- **↺ Safety First (Undo Toast)**: Accidentally deleted an item? Restore it immediately with the interactive undo notification.
- **📥 CSV Export**: Export your filtered transactions to standard CSV format with one click.
- **🌓 Dark & Light Modes**: Seamless theme switching with automatic system preference detection (`prefers-color-scheme`).
- **💾 100% Client-Side Persistence**: Fully functional offline; data stays in your browser's `localStorage`.
- **🔄 Demo Data Reset**: Easily prefill or reset transactions with realistic sample entries for demonstration.

---

## ✦ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Component architecture & modern hooks (`useMemo`, `useCallback`) |
| **[Vite 6](https://vite.dev/)** | Ultra-fast build tool and development server |
| **[Lucide React](https://lucide.dev/)** | Consistent, minimalist iconography |
| **Vanilla CSS** | Tailored CSS token design system with CSS custom properties |
| **Google Fonts** | `Space Mono` for figures & numbers; `Inter` for clean typography |
| **GitHub Actions** | Automated CI/CD pipeline for GitHub Pages deployment |

---

## ✦ Project Structure

```text
Expense Tracker/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions automatic deployment to Pages
├── public/
│   └── favicon.svg           # Minimalist dot-matrix logo
├── src/
│   ├── components/
│   │   ├── BalanceOverview.jsx     # Hero balance display
│   │   ├── CategoryBreakdown.jsx   # Visual category progress bars
│   │   ├── FilterBar.jsx           # Search input and multi-filters
│   │   ├── FinancialSummary.jsx    # Income vs. expense metric cards
│   │   ├── Footer.jsx              # Footer links & copyright
│   │   ├── Navbar.jsx              # Navigation and theme toggle
│   │   ├── TransactionForm.jsx     # Add/Edit transaction modal
│   │   ├── TransactionItem.jsx     # Individual transaction row
│   │   ├── TransactionList.jsx     # Transaction feed & empty states
│   │   └── UndoToast.jsx           # Temporary undo notification
│   ├── App.jsx               # Application root & state coordinator
│   ├── index.css             # Design system tokens and micro-interactions
│   ├── main.jsx              # React DOM mounting
│   ├── storage.js            # LocalStorage persistence & mock dataset
│   └── utils.js              # Currency formatters & CSV export helper
├── index.html                # Entry HTML with meta tags & typography
├── package.json              # Project dependencies and npm scripts
├── vite.config.js            # Vite configuration with relative base path
└── README.md                 # Project documentation
```

---

## ✦ Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Atharva126/Expense_tracker.git
   cd Expense_tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## ✦ Deployment to GitHub Pages

This project is configured with a automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

To enable it on your repository:
1. Navigate to **Settings** → **Pages** in your GitHub repository.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push any commit to the `main` branch. GitHub Actions will automatically compile the Vite application and publish it to:
   ```
   https://atharva126.github.io/Expense_tracker/
   ```

---

## ✦ License

This project is open-source and available under the [MIT License](LICENSE).
