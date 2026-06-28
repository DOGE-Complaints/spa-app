import './AppShell.css'

/**
 * Shared DOGEstonia app shell (M124 §6): logo, sidebar, header, footer slots.
 */
export function AppShell({ header, sidebar, footer, children, className = '' }) {
  return (
    <div className={`app-shell ${className}`.trim()} data-testid="app-shell">
      <header className="app-shell__header header-strip" aria-label="Application header">
        {header ?? (
          <div className="header-brand">
            <img
              src="/assets/DOGEstonia-logo-big.png"
              alt="DOGEstonia logo"
              className="header-brand-logo"
              onError={(event) => {
                event.currentTarget.src = '/assets/DOGEstonia-logo-fallback.svg'
              }}
            />
          </div>
        )}
      </header>

      <div className="app-shell__body board-main">
        <aside className="app-shell__sidebar board-sidebar" aria-label="Sidebar">
          {sidebar ?? (
            <>
              <p className="board-sidebar-workspace">Workspace</p>
              <nav className="board-nav" aria-label="Primary navigation">
                <span className="board-nav-item board-nav-item-active">Board</span>
              </nav>
            </>
          )}
        </aside>

        <section className="app-shell__main board-workspace">{children}</section>
      </div>

      <footer className="app-shell__footer board-footer" aria-label="System status">
        {footer ?? <span>DOGEstonia civic platform</span>}
      </footer>
    </div>
  )
}
