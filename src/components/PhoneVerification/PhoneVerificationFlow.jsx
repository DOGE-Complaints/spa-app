import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../auth/AuthSessionContext.jsx'
import { identityService } from '../../auth/identityService.js'
import {
  formatEstonianPhone,
  mapVerificationPhaseToCivicFlowPhase,
  resendCooldownRemainingSeconds,
  validateEstonianPhone,
  VERIFICATION_FLOW_PHASES,
} from '../../auth/verificationFlowState.js'
import { DisclosurePanel } from './DisclosurePanel.jsx'
import { OtpPanel } from './OtpPanel.jsx'
import { PhoneInputPanel } from './PhoneInputPanel.jsx'
import { ProcessingPanel } from './ProcessingPanel.jsx'
import { SuccessPanel } from './SuccessPanel.jsx'
import './PhoneVerificationFlow.css'

/**
 * Reusable inline/modal phone verification flow (M32).
 * @param {{
 *   host?: 'inline'|'modal',
 *   onDismiss?: () => void,
 *   onComplete?: () => void,
 *   onFlowPhaseChange?: (phase: import('../../auth/civicStatusState.js').CivicFlowPhase) => void,
 * }} props
 */
export function PhoneVerificationFlow({
  host = 'inline',
  onDismiss,
  onComplete,
  onFlowPhaseChange,
}) {
  const { session } = useAuth()
  const accessToken = session?.access_token ?? null

  const [phase, setPhase] = useState(VERIFICATION_FLOW_PHASES.DISCLOSURE)
  const [processingKind, setProcessingKind] = useState(null)
  const [localDigits, setLocalDigits] = useState('')
  const [phone, setPhone] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [validationHint, setValidationHint] = useState(null)
  const [requestSentAtMs, setRequestSentAtMs] = useState(null)
  const [resendTick, setResendTick] = useState(0)

  const resendSecondsRemaining = useMemo(() => {
    if (!requestSentAtMs) return 0
    return resendCooldownRemainingSeconds(requestSentAtMs)
  }, [requestSentAtMs, resendTick, phase])

  useEffect(() => {
    if (phase !== VERIFICATION_FLOW_PHASES.OTP || resendSecondsRemaining <= 0) return undefined
    const timer = window.setInterval(() => setResendTick((tick) => tick + 1), 1000)
    return () => window.clearInterval(timer)
  }, [phase, resendSecondsRemaining])

  useEffect(() => {
    onFlowPhaseChange?.(
      mapVerificationPhaseToCivicFlowPhase(phase, { processingKind }),
    )
  }, [phase, processingKind, onFlowPhaseChange])

  const submitPhoneRequest = useCallback(
    async (nextPhone) => {
      setProcessingKind('request')
      setPhase(VERIFICATION_FLOW_PHASES.PROCESSING)
      try {
        await identityService.requestPhoneVerification(nextPhone, accessToken)
        setPhone(nextPhone)
        setOtpCode('')
        setRequestSentAtMs(Date.now())
        setResendTick((tick) => tick + 1)
        setPhase(VERIFICATION_FLOW_PHASES.OTP)
      } catch {
        setPhase(VERIFICATION_FLOW_PHASES.FAILED)
      } finally {
        setProcessingKind(null)
      }
    },
    [accessToken],
  )

  const submitOtpConfirm = useCallback(async () => {
    setProcessingKind('confirm')
    setPhase(VERIFICATION_FLOW_PHASES.PROCESSING)
    try {
      await identityService.confirmPhoneVerification(phone, otpCode, accessToken)
      setPhase(VERIFICATION_FLOW_PHASES.SUCCESS)
    } catch {
      setPhase(VERIFICATION_FLOW_PHASES.FAILED)
    } finally {
      setProcessingKind(null)
    }
  }, [accessToken, otpCode, phone])

  const handleSendCodeFromDisclosure = () => {
    setValidationHint(null)
    setPhase(VERIFICATION_FLOW_PHASES.PHONE)
  }

  const handlePhoneSubmit = () => {
    const nextPhone = formatEstonianPhone(localDigits)
    const { valid, hint } = validateEstonianPhone(nextPhone ?? '')
    if (!valid) {
      setValidationHint(hint)
      return
    }
    void submitPhoneRequest(nextPhone)
  }

  const handleResend = () => {
    if (resendSecondsRemaining > 0 || !phone) return
    void submitPhoneRequest(phone)
  }

  const handleChangeNumber = () => {
    setOtpCode('')
    setPhase(VERIFICATION_FLOW_PHASES.PHONE)
  }

  const handleSuccessContinue = () => {
    onComplete?.()
  }

  let panel = null
  switch (phase) {
    case VERIFICATION_FLOW_PHASES.DISCLOSURE:
      panel = (
        <DisclosurePanel onSendCode={handleSendCodeFromDisclosure} onNotNow={() => onDismiss?.()} />
      )
      break
    case VERIFICATION_FLOW_PHASES.PHONE:
      panel = (
        <PhoneInputPanel
          localDigits={localDigits}
          validationHint={validationHint}
          onLocalDigitsChange={setLocalDigits}
          onSubmit={handlePhoneSubmit}
          onBack={() => setPhase(VERIFICATION_FLOW_PHASES.DISCLOSURE)}
        />
      )
      break
    case VERIFICATION_FLOW_PHASES.OTP:
      panel = (
        <OtpPanel
          code={otpCode}
          resendSecondsRemaining={resendSecondsRemaining}
          onCodeChange={setOtpCode}
          onVerify={() => void submitOtpConfirm()}
          onResend={handleResend}
          onChangeNumber={handleChangeNumber}
        />
      )
      break
    case VERIFICATION_FLOW_PHASES.PROCESSING:
      panel = <ProcessingPanel />
      break
    case VERIFICATION_FLOW_PHASES.SUCCESS:
      panel = <SuccessPanel onContinue={handleSuccessContinue} />
      break
    case VERIFICATION_FLOW_PHASES.FAILED:
      panel = (
        <section
          className="phone-verification-panel phone-verification-panel--failed"
          data-testid="phone-verification-failed"
        >
          <h2 className="phone-verification-panel__title">Verification Failed</h2>
          <p className="phone-verification-panel__description">
            We could not complete verification. Please try again.
          </p>
          <div className="phone-verification-panel__actions">
            <button
              type="button"
              className="phone-verification-panel__button phone-verification-panel__button--primary"
              data-testid="phone-verification-retry"
              onClick={() => setPhase(VERIFICATION_FLOW_PHASES.DISCLOSURE)}
            >
              Try again
            </button>
          </div>
        </section>
      )
      break
    default:
      panel = null
  }

  return (
    <div
      className={`phone-verification-flow phone-verification-flow--${host}`}
      data-testid="phone-verification-flow"
      data-phone-verification-phase={phase}
    >
      <header className="phone-verification-flow__header">
        <h1 className="phone-verification-flow__heading">Verify Your Civic Account</h1>
      </header>
      <div className="phone-verification-flow__panel-slot" data-testid="phone-verification-panel-slot">
        {panel}
      </div>
    </div>
  )
}
