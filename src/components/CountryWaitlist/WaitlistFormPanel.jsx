import { useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'

/**
 * M123 state B — Waitlist Form.
 * @param {{
 *   initialCountry: string,
 *   submitting?: boolean,
 *   onSubmit: (payload: { email: string, country: string, organization: string }) => void,
 *   onBack: () => void,
 * }} props
 */
export function WaitlistFormPanel({
  initialCountry,
  submitting = false,
  onSubmit,
  onBack,
}) {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState(initialCountry)
  const [organization, setOrganization] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ email, country, organization })
  }

  return (
    <section className="waitlist-panel waitlist-panel--form" data-testid="waitlist-form-panel">
      <h2>{t('waitlist.form.title')}</h2>
      <p className="waitlist-panel__message">{t('waitlist.form.message')}</p>
      <form onSubmit={handleSubmit}>
        <div className="waitlist-panel__field">
          <label className="waitlist-panel__label" htmlFor="waitlist-email">
            {t('waitlist.form.field.email')}
          </label>
          <input
            id="waitlist-email"
            className="waitlist-panel__input"
            type="email"
            required
            autoComplete="email"
            data-testid="waitlist-form-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="waitlist-panel__field">
          <label className="waitlist-panel__label" htmlFor="waitlist-country">
            {t('waitlist.form.field.country')}
          </label>
          <input
            id="waitlist-country"
            className="waitlist-panel__input"
            type="text"
            required
            data-testid="waitlist-form-country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>
        <div className="waitlist-panel__field">
          <label className="waitlist-panel__label" htmlFor="waitlist-organization">
            {t('waitlist.form.field.organization')}
          </label>
          <input
            id="waitlist-organization"
            className="waitlist-panel__input"
            type="text"
            data-testid="waitlist-form-organization"
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
          />
        </div>
        <div className="waitlist-panel__actions">
          <button
            type="submit"
            data-variant="primary"
            data-testid="waitlist-form-submit"
            disabled={submitting}
          >
            {t('waitlist.form.submit')}
          </button>
          <button type="button" data-testid="waitlist-form-back" onClick={onBack}>
            {t('waitlist.form.back')}
          </button>
        </div>
      </form>
    </section>
  )
}
