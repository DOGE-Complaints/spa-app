import { useCallback, useState } from 'react'
import { useAuth } from '../auth/AuthSessionContext.jsx'
import { identityService } from '../auth/identityService.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { STORY_GATE_PHASES } from '../auth/storyGateFlowState.js'
import { PhoneVerificationFlow } from '../components/PhoneVerification/index.js'
import {
  DraftSavedPanel,
  SubmissionSuccessPanel,
  VerificationCompletePanel,
  VerificationRequiredPanel,
} from '../components/StoryGate/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import {
  storyDraftService,
  VerificationRequiredError,
} from '../services/storyDraftService.js'
import './StoryComposePage.css'

const EMPTY_FIELDS = Object.freeze({ title: '', summary: '', content: '' })

function formatLastSaved(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export function StoryComposePage() {
  const { t } = useI18n()
  const { profile, retry } = useSessionShell()
  const { session } = useAuth()
  const accessToken = session?.access_token ?? null

  const [phase, setPhase] = useState(STORY_GATE_PHASES.COMPOSE)
  const [fields, setFields] = useState({ ...EMPTY_FIELDS })
  const [draftId, setDraftId] = useState(null)
  const [lastSavedAt, setLastSavedAt] = useState(null)
  const [submissionId, setSubmissionId] = useState(null)
  const [busy, setBusy] = useState(false)

  const persistDraft = useCallback(async () => {
    const result = await storyDraftService.createStoryDraft(fields, accessToken)
    const savedAt = new Date().toISOString()
    setDraftId(result.draft_id)
    setLastSavedAt(savedAt)
    return result.draft_id
  }, [accessToken, fields])

  const submitDraft = useCallback(async (id) => {
    const activeDraftId = id ?? draftId
    if (!activeDraftId) {
      throw new Error('missing_draft_id')
    }
    try {
      const result = await storyDraftService.submitStoryDraft(activeDraftId, accessToken)
      setSubmissionId(result.submission_id)
      setPhase(STORY_GATE_PHASES.SUBMISSION_SUCCESS)
      return result
    } catch (error) {
      if (error instanceof VerificationRequiredError) {
        if (!draftId && activeDraftId) {
          setDraftId(activeDraftId)
        }
        setPhase(STORY_GATE_PHASES.VERIFICATION_REQUIRED)
        return null
      }
      throw error
    }
  }, [accessToken, draftId])

  const handleSaveDraft = useCallback(async () => {
    setBusy(true)
    try {
      await persistDraft()
      setPhase(STORY_GATE_PHASES.DRAFT_SAVED)
    } finally {
      setBusy(false)
    }
  }, [persistDraft])

  const handleDiscard = useCallback(() => {
    setFields({ ...EMPTY_FIELDS })
    setDraftId(null)
    setLastSavedAt(null)
    setSubmissionId(null)
    setPhase(STORY_GATE_PHASES.COMPOSE)
  }, [])

  const handleSubmit = useCallback(async () => {
    setBusy(true)
    try {
      const me = profile ?? (await identityService.fetchMe(accessToken))
      const phoneVerified = Boolean(me?.phone_verified)

      let activeDraftId = draftId
      if (!activeDraftId) {
        activeDraftId = await persistDraft()
      }

      if (!phoneVerified) {
        setPhase(STORY_GATE_PHASES.VERIFICATION_REQUIRED)
        return
      }

      await submitDraft(activeDraftId)
    } finally {
      setBusy(false)
    }
  }, [accessToken, draftId, persistDraft, profile, submitDraft])

  const handleGateVerifyContinue = useCallback(() => {
    setPhase(STORY_GATE_PHASES.DRAFT_SAVED)
  }, [])

  const handleDraftSavedContinueVerification = useCallback(() => {
    setPhase(STORY_GATE_PHASES.VERIFYING)
  }, [])

  const handleVerifyComplete = useCallback(async () => {
    await retry()
    setPhase(STORY_GATE_PHASES.VERIFICATION_COMPLETE)
  }, [retry])

  const handleVerifyDismiss = useCallback(() => {
    setPhase(STORY_GATE_PHASES.VERIFICATION_REQUIRED)
  }, [])

  const handleSubmitAnother = useCallback(() => {
    handleDiscard()
  }, [handleDiscard])

  const handleReviewStory = useCallback(() => {
    setPhase(STORY_GATE_PHASES.COMPOSE)
  }, [])

  return (
    <div className="story-compose-page" data-testid="story-compose-page" data-story-gate-phase={phase}>
      <header className="story-compose-page__header">
        <h1>{t('storyGate.compose.title')}</h1>
      </header>

      {phase === STORY_GATE_PHASES.COMPOSE || phase === STORY_GATE_PHASES.VERIFICATION_REQUIRED ? (
        <form
          className="story-compose-form"
          data-testid="story-compose-form"
          onSubmit={(event) => {
            event.preventDefault()
            void handleSubmit()
          }}
        >
          <h2>{t('storyGate.compose.editorTitle')}</h2>
          <label>
            {t('storyGate.compose.field.title')}
            <input
              data-testid="story-compose-field-title"
              value={fields.title}
              onChange={(event) => setFields((prev) => ({ ...prev, title: event.target.value }))}
            />
          </label>
          <label>
            {t('storyGate.compose.field.summary')}
            <input
              data-testid="story-compose-field-summary"
              value={fields.summary}
              onChange={(event) => setFields((prev) => ({ ...prev, summary: event.target.value }))}
            />
          </label>
          <label>
            {t('storyGate.compose.field.content')}
            <textarea
              data-testid="story-compose-field-content"
              rows={8}
              value={fields.content}
              onChange={(event) => setFields((prev) => ({ ...prev, content: event.target.value }))}
            />
          </label>
          {draftId && lastSavedAt ? (
            <p className="story-compose-page__draft-badge" data-testid="story-compose-draft-saved-badge">
              {t('storyGate.compose.status.draftSaved')}
            </p>
          ) : null}
          <div className="story-compose-form__actions">
            <button
              type="submit"
              data-testid="story-compose-action-submit"
              disabled={busy}
            >
              {t('storyGate.compose.action.submit')}
            </button>
            <button
              type="button"
              data-testid="story-compose-action-save-draft"
              disabled={busy}
              onClick={() => void handleSaveDraft()}
            >
              {t('storyGate.compose.action.saveDraft')}
            </button>
            <button
              type="button"
              data-testid="story-compose-action-discard"
              disabled={busy}
              onClick={handleDiscard}
            >
              {t('storyGate.compose.action.discard')}
            </button>
          </div>
        </form>
      ) : null}

      <div className="story-compose-page__overlay">
        {phase === STORY_GATE_PHASES.VERIFICATION_REQUIRED ? (
          <VerificationRequiredPanel
            draftId={draftId}
            onVerifyContinue={handleGateVerifyContinue}
            onSaveDraft={() => void handleSaveDraft()}
            onCancel={() => setPhase(STORY_GATE_PHASES.COMPOSE)}
          />
        ) : null}

        {phase === STORY_GATE_PHASES.DRAFT_SAVED && draftId && lastSavedAt ? (
          <DraftSavedPanel
            draftId={draftId}
            lastSavedAt={formatLastSaved(lastSavedAt)}
            onContinueVerification={handleDraftSavedContinueVerification}
            onReturnToStory={() => setPhase(STORY_GATE_PHASES.COMPOSE)}
          />
        ) : null}

        {phase === STORY_GATE_PHASES.VERIFYING ? (
          <div className="story-compose-page__verify-host" data-testid="story-compose-verify-host">
            <PhoneVerificationFlow
              host="inline"
              onComplete={() => void handleVerifyComplete()}
              onDismiss={handleVerifyDismiss}
            />
          </div>
        ) : null}

        {phase === STORY_GATE_PHASES.VERIFICATION_COMPLETE && draftId ? (
          <VerificationCompletePanel
            draftId={draftId}
            onSubmit={() => void submitDraft()}
            onReview={handleReviewStory}
          />
        ) : null}

        {phase === STORY_GATE_PHASES.SUBMISSION_SUCCESS && submissionId ? (
          <SubmissionSuccessPanel
            submissionId={submissionId}
            onSubmitAnother={handleSubmitAnother}
          />
        ) : null}
      </div>
    </div>
  )
}
