import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { IssueThreadBlock } from './IssueThreadBlock.jsx'
import { ThreadComposer } from './composer/ThreadComposer.jsx'
import {
  DEFAULT_MAX_ATTACHMENTS,
  DEFAULT_MAX_DEPTH,
  DEFAULT_MEDIA_ALLOWED_TYPES,
  VISUAL_INDENT_CAP,
  canAddAttachment,
  clampAttachmentIntents,
  resolveMaxAttachments,
  resolveMaxDepth,
  resolveVisualIndentCap,
} from './config/threadMountConfig.js'
import { StubVerifyHandoff } from './verify/StubVerifyHandoff.jsx'
import { VerifyWriteGate } from './verify/VerifyWriteGate.jsx'
import { persistVerifyIntent } from './verify/verifySession.js'
import './ThreadMount.css'

function excerptOf(comments, parentId) {
  if (!parentId) return null
  const hit = (Array.isArray(comments) ? comments : []).find((c) => c?.id === parentId)
  const body = typeof hit?.body === 'string' ? hit.body.trim() : ''
  if (!body) return null
  return body.length > 120 ? `${body.slice(0, 117)}…` : body
}

let attachSeq = 0

/**
 * CT-01…12 ThreadMount — nest · composer · attach · branch · gate · reactions · empty · inline reply.
 */
export function ThreadMount({
  status = 'empty',
  comments = [],
  expanded: expandedProp = false,
  onExpandedChange = null,
  onRetry = null,
  onPostComment = null,
  onCommentsChange = null,
  /** @type {'allowed'|'unverified'|'denied-unknown'|'stale'} */
  writeCapability = 'denied-unknown',
  maxDepth = DEFAULT_MAX_DEPTH,
  visualIndentCap = VISUAL_INDENT_CAP,
  maxAttachments = DEFAULT_MAX_ATTACHMENTS,
  mediaAllowedTypes = DEFAULT_MEDIA_ALLOWED_TYPES,
  attachmentsAvailable = true,
  narrow = false,
  apiRef = null,
  className = '',
  initialDraft = '',
  initialReplyParentId = null,
  initialAttachments = null,
  forcePostFail = false,
  autoFailOnMount = false,
  /** @type {'ready'|'denied'|null} lab fixture Attach outcome */
  attachOutcome = 'ready',
  branchDisclosure = false,
  branchExpandMode = 'sync',
  initialBranchStates = null,
  branchExpandDelayMs = undefined,
  /**
   * CT-07 gate chrome phase · lab Path A.
   * @type {'blocked'|'handoff'|'cancelled'|'failed'|'denied-unknown'|'stale'|null}
   */
  verifyGateVariant = null,
  /** V-C opaque Verified chrome on composer · never auto-post */
  verifiedReturn = false,
  showCivicLine = false,
  onGoVerify = null,
  onVerifyDismiss = null,
  onHandoffBack = null,
  /** CT-09 host plug — reactions-mount peer · thread never owns people */
  renderCommentReactions = null,
  /** CT-15 G-L5 — Discussion · Issue {id} when host provides */
  issueId = null,
  /** CT-15 G-M2 — residents row only if aggregate confirmed (soft CR) */
  reactionsAggregateConfirmed = false,
}) {
  const [internalExpanded, setInternalExpanded] = useState(Boolean(expandedProp))
  const [focusSignal, setFocusSignal] = useState(0)
  const [draft, setDraft] = useState(typeof initialDraft === 'string' ? initialDraft : '')
  const [replyParentId, setReplyParentId] = useState(initialReplyParentId || null)
  const [failState, setFailState] = useState(null)
  const [posting, setPosting] = useState(false)
  const [attachments, setAttachments] = useState(() =>
    clampAttachmentIntents(
      Array.isArray(initialAttachments) ? initialAttachments.map((a) => ({ ...a })) : [],
      maxAttachments,
    ),
  )
  const [localComments, setLocalComments] = useState(() =>
    Array.isArray(comments) ? comments.map((c) => ({ ...c })) : [],
  )
  const composerTextareaRef = useRef(null)
  const lastReplyButtonRef = useRef(null)
  const controlled = typeof onExpandedChange === 'function'
  const expanded = controlled ? Boolean(expandedProp) : internalExpanded

  function setExpanded(next) {
    if (controlled) onExpandedChange(next)
    else setInternalExpanded(next)
  }

  useEffect(() => {
    if (controlled) setInternalExpanded(Boolean(expandedProp))
  }, [controlled, expandedProp])

  useEffect(() => {
    setLocalComments(Array.isArray(comments) ? comments.map((c) => ({ ...c })) : [])
  }, [comments])

  const resolvedDepth = resolveMaxDepth(maxDepth)
  const resolvedCap = resolveVisualIndentCap(visualIndentCap)
  const resolvedAttach = resolveMaxAttachments(maxAttachments)
  const writeAllowed = writeCapability === 'allowed'
  const resolvedGate =
    verifyGateVariant ||
    (writeCapability === 'unverified'
      ? 'blocked'
      : writeCapability === 'denied-unknown'
        ? 'denied-unknown'
        : writeCapability === 'stale'
          ? 'stale'
          : null)
  const showHandoff = resolvedGate === 'handoff'
  const showGate =
    !writeAllowed &&
    !showHandoff &&
    (resolvedGate === 'blocked' ||
      resolvedGate === 'cancelled' ||
      resolvedGate === 'failed' ||
      resolvedGate === 'denied-unknown' ||
      resolvedGate === 'stale')
  /* CT-10: empty first paint = entry-only · full ThreadComposer only when expanded */
  const showComposer = writeAllowed && expanded
  /* CT-12 G-H4: reply mounts under parent · root stays bottom after IssueThreadBlock */
  const inlineReply = Boolean(showComposer && replyParentId)
  const showRootComposer = Boolean(showComposer && !replyParentId)
  const emptyEntry = writeAllowed && status === 'empty' && !expanded
  const collapsedEntry = writeAllowed && status === 'populated' && !expanded
  const composerEntry = emptyEntry || collapsedEntry
  const mode = replyParentId ? 'reply' : 'root'
  const parentExcerpt = excerptOf(localComments, replyParentId)
  const allowList = Array.isArray(mediaAllowedTypes) ? mediaAllowedTypes : DEFAULT_MEDIA_ALLOWED_TYPES

  function renderComposer() {
    if (!showComposer) return null
    return (
      <ThreadComposer
        mode={mode}
        draft={draft}
        onDraftChange={(v) => {
          setDraft(v)
          if (failState) setFailState(null)
        }}
        parentExcerpt={parentExcerpt}
        onCancelReply={handleCancelReply}
        onPost={runPost}
        posting={posting}
        failState={failState}
        onTryAgain={runPost}
        onKeepEditing={() => setFailState(null)}
        focusSignal={focusSignal}
        stickyKeyboard={Boolean(narrow)}
        textareaRef={composerTextareaRef}
        attachments={attachments}
        maxAttachments={resolvedAttach}
        attachmentsAvailable={Boolean(attachmentsAvailable)}
        onAttach={handleAttach}
        onRemoveAttachment={handleRemoveAttachment}
        verifiedReturn={Boolean(verifiedReturn)}
        /* CT-11 G-H2: empty/first-send circle · else labelled Post+plane */
        sendChrome={status === 'empty' && !replyParentId ? 'circle' : 'labelled'}
      />
    )
  }

  function renderReplyComposerSlot({ commentId }) {
    if (!inlineReply || commentId !== replyParentId) return null
    return (
      <div
        className="tm-comment-node__reply-composer"
        data-testid="tm-inline-reply-composer"
        data-lab-ct12="true"
        data-tm-reply-inline="true"
      >
        {renderComposer()}
      </div>
    )
  }

  useEffect(() => {
    setAttachments((prev) => clampAttachmentIntents(prev, resolvedAttach))
  }, [resolvedAttach])

  useImperativeHandle(
    apiRef,
    () => ({
      expand: () => setExpanded(true),
      collapse: () => setExpanded(false),
      focusComposer: () => {
        setExpanded(true)
        setFocusSignal((n) => n + 1)
      },
      getStatus: () => status,
      getDraft: () => draft,
      getReplyParentId: () => replyParentId,
      getAttachments: () => attachments.map((a) => ({ ...a })),
      getMaxAttachments: () => resolvedAttach,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- api surface
    [status, controlled, draft, replyParentId, attachments, resolvedAttach],
  )

  function focusComposerField() {
    setExpanded(true)
    setFocusSignal((n) => n + 1)
  }

  function handleReply(parentId, sourceEl) {
    if (sourceEl) lastReplyButtonRef.current = sourceEl
    setExpanded(true)
    if (replyParentId && replyParentId !== parentId && draft.trim()) {
      const ok =
        typeof window === 'undefined'
          ? true
          : window.confirm('Switch reply target? Your draft text will be kept.')
      if (!ok) return
    }
    setReplyParentId(parentId)
    setFailState(null)
    if (writeAllowed) setFocusSignal((n) => n + 1)
  }

  function handleGoVerify() {
    persistVerifyIntent({ draft, targetId: replyParentId })
    if (typeof onGoVerify === 'function') onGoVerify({ draft, targetId: replyParentId })
  }

  function handleCancelReply() {
    setReplyParentId(null)
    setFailState(null)
    requestAnimationFrame(() => {
      lastReplyButtonRef.current?.focus?.()
    })
  }

  function handleAttach() {
    if (!attachmentsAvailable) return
    if (!canAddAttachment(attachments.length, resolvedAttach)) return
    const kind = allowList.includes('image') ? 'image' : allowList[0] || 'file'
    attachSeq += 1
    const id = `fx-attach-${attachSeq}`
    if (attachOutcome === 'denied') {
      setAttachments((prev) =>
        clampAttachmentIntents(
          [
            ...prev,
            {
              id,
              kind,
              label: kind === 'image' ? 'Selected image' : 'Attached file',
              status: 'denied',
            },
          ],
          resolvedAttach,
        ),
      )
      return
    }
    setAttachments((prev) =>
      clampAttachmentIntents(
        [
          ...prev,
          {
            id,
            kind,
            label: kind === 'image' ? 'Selected image' : 'Attached file',
            status: 'ready',
          },
        ],
        resolvedAttach,
      ),
    )
  }

  function handleRemoveAttachment(id) {
    setAttachments((prev) => prev.filter((a) => a.id !== id))
  }

  async function runPost() {
    const body = draft.trim()
    if (!body || posting) return
    if (!writeAllowed) return
    setPosting(true)
    setFailState(null)
    try {
      const result = onPostComment
        ? await onPostComment({
            body,
            parentId: replyParentId,
            attachments: attachments.map((a) => ({ ...a })),
          })
        : {
            ok: false,
            reason: 'no-adapter',
            title: 'Comment wasn’t posted.',
            detail: 'Your text is still here. Try again.',
          }
      if (result?.ok) {
        const nextComment = result.comment
        if (nextComment && !onCommentsChange) {
          setLocalComments((prev) => [...prev, nextComment])
        } else if (typeof onCommentsChange === 'function' && nextComment) {
          onCommentsChange([...localComments, nextComment])
        }
        setDraft('')
        setReplyParentId(null)
        setAttachments([])
        setFailState(null)
        if (status === 'empty') setExpanded(true)
      } else {
        setFailState({
          title: result?.title || 'Comment wasn’t posted.',
          detail: result?.detail || 'Your text is still here. Try again.',
        })
        /* keep local attachment intents — never claim published */
      }
    } finally {
      setPosting(false)
    }
  }

  const autoFailStarted = useRef(false)
  useEffect(() => {
    if (!autoFailOnMount || autoFailStarted.current) return
    if (!draft.trim()) return
    autoFailStarted.current = true
    void runPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFailOnMount, draft])

  const rootClass = useMemo(() => {
    const parts = ['tm-thread-mount']
    if (narrow) parts.push('tm-thread-mount--narrow')
    if (className) parts.push(className)
    return parts.join(' ')
  }, [narrow, className])

  return (
    <div
      className={rootClass}
      data-testid="tm-thread-mount"
      data-tm-status={status}
      data-tm-expanded={expanded ? 'true' : 'false'}
      data-tm-max-depth={String(resolvedDepth)}
      data-tm-visual-indent-cap={String(resolvedCap)}
      data-tm-max-attachments={String(resolvedAttach)}
      data-tm-attach-count={String(attachments.length)}
      data-tm-attachments-available={attachmentsAvailable ? 'true' : 'false'}
      data-tm-write={writeCapability}
      data-tm-reply-parent={replyParentId || ''}
      data-tm-has-draft={draft.trim() ? 'true' : 'false'}
      data-lab-ct01="true"
      data-lab-ct02="true"
      data-lab-ct03="true"
      data-lab-ct04="true"
      data-lab-ct05="true"
      data-lab-ct06={branchDisclosure ? 'true' : undefined}
      data-lab-ct07={showGate || showHandoff || verifiedReturn ? 'true' : undefined}
      data-lab-narrow={narrow ? 'true' : 'false'}
      data-tm-focus-signal={String(focusSignal)}
      data-tm-force-post-fail={forcePostFail ? 'true' : 'false'}
      data-tm-branch-disclosure={branchDisclosure ? 'true' : 'false'}
      data-tm-gate-variant={resolvedGate || ''}
      data-tm-verified-return={verifiedReturn ? 'true' : 'false'}
      data-tm-autopost="false"
      data-tm-identity-methods="false"
      data-lab-ct09={typeof renderCommentReactions === 'function' ? 'true' : undefined}
      data-lab-ct10="true"
      data-lab-ct11={showComposer ? 'true' : undefined}
      data-lab-ct12="true"
      data-lab-ct13="true"
      data-lab-ct14="true"
      data-lab-ct15="true"
      data-tm-empty-entry={emptyEntry ? 'true' : 'false'}
      data-tm-composer-open={showComposer ? 'true' : 'false'}
      data-tm-reply-inline={inlineReply ? 'true' : 'false'}
      data-tm-reactions-plug={typeof renderCommentReactions === 'function' ? 'host' : 'none'}
      data-tm-issue-id={typeof issueId === 'string' && issueId.trim() ? issueId.trim() : undefined}
      data-tm-residents-aggregate={reactionsAggregateConfirmed ? 'confirmed' : 'absent'}
    >
      <IssueThreadBlock
        status={localComments.length > 0 && status === 'empty' ? 'populated' : status}
        comments={localComments}
        expanded={expanded}
        maxDepth={resolvedDepth}
        visualIndentCap={resolvedCap}
        onViewDiscussion={() => setExpanded(true)}
        onRetry={onRetry}
        onReply={handleReply}
        composerEntry={composerEntry}
        onComposerEntry={focusComposerField}
        composerEntryRef={null}
        branchDisclosure={Boolean(branchDisclosure)}
        branchExpandMode={branchExpandMode || 'sync'}
        initialBranchStates={initialBranchStates}
        branchExpandDelayMs={branchExpandDelayMs}
        renderCommentReactions={renderCommentReactions}
        renderReplyComposer={inlineReply ? renderReplyComposerSlot : null}
        issueId={issueId}
        reactionsAggregateConfirmed={Boolean(reactionsAggregateConfirmed)}
      />
      {showHandoff ? <StubVerifyHandoff onBack={onHandoffBack} /> : null}
      {showGate ? (
        <VerifyWriteGate
          variant={
            resolvedGate === 'cancelled' ||
            resolvedGate === 'failed' ||
            resolvedGate === 'denied-unknown' ||
            resolvedGate === 'stale'
              ? resolvedGate
              : 'blocked'
          }
          parentExcerpt={parentExcerpt}
          draft={draft}
          showCivicLine={Boolean(showCivicLine)}
          onGoVerify={handleGoVerify}
          onDismiss={onVerifyDismiss}
        />
      ) : null}
      {showRootComposer ? renderComposer() : null}
    </div>
  )
}
