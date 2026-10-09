import { useI18n } from '../../i18n/I18nProvider.jsx'
import './MobileAppBar.css'

const ICON_MENU = '/icons/next-shell/navigation/menu.svg'
const ICON_BACK = '/icons/next-shell/navigation/back.svg'
const ICON_CLOSE = '/icons/next-shell/actions/close.svg'

/**
 * NS-04 — compact mobile shell app bar (Component §9 · M149 E / M159 chrome-only).
 * No feed stress body. leadingAction: menu | back | close.
 */
export function MobileAppBar({
  title,
  leadingAction = 'menu',
  onLeadingClick,
  className = '',
}) {
  const { t } = useI18n()
  const icon =
    leadingAction === 'back' ? ICON_BACK : leadingAction === 'close' ? ICON_CLOSE : ICON_MENU
  const leadingLabel =
    leadingAction === 'back'
      ? t('nextShell.mobile.back')
      : leadingAction === 'close'
        ? t('nextShell.mobile.close')
        : t('nextShell.header.menuOpen')

  return (
    <header
      className={`mobile-app-bar ${className}`.trim()}
      data-testid="mobile-app-bar"
      data-leading={leadingAction}
    >
      <button
        type="button"
        className="mobile-app-bar__leading"
        data-testid="mobile-app-bar-leading"
        aria-label={leadingLabel}
        onClick={onLeadingClick}
      >
        <img src={icon} alt="" width={24} height={24} className="mobile-app-bar__icon" />
      </button>
      <p className="mobile-app-bar__title" data-testid="mobile-app-bar-title">
        {title ?? t('nextShell.wip.title')}
      </p>
    </header>
  )
}
