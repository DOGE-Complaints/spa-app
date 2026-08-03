import { PHONE_VERIFICATION_RULES, isValidOtpCode } from '../../auth/verificationFlowState.js'
import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

export function OtpPanel({
  code,
  resendSecondsRemaining,
  onCodeChange,
  onVerify,
  onResend,
  onChangeNumber,
}) {
  const { t } = useI18n()
  const canResend = resendSecondsRemaining <= 0
  const valid = isValidOtpCode(code)

  return (
    <section
      className="phone-verification-panel phone-verification-panel--otp"
      data-testid="phone-verification-otp"
    >
      <h2 className="phone-verification-panel__title">{t('phone.otp.title')}</h2>
      <p className="phone-verification-panel__description">
        {formatI18nMessage(t('phone.otp.desc'), {
          n: PHONE_VERIFICATION_RULES.CODE_LENGTH,
        })}
      </p>
      <div className="phone-verification-panel__field">
        <label className="phone-verification-panel__label" htmlFor="phone-verification-otp">
          {t('phone.otp.label')}
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
        <Button
          type="button"
          hierarchy="link"
          disabled={!canResend}
          data-testid="phone-verification-resend"
          onClick={onResend}
        >
          {canResend
            ? t('phone.otp.resend')
            : formatI18nMessage(t('phone.otp.resendIn'), { seconds: resendSecondsRemaining })}
        </Button>
        <Button
          type="button"
          hierarchy="link"
          data-testid="phone-verification-change-number"
          onClick={onChangeNumber}
        >
          {t('phone.otp.changeNumber')}
        </Button>
      </div>
      <div className="phone-verification-panel__actions">
        <Button
          type="button"
          hierarchy="primary"
          fullWidth
          disabled={!valid}
          data-testid="phone-verification-verify"
          onClick={onVerify}
        >
          {t('phone.otp.verify')}
        </Button>
      </div>
    </section>
  )
}
