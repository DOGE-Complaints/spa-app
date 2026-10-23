import { useNavigate } from 'react-router-dom'
import {
  CIVIC_FLOW_PHASES,
  CIVIC_VERIFICATION_CONTEXT,
} from '../auth/civicStatusState.js'
import {
  SESSION_SHELL_STATES,
  isCabinetProfileLoadErrorState,
  resolveProfileLoadErrorCode,
} from '../auth/sessionShellState.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { AccountSummary } from '../components/AccountSummary/index.js'
import { AppErrorState } from '../components/AppErrorState/index.js'
import { CivicStatusCard } from '../components/CivicStatus/index.js'
import { StoryActivityCard } from '../components/StoryActivity/index.js'
import { ContributionLayer } from '../components/ContributionLayer/index.js'
import { WalletStatusCard } from '../components/WalletStatus/index.js'
import { useCabinetStoryActivity } from '../hooks/useCabinetStoryActivity.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './UserCabinetPage.css'

/** CAB-08 / M170 — hide wallet + contribution (keep components for later). */
export const CAB08_SHOW_WALLET_CONTRIB = false

const SECTION_SLOTS_ALL = [
  { id: 'account', testId: 'cabinet-slot-account', labelKey: 'cabinet.section.account' },
  { id: 'civic', testId: 'cabinet-slot-civic', labelKey: 'cabinet.section.civicStatus' },
  { id: 'story', testId: 'cabinet-slot-story', labelKey: 'cabinet.section.storyActivity' },
  { id: 'contribution', testId: 'cabinet-slot-contribution', labelKey: 'cabinet.section.contribution' },
  { id: 'wallet', testId: 'cabinet-slot-wallet', labelKey: 'cabinet.section.wallet' },
]

const SECTION_SLOTS = CAB08_SHOW_WALLET_CONTRIB
  ? SECTION_SLOTS_ALL
  : SECTION_SLOTS_ALL.filter((s) => s.id !== 'wallet' && s.id !== 'contribution')

/**
 * DEV-only: sessionStorage['doge.wallet-preview']
 * = unlinked | linked | connect
 */
function readWalletPreviewFlag() {
  if (!import.meta.env.DEV || typeof sessionStorage === 'undefined') {
    return null
  }
  return sessionStorage.getItem('doge.wallet-preview')
}

/**
 * DEV-only: sessionStorage['doge.contrib-preview']
 * = receipts-empty|receipts-populated|receipts-unavailable|
 *   records-empty|records-populated|records-unavailable|
 *   reputation-later|reputation-available|reputation-unavailable
 */
function readContribPreviewFlag() {
  if (!import.meta.env.DEV || typeof sessionStorage === 'undefined') {
    return null
  }
  return sessionStorage.getItem('doge.contrib-preview')
}

/**
 * DEV-only: sessionStorage['doge.story-activity-preview']
 * = active | empty | draft | verify | unavailable
 */
function readStoryActivityPreviewFlag() {
  if (!import.meta.env.DEV || typeof sessionStorage === 'undefined') {
    return null
  }
  return sessionStorage.getItem('doge.story-activity-preview')
}

/**
 * DEV-only screenshot / preview hook: sessionStorage['doge.civic-preview']
 * = unverified | available | in_progress | verified | failed
 */
function readCivicPreviewOverrides() {
  if (!import.meta.env.DEV || typeof sessionStorage === 'undefined') {
    return null
  }
  const flag = sessionStorage.getItem('doge.civic-preview')
  if (!flag) return null
  if (flag === 'available') {
    return {
      flowPhase: CIVIC_FLOW_PHASES.IDLE,
      verificationContext: CIVIC_VERIFICATION_CONTEXT.PROTECTED_ACTION,
      errorCode: null,
    }
  }
  if (flag === 'in_progress') {
    return {
      flowPhase: CIVIC_FLOW_PHASES.CODE_ENTRY,
      verificationContext: CIVIC_VERIFICATION_CONTEXT.DEFAULT,
      errorCode: null,
    }
  }
  if (flag === 'failed') {
    return {
      flowPhase: CIVIC_FLOW_PHASES.FAILED,
      verificationContext: CIVIC_VERIFICATION_CONTEXT.DEFAULT,
      errorCode: 'VERIFICATION_FAILED',
    }
  }
  if (flag === 'verified' || flag === 'unverified') {
    return {
      flowPhase: CIVIC_FLOW_PHASES.IDLE,
      verificationContext: CIVIC_VERIFICATION_CONTEXT.DEFAULT,
      errorCode: null,
    }
  }
  return null
}

function CabinetShellSkeleton({ t }) {
  return (
    <div
      className="user-cabinet-page__skeleton"
      data-testid="cabinet-shell-skeleton"
      aria-busy="true"
      aria-label={t('cabinet.shell.loading')}
    >
      <div className="user-cabinet-page__grid user-cabinet-page__grid--skeleton" data-testid="cabinet-grid">
        {SECTION_SLOTS.map((slot) => (
          <section
            key={slot.id}
            className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id} user-cabinet-page__slot--skeleton`}
            data-testid={slot.testId}
            aria-hidden="true"
          >
            <div className="user-cabinet-page__skeleton-block" />
          </section>
        ))}
      </div>
      <p className="user-cabinet-page__loading" data-testid="cabinet-shell-loading">
        {t('cabinet.shell.loading')}
      </p>
    </div>
  )
}

function CabinetSectionSlot({ slot, t, children }) {
  return (
    <section
      className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id}`}
      data-testid={slot.testId}
      aria-label={t(slot.labelKey)}
    >
      <header className="user-cabinet-page__slot-header">
        <h2 className="user-cabinet-page__slot-title">{t(slot.labelKey)}</h2>
      </header>
      <div className="user-cabinet-page__slot-body">{children}</div>
    </section>
  )
}

/**
 * DEV-only: sessionStorage['doge.cabinet-preview'] = new-user
 * Forces M23 composite empty defaults (clear module previews; civic unverified via profile).
 */
function readCabinetPreviewFlag() {
  if (!import.meta.env.DEV || typeof sessionStorage === 'undefined') {
    return null
  }
  return sessionStorage.getItem('doge.cabinet-preview')
}

export function UserCabinetPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { profile, shellState, profileErrorCode, retry } = useSessionShell()
  const forceLoading =
    import.meta.env.DEV &&
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem('doge.force-cabinet-loading') === '1'
  const isLoading = forceLoading || shellState === SESSION_SHELL_STATES.RESTORING
  const isProfileLoadError = isCabinetProfileLoadErrorState(shellState)
  const cabinetPreview = readCabinetPreviewFlag()
  const isNewUserPreview = cabinetPreview === 'new-user'
  const preview = isNewUserPreview
    ? {
        flowPhase: CIVIC_FLOW_PHASES.IDLE,
        verificationContext: CIVIC_VERIFICATION_CONTEXT.DEFAULT,
        errorCode: null,
      }
    : readCivicPreviewOverrides()
  const storyPreviewFlag = isNewUserPreview ? 'empty' : readStoryActivityPreviewFlag()
  const walletPreviewFlag = isNewUserPreview ? 'unlinked' : readWalletPreviewFlag()
  const contribPreviewFlag = isNewUserPreview ? null : readContribPreviewFlag()
  const phoneVerified = isNewUserPreview ? false : Boolean(profile?.phone_verified)
  const liveEnabled =
    !isLoading && !isProfileLoadError && shellState === SESSION_SHELL_STATES.AUTHENTICATED
  const storyLive = useCabinetStoryActivity({
    enabled: liveEnabled,
    previewFlag: storyPreviewFlag,
  })

  const cab08Attr = CAB08_SHOW_WALLET_CONTRIB ? 'wallet-contrib-on' : 'wallet-contrib-gated'

  return (
    <div
      className="user-cabinet-page"
      data-testid="user-cabinet-page"
      data-cab08={cab08Attr}
    >
      <header className="user-cabinet-page__header">
        <h1 className="user-cabinet-page__title">{t('cabinet.page.title')}</h1>
      </header>

      {isLoading ? (
        <CabinetShellSkeleton t={t} />
      ) : isProfileLoadError ? (
        <AppErrorState
          code={resolveProfileLoadErrorCode(shellState, profileErrorCode)}
          onRetry={retry}
          onBackToBoard={() => navigate('/board')}
        />
      ) : (
        <div className="user-cabinet-page__grid" data-testid="cabinet-grid">
          {SECTION_SLOTS.map((slot) => {
            if (slot.id === 'account') {
              return (
                <section
                  key={slot.id}
                  className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id}`}
                  data-testid={slot.testId}
                  aria-label={t(slot.labelKey)}
                >
                  <AccountSummary profile={profile} />
                </section>
              )
            }
            if (slot.id === 'civic') {
              // No slot-header: CivicStatusCard carries its own title (M28 / Dashboard parity; audit G2)
              return (
                <section
                  key={slot.id}
                  className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id}`}
                  data-testid={slot.testId}
                  aria-label={t(slot.labelKey)}
                >
                  <CivicStatusCard
                    phoneVerified={phoneVerified}
                    phoneDialPrefix={isNewUserPreview ? null : (profile?.phone_dial_prefix ?? null)}
                    phoneVerifiedAt={isNewUserPreview ? null : (profile?.phone_verified_at ?? null)}
                    flowPhase={preview?.flowPhase ?? CIVIC_FLOW_PHASES.IDLE}
                    verificationContext={
                      preview?.verificationContext ?? CIVIC_VERIFICATION_CONTEXT.DEFAULT
                    }
                    errorCode={preview?.errorCode ?? null}
                    compact={!CAB08_SHOW_WALLET_CONTRIB && phoneVerified}
                    onVerify={() => navigate('/verify')}
                  />
                </section>
              )
            }
            if (slot.id === 'story') {
              // No slot-header: StoryActivityCard owns title (M45)
              const liveActive = !storyPreviewFlag && storyLive.state === 'active'
              return (
                <section
                  key={slot.id}
                  className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id}`}
                  data-testid={slot.testId}
                  aria-label={t(slot.labelKey)}
                >
                  <StoryActivityCard
                    previewFlag={storyPreviewFlag}
                    state={storyPreviewFlag ? null : storyLive.state}
                    loading={!storyPreviewFlag && storyLive.loading}
                    metrics={
                      liveActive || (!storyPreviewFlag && storyLive.state)
                        ? storyLive.metrics
                        : undefined
                    }
                    rows={
                      liveActive || (!storyPreviewFlag && storyLive.state === 'active')
                        ? storyLive.rows
                        : undefined
                    }
                    errorCode={storyLive.errorCode}
                    onVerify={() => navigate('/verify')}
                    onGoToFeed={() => navigate('/next/feed')}
                    onRetry={storyLive.reload}
                  />
                </section>
              )
            }
            if (slot.id === 'wallet') {
              // No slot-header: WalletStatusCard owns title (M50)
              return (
                <section
                  key={slot.id}
                  className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id}`}
                  data-testid={slot.testId}
                  aria-label={t(slot.labelKey)}
                >
                  <WalletStatusCard previewFlag={walletPreviewFlag} />
                </section>
              )
            }
            if (slot.id === 'contribution') {
              // No slot-header: ContributionLayer owns title (M53)
              return (
                <section
                  key={slot.id}
                  className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id}`}
                  data-testid={slot.testId}
                  aria-label={t(slot.labelKey)}
                >
                  <ContributionLayer previewFlag={contribPreviewFlag} />
                </section>
              )
            }
            return (
              <CabinetSectionSlot key={slot.id} slot={slot} t={t}>
                <p className="user-cabinet-page__slot-placeholder">{t('cabinet.common.comingLater')}</p>
              </CabinetSectionSlot>
            )
          })}
        </div>
      )}
    </div>
  )
}
