import { useMemo, useState } from 'react'
import {
  ThreadMount,
  createFixtureAdapter,
  THREAD_STATE_FIXTURES,
} from '../../../thread-mount/index.js'

/**
 * Thin feed-lab host for ThreadMount (CT-01).
 * Full `#/lab/feed` cutover → CT-08. Here: fixture status stand for composition tests.
 *
 * @param {'loading'|'empty'|'populated'|'unavailable'} [status]
 */
export function FeedLabThreadMount({
  status = 'populated',
  narrow = false,
  apiRef = null,
}) {
  const adapter = useMemo(() => createFixtureAdapter(status), [status])
  const fixture = THREAD_STATE_FIXTURES[status] || THREAD_STATE_FIXTURES.populated
  const [snap, setSnap] = useState(() => adapter.snapshot())
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      data-testid="feed-lab-thread-mount"
      data-lab-ct01="true"
      data-lab-thread-host="fixture"
    >
      <ThreadMount
        status={snap.status}
        comments={snap.comments}
        writeCapability={fixture.writeCapability}
        expanded={expanded}
        onExpandedChange={setExpanded}
        narrow={narrow}
        apiRef={apiRef}
        onRetry={() => {
          adapter.retry().then((next) => setSnap(next))
        }}
      />
    </div>
  )
}
