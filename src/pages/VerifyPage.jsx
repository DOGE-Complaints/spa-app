import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  GPT_BRIDGE_PHASES,
  isGptBridgeContext,
  readOAuthRequestId,
} from '../auth/gptBridgeFlowState.js'
import { OAuthVerificationRequiredError, oauthService } from '../auth/oauthService.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { WAITLIST_PHASES } from '../auth/waitlistFlowState.js'
import { CivicStatusCard } from '../components/CivicStatus/index.js'
import {
  CountryNotSupportedPanel,
  WaitlistErrorPanel,
  WaitlistFormPanel,
  WaitlistJoinedPanel,
} from '../components/CountryWaitlist/index.js'
import {
  GptBridgeAlreadyVerifiedPanel,
  GptBridgeSuccessPanel,
  GptDraftBanner,
} from '../components/GptBridge/index.js'
import { PhoneVerificationFlow } from '../components/PhoneVerification/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { waitlistService, WaitlistApiError } from '../services/waitlistService.js'
import { dialPrefixToCountry } from '../utils/countriesDataset.js'
import './VerifyPage.css'

const LEARN_MORE_URL = 'https://dogestonia.org'

export function VerifyPage() {
  const { t, locale } = useI18n()
  const { profile, retry } = useSessionShell()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const contextParam = searchParams.get('context')
  const devGptPhase = searchParams.get('dev_gpt_phase')
  const isGptBridge = isGptBridgeContext(contextParam) || Boolean(devGptPhase)

  const phoneVerified = Boolean(profile?.phone_verified)
  const verifyHost = phoneVerified ? 'verified-summary' : 'flow-only'

  const [gptBridgePhase, setGptBridgePhase] = useState(() => {
    if (devGptPhase === GPT_BRIDGE_PHASES.SUCCESS) return GPT_BRIDGE_PHASES.SUCCESS
    if (devGptPhase === GPT_BRIDGE_PHASES.ALREADY_VERIFIED) return GPT_BRIDGE_PHASES.ALREADY_VERIFIED
    return null
  })
  const [chatgptRedirectUrl, setChatgptRedirectUrl] = useState(
    devGptPhase === GPT_BRIDGE_PHASES.SUCCESS || devGptPhase === GPT_BRIDGE_PHASES.ALREADY_VERIFIED
      ? 'https://chatgpt.com/mock-oauth-callback?code=mock&state=mock'
      : null,
  )

  const [waitlistPhase, setWaitlistPhase] = useState(null)
  const [waitlistPhone, setWaitlistPhone] = useState('')
  const [waitlistCountryDisplay, setWaitlistCountryDisplay] = useState('')
  const [waitlistCountryCode, setWaitlistCountryCode] = useState('')
  const [joinedCountry, setJoinedCountry] = useState('')
  const [waitlistErrorKind, setWaitlistErrorKind] = useState(null)
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false)

  const completeGptOAuthHandshake = useCallback(
    async ({ outcome = 'success' } = {}) => {
      const oauthRequestId = readOAuthRequestId()
      if (!oauthRequestId) {
        return false
      }
      await retry()
      const result = await oauthService.completeOAuthAuthorize(oauthRequestId)
      if (result.kind === 'redirect') {
        setChatgptRedirectUrl(result.location)
        setGptBridgePhase(
          outcome === 'already_verified'
            ? GPT_BRIDGE_PHASES.ALREADY_VERIFIED
            : GPT_BRIDGE_PHASES.SUCCESS,
        )
        return true
      }
      return false
    },
    [retry],
  )

  const handleComplete = useCallback(async () => {
    if (isGptBridge) {
      try {
        const completed = await completeGptOAuthHandshake()
        if (completed) {
          return
        }
      } catch (error) {
        if (error instanceof OAuthVerificationRequiredError) {
          return
        }
        throw error
      }
    }
    retry()
    navigate('/dashboard', { replace: true })
  }, [completeGptOAuthHandshake, isGptBridge, navigate, retry])

  const handleDismiss = useCallback(() => {
    if (isGptBridge) {
      return
    }
    navigate('/dashboard', { replace: true })
  }, [isGptBridge, navigate])

  useEffect(() => {
    if (!isGptBridge || !phoneVerified || gptBridgePhase || devGptPhase) {
      return
    }
    const oauthRequestId = readOAuthRequestId()
    if (!oauthRequestId) {
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        await completeGptOAuthHandshake({ outcome: 'already_verified' })
      } catch {
        if (!cancelled) {
          setGptBridgePhase(GPT_BRIDGE_PHASES.ALREADY_VERIFIED)
          setChatgptRedirectUrl('https://chatgpt.com/mock-oauth-callback?code=mock&state=mock')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [completeGptOAuthHandshake, devGptPhase, gptBridgePhase, isGptBridge, phoneVerified])

  const handleJoinWaitlist = useCallback(
    ({ phone, country, countryName, fromClientShortCircuit } = {}) => {
      const dialResolved = phone ? dialPrefixToCountry(phone, locale) : null
      const resolvedDisplay =
        countryName ?? dialResolved?.countryName ?? ''
      const resolvedCode =
        country ?? dialResolved?.countryCode ?? resolvedDisplay
      setWaitlistPhone(fromClientShortCircuit ? '' : (phone ?? ''))
      setWaitlistCountryDisplay(resolvedDisplay)
      setWaitlistCountryCode(resolvedCode)
      setJoinedCountry('')
      setWaitlistErrorKind(null)
      setWaitlistPhase(
        fromClientShortCircuit ? WAITLIST_PHASES.FORM : WAITLIST_PHASES.NOT_SUPPORTED,
      )
    },
    [locale],
  )

  const handleLearnMore = useCallback(() => {
    window.open(LEARN_MORE_URL, '_blank', 'noopener,noreferrer')
  }, [])

  const handleWaitlistFormSubmit = useCallback(
    async ({ email, country, organization }) => {
      setWaitlistSubmitting(true)
      try {
        const result = await waitlistService.joinWaitlist({ email, country, organization })
        setJoinedCountry(result.country)
        setWaitlistErrorKind(null)
        setWaitlistPhase(WAITLIST_PHASES.JOINED)
      } catch (error) {
        const kind = error instanceof WaitlistApiError ? error.kind : 'network_error'
        setWaitlistErrorKind(kind)
        setWaitlistPhase(WAITLIST_PHASES.ERROR)
      } finally {
        setWaitlistSubmitting(false)
      }
    },
    [],
  )

  const handleReturnHome = useCallback(() => {
    navigate('/board', { replace: true })
  }, [navigate])

  const showWaitlist = Boolean(waitlistPhase)
  const showGptSuccess =
    isGptBridge &&
    (gptBridgePhase === GPT_BRIDGE_PHASES.SUCCESS ||
      gptBridgePhase === GPT_BRIDGE_PHASES.ALREADY_VERIFIED)

  return (
    <div
      className="verify-page"
      data-testid="verify-page"
      data-verify-host={verifyHost}
      data-waitlist-phase={waitlistPhase ?? 'none'}
      data-gpt-bridge={isGptBridge ? 'true' : 'false'}
    >
      <header className="verify-page__header">
        <h1>{t('verifyPage.title')}</h1>
        <p>{t('verifyPage.subtitle')}</p>
      </header>

      {isGptBridge && !showGptSuccess ? (
        <div className="verify-page__gpt-bridge">
          <GptDraftBanner />
        </div>
      ) : null}

      {showGptSuccess ? (
        gptBridgePhase === GPT_BRIDGE_PHASES.ALREADY_VERIFIED ? (
          <GptBridgeAlreadyVerifiedPanel redirectUrl={chatgptRedirectUrl} />
        ) : (
          <GptBridgeSuccessPanel redirectUrl={chatgptRedirectUrl} />
        )
      ) : phoneVerified ? (
        <>
          <div className="verify-page__status" data-testid="verify-page-verified-status">
            <CivicStatusCard
              phoneVerified
              phoneDialPrefix={profile?.phone_dial_prefix ?? null}
              phoneVerifiedAt={profile?.phone_verified_at ?? null}
            />
          </div>
          {isGptBridge ? (
            <GptBridgeAlreadyVerifiedPanel redirectUrl={chatgptRedirectUrl} />
          ) : (
            <p className="verify-page__already-verified" data-testid="verify-page-already-verified">
              {t('verifyPage.alreadyVerified')}
            </p>
          )}
        </>
      ) : showWaitlist ? (
        <div className="verify-page__waitlist" data-testid="verify-waitlist-flow">
          {waitlistPhase === WAITLIST_PHASES.NOT_SUPPORTED ? (
            <CountryNotSupportedPanel
              countryName={waitlistCountryDisplay}
              onJoinWaitlist={() => setWaitlistPhase(WAITLIST_PHASES.FORM)}
              onLearnMore={handleLearnMore}
            />
          ) : null}
          {waitlistPhase === WAITLIST_PHASES.FORM ? (
            <WaitlistFormPanel
              initialCountry={waitlistCountryDisplay}
              initialCountryCode={waitlistCountryCode}
              submitting={waitlistSubmitting}
              onSubmit={handleWaitlistFormSubmit}
              onBack={() => setWaitlistPhase(WAITLIST_PHASES.NOT_SUPPORTED)}
            />
          ) : null}
          {waitlistPhase === WAITLIST_PHASES.JOINED ? (
            <WaitlistJoinedPanel countryName={joinedCountry} onReturnHome={handleReturnHome} />
          ) : null}
          {waitlistPhase === WAITLIST_PHASES.ERROR ? (
            <WaitlistErrorPanel
              errorKind={waitlistErrorKind ?? 'network_error'}
              onRetry={() => setWaitlistPhase(WAITLIST_PHASES.FORM)}
              onBack={() => setWaitlistPhase(WAITLIST_PHASES.NOT_SUPPORTED)}
            />
          ) : null}
        </div>
      ) : (
        <PhoneVerificationFlow
          host="inline"
          onDismiss={handleDismiss}
          onComplete={handleComplete}
          onJoinWaitlist={handleJoinWaitlist}
        />
      )}
      {waitlistPhone ? (
        <span className="verify-page__waitlist-phone" data-testid="verify-waitlist-phone" hidden>
          {waitlistPhone}
        </span>
      ) : null}
    </div>
  )
}
