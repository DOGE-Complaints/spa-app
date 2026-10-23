import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { ShellChromeIcon } from './ShellChromeIcon.jsx'
import './ProfileRail.css'

const ICON_BOARD = '/icons/next-shell/navigation/board.svg'
const ICON_PROFILE = '/icons/next-shell/navigation/profile.svg'
/** Kept for later unfreeze (NS-12 gate — do not delete). */
const ICON_MY_STORIES = '/icons/next-shell/navigation/my-stories.svg'

const FEED_HOME = '/next/feed'
const PROFILE_HOME = '/profile'

/** NS-12: freeze My stories in rail UI; keep code for later unfreeze. */
export const NS12_SHOW_MY_STORIES = false

function navClassName({ isActive }) {
  return `profile-rail__nav-item${isActive ? ' profile-rail__nav-item--active' : ''}`
}

/**
 * NS-03 ProfileRail — metrics/status + shelter nav (Q15).
 * NS-09 — no summary Profile block · Feed label · honest omit empty copy.
 * NS-12 — My stories nav gated (keep code for later unfreeze).
 * Feed body OOS. No fake issue cards. SPA `/story-activity` HTTP not wired → metrics-only when Present.
 * NS-07 — theme-safe mask icons.
 *
 * @param {{ activity?: { metrics?: { submitted?: number, published?: number, underReview?: number } | null } | null }} [props]
 */
export function ProfileRail({ activity = null }) {
  const { t } = useI18n()
  const metrics = activity?.metrics ?? null
  const hasMetrics =
    metrics &&
    (typeof metrics.submitted === 'number' ||
      typeof metrics.published === 'number' ||
      typeof metrics.underReview === 'number')

  return (
    <div
      className="profile-rail"
      data-testid="profile-rail"
      data-ns07-rail="mask"
      data-ns09="rail"
      data-ns12="my-stories-gated"
    >
      <nav className="profile-rail__nav" aria-label={t('nextShell.rail.navAria')} data-testid="profile-rail-nav">
        <NavLink to={FEED_HOME} className={navClassName} data-testid="profile-rail-nav-board" end>
          <ShellChromeIcon src={ICON_BOARD} size={18} />
          <span data-testid="profile-rail-nav-feed-label">{t('nextShell.rail.board')}</span>
        </NavLink>
        {NS12_SHOW_MY_STORIES ? (
          <NavLink to={PROFILE_HOME} className={navClassName} data-testid="profile-rail-nav-my-stories">
            <ShellChromeIcon src={ICON_MY_STORIES} size={18} />
            <span>{t('nextShell.rail.myStories')}</span>
          </NavLink>
        ) : null}
        <NavLink to={PROFILE_HOME} className={navClassName} data-testid="profile-rail-nav-profile">
          <ShellChromeIcon src={ICON_PROFILE} size={18} />
          <span>{t('nextShell.rail.profile')}</span>
        </NavLink>
      </nav>

      {hasMetrics ? (
        <section className="profile-rail__activity" data-testid="profile-rail-activity" aria-live="polite">
          <ul className="profile-rail__metrics" data-testid="profile-rail-metrics">
            <li data-testid="profile-rail-metric-submitted">
              <span>{t('nextShell.rail.metricsSubmitted')}</span>
              <strong>{metrics.submitted ?? 0}</strong>
            </li>
            <li data-testid="profile-rail-metric-published">
              <span>{t('nextShell.rail.metricsPublished')}</span>
              <strong>{metrics.published ?? 0}</strong>
            </li>
            <li data-testid="profile-rail-metric-under-review">
              <span>{t('nextShell.rail.metricsUnderReview')}</span>
              <strong>{metrics.underReview ?? 0}</strong>
            </li>
          </ul>
        </section>
      ) : null}
    </div>
  )
}
