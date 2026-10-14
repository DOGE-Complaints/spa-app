import { useMemo, useState } from 'react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import { ReactionsMount } from '../ReactionsMount.jsx'
import { createFixtureAdapter, STRIP_STATE_FIXTURES } from '../adapters/FixtureAdapter.js'
import { createLiveAdapter } from '../adapters/LiveAdapter.js'
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

const STRIP_STATES = /** @type {const} */ (['populated', 'empty', 'loading', 'unavailable'])
const PICKER_SCENES = /** @type {const} */ ([
  'comment-desktop',
  'root-scope',
  'mobile-sheet',
  'xor',
  'save-error',
])

/**
 * CR-03 lab canvas for `#/lab/reactions`.
 * FixtureAdapter default · two hosts · strip + picker stands (CR-01/CR-02).
 * LiveAdapter optional (thin ThreadsSocialClient) — not default.
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
  const failAdapter = useMemo(
    () => createFixtureAdapter({ initialState: 'populated', target: 'comment', failNext: true }),
    [],
  )
  const liveAdapter = useMemo(
    () => createLiveAdapter({ issueId: '' }),
    [],
  )
  const [adapterMode, setAdapterMode] = useState(/** @type {'fixture'|'live'} */ ('fixture'))
  const [demoState, setDemoState] = useState(/** @type {keyof typeof STRIP_STATE_FIXTURES} */ ('populated'))
  const [pickerScene, setPickerScene] = useState(/** @type {(typeof PICKER_SCENES)[number]} */ ('comment-desktop'))
  const demoSnap = STRIP_STATE_FIXTURES[demoState]
  const activeRootOnReact = adapterMode === 'fixture' ? rootAdapter.onReact : liveAdapter.onReact
  const activeCommentOnReact =
    adapterMode === 'fixture' ? commentAdapter.onReact : liveAdapter.onReact

  return (
    <div
      className="rm-lab-canvas"
      data-testid="reactions-lab-canvas"
      data-lab-plane="reactions-mount"
      data-lab-visual-done="false"
      data-m155-oos="true"
      data-rm-adapter={adapterMode}
      data-rm-adapter-default="fixture"
      data-rm-picker-scene={pickerScene}
    >
      <header className="rm-lab-canvas__header">
        <h1 className="rm-lab-canvas__title" data-testid="rm-lab-title">
          {t('threadsFeed.reactions.lab.title')}
        </h1>
        <p className="rm-lab-canvas__meta" data-testid="rm-lab-meta">
          {t('threadsFeed.reactions.lab.meta')}
        </p>
        <div className="rm-lab-canvas__adapter" data-testid="rm-lab-adapter-toggle" role="group">
          <button
            type="button"
            data-testid="rm-lab-adapter-fixture"
            className={adapterMode === 'fixture' ? 'is-active' : undefined}
            aria-pressed={adapterMode === 'fixture'}
            onClick={() => setAdapterMode('fixture')}
          >
            {t('threadsFeed.reactions.lab.adapterFixture')}
          </button>
          <button
            type="button"
            data-testid="rm-lab-adapter-live"
            className={adapterMode === 'live' ? 'is-active' : undefined}
            aria-pressed={adapterMode === 'live'}
            onClick={() => setAdapterMode('live')}
          >
            {t('threadsFeed.reactions.lab.adapterLive')}
          </button>
        </div>
      </header>

      <section
        className="rm-lab-canvas__section"
        data-testid="rm-lab-strip-states"
        aria-label="Strip states"
      >
        <h2>Strip states (M154 A)</h2>
        <div className="rm-lab-canvas__state-tabs" role="tablist">
          {STRIP_STATES.map((s) => (
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
              onReact={activeRootOnReact}
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
        <h2>Hosts — root vs comment (AC-24-06)</h2>
        <div className="rm-lab-canvas__hosts">
          <div className="rm-lab-canvas__card" data-testid="rm-lab-host-root">
            <h3 data-testid="rm-lab-host-root-label">
              {t('threadsFeed.reactions.lab.hostRoot')}
            </h3>
            <p className="rm-lab-canvas__hint">Moderation absent · Emotional + Epistemic</p>
            <ReactionsMount
              target="thread-root"
              density="compact"
              stripStatus="ready"
              summaryMarks={STRIP_STATE_FIXTURES.populated.summaryMarks}
              aggregateCount={STRIP_STATE_FIXTURES.populated.aggregateCount}
              selected={['support']}
              t={t}
              onReact={activeRootOnReact}
            />
          </div>
          <div className="rm-lab-canvas__card" data-testid="rm-lab-host-comment">
            <h3 data-testid="rm-lab-host-comment-label">
              {t('threadsFeed.reactions.lab.hostComment')}
            </h3>
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
              onReact={activeCommentOnReact}
            />
          </div>
        </div>
      </section>

      <section
        className="rm-lab-canvas__section"
        data-testid="rm-lab-picker-scenes"
        aria-label="Picker scenes M154 B-E"
      >
        <h2>Picker scenes (M154 B–E)</h2>
        <div className="rm-lab-canvas__state-tabs" role="tablist">
          {PICKER_SCENES.map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={pickerScene === s}
              data-testid={`rm-lab-picker-scene-${s}`}
              className={pickerScene === s ? 'is-active' : undefined}
              onClick={() => {
                if (s === 'save-error') failAdapter.setFailNext(true)
                setPickerScene(s)
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div
          className="rm-lab-canvas__card rm-lab-canvas__card--picker"
          data-testid="rm-lab-picker-card"
          data-rm-picker-scene={pickerScene}
        >
          {pickerScene === 'comment-desktop' ? (
            <>
              <p className="rm-lab-canvas__issue">
                Comment: I can help coordinate a shared pet-care group for neighbours.
              </p>
              <ReactionsMount
                key="picker-comment-desktop"
                target="comment"
                commentId="lab-comment-picker"
                density="compact"
                slot={REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE}
                stripStatus="ready"
                summaryMarks={[
                  { reaction_id: 'empathy', count: 2 },
                  { reaction_id: 'agree', count: 1 },
                ]}
                aggregateCount={3}
                selected={['agree']}
                defaultOpen
                forcePickerSurface="popover"
                t={t}
                onReact={commentAdapter.onReact}
              />
            </>
          ) : null}

          {pickerScene === 'root-scope' ? (
            <>
              <p className="rm-lab-canvas__issue">Thread root — no selectable Moderation.</p>
              <ReactionsMount
                key="picker-root-scope"
                target="thread-root"
                density="compact"
                stripStatus="ready"
                summaryMarks={STRIP_STATE_FIXTURES.populated.summaryMarks}
                aggregateCount={STRIP_STATE_FIXTURES.populated.aggregateCount}
                selected={['support']}
                defaultOpen
                forcePickerSurface="popover"
                t={t}
                onReact={rootAdapter.onReact}
              />
            </>
          ) : null}

          {pickerScene === 'mobile-sheet' ? (
            <>
              <p className="rm-lab-canvas__issue">Mobile sheet surface (forced · M154 C).</p>
              <ReactionsMount
                key="picker-mobile-sheet"
                target="comment"
                commentId="lab-comment-mobile"
                density="compact"
                slot={REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE}
                stripStatus="ready"
                summaryMarks={[{ reaction_id: 'acknowledge', count: 1 }]}
                aggregateCount={1}
                selected={[]}
                defaultOpen
                forcePickerSurface="sheet"
                t={t}
                onReact={commentAdapter.onReact}
              />
            </>
          ) : null}

          {pickerScene === 'xor' ? (
            <>
              <p className="rm-lab-canvas__issue">
                Agree selected → choose Disagree → XOR (M154 D).
              </p>
              <ReactionsMount
                key="picker-xor"
                target="comment"
                commentId="lab-comment-xor"
                density="compact"
                slot={REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE}
                stripStatus="ready"
                summaryMarks={[{ reaction_id: 'agree', count: 1 }]}
                aggregateCount={1}
                selected={['agree', 'support']}
                defaultOpen
                forcePickerSurface="popover"
                t={t}
                onReact={commentAdapter.onReact}
              />
            </>
          ) : null}

          {pickerScene === 'save-error' ? (
            <>
              <p className="rm-lab-canvas__issue">
                Next save fails → previous selection restored (M154 E).
              </p>
              <ReactionsMount
                key="picker-save-error"
                target="comment"
                commentId="lab-comment-save-err"
                density="compact"
                slot={REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE}
                stripStatus="ready"
                summaryMarks={[{ reaction_id: 'support', count: 1 }]}
                aggregateCount={1}
                selected={['support']}
                defaultOpen
                forcePickerSurface="popover"
                t={t}
                onReact={failAdapter.onReact}
              />
            </>
          ) : null}
        </div>
      </section>
    </div>
  )
}
