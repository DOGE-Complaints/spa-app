import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getPhoneFormatForCountry, validatePhoneForCountry } from '../../auth/verificationFlowState.js'
import { getCountryLabel, isSupportedDialPrefix } from '../../utils/countriesDataset.js'
import { Button } from '../Button'
import { CountrySelector } from './CountrySelector.jsx'

/**
 * @param {{
 *   selectedCountry: import('../../utils/countriesDataset.js').CountryRecord,
 *   onCountryChange: (country: import('../../utils/countriesDataset.js').CountryRecord) => void,
 *   localDigits: string,
 *   validationHintKey: string | null,
 *   validationHintParams?: Record<string, string> | null,
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
  validationHintParams = null,
  onLocalDigitsChange,
  onSubmit,
  onJoinWaitlist,
  onBack,
}) {
  const { t, locale } = useI18n()
  const supported = isSupportedDialPrefix(selectedCountry.dialPrefix)
  const countryLabel = getCountryLabel(selectedCountry, locale)
  const format = getPhoneFormatForCountry(selectedCountry)
  const nationalDigits = String(localDigits ?? '').replace(/\D/g, '')
  const countryValidation = supported
    ? validatePhoneForCountry(selectedCountry, localDigits, locale)
    : { valid: true, hintKey: null, hintParams: null }
  const valid = supported ? countryValidation.valid : true

  const activeHintKey =
    validationHintKey ?? (nationalDigits.length > 0 ? countryValidation.hintKey : null)
  const activeHintParams = validationHintKey
    ? (validationHintParams ?? {})
    : (countryValidation.hintParams ?? {})

  const showFormatHints = supported
  const showDiagnosticHint = supported && nationalDigits.length > 0 && !countryValidation.valid
  const showStatus = supported && nationalDigits.length > 0
  const statusKey = countryValidation.valid
    ? 'phone.format.status.valid'
    : 'phone.format.status.needsCorrection'

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
          {supported ? t('phone.format.phoneLabel') : t('phone.country.phoneOptional')}
        </label>
        <div className="phone-verification-panel__phone-row">
          <span className="phone-verification-panel__dial-prefix" aria-hidden="true">
            {selectedCountry.dialPrefix}
          </span>
          <input
            id="phone-verification-local"
            className={`phone-verification-panel__input phone-verification-panel__input--local${
              supported ? '' : ' phone-verification-panel__input--optional'
            }${showStatus && !countryValidation.valid ? ' phone-verification-panel__input--needs-correction' : ''}`}
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder={format.examplePlaceholder}
            value={localDigits}
            onChange={(event) => onLocalDigitsChange(event.target.value)}
            data-testid="phone-verification-local-input"
          />
        </div>

        {showFormatHints ? (
          <p className="phone-format-helper" data-testid="phone-format-helper">
            {formatI18nMessage(t('phone.format.helper'), { country: countryLabel })}
          </p>
        ) : null}

        {showFormatHints ? (
          <p className="phone-format-example" data-testid="phone-format-example">
            {formatI18nMessage(t('phone.format.example'), { example: format.examplePlaceholder })}
          </p>
        ) : null}

        {activeHintKey ? (
          <p className="phone-verification-panel__hint" data-testid="phone-verification-phone-hint">
            {formatI18nMessage(t(activeHintKey), activeHintParams)}
          </p>
        ) : null}

        {showDiagnosticHint ? (
          <p className="phone-format-diagnostic-hint" data-testid="phone-format-diagnostic-hint">
            {formatI18nMessage(t('phone.format.hint.invalid'), { country: countryLabel })}
          </p>
        ) : null}

        {showStatus ? (
          <p
            className={`phone-format-status phone-format-status--${
              countryValidation.valid ? 'valid' : 'needs-correction'
            }`}
            data-testid={`phone-format-status-${countryValidation.valid ? 'valid' : 'needs-correction'}`}
          >
            {t(statusKey)}
          </p>
        ) : null}
      </div>

      <div className="phone-verification-panel__actions">
        {supported ? (
          <Button
            type="button"
            hierarchy="primary"
            fullWidth
            disabled={!valid}
            data-testid="phone-verification-send-code"
            onClick={onSubmit}
          >
            {t('phone.input.send')}
          </Button>
        ) : (
          <Button
            type="button"
            hierarchy="primary"
            fullWidth
            data-testid="phone-country-join-waitlist"
            onClick={onJoinWaitlist}
          >
            {t('phone.country.joinWaitlist')}
          </Button>
        )}
        <Button
          type="button"
          hierarchy="secondary"
          fullWidth
          data-testid="phone-verification-phone-back"
          onClick={onBack}
        >
          {t('phone.cta.back')}
        </Button>
      </div>
    </section>
  )
}
