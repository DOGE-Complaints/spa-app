import { useId, useState } from 'react'
import { canWriteThreadsWithMe } from '../../../auth/meIdentityVerified.js'
import { VerifyWriteGate } from '../../../components/threads/VerifyWriteGate.jsx'
import {
  buildVerifyHandoffHref,
  resolveHarnessThr05Scene,
} from '../../../components/threads/verifyWriteGate.js'
import { THREADS_FEED_THREAD_ICONS } from '../../../components/threads/threadIcons.js'
import { CommentTextInput } from './CommentTextInput.jsx'
import { ComposerActionRow } from './ComposerActionRow.jsx'
import { ComposerFeedback } from './ComposerFeedback.jsx'
import { ReplyContext } from './ReplyContext.jsx'
import { SubmitCommentAction } from './SubmitCommentAction.jsx'
import './ComposerChrome.css'

/**
 * DS §7 ThreadComposer — next-feed composer plane (AD-VL-01/02).
 * Closed submit/attach/verify contracts retained from classic CommentComposer (no invent POST).
 * Classic `components/threads/CommentComposer.jsx` remains board Done path.
 * VerifyWriteGate classic chrome stays until VL-11 (not claimed Done here).
 */
export function ThreadComposer({
  t,
  mode = 'root',
  parentLabel = '',
  parentId = null,
  attachCommentId = null,
  initialDraft = '',
  initialAttachment = null,
  attachOutcome = 'idle',
  postOutcome = 'idle',
  profile = null,
  identityVerified = null,
  returnTo = '#/next/feed',
  onNavigateVerify,
  onCancel,
  onSubmitComment,
  onAttachRef,
  mediaAllowedTypes = null,
  onPostSuccess,
  onDraftChange = null,
  testId = 'issue-thread-composer',
  iconPack = null,
}) {
  const icons = iconPack || THREADS_FEED_THREAD_ICONS
  const inputId = useId()
  const forcedScene = resolveHarnessThr05Scene()
  const scene = forcedScene || 'live'
  const verifiedFromProfile =
    identityVerified === null || identityVerified === undefined
      ? canWriteThreadsWithMe(profile)
      : Boolean(identityVerified)
  const isVerified =
    forcedScene === 'verified'
      ? true
      : forcedScene === 'unverified' || forcedScene === 'handoff' || forcedScene === 'civic'
        ? false
        : verifiedFromProfile

  const [draft, setDraft] = useState(initialDraft)
  const [attachment, setAttachment] = useState(initialAttachment)
  const [attachError, setAttachError] = useState(attachOutcome === 'denied')
  const [postError, setPostError] = useState(postOutcome === 'fail')
  const [maxDepthError, setMaxDepthError] = useState(false)
  const [posting, setPosting] = useState(false)
  const [gateOpen, setGateOpen] = useState(
    forcedScene === 'unverified' || forcedScene === 'civic' || forcedScene === 'handoff',
  )
  const [showVerifiedChrome, setShowVerifiedChrome] = useState(forcedScene === 'verified')
  const [handoffHref, setHandoffHref] = useState(
    forcedScene === 'handoff' ? buildVerifyHandoffHref(returnTo) : null,
  )

  const placeholder =
    mode === 'reply' ? t('threadsFeed.composer.replyPlaceholder') : t('threadsFeed.composer.placeholder')

  function notifyDraft(nextDraft, nextAttachment) {
    if (typeof onDraftChange === 'function') onDraftChange(nextDraft, nextAttachment)
  }

  function openVerifyGate() {
    setGateOpen(true)
    setShowVerifiedChrome(false)
    setPostError(false)
    setMaxDepthError(false)
  }

  async function handleAttach() {
    if (!isVerified) {
      openVerifyGate()
      return
    }
    if (attachOutcome === 'denied') {
      setAttachError(true)
      return
    }

    if (typeof onAttachRef === 'function') {
      const allow = Array.isArray(mediaAllowedTypes) ? mediaAllowedTypes.map(String) : []
      if (allow.length === 0) {
        setAttachError(true)
        return
      }
      const commentId =
        attachCommentId != null && String(attachCommentId).trim() !== ''
          ? String(attachCommentId)
          : mode === 'reply' && parentId != null
            ? String(parentId)
            : null
      if (!commentId) {
        setAttachError(true)
        return
      }
      const mediaType = allow[0]
      const refId =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `ref-${Date.now()}`
      setAttachError(false)
      try {
        const result = await onAttachRef({ refId, mediaType, commentId })
        if (result && result.status === 'ok') {
          const next = {
            label: t('threadsFeed.composer.attachedFile'),
            refId: String(result.data?.ref_id || refId),
            mediaType,
          }
          setAttachment(next)
          notifyDraft(draft, next)
          return
        }
        if (result && result.status === 'fail' && result.failKind === 'verify') {
          openVerifyGate()
          return
        }
        if (result && result.status === 'fail' && result.failKind === 'attach_denied') {
          setAttachError(true)
          return
        }
        setAttachError(true)
      } catch {
        setAttachError(true)
      }
      return
    }

    setAttachError(false)
    const next = { label: t('threadsFeed.composer.attachedFile') }
    setAttachment(next)
    notifyDraft(draft, next)
  }

  function handleRemoveAttachment() {
    setAttachment(null)
    notifyDraft(draft, null)
  }

  async function handlePost() {
    if (!isVerified) {
      openVerifyGate()
      return
    }

    if (typeof onSubmitComment === 'function') {
      setPosting(true)
      setPostError(false)
      setMaxDepthError(false)
      try {
        const result = await onSubmitComment({
          body: draft,
          parentId: mode === 'reply' ? parentId : null,
        })
        if (!result || result.status === 'ok') {
          setDraft('')
          setAttachment(null)
          notifyDraft('', null)
          if (typeof onPostSuccess === 'function') onPostSuccess(result)
          return
        }
        if (result.status === 'fail' && result.failKind === 'verify') {
          openVerifyGate()
          return
        }
        if (result.status === 'fail' && result.failKind === 'max_depth') {
          setMaxDepthError(true)
          return
        }
        setPostError(true)
      } catch {
        setPostError(true)
      } finally {
        setPosting(false)
      }
      return
    }

    if (postOutcome === 'fail') {
      setPostError(true)
      return
    }
    setPostError(false)
  }

  function handleRetry() {
    setPostError(false)
    setMaxDepthError(false)
  }

  function handleGoVerify() {
    const href = buildVerifyHandoffHref(returnTo)
    setHandoffHref(href)
    if (typeof onNavigateVerify === 'function') {
      onNavigateVerify(href)
      return
    }
    if (typeof window !== 'undefined') {
      window.location.hash = href.replace(/^#/, '')
    }
  }

  return (
    <div
      className={`nf-composer nf-composer--${mode}${postError ? ' nf-composer--post-fail' : ''}`}
      data-ds-surface="ThreadComposer"
      data-vl-done-surface="ThreadComposer"
      data-testid={testId}
      data-composer-mode={mode}
      data-thr05-scene={scene}
      data-identity-verified={isVerified ? 'true' : 'false'}
      data-plane="light"
    >
      {mode === 'reply' ? (
        <ReplyContext
          label={t('threadsFeed.composer.replyingTo')}
          parentLabel={parentLabel}
          onCancel={onCancel}
          cancelLabel={t('threadsFeed.composer.cancel')}
        />
      ) : null}

      <label className="visually-hidden" htmlFor={inputId}>
        {placeholder}
      </label>
      <CommentTextInput
        id={inputId}
        value={draft}
        onChange={(e) => {
          const next = e.target.value
          setDraft(next)
          notifyDraft(next, attachment)
        }}
        placeholder={placeholder}
        rows={mode === 'reply' || postError || maxDepthError || attachment || gateOpen ? 3 : 1}
        disabled={posting}
      />

      {attachment ? (
        <div className="nf-composer-attach-chip" data-testid="comment-attach-chip">
          <img src={icons.attach} alt="" aria-hidden="true" />
          <span>{attachment.label}</span>
          <button
            type="button"
            className="nf-composer-attach-remove"
            data-testid="comment-attach-remove"
            onClick={handleRemoveAttachment}
            aria-label={t('threadsFeed.composer.removeAttachment')}
          >
            <img src={icons.close} alt="" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {attachError ? (
        <ComposerFeedback testId="comment-attach-denied">
          <img src={icons.error} alt="" aria-hidden="true" />
          <span>{t('threadsFeed.composer.attachDenied')}</span>
        </ComposerFeedback>
      ) : null}

      {maxDepthError ? (
        <ComposerFeedback testId="comment-max-depth-fail" role="status">
          <img src={icons.error} alt="" aria-hidden="true" />
          <span>{t('threadsFeed.composer.maxDepthReached')}</span>
        </ComposerFeedback>
      ) : null}

      {postError ? (
        <ComposerFeedback variant="post-fail" testId="comment-post-fail">
          <p className="nf-composer-post-fail-title">
            <img src={icons.error} alt="" aria-hidden="true" />
            <span>{t('threadsFeed.composer.postFailed')}</span>
          </p>
          <p className="nf-composer-post-fail-helper">{t('threadsFeed.composer.postFailedHelper')}</p>
        </ComposerFeedback>
      ) : null}

      {showVerifiedChrome ? <VerifyWriteGate t={t} variant="verified" iconPack={icons} /> : null}

      {gateOpen && !isVerified ? (
        <VerifyWriteGate
          t={t}
          variant="blocked"
          showCivicLine={forcedScene === 'civic'}
          onGoVerify={handleGoVerify}
          onDismiss={() => setGateOpen(false)}
          iconPack={icons}
        />
      ) : null}

      {handoffHref ? (
        <p className="nf-composer-handoff" data-testid="verify-handoff-href" hidden={forcedScene !== 'handoff'}>
          {handoffHref}
        </p>
      ) : null}

      <ComposerActionRow>
        <button
          type="button"
          className="nf-composer-tool"
          data-testid="comment-attach-button"
          onClick={() => {
            void handleAttach()
          }}
        >
          <img src={icons.attach} alt="" aria-hidden="true" />
          <span>{t('threadsFeed.composer.attach')}</span>
        </button>
        {mode === 'reply' || postError || maxDepthError ? (
          <button
            type="button"
            className="nf-composer-tool nf-composer-tool--neutral"
            data-testid="comment-composer-cancel"
            onClick={onCancel}
          >
            {postError || maxDepthError ? t('threadsFeed.composer.keepEditing') : t('threadsFeed.composer.cancel')}
          </button>
        ) : null}
        {postError ? (
          <SubmitCommentAction
            testId="comment-composer-try-again"
            className="nf-composer-primary"
            onClick={handleRetry}
          >
            <img src={icons.retry} alt="" aria-hidden="true" />
            <span>{t('threadsFeed.composer.tryAgain')}</span>
          </SubmitCommentAction>
        ) : (
          <SubmitCommentAction
            testId="comment-composer-post"
            className="nf-composer-primary"
            disabled={posting}
            onClick={() => {
              void handlePost()
            }}
          >
            <img src={icons.send} alt="" aria-hidden="true" />
            <span>{t('threadsFeed.composer.postReply')}</span>
          </SubmitCommentAction>
        )}
      </ComposerActionRow>
    </div>
  )
}
