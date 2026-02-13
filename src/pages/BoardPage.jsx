export function BoardPage() {
  return (
    <main className="board-page" aria-label="Issue Board">
      <aside className="board-sidebar" aria-label="Sidebar">
        <div className="board-brand">
          <h1>DOGEstonia</h1>
          <p>Issue Tracker</p>
        </div>

        <nav className="board-nav" aria-label="Board navigation">
          <button type="button" className="board-nav-item board-nav-item-active">
            Board
          </button>
          <button type="button" className="board-nav-item">
            Issue Details
          </button>
        </nav>
      </aside>

      <section className="board-content">
        <header className="board-toolbar">
          <div>
            <h2>Issue Board</h2>
            <p>Read-side dashboard shell</p>
          </div>
          <button type="button" className="board-cta" disabled>
            Create Issue
          </button>
        </header>

        <section className="board-filters" aria-label="Filters">
          <h3>Filters</h3>
          <div className="board-filter-row">
            <span className="board-filter-chip">Status</span>
            <span className="board-filter-chip">Type</span>
            <span className="board-filter-chip">Labels</span>
          </div>
        </section>

        <section className="board-issues" aria-label="Issues region">
          <h3>Issues</h3>
          <div className="board-issues-placeholder">
            Issue list region shell is ready for card and data integration.
          </div>
        </section>
      </section>
    </main>
  )
}
