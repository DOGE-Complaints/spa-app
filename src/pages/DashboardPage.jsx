import { useNavigate } from 'react-router-dom'
import { CIVIC_FLOW_PHASES } from '../auth/civicStatusState.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { CivicStatusCard } from '../components/CivicStatus/index.js'

export function DashboardPage() {
  const { profile } = useSessionShell()
  const navigate = useNavigate()

  return (
    <div className="dashboard-page" data-testid="dashboard-page">
      <header className="dashboard-page__header">
        <h1>Civic Dashboard</h1>
        <p>Your civic participation status and eligibility.</p>
      </header>
      <CivicStatusCard
        phoneVerified={Boolean(profile?.phone_verified)}
        phoneDialPrefix={profile?.phone_dial_prefix ?? null}
        phoneVerifiedAt={profile?.phone_verified_at ?? null}
        flowPhase={CIVIC_FLOW_PHASES.IDLE}
        onVerify={() => navigate('/verify')}
      />
    </div>
  )
}
