import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'
import './AppErrorState.css'

const WARNING_ICON = '/icons/story-handoff/ic-warning-triangle.png'
const RETRY_ICON = '/icons/story-handoff/ic-auto-resubmit.png'

/**
 * Reusable engineering error panel (M22 AppErrorState / ErrorPanel).
 * Cabinet-scoped first; reusable across app later (FR-CAB-07.5).
 */
export function AppErrorState({
  code,
  title,
  message,
  details,
  onRetry,
  onBackToBoard,
  retryLabel,
  backLabel,
}) {
  const { t } = useI18n()
  const resolvedTitle = title ?? t('cabinet.error.profileLoad.title')
  const resolvedMessage = message ?? t('cabinet.error.profileLoad.message')
  const resolvedDetails = details ?? t('cabinet.error.profileLoad.details')
  const resolvedRetry = retryLabel ?? t('cabinet.common.retry')
  const resolvedBack = backLabel ?? t('storyHandoff.cta.backToBoard')

  return (
    <div
      className="app-error-state"
      data-app-error-state
      data-testid="cabinet-profile-error"
      data-error-code={code || undefined}
      role="alert"
    >
      <div className="app-error-state__header">
        <img
          className="app-error-state__icon"
          src={WARNING_ICON}
          alt=""
          width={28}
          height={28}
          data-testid="cabinet-profile-error-icon"
        />
        <h2 className="app-error-state__title">{resolvedTitle}</h2>
      </div>
      <p className="app-error-state__message">{resolvedMessage}</p>
      {resolvedDetails ? (
        <p className="app-error-state__details">{resolvedDetails}</p>
      ) : null}
      {code ? (
        <p className="app-error-state__code" data-testid="cabinet-profile-error-code">
          {formatI18nMessage(t('cabinet.common.codeLabel'), { code })}
        </p>
      ) : null}
      <div className="app-error-state__actions">
        {typeof onRetry === 'function' ? (
          <Button
            type="button"
            hierarchy="primary"
            intent="retry"
            onClick={onRetry}
            data-testid="cabinet-profile-error-retry"
            leadingIcon={
              <img src={RETRY_ICON} alt="" width={18} height={18} />
            }
          >
            {resolvedRetry}
          </Button>
        ) : null}
        {typeof onBackToBoard === 'function' ? (
          <Button
            type="button"
            hierarchy="secondary"
            onClick={onBackToBoard}
            data-testid="cabinet-profile-error-back"
          >
            {resolvedBack}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
