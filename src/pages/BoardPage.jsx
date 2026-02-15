import { useState } from 'react'
import { ISSUE_STATUS } from '../domain/types.js'
import { StatusBadge } from '../components/StatusBadge.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

const LANGUAGE_OPTIONS = Object.freeze([
  { value: 'et', nativeLabel: 'Eesti', flagSrc: '/assets/ET.svg' },
  { value: 'ru', nativeLabel: 'Русский', flagSrc: '/assets/RU.svg' },
  { value: 'en', nativeLabel: 'English', flagSrc: '/assets/US.svg' },
])

export function BoardPage() {
  const [logoSrc, setLogoSrc] = useState('/assets/DOGEstonia-logo-big.png')
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false)
  const { locale, setLocale, t } = useI18n()
  const selectedLocaleOption = LANGUAGE_OPTIONS.find((option) => option.value === locale) ?? LANGUAGE_OPTIONS[0]

  function handleLocaleSelect(nextLocale) {
    setLocale(nextLocale)
    setIsLocaleMenuOpen(false)
  }

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
            {t('synced')}
          </span>
          <div className="header-locale" data-open={isLocaleMenuOpen ? 'yes' : 'no'}>
            <button
              type="button"
              className="header-locale-trigger"
              aria-label="Language selector"
              aria-expanded={isLocaleMenuOpen}
              onClick={() => setIsLocaleMenuOpen(!isLocaleMenuOpen)}
            >
              <img src={selectedLocaleOption.flagSrc} alt="" className="header-locale-flag" />
              <span className="header-locale-text">{selectedLocaleOption.nativeLabel}</span>
              <span aria-hidden="true">{isLocaleMenuOpen ? '^' : 'v'}</span>
            </button>
            {isLocaleMenuOpen ? (
              <ul className="header-locale-menu" role="listbox" aria-label="Locale options">
                {LANGUAGE_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className={`header-locale-option ${locale === option.value ? 'header-locale-option-active' : ''}`}
                      onClick={() => handleLocaleSelect(option.value)}
                    >
                      <img src={option.flagSrc} alt="" className="header-locale-flag" />
                      <span className="header-locale-text">{option.nativeLabel}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </header>

      <section className="board-main">
        <aside className="board-sidebar" aria-label="Sidebar">
          <p className="board-sidebar-workspace">{t('workspace')}</p>
          <nav className="board-nav" aria-label="Board navigation">
            <button type="button" className="board-nav-item board-nav-item-active">
              {t('board')}
            </button>
            <button type="button" className="board-nav-item" disabled>
              {t('issues')}
            </button>
            <button type="button" className="board-nav-item" disabled>
              {t('settings')}
            </button>
          </nav>
        </aside>

        <section className="board-workspace">
          <header className="board-toolbar">
            <div className="board-toolbar-copy">
              <h2>{t('board')}</h2>
            </div>
            <button type="button" className="board-cta" disabled>
              {t('createIssue')}
            </button>
          </header>

          <section className="board-columns" aria-label="Board columns scaffold">
            <section className="board-column" aria-label="Status NEW column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.NEW} locale={locale} />
                <span>0</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">Cards placeholder</div>
            </section>

            <section className="board-column" aria-label="Status VERIFIED column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.VERIFIED} locale={locale} />
                <span>0</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">Cards placeholder</div>
            </section>

            <section className="board-column" aria-label="Status IN REVIEW column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.IN_REVIEW} locale={locale} />
                <span>0</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">Cards placeholder</div>
            </section>

            <section className="board-column" aria-label="Status ARCHIVED column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.ARCHIVED} locale={locale} />
                <span>0</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">Cards placeholder</div>
            </section>
          </section>

          <footer className="board-footer">
            {t('footer')}
          </footer>
        </section>
      </section>
    </main>
  )
}
