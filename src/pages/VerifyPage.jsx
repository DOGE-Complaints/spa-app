import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { CivicStatusCard } from '../components/CivicStatus/index.js'
import { PhoneVerificationFlow } from '../components/PhoneVerification/index.js'
import './VerifyPage.css'

export function VerifyPage() {
  const { profile, retry } = useSessionShell()
  const navigate = useNavigate()

  const phoneVerified = Boolean(profile?.phone_verified)
  const verifyHost = phoneVerified ? 'verified-summary' : 'flow-only'

  const handleComplete = useCallback(() => {
    retry()
    navigate('/dashboard', { replace: true })
  }, [navigate, retry])

  const handleDismiss = useCallback(() => {
    navigate('/dashboard', { replace: true })
  }, [navigate])

  return (
    <div
      className="verify-page"
      data-testid="verify-page"
      data-verify-host={verifyHost}
    >
      <header className="verify-page__header">
        <h1>Phone Verification</h1>
        <p>Verify your civic account to participate in protected actions.</p>
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
            Your phone is already verified. You can return to your dashboard.
          </p>
        </>
      ) : (
        <PhoneVerificationFlow
          host="inline"
          onDismiss={handleDismiss}
          onComplete={handleComplete}
        />
      )}
    </div>
  )
}
