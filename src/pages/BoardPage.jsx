import { useState } from 'react'
import { ISSUE_STATUS } from '../domain/types.js'
import { StatusBadge } from '../components/StatusBadge.jsx'

export function BoardPage() {
  const [logoSrc, setLogoSrc] = useState('/assets/DOGEstonia-logo-big.png')

  return (
    <main className="board-shell" aria-label="Issue Board">
      <header className="header-strip" aria-label="Header strip">
        <div className="header-brand">
          <img
            src={logoSrc}
            alt="DOGEstonia logo"
            className="header-brand-logo"
            onError={() => setLogoSrc('/assets/DOGEstonia-logo-fallback.svg')}
          />
        </div>

        <div className="header-controls">
          <span className="header-status" aria-label="Sync status">
            SYNCED
          </span>
          <button type="button" className="header-locale-trigger" aria-label="Language selector placeholder">
            ET
            <span aria-hidden="true">v</span>
          </button>
        </div>
      </header>

      <section className="board-main">
        <aside className="board-sidebar" aria-label="Sidebar">
          <p className="board-sidebar-workspace">Workspace</p>
          <nav className="board-nav" aria-label="Board navigation">
            <button type="button" className="board-nav-item board-nav-item-active">
              Board
            </button>
            <button type="button" className="board-nav-item" disabled>
              Issues
            </button>
            <button type="button" className="board-nav-item" disabled>
              Settings
            </button>
          </nav>
        </aside>

        <section className="board-workspace">
          <header className="board-toolbar">
            <div className="board-toolbar-copy">
              <h2>Board</h2>
            </div>
            <button type="button" className="board-cta" disabled>
              Create Issue
            </button>
          </header>

          <section className="board-columns" aria-label="Board columns scaffold">
            <section className="board-column" aria-label="Status NEW column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.NEW} locale="en" />
                <span>0</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">Cards placeholder</div>
            </section>

            <section className="board-column" aria-label="Status VERIFIED column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.VERIFIED} locale="en" />
                <span>0</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">Cards placeholder</div>
            </section>

            <section className="board-column" aria-label="Status IN REVIEW column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.IN_REVIEW} locale="en" />
                <span>0</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">Cards placeholder</div>
            </section>

            <section className="board-column" aria-label="Status ARCHIVED column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.ARCHIVED} locale="en" />
                <span>0</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">Cards placeholder</div>
            </section>
          </section>

          <footer className="board-footer">
            DOGEstonia - Decentralized Civic Issue Tracker
          </footer>
        </section>
      </section>
    </main>
  )
}
