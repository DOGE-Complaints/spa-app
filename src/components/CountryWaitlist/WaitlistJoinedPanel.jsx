import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

/**
 * M123 state C — Waitlist Joined.
 * @param {{
 *   countryName: string,
 *   onReturnHome: () => void,
 * }} props
 */
export function WaitlistJoinedPanel({ countryName, onReturnHome }) {
  const { t } = useI18n()

  return (
    <section className="waitlist-panel waitlist-panel--joined" data-testid="waitlist-joined-panel">
      <h2>{t('waitlist.joined.title')}</h2>
      <p className="waitlist-panel__message">{t('waitlist.joined.message')}</p>
      <p className="waitlist-panel__status" data-testid="waitlist-joined-country-saved">
        {t('waitlist.joined.countrySaved')}
        {': '}
        <span data-testid="waitlist-joined-country-name">{countryName}</span>
      </p>
      <div className="waitlist-panel__actions">
        <Button
          type="button"
          hierarchy="primary"
          fullWidth
          data-testid="waitlist-return-home"
          onClick={onReturnHome}
        >
          {t('waitlist.joined.returnHome')}
        </Button>
      </div>
    </section>
  )
}
