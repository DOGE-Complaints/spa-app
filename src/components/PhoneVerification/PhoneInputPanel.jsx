import { PHONE_VERIFICATION_RULES, validateEstonianPhone } from '../../auth/verificationFlowState.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export function PhoneInputPanel({ localDigits, validationHintKey, onLocalDigitsChange, onSubmit, onBack }) {
  const { t } = useI18n()
  const previewPhone = localDigits
    ? `${PHONE_VERIFICATION_RULES.DIAL_PREFIX}${localDigits.replace(/\D/g, '')}`
    : PHONE_VERIFICATION_RULES.DIAL_PREFIX
  const { valid } = validateEstonianPhone(previewPhone)

  return (
    <section
      className="phone-verification-panel phone-verification-panel--phone"
      data-testid="phone-verification-phone-input"
    >
      <h2 className="phone-verification-panel__title">{t('phone.input.title')}</h2>
      <p className="phone-verification-panel__description">{t('phone.input.desc')}</p>
      <div className="phone-verification-panel__field">
        <label className="phone-verification-panel__label" htmlFor="phone-verification-country">
          {t('phone.input.country')}
        </label>
        <input
          id="phone-verification-country"
          className="phone-verification-panel__input"
          value={t('phone.input.countryValue')}
          readOnly
          data-testid="phone-verification-country"
        />
      </div>
      <div className="phone-verification-panel__field">
        <label className="phone-verification-panel__label" htmlFor="phone-verification-local">
          {t('phone.input.phoneNumber')}
        </label>
        <div className="phone-verification-panel__phone-row">
          <span className="phone-verification-panel__dial-prefix" aria-hidden="true">
            {PHONE_VERIFICATION_RULES.DIAL_PREFIX}
          </span>
          <input
            id="phone-verification-local"
            className="phone-verification-panel__input phone-verification-panel__input--local"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder={t('phone.input.placeholder')}
            value={localDigits}
            onChange={(event) => onLocalDigitsChange(event.target.value)}
            data-testid="phone-verification-local-input"
          />
        </div>
        {validationHintKey ? (
          <p className="phone-verification-panel__hint" data-testid="phone-verification-phone-hint">
            {t(validationHintKey)}
          </p>
        ) : null}
      </div>
      <div className="phone-verification-panel__actions">
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--primary"
          disabled={!valid}
          data-testid="phone-verification-send-code"
          onClick={onSubmit}
        >
          {t('phone.input.send')}
        </button>
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--secondary"
          data-testid="phone-verification-phone-back"
          onClick={onBack}
        >
          {t('phone.cta.back')}
        </button>
      </div>
    </section>
  )
}
