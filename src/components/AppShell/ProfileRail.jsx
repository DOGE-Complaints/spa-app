import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { ShellChromeIcon } from './ShellChromeIcon.jsx'
import './ProfileRail.css'

const ICON_BOARD = '/icons/next-shell/navigation/board.svg'
const ICON_PROFILE = '/icons/next-shell/navigation/profile.svg'
const ICON_MY_STORIES = '/icons/next-shell/navigation/my-stories.svg'
const ICON_LOCATION = '/icons/next-shell/actions/location.svg'
const ICON_VERIFIED = '/icons/next-shell/status/verified.svg'
const ICON_CHEVRON = '/icons/next-shell/actions/chevron-down.svg'

const FEED_HOME = '/next/feed'
const PROFILE_HOME = '/profile'

function navClassName({ isActive }) {
  return `profile-rail__nav-item${isActive ? ' profile-rail__nav-item--active' : ''}`
}

/**
 * NS-03 ProfileRail — metrics/status + shelter nav (Q15).
 * Feed body OOS. No fake issue cards. SPA `/story-activity` HTTP not wired → honest empty.
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
    <div className="profile-rail" data-testid="profile-rail" data-ns07-rail="mask">
      <div className="profile-rail__summary" data-testid="profile-rail-summary">
        <ShellChromeIcon src={ICON_PROFILE} size={20} className="profile-rail__summary-icon" />
        <div className="profile-rail__summary-text">
          <span className="profile-rail__summary-label">{t('nextShell.rail.profile')}</span>
          <span className="profile-rail__summary-meta" data-testid="profile-rail-session-meta">
            <ShellChromeIcon src={ICON_LOCATION} size={14} />
            <ShellChromeIcon
              src={ICON_VERIFIED}
              size={14}
              className="profile-rail__verified-glyph"
              testId="profile-rail-verified-glyph"
            />
          </span>
        </div>
        <ShellChromeIcon src={ICON_CHEVRON} size={16} />
      </div>

      <nav className="profile-rail__nav" aria-label={t('nextShell.rail.navAria')} data-testid="profile-rail-nav">
        <NavLink to={FEED_HOME} className={navClassName} data-testid="profile-rail-nav-board" end>
          <ShellChromeIcon src={ICON_BOARD} size={18} />
          <span>{t('nextShell.rail.board')}</span>
        </NavLink>
        <NavLink to={PROFILE_HOME} className={navClassName} data-testid="profile-rail-nav-my-stories">
          <ShellChromeIcon src={ICON_MY_STORIES} size={18} />
          <span>{t('nextShell.rail.myStories')}</span>
        </NavLink>
        <NavLink to={PROFILE_HOME} className={navClassName} data-testid="profile-rail-nav-profile">
          <ShellChromeIcon src={ICON_PROFILE} size={18} />
          <span>{t('nextShell.rail.profile')}</span>
        </NavLink>
      </nav>

      <section className="profile-rail__activity" data-testid="profile-rail-activity" aria-live="polite">
        {hasMetrics ? (
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
        ) : (
          <p className="profile-rail__empty" data-testid="profile-rail-empty" role="status">
            {t('nextShell.rail.empty')}
          </p>
        )}
      </section>
    </div>
  )
}
