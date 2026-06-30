import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { PHONE_VERIFICATION_RULES, validateEstonianPhone } from '../../auth/verificationFlowState.js'
import { getCountryLabel, isSupportedDialPrefix } from '../../utils/countriesDataset.js'
import { CountrySelector } from './CountrySelector.jsx'

/**
 * @param {{
 *   selectedCountry: import('../../utils/countriesDataset.js').CountryRecord,
 *   onCountryChange: (country: import('../../utils/countriesDataset.js').CountryRecord) => void,
 *   localDigits: string,
 *   validationHintKey: string | null,
 *   onLocalDigitsChange: (value: string) => void,
 *   onSubmit: () => void,
 *   onJoinWaitlist: () => void,
 *   onBack: () => void,
 * }} props
 */
export function PhoneInputPanel({
  selectedCountry,
  onCountryChange,
  localDigits,
  validationHintKey,
  onLocalDigitsChange,
  onSubmit,
  onJoinWaitlist,
  onBack,
}) {
  const { t, locale } = useI18n()
  const supported = isSupportedDialPrefix(selectedCountry.dialPrefix)
  const countryLabel = getCountryLabel(selectedCountry, locale)
  const previewPhone = localDigits
    ? `${selectedCountry.dialPrefix}${localDigits.replace(/\D/g, '')}`
    : selectedCountry.dialPrefix
  const { valid } = supported ? validateEstonianPhone(previewPhone) : { valid: true }

  return (
    <section
      className={`phone-verification-panel phone-verification-panel--phone${
        supported ? '' : ' phone-verification-panel--unsupported-country'
      }`}
      data-testid="phone-verification-phone-input"
      data-phone-country-supported={supported ? 'true' : 'false'}
    >
      <h2 className="phone-verification-panel__title">{t('phone.country.verifyTitle')}</h2>
      <p className="phone-verification-panel__description">{t('phone.country.verifyMessage')}</p>

      {!supported ? (
        <div className="phone-country-unsupported" data-testid="phone-country-unsupported-notice">
          <p className="phone-country-unsupported__title">
            {formatI18nMessage(t('phone.country.unsupportedTitle'), { country: countryLabel })}
          </p>
          <p className="phone-country-unsupported__notice">
            {formatI18nMessage(t('phone.country.unsupportedNotice'), { country: countryLabel })}
          </p>
          <p className="phone-country-unsupported__hint">{t('phone.country.unsupportedHint')}</p>
        </div>
      ) : null}

      <div className="phone-verification-panel__field">
        <label className="phone-verification-panel__label" htmlFor="phone-verification-country">
          {t('phone.input.country')}
        </label>
        <CountrySelector selectedCountry={selectedCountry} onSelect={onCountryChange} />
      </div>

      <div className="phone-verification-panel__field">
        <label className="phone-verification-panel__label" htmlFor="phone-verification-local">
          {supported ? t('phone.input.phoneNumber') : t('phone.country.phoneOptional')}
        </label>
        <div className="phone-verification-panel__phone-row">
          <span className="phone-verification-panel__dial-prefix" aria-hidden="true">
            {supported ? PHONE_VERIFICATION_RULES.DIAL_PREFIX : selectedCountry.dialPrefix}
          </span>
          <input
            id="phone-verification-local"
            className={`phone-verification-panel__input phone-verification-panel__input--local${
              supported ? '' : ' phone-verification-panel__input--optional'
            }`}
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder={supported ? t('phone.input.placeholder') : ''}
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
        {supported ? (
          <button
            type="button"
            className="phone-verification-panel__button phone-verification-panel__button--primary"
            disabled={!valid}
            data-testid="phone-verification-send-code"
            onClick={onSubmit}
          >
            {t('phone.input.send')}
          </button>
        ) : (
          <button
            type="button"
            className="phone-verification-panel__button phone-verification-panel__button--primary"
            data-testid="phone-country-join-waitlist"
            onClick={onJoinWaitlist}
          >
            {t('phone.country.joinWaitlist')}
          </button>
        )}
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
