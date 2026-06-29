import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { CivicStatusCard } from '../components/CivicStatus/index.js'
import { PhoneVerificationFlow } from '../components/PhoneVerification/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './VerifyPage.css'

export function VerifyPage() {
  const { t } = useI18n()
  const { profile, retry } = useSessionShell()
  const navigate = useNavigate()

  const phoneVerified = Boolean(profile?.phone_verified)
  const verifyHost = phoneVerified ? 'verified-summary' : 'flow-only'
  const [waitlistHandoff, setWaitlistHandoff] = useState(false)

  const handleComplete = useCallback(() => {
    retry()
    navigate('/dashboard', { replace: true })
  }, [navigate, retry])

  const handleDismiss = useCallback(() => {
    navigate('/dashboard', { replace: true })
  }, [navigate])

  const handleJoinWaitlist = useCallback(() => {
    setWaitlistHandoff(true)
  }, [])

  return (
    <div
      className="verify-page"
      data-testid="verify-page"
      data-verify-host={verifyHost}
    >
      <header className="verify-page__header">
        <h1>{t('verifyPage.title')}</h1>
        <p>{t('verifyPage.subtitle')}</p>
      </header>

      {phoneVerified ? (
        <>
          <div className="verify-page__status" data-testid="verify-page-verified-status">
            <CivicStatusCard
              phoneVerified
              phoneDialPrefix={profile?.phone_dial_prefix ?? null}
              phoneVerifiedAt={profile?.phone_verified_at ?? null}
            />
          </div>
          <p className="verify-page__already-verified" data-testid="verify-page-already-verified">
            {t('verifyPage.alreadyVerified')}
          </p>
        </>
      ) : (
        <PhoneVerificationFlow
          host="inline"
          onDismiss={handleDismiss}
          onComplete={handleComplete}
          onJoinWaitlist={handleJoinWaitlist}
        />
      )}
      {waitlistHandoff ? (
        <p className="verify-page__waitlist-handoff" data-testid="verify-waitlist-handoff-stub">
          Waitlist handoff (ID-07)
        </p>
      ) : null}
    </div>
  )
}
