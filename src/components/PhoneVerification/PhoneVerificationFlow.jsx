import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../auth/AuthSessionContext.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { identityService } from '../../auth/identityService.js'
import {
  extractVerificationApiError,
  resolveVerificationError,
} from '../../auth/verificationErrorMapping.js'
import {
  formatEstonianPhone,
  mapVerificationPhaseToCivicFlowPhase,
  resendCooldownRemainingSeconds,
  validateEstonianPhone,
  VERIFICATION_FLOW_PHASES,
} from '../../auth/verificationFlowState.js'
import { VERIFICATION_ERROR_ACTIONS } from './phoneVerificationErrorLabels.js'
import { DisclosurePanel } from './DisclosurePanel.jsx'
import { OtpPanel } from './OtpPanel.jsx'
import { PhoneInputPanel } from './PhoneInputPanel.jsx'
import { PhoneVerificationErrorState } from './PhoneVerificationErrorState.jsx'
import { ProcessingPanel } from './ProcessingPanel.jsx'
import { SuccessPanel } from './SuccessPanel.jsx'
import './PhoneVerificationFlow.css'

/**
 * Reusable inline/modal phone verification flow (M32).
 * @param {{
 *   host?: 'inline'|'modal',
 *   onDismiss?: () => void,
 *   onComplete?: () => void,
 *   onJoinWaitlist?: (context: { phone: string }) => void,
 *   onFlowPhaseChange?: (phase: import('../../auth/civicStatusState.js').CivicFlowPhase) => void,
 * }} props
 */
export function PhoneVerificationFlow({
  host = 'inline',
  onDismiss,
  onComplete,
  onJoinWaitlist,
  onFlowPhaseChange,
}) {
  const navigate = useNavigate()
  const { session } = useAuth()
  const { t } = useI18n()
  const accessToken = session?.access_token ?? null

  const [phase, setPhase] = useState(VERIFICATION_FLOW_PHASES.DISCLOSURE)
  const [processingKind, setProcessingKind] = useState(null)
  const [localDigits, setLocalDigits] = useState('')
  const [phone, setPhone] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [validationHintKey, setValidationHintKey] = useState(null)
  const [requestSentAtMs, setRequestSentAtMs] = useState(null)
  const [resendTick, setResendTick] = useState(0)
  const [mismatchCount, setMismatchCount] = useState(0)
  const [activeApiError, setActiveApiError] = useState(null)

  const resendSecondsRemaining = useMemo(() => {
    if (!requestSentAtMs) return 0
    return resendCooldownRemainingSeconds(requestSentAtMs)
  }, [requestSentAtMs, resendTick, phase])

  const resolvedError = useMemo(() => {
    if (!activeApiError) return null
    return resolveVerificationError(activeApiError.apiCode, {
      mismatchCount,
      lastRequestAtMs: requestSentAtMs,
      traceId: activeApiError.traceId,
    })
  }, [activeApiError, mismatchCount, requestSentAtMs, resendTick])

  useEffect(() => {
    if (phase !== VERIFICATION_FLOW_PHASES.OTP && phase !== VERIFICATION_FLOW_PHASES.FAILED) {
      return undefined
    }
    if (!resolvedError || resolvedError.cooldownSecondsRemaining == null) {
      return undefined
    }
    if (resolvedError.cooldownSecondsRemaining <= 0) return undefined
    const timer = window.setInterval(() => setResendTick((tick) => tick + 1), 1000)
    return () => window.clearInterval(timer)
  }, [phase, resolvedError])

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

  const clearActiveError = useCallback(() => {
    setActiveApiError(null)
  }, [])

  const showVerificationError = useCallback((error) => {
    const extracted = extractVerificationApiError(error)
    if (extracted.apiCode === 'CODE_MISMATCH') {
      setMismatchCount((count) => count + 1)
    }
    if (extracted.apiCode === 'RATE_LIMITED' && !requestSentAtMs) {
      setRequestSentAtMs(Date.now())
    }
    setActiveApiError(extracted)
    setPhase(VERIFICATION_FLOW_PHASES.FAILED)
  }, [requestSentAtMs])

  const submitPhoneRequest = useCallback(
    async (nextPhone) => {
      setPhone(nextPhone)
      setProcessingKind('request')
      setPhase(VERIFICATION_FLOW_PHASES.PROCESSING)
      clearActiveError()
      try {
        await identityService.requestPhoneVerification(nextPhone, accessToken)
        setOtpCode('')
        setMismatchCount(0)
        setRequestSentAtMs(Date.now())
        setResendTick((tick) => tick + 1)
        setPhase(VERIFICATION_FLOW_PHASES.OTP)
      } catch (error) {
        showVerificationError(error)
      } finally {
        setProcessingKind(null)
      }
    },
    [accessToken, clearActiveError, showVerificationError],
  )

  const submitOtpConfirm = useCallback(async () => {
    setProcessingKind('confirm')
    setPhase(VERIFICATION_FLOW_PHASES.PROCESSING)
    clearActiveError()
    try {
      await identityService.confirmPhoneVerification(phone, otpCode, accessToken)
      setPhase(VERIFICATION_FLOW_PHASES.SUCCESS)
    } catch (error) {
      showVerificationError(error)
    } finally {
      setProcessingKind(null)
    }
  }, [accessToken, clearActiveError, otpCode, phone, showVerificationError])

  const handleErrorAction = useCallback(
    (actionId) => {
      switch (actionId) {
        case VERIFICATION_ERROR_ACTIONS.TRY_AGAIN:
          clearActiveError()
          setOtpCode('')
          setPhase(VERIFICATION_FLOW_PHASES.OTP)
          break
        case VERIFICATION_ERROR_ACTIONS.RESEND:
          if (phone) void submitPhoneRequest(phone)
          break
        case VERIFICATION_ERROR_ACTIONS.CHANGE_NUMBER:
        case VERIFICATION_ERROR_ACTIONS.USE_ANOTHER_NUMBER:
          clearActiveError()
          setOtpCode('')
          setLocalDigits('')
          setPhase(VERIFICATION_FLOW_PHASES.PHONE)
          break
        case VERIFICATION_ERROR_ACTIONS.START_AGAIN:
          clearActiveError()
          setOtpCode('')
          setLocalDigits('')
          setPhone('')
          setMismatchCount(0)
          setRequestSentAtMs(null)
          setPhase(VERIFICATION_FLOW_PHASES.DISCLOSURE)
          break
        case VERIFICATION_ERROR_ACTIONS.RETRY:
          clearActiveError()
          if (phone && otpCode) {
            void submitOtpConfirm()
          } else if (phone) {
            void submitPhoneRequest(phone)
          } else {
            setPhase(VERIFICATION_FLOW_PHASES.PHONE)
          }
          break
        case VERIFICATION_ERROR_ACTIONS.SIGN_IN:
        case VERIFICATION_ERROR_ACTIONS.SIGN_IN_TO_EXISTING:
          navigate('/login')
          break
        case VERIFICATION_ERROR_ACTIONS.JOIN_WAITLIST:
          onJoinWaitlist?.({ phone })
          break
        case VERIFICATION_ERROR_ACTIONS.CANCEL:
          clearActiveError()
          onDismiss?.()
          break
        default:
          break
      }
    },
    [
      clearActiveError,
      navigate,
      onDismiss,
      onJoinWaitlist,
      otpCode,
      phone,
      submitOtpConfirm,
      submitPhoneRequest,
    ],
  )

  const handleSendCodeFromDisclosure = () => {
    setValidationHintKey(null)
    setPhase(VERIFICATION_FLOW_PHASES.PHONE)
  }

  const handlePhoneSubmit = () => {
    const nextPhone = formatEstonianPhone(localDigits)
    const { valid, hintKey } = validateEstonianPhone(nextPhone ?? '')
    if (!valid) {
      setValidationHintKey(hintKey)
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
    clearActiveError()
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
          validationHintKey={validationHintKey}
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
      panel =
        resolvedError != null ? (
          <PhoneVerificationErrorState
            resolved={resolvedError}
            onPrimaryAction={handleErrorAction}
            onSecondaryAction={handleErrorAction}
          />
        ) : (
          <section
            className="phone-verification-panel phone-verification-panel--failed"
            data-testid="phone-verification-failed"
          >
            <h2 className="phone-verification-panel__title">{t('phone.failed.title')}</h2>
            <p className="phone-verification-panel__description">{t('phone.failed.desc')}</p>
            <div className="phone-verification-panel__actions">
              <button
                type="button"
                className="phone-verification-panel__button phone-verification-panel__button--primary"
                data-testid="phone-verification-retry"
                onClick={() => setPhase(VERIFICATION_FLOW_PHASES.DISCLOSURE)}
              >
                {t('phone.failed.tryAgain')}
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
        <h1 className="phone-verification-flow__heading">{t('phone.flow.heading')}</h1>
      </header>
      <div className="phone-verification-flow__panel-slot" data-testid="phone-verification-panel-slot">
        {panel}
      </div>
    </div>
  )
}
