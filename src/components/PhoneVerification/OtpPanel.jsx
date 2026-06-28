import { PHONE_VERIFICATION_RULES, isValidOtpCode } from '../../auth/verificationFlowState.js'

export function OtpPanel({
  code,
  resendSecondsRemaining,
  onCodeChange,
  onVerify,
  onResend,
  onChangeNumber,
}) {
  const canResend = resendSecondsRemaining <= 0
  const valid = isValidOtpCode(code)

  return (
    <section
      className="phone-verification-panel phone-verification-panel--otp"
      data-testid="phone-verification-otp"
    >
      <h2 className="phone-verification-panel__title">Enter Verification Code</h2>
      <p className="phone-verification-panel__description">
        Enter the {PHONE_VERIFICATION_RULES.CODE_LENGTH}-digit code we sent to your phone.
      </p>
      <div className="phone-verification-panel__field">
        <label className="phone-verification-panel__label" htmlFor="phone-verification-otp">
          Verification code
        </label>
        <input
          id="phone-verification-otp"
          className="phone-verification-panel__input phone-verification-panel__input--otp"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={PHONE_VERIFICATION_RULES.CODE_LENGTH}
          value={code}
          onChange={(event) => onCodeChange(event.target.value.replace(/\D/g, '').slice(0, 6))}
          data-testid="phone-verification-otp-input"
        />
      </div>
      <div className="phone-verification-panel__links">
        <button
          type="button"
          className="phone-verification-panel__link"
          disabled={!canResend}
          data-testid="phone-verification-resend"
          onClick={onResend}
        >
          {canResend ? 'Resend code' : `Resend code (${resendSecondsRemaining}s)`}
        </button>
        <button
          type="button"
          className="phone-verification-panel__link"
          data-testid="phone-verification-change-number"
          onClick={onChangeNumber}
        >
          Change number
        </button>
      </div>
      <div className="phone-verification-panel__actions">
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--primary"
          disabled={!valid}
          data-testid="phone-verification-verify"
          onClick={onVerify}
        >
          Verify
        </button>
      </div>
    </section>
  )
}
