import { useEffect, useMemo, useState } from 'react'
import {
  ThreadMount,
  createFixtureAdapter,
  THREAD_STATE_FIXTURES,
} from '../../../thread-mount/index.js'

/**
 * Map lab feed fixture comments → ThreadMount nodes (body-only · no invent Identity).
 * @param {Array<{ id?: string, body?: string }>|null|undefined} comments
 */
export function mapLabCommentsToThread(comments) {
  if (!Array.isArray(comments)) return []
  return comments
    .map((c, i) => ({
      id: c?.id || `lab-tm-${i}`,
      parentId: null,
      depth: 0,
      body: typeof c?.body === 'string' ? c.body : '',
    }))
    .filter((c) => c.body)
}

/**
 * Thin feed-lab host for ThreadMount (CT-01/CT-02).
 * CT-02: Comment zone → apiRef · flush under strip.
 *
 * @param {'loading'|'empty'|'populated'|'unavailable'|null} [status]
 * @param {Array} [comments] lab fixture comments (when set, drives status/bodies)
 * @param {import('react').Ref} [apiRef]
 */
export function FeedLabThreadMount({
  status = null,
  comments = null,
  narrow = false,
  apiRef = null,
  initiallyExpanded = false,
}) {
  const fromComments = comments != null
  const mapped = useMemo(() => mapLabCommentsToThread(comments), [comments])
  const derivedStatus = fromComments
    ? mapped.length > 0
      ? 'populated'
      : 'empty'
    : status || 'populated'

  const adapter = useMemo(() => createFixtureAdapter(derivedStatus), [derivedStatus])
  const fixture = THREAD_STATE_FIXTURES[derivedStatus] || THREAD_STATE_FIXTURES.populated
  const [snap, setSnap] = useState(() =>
    fromComments
      ? { status: derivedStatus, comments: mapped, writeCapability: 'allowed' }
      : adapter.snapshot(),
  )
  const [expanded, setExpanded] = useState(Boolean(initiallyExpanded))

  useEffect(() => {
    if (fromComments) {
      setSnap({ status: derivedStatus, comments: mapped, writeCapability: 'allowed' })
    }
  }, [fromComments, derivedStatus, mapped])

  return (
    <div
      className="feed-lab-thread-mount"
      data-testid="feed-lab-thread-mount"
      data-lab-ct01="true"
      data-lab-ct02="true"
      data-lab-thread-host="fixture"
      data-lab-thread-flush="true"
    >
      <ThreadMount
        status={snap.status}
        comments={snap.comments}
        writeCapability={fromComments ? 'allowed' : fixture.writeCapability}
        expanded={expanded}
        onExpandedChange={setExpanded}
        narrow={narrow}
        apiRef={apiRef}
        onRetry={() => {
          if (fromComments) return
          adapter.retry().then((next) => setSnap(next))
        }}
      />
    </div>
  )
}
