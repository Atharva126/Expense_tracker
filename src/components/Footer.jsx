/**
 * Footer — minimal bottom bar with dot-matrix accents.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <span className="footer__text">MONO / EXPENSES © {new Date().getFullYear()}</span>
        <div className="footer__dots" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="footer__dot" />
          ))}
        </div>
        <span className="footer__text">v1.0</span>
      </div>
    </footer>
  )
}
