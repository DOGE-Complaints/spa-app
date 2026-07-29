import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'

/**
 * Board/Issue sidebar chrome (Board / Issues / Settings).
 * Does not replace cabinet AppShell default profile NavLinks.
 *
 * @param {'board'|'issues'|'settings'} [activeNav='board']
 * @param {string} [boardTo] — when set, Board nav is a Link (IssuePage back-to-board)
 */
export function Sidebar({ activeNav = 'board', boardTo }) {
  const { t } = useI18n()
  const boardClass = `board-nav-item${activeNav === 'board' ? ' board-nav-item-active' : ''}`

  return (
    <>
      <p className="board-sidebar-workspace">{t('workspace')}</p>
      <nav className="board-nav" aria-label="Board navigation">
        {boardTo ? (
          <Link to={boardTo} className={boardClass}>
            {t('board')}
          </Link>
        ) : (
          <button type="button" className={boardClass}>
            {t('board')}
          </button>
        )}
        <button type="button" className="board-nav-item" disabled>
          {t('issues')}
        </button>
        <button type="button" className="board-nav-item" disabled>
          {t('settings')}
        </button>
      </nav>
    </>
  )
}
