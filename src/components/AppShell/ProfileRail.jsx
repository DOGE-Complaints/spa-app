import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
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
    <div className="profile-rail" data-testid="profile-rail">
      <div className="profile-rail__summary" data-testid="profile-rail-summary">
        <img
          src={ICON_PROFILE}
          alt=""
          className="profile-rail__summary-icon"
          width={20}
          height={20}
          aria-hidden="true"
        />
        <div className="profile-rail__summary-text">
          <span className="profile-rail__summary-label">{t('nextShell.rail.profile')}</span>
          <span className="profile-rail__summary-meta" data-testid="profile-rail-session-meta">
            <img src={ICON_LOCATION} alt="" width={14} height={14} aria-hidden="true" />
            <img
              src={ICON_VERIFIED}
              alt=""
              width={14}
              height={14}
              className="profile-rail__verified-glyph"
              data-testid="profile-rail-verified-glyph"
              aria-hidden="true"
            />
          </span>
        </div>
        <img src={ICON_CHEVRON} alt="" width={16} height={16} aria-hidden="true" />
      </div>

      <nav className="profile-rail__nav" aria-label={t('nextShell.rail.navAria')} data-testid="profile-rail-nav">
        <NavLink to={FEED_HOME} className={navClassName} data-testid="profile-rail-nav-board" end>
          <img src={ICON_BOARD} alt="" width={18} height={18} aria-hidden="true" />
          <span>{t('nextShell.rail.board')}</span>
        </NavLink>
        <NavLink to={PROFILE_HOME} className={navClassName} data-testid="profile-rail-nav-my-stories">
          <img src={ICON_MY_STORIES} alt="" width={18} height={18} aria-hidden="true" />
          <span>{t('nextShell.rail.myStories')}</span>
        </NavLink>
        <NavLink to={PROFILE_HOME} className={navClassName} data-testid="profile-rail-nav-profile">
          <img src={ICON_PROFILE} alt="" width={18} height={18} aria-hidden="true" />
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
