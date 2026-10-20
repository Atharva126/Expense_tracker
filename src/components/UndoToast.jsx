import { useEffect, useState } from 'react'

/**
 * UndoToast — appears after deleting a transaction with an undo option.
 * Auto-dismisses after 5 seconds.
 */
export default function UndoToast({ message, onUndo, onDismiss }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(onDismiss, 200)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onDismiss])

  function handleUndo() {
    setExiting(true)
    setTimeout(() => {
      onUndo()
      onDismiss()
    }, 150)
  }

  return (
    <div className={`toast ${exiting ? 'toast--exit' : ''}`} role="status" aria-live="polite">
      <span className="toast__text">{message}</span>
      <button className="toast__undo-btn" onClick={handleUndo}>
        Undo
      </button>
    </div>
  )
}
