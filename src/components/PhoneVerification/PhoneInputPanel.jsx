import { PHONE_VERIFICATION_RULES, validateEstonianPhone } from '../../auth/verificationFlowState.js'

export function PhoneInputPanel({ localDigits, validationHint, onLocalDigitsChange, onSubmit, onBack }) {
  const previewPhone = localDigits
    ? `${PHONE_VERIFICATION_RULES.DIAL_PREFIX}${localDigits.replace(/\D/g, '')}`
    : PHONE_VERIFICATION_RULES.DIAL_PREFIX
  const { valid } = validateEstonianPhone(previewPhone)

  return (
    <section
      className="phone-verification-panel phone-verification-panel--phone"
      data-testid="phone-verification-phone-input"
    >
      <h2 className="phone-verification-panel__title">Enter Your Phone Number</h2>
      <p className="phone-verification-panel__description">
        We will send a one-time code by SMS to confirm it is really you.
      </p>
      <div className="phone-verification-panel__field">
        <label className="phone-verification-panel__label" htmlFor="phone-verification-country">
          Country
        </label>
        <input
          id="phone-verification-country"
          className="phone-verification-panel__input"
          value="Estonia (+372)"
          readOnly
          data-testid="phone-verification-country"
        />
      </div>
      <div className="phone-verification-panel__field">
        <label className="phone-verification-panel__label" htmlFor="phone-verification-local">
          Phone Number
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
            placeholder="5555 5555"
            value={localDigits}
            onChange={(event) => onLocalDigitsChange(event.target.value)}
            data-testid="phone-verification-local-input"
          />
        </div>
        {validationHint ? (
          <p className="phone-verification-panel__hint" data-testid="phone-verification-phone-hint">
            {validationHint}
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
          Send Verification Code
        </button>
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--secondary"
          data-testid="phone-verification-phone-back"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </section>
  )
}
