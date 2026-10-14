import { useMemo, useState } from 'react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import { ReactionsMount } from '../ReactionsMount.jsx'
import { createFixtureAdapter, STRIP_STATE_FIXTURES } from '../adapters/FixtureAdapter.js'
import {
  POST_ACTION_STRIP_ZONES,
  REACTIONS_MOUNT_SLOT_KINDS,
} from '../slot/postActionStripSlot.js'
import './ReactionsLabCanvas.css'

function makeT(dict) {
  return (key) => {
    const parts = String(key).split('.')
    let cur = dict
    for (const p of parts) {
      if (cur == null || typeof cur !== 'object') return key
      cur = cur[p]
    }
    return typeof cur === 'string' ? cur : key
  }
}

const STATES = /** @type {const} */ (['populated', 'empty', 'loading', 'unavailable'])

/**
 * CR-01 lab canvas for `#/lab/reactions` — strip states + root/comment hosts.
 * Full lab polish → CR-03. No `#/next/feed` cutover. M155 OOS.
 */
export function ReactionsLabCanvas() {
  const t = useMemo(() => makeT(THREADS_FEED_DICTIONARY_EN), [])
  const rootAdapter = useMemo(
    () => createFixtureAdapter({ initialState: 'populated', target: 'thread-root' }),
    [],
  )
  const commentAdapter = useMemo(
    () => createFixtureAdapter({ initialState: 'populated', target: 'comment' }),
    [],
  )
  const [demoState, setDemoState] = useState(/** @type {keyof typeof STRIP_STATE_FIXTURES} */ ('populated'))
  const demoSnap = STRIP_STATE_FIXTURES[demoState]

  return (
    <div
      className="rm-lab-canvas"
      data-testid="reactions-lab-canvas"
      data-lab-plane="reactions-mount"
      data-lab-visual-done="false"
      data-m155-oos="true"
    >
      <header className="rm-lab-canvas__header">
        <h1 className="rm-lab-canvas__title">Reactions mount lab (CR-01)</h1>
        <p className="rm-lab-canvas__meta">
          Greenfield <code>features/reactions-mount/</code> · M154 strip · FixtureAdapter · Path A
          visual pending OP eye
        </p>
      </header>

      <section
        className="rm-lab-canvas__section"
        data-testid="rm-lab-strip-states"
        aria-label="Strip states"
      >
        <h2>Strip states (M154 A)</h2>
        <div className="rm-lab-canvas__state-tabs" role="tablist">
          {STATES.map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={demoState === s}
              data-testid={`rm-lab-state-${s}`}
              className={demoState === s ? 'is-active' : undefined}
              onClick={() => setDemoState(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div
          className="rm-lab-canvas__card"
          data-testid="rm-lab-demo-card"
          data-rm-demo-state={demoState}
        >
          <p className="rm-lab-canvas__issue">
            Civic Issue context — reaction slot only changes below. Comment/Issue text stays intact.
          </p>
          <div className="rm-lab-canvas__strip-row" data-testid="rm-lab-post-action-contract">
            <span className="rm-lab-canvas__zones" aria-label="PostActionStrip zones">
              {POST_ACTION_STRIP_ZONES.map((z) => (
                <span key={z} data-zone={z}>
                  {z}
                </span>
              ))}
            </span>
            <ReactionsMount
              key={`demo-${demoState}`}
              target="thread-root"
              density="compact"
              slot={REACTIONS_MOUNT_SLOT_KINDS.POST_ACTION_STRIP}
              stripStatus={demoSnap.stripStatus}
              summaryMarks={demoSnap.summaryMarks}
              aggregateCount={demoSnap.aggregateCount}
              selected={demoSnap.selected}
              t={t}
              onReact={rootAdapter.onReact}
              onRetry={() => setDemoState('populated')}
              onAggregateActivate={rootAdapter.onAggregateActivate}
            />
          </div>
        </div>
      </section>

      <section
        className="rm-lab-canvas__section"
        data-testid="rm-lab-hosts"
        aria-label="Root and comment hosts"
      >
        <h2>Hosts — root vs comment (same package)</h2>
        <div className="rm-lab-canvas__hosts">
          <div className="rm-lab-canvas__card" data-testid="rm-lab-host-root">
            <h3>Thread root</h3>
            <p className="rm-lab-canvas__hint">Moderation absent · Emotional + Epistemic</p>
            <ReactionsMount
              target="thread-root"
              density="compact"
              stripStatus="ready"
              summaryMarks={STRIP_STATE_FIXTURES.populated.summaryMarks}
              aggregateCount={STRIP_STATE_FIXTURES.populated.aggregateCount}
              selected={['support']}
              t={t}
              onReact={rootAdapter.onReact}
            />
          </div>
          <div className="rm-lab-canvas__card" data-testid="rm-lab-host-comment">
            <h3>Comment node</h3>
            <p className="rm-lab-canvas__hint">
              Same package + config · moderation eligible · slot=comment-node
            </p>
            <ReactionsMount
              target="comment"
              density="compact"
              commentId="lab-comment-1"
              slot={REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE}
              stripStatus="ready"
              summaryMarks={[
                { reaction_id: 'empathy', count: 2 },
                { reaction_id: 'agree', count: 1 },
              ]}
              aggregateCount={3}
              selected={['agree']}
              t={t}
              onReact={commentAdapter.onReact}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
