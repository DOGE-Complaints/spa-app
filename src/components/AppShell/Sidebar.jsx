import { MenuAction } from '../Button'
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
          <MenuAction href={boardTo} intent="navigate" className={boardClass}>
            {t('board')}
          </MenuAction>
        ) : (
          <MenuAction intent="navigate" className={boardClass}>
            {t('board')}
          </MenuAction>
        )}
        <MenuAction intent="navigate" className="board-nav-item" disabled>
          {t('issues')}
        </MenuAction>
        <MenuAction intent="navigate" className="board-nav-item" disabled>
          {t('settings')}
        </MenuAction>
      </nav>
    </>
  )
}
