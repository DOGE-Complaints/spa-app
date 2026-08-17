import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button/Button.jsx'
import { getStoryGptHref, hasStoryGptUrl } from '../../config/storyGptUrl.js'
import './HelpCompleteBlock.css'

export const HELP_ICONS = Object.freeze({
  share: '/icons/early-signal-dashboard/ic-help-share.png',
  together: '/icons/early-signal-dashboard/ic-help-together.png',
  see: '/icons/identity/ic-eye.png',
  mascot: '/assets/es-help-mascot.png',
  external: '/icons/public-home/ic-external-link.png',
  lock: '/icons/story-handoff/ic-lock.png',
  chevron: '/icons/public-home/ic-chevron-right.png',
})

export function HelpCompleteBlock() {
  const { t } = useI18n()
  const submitHref = getStoryGptHref()
  const submitExternal = hasStoryGptUrl()
  const trailingSrc = submitExternal ? HELP_ICONS.external : HELP_ICONS.lock

  return (
    <div className="help-complete-block" data-testid="help-complete-picture">
      <div className="help-complete-block__chrome">
        <img
          src={HELP_ICONS.mascot}
          alt=""
          className="help-complete-block__mascot"
          width={56}
          height={56}
        />
        <div className="help-complete-block__marks" aria-hidden="true">
          <img src={HELP_ICONS.share} alt="" width={16} height={16} />
          <img src={HELP_ICONS.together} alt="" width={16} height={16} />
          <img src={HELP_ICONS.see} alt="" width={16} height={16} />
        </div>
      </div>
      <p className="help-complete-block__message">{t('earlySignal.help.message')}</p>
      <Button
        hierarchy="primary"
        href={submitHref}
        external={submitExternal}
        ariaLabel={t('earlySignal.help.submitAccessible')}
        trailingIcon={
          <img
            className="help-complete-block__cta-icon"
            src={trailingSrc}
            alt=""
            aria-hidden="true"
          />
        }
        data-testid="help-complete-cta"
      >
        <span>{t('earlySignal.help.submit')}</span>
        <img
          className="help-complete-block__chevron"
          src={HELP_ICONS.chevron}
          alt=""
          aria-hidden="true"
        />
      </Button>
    </div>
  )
}
