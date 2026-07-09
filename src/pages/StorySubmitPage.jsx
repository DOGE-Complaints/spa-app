import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthSessionContext.jsx'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import {
  buildHandoffLoginPath,
  clearDraftId,
  persistDraftId,
  readDraftId,
  STORY_HANDOFF_PHASES,
  isDevHandoffPhase,
} from '../auth/storyHandoffFlowState.js'
import { PhoneVerificationFlow } from '../components/PhoneVerification/index.js'
import {
  StoryHandoffDraftChips,
  StoryHandoffPreviewPanel,
  StoryHandoffStatePanel,
  StoryHandoffSuccessPanel,
} from '../components/StoryHandoff/index.js'
import '../components/StoryHandoff/StoryHandoff.css'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { mapDraftPayloadToPreview } from '../services/storyDraftPreview.js'
import {
  storyDraftService,
  StoryDraftApiError,
  VerificationRequiredError,
} from '../services/storyDraftService.js'

const STORY_GPT_URL = String(import.meta.env.VITE_STORY_GPT_URL ?? '').trim()

/**
 * @param {unknown} error
 */
function mapDraftErrorPhase(error) {
  if (error instanceof VerificationRequiredError) {
    return STORY_HANDOFF_PHASES.VERIFY
  }
  if (error instanceof StoryDraftApiError) {
    if (error.status === 401) return STORY_HANDOFF_PHASES.LOGIN_REQUIRED
    if (error.status === 404) return STORY_HANDOFF_PHASES.EXPIRED
    if (error.status === 503) return STORY_HANDOFF_PHASES.SERVICE_DOWN
  }
  return STORY_HANDOFF_PHASES.SERVICE_DOWN
}

export function StorySubmitPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { session } = useAuth()
  const { retry } = useSessionShell()
  const accessToken = session?.access_token ?? null

  const draftIdParam = searchParams.get('draft_id')
  const devPhase = searchParams.get('dev_handoff_phase')
  const draftId = useMemo(
    () => draftIdParam ?? readDraftId() ?? null,
    [draftIdParam],
  )

  const [phase, setPhase] = useState(() => {
    if (isDevHandoffPhase(devPhase)) return devPhase
    return draftId ? STORY_HANDOFF_PHASES.RESOLVING : STORY_HANDOFF_PHASES.EMPTY
  })
  const [preview, setPreview] = useState(null)
  const [submissionId, setSubmissionId] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (draftIdParam) {
      persistDraftId(draftIdParam)
    }
  }, [draftIdParam])

  const redirectToLogin = useCallback(
    (id) => {
      persistDraftId(id ?? draftId)
      navigate(buildHandoffLoginPath(id ?? draftId), { replace: true })
    },
    [draftId, navigate],
  )

  const loadDraft = useCallback(
    async (id) => {
      if (!id) {
        setPhase(STORY_HANDOFF_PHASES.EMPTY)
        return
      }
      setPhase(STORY_HANDOFF_PHASES.RESOLVING)
      setBusy(true)
      try {
        const payload = await storyDraftService.getStoryDraft(id, accessToken)
        setPreview(mapDraftPayloadToPreview(payload))
        setPhase(STORY_HANDOFF_PHASES.PREVIEW)
      } catch (error) {
        if (error instanceof StoryDraftApiError && error.status === 401) {
          redirectToLogin(id)
          return
        }
        setPhase(mapDraftErrorPhase(error))
      } finally {
        setBusy(false)
      }
    },
    [accessToken, redirectToLogin],
  )

  const submitDraft = useCallback(
    async (id) => {
      const activeId = id ?? draftId
      if (!activeId) return
      setPhase(STORY_HANDOFF_PHASES.SUBMITTING)
      setBusy(true)
      try {
        const result = await storyDraftService.submitStoryDraft(activeId, accessToken)
        clearDraftId()
        navigate('/profile', {
          replace: true,
          state: { submittedStoryId: result.submission_id },
        })
        return
      } catch (error) {
        if (error instanceof StoryDraftApiError && error.status === 401) {
          redirectToLogin(activeId)
          return
        }
        setPhase(mapDraftErrorPhase(error))
      } finally {
        setBusy(false)
      }
    },
    [accessToken, draftId, navigate, redirectToLogin],
  )

  useEffect(() => {
    if (isDevHandoffPhase(devPhase)) {
      setPhase(devPhase)
      if (devPhase === STORY_HANDOFF_PHASES.PREVIEW) {
        setPreview(
          mapDraftPayloadToPreview({
            narrative_title: { en: 'Preview Story' },
            narrative_summary: { en: 'Summary text' },
            narrative_description: { en: 'Description body' },
            narrative_canonical_type: 'civic',
            narrative_canonical_labels: ['open-government'],
            narrative_location_query: 'Tallinn',
            narrative_session_language: 'en',
          }),
        )
      }
      if (devPhase === STORY_HANDOFF_PHASES.SUBMITTED) {
        setSubmissionId('SUB-MOCK-001')
      }
      return
    }
    if (!draftId) {
      setPhase(STORY_HANDOFF_PHASES.EMPTY)
      return
    }
    void loadDraft(draftId)
  }, [devPhase, draftId, loadDraft])

  const handleVerifyComplete = useCallback(async () => {
    await retry()
    if (draftId) {
      await submitDraft(draftId)
    }
  }, [draftId, retry, submitDraft])

  const openGptUrl = STORY_GPT_URL || '#'

  return (
    <div
      className="story-handoff"
      data-testid="story-submit-page"
      data-story-handoff-phase={phase}
    >
      {phase === STORY_HANDOFF_PHASES.RESOLVING ? (
        <StoryHandoffStatePanel
          testId="story-handoff-resolving"
          titleKey="storyHandoff.resolving.title"
          messageKey="storyHandoff.resolving.message"
          iconSrc="/icons/story-handoff/ic-spinner.png"
        >
          <StoryHandoffDraftChips />
          <img
            className="story-handoff__spinner"
            src="/icons/story-handoff/ic-spinner.png"
            alt=""
            aria-hidden="true"
          />
        </StoryHandoffStatePanel>
      ) : null}

      {phase === STORY_HANDOFF_PHASES.LOGIN_REQUIRED ? (
        <StoryHandoffStatePanel
          testId="story-handoff-login"
          titleKey="storyHandoff.login.title"
          messageKey="storyHandoff.login.message"
          iconSrc="/icons/story-handoff/ic-lock.png"
        >
          <StoryHandoffDraftChips />
          <div className="story-handoff__actions">
            <Link
              className="story-handoff__btn story-handoff__btn--primary"
              to={buildHandoffLoginPath(draftId)}
              data-testid="story-handoff-sign-in"
            >
              {t('auth.signIn.title')}
            </Link>
          </div>
        </StoryHandoffStatePanel>
      ) : null}

      {phase === STORY_HANDOFF_PHASES.PREVIEW && preview ? (
        <StoryHandoffPreviewPanel
          preview={preview}
          busy={busy}
          onSubmit={() => void submitDraft(draftId)}
          onBack={() => navigate('/board')}
        />
      ) : null}

      {phase === STORY_HANDOFF_PHASES.VERIFY ? (
        <StoryHandoffStatePanel
          testId="story-handoff-verify"
          titleKey="storyHandoff.verify.title"
          messageKey="storyHandoff.verify.message"
          iconSrc="/icons/story-handoff/ic-verify-shield.png"
        >
          <div className="story-handoff__verify-host">
            <PhoneVerificationFlow
              host="inline"
              onComplete={() => void handleVerifyComplete()}
              onDismiss={() => setPhase(STORY_HANDOFF_PHASES.PREVIEW)}
            />
          </div>
        </StoryHandoffStatePanel>
      ) : null}

      {phase === STORY_HANDOFF_PHASES.SUBMITTING ? (
        <StoryHandoffStatePanel
          testId="story-handoff-submitting"
          titleKey="storyHandoff.submitting.title"
          messageKey="storyHandoff.submitting.message"
          iconSrc="/icons/story-handoff/ic-spinner.png"
        >
          <img
            className="story-handoff__spinner"
            src="/icons/story-handoff/ic-spinner.png"
            alt=""
            aria-hidden="true"
          />
        </StoryHandoffStatePanel>
      ) : null}

      {phase === STORY_HANDOFF_PHASES.SUBMITTED && submissionId ? (
        <StoryHandoffSuccessPanel
          submissionId={submissionId}
          onGoToBoard={() => navigate('/board')}
          onMyStories={() => navigate('/profile')}
          onSubmitAnother={() => {
            if (STORY_GPT_URL) {
              window.location.assign(STORY_GPT_URL)
            }
          }}
        />
      ) : null}

      {phase === STORY_HANDOFF_PHASES.EXPIRED ? (
        <StoryHandoffStatePanel
          testId="story-handoff-expired"
          titleKey="storyHandoff.expired.title"
          messageKey="storyHandoff.expired.message"
          iconSrc="/icons/story-handoff/ic-clock-expired.png"
        >
          <div className="story-handoff__actions">
            <a
              className="story-handoff__btn story-handoff__btn--primary"
              href={openGptUrl}
              data-testid="story-handoff-create-new"
            >
              {t('storyHandoff.expired.createNew')}
            </a>
          </div>
        </StoryHandoffStatePanel>
      ) : null}

      {phase === STORY_HANDOFF_PHASES.SERVICE_DOWN ? (
        <StoryHandoffStatePanel
          testId="story-handoff-service-down"
          titleKey="storyHandoff.serviceDown.title"
          messageKey="storyHandoff.serviceDown.message"
          iconSrc="/icons/story-handoff/ic-cloud-error.png"
        >
          <div className="story-handoff__actions">
            <button
              type="button"
              className="story-handoff__btn story-handoff__btn--primary"
              data-testid="story-handoff-retry"
              onClick={() => void (preview ? submitDraft(draftId) : loadDraft(draftId))}
            >
              {t('storyHandoff.serviceDown.tryAgain')}
            </button>
          </div>
        </StoryHandoffStatePanel>
      ) : null}

      {phase === STORY_HANDOFF_PHASES.EMPTY ? (
        <StoryHandoffStatePanel
          testId="story-handoff-empty"
          titleKey="storyHandoff.empty.title"
          messageKey="storyHandoff.empty.message"
          iconSrc="/icons/story-handoff/ic-doc-new.png"
        >
          <div className="story-handoff__actions">
            <a
              className="story-handoff__btn story-handoff__btn--primary"
              href={openGptUrl}
              data-testid="story-handoff-open-gpt"
            >
              {t('storyHandoff.empty.openGpt')}
            </a>
            <button
              type="button"
              className="story-handoff__btn story-handoff__btn--secondary"
              onClick={() => navigate('/board')}
            >
              {t('storyHandoff.cta.backToBoard')}
            </button>
          </div>
        </StoryHandoffStatePanel>
      ) : null}
    </div>
  )
}
