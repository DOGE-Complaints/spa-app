import { useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { IssueThreadBlock } from './IssueThreadBlock.jsx'
import {
  DEFAULT_MAX_ATTACHMENTS,
  DEFAULT_MAX_DEPTH,
  resolveMaxAttachments,
  resolveMaxDepth,
} from './config/threadMountConfig.js'
import './ThreadMount.css'

/**
 * CT-01 ThreadMount — owns status + collapsed summary slot (IssueThreadBlock).
 * Tree/composer/verify surfaces land in later CT stories.
 *
 * @param {'loading'|'empty'|'populated'|'unavailable'} [status]
 * @param {Array} [comments]
 * @param {boolean} [expanded]
 * @param {(next: boolean) => void} [onExpandedChange]
 * @param {() => void} [onRetry]
 * @param {'allowed'|'unverified'|'denied-unknown'|string} [writeCapability]
 * @param {import('react').Ref} [apiRef]
 */
export function ThreadMount({
  status = 'empty',
  comments = [],
  expanded: expandedProp = false,
  onExpandedChange = null,
  onRetry = null,
  writeCapability = 'denied-unknown',
  maxDepth = DEFAULT_MAX_DEPTH,
  maxAttachments = DEFAULT_MAX_ATTACHMENTS,
  narrow = false,
  apiRef = null,
  className = '',
}) {
  const [internalExpanded, setInternalExpanded] = useState(Boolean(expandedProp))
  const controlled = typeof onExpandedChange === 'function'
  const expanded = controlled ? Boolean(expandedProp) : internalExpanded

  function setExpanded(next) {
    if (controlled) onExpandedChange(next)
    else setInternalExpanded(next)
  }

  useEffect(() => {
    if (controlled) setInternalExpanded(Boolean(expandedProp))
  }, [controlled, expandedProp])

  const resolvedDepth = resolveMaxDepth(maxDepth)
  const resolvedAttach = resolveMaxAttachments(maxAttachments)
  const composerEntry = writeCapability === 'allowed'

  useImperativeHandle(
    apiRef,
    () => ({
      expand: () => setExpanded(true),
      collapse: () => setExpanded(false),
      focusComposer: () => setExpanded(true),
      getStatus: () => status,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- api surface
    [status, controlled],
  )

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
      data-tm-max-attachments={String(resolvedAttach)}
      data-tm-write={writeCapability}
      data-lab-ct01="true"
      data-lab-narrow={narrow ? 'true' : 'false'}
    >
      <IssueThreadBlock
        status={status}
        comments={comments}
        expanded={expanded}
        onViewDiscussion={() => setExpanded(true)}
        onRetry={onRetry}
        composerEntry={composerEntry}
        onComposerEntry={() => setExpanded(true)}
      />
    </div>
  )
}
