import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

/**
 * M123 state A — Country Not Supported.
 * @param {{
 *   countryName: string,
 *   onJoinWaitlist: () => void,
 *   onLearnMore: () => void,
 * }} props
 */
export function CountryNotSupportedPanel({ countryName, onJoinWaitlist, onLearnMore }) {
  const { t } = useI18n()

  return (
    <section
      className="waitlist-panel waitlist-panel--not-supported"
      data-testid="waitlist-not-supported-panel"
    >
      <h2>{t('waitlist.notSupported.title')}</h2>
      <p className="waitlist-panel__message">{t('waitlist.notSupported.message')}</p>
      <div className="waitlist-panel__meta" data-testid="waitlist-country-from-number">
        <strong>{t('waitlist.notSupported.countryLabel')}</strong>
        {' '}
        <span data-testid="waitlist-country-name">{countryName}</span>
      </div>
      <div className="waitlist-panel__actions">
        <Button
          type="button"
          hierarchy="primary"
          fullWidth
          data-testid="waitlist-join-cta"
          onClick={onJoinWaitlist}
        >
          {t('waitlist.notSupported.joinWaitlist')}
        </Button>
        <Button type="button" hierarchy="secondary" fullWidth data-testid="waitlist-learn-more" onClick={onLearnMore}>
          {t('waitlist.notSupported.learnMore')}
        </Button>
      </div>
    </section>
  )
}
