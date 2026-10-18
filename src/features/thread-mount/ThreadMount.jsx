import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { IssueThreadBlock } from './IssueThreadBlock.jsx'
import {
  DEFAULT_MAX_ATTACHMENTS,
  DEFAULT_MAX_DEPTH,
  resolveMaxAttachments,
  resolveMaxDepth,
} from './config/threadMountConfig.js'
import './ThreadMount.css'

/**
 * CT-01/CT-02 ThreadMount — status chrome + apiRef { expand, focusComposer }.
 * Hold reactions-mount apiRef pattern for host Comment zone.
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
  const [focusSignal, setFocusSignal] = useState(0)
  const composerEntryRef = useRef(null)
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
    if (!focusSignal) return undefined
    const id = requestAnimationFrame(() => {
      composerEntryRef.current?.focus?.()
    })
    return () => cancelAnimationFrame(id)
  }, [focusSignal])

  const resolvedDepth = resolveMaxDepth(maxDepth)
  const resolvedAttach = resolveMaxAttachments(maxAttachments)
  const composerEntry = writeCapability === 'allowed'

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
      data-lab-ct02="true"
      data-lab-narrow={narrow ? 'true' : 'false'}
      data-tm-focus-signal={String(focusSignal)}
    >
      <IssueThreadBlock
        status={status}
        comments={comments}
        expanded={expanded}
        onViewDiscussion={() => setExpanded(true)}
        onRetry={onRetry}
        composerEntry={composerEntry}
        onComposerEntry={() => {
          setExpanded(true)
          setFocusSignal((n) => n + 1)
        }}
        composerEntryRef={composerEntryRef}
      />
    </div>
  )
}
