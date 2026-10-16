import { useEffect, useMemo, useRef, useState } from 'react'
import { THREADS_FEED_DICTIONARY_BY_LOCALE } from '../../../i18n/threadsFeedDictionary.js'
import { setThemeAttribute } from '../../../theme/bootTheme.js'
import { FeedPostActionStrip } from '../../feed-lab/post/FeedPostActionStrip.jsx'
import { ReactionsMount } from '../ReactionsMount.jsx'
import { createFixtureAdapter, STRIP_STATE_FIXTURES } from '../adapters/FixtureAdapter.js'
import { createLiveAdapter } from '../adapters/LiveAdapter.js'
import {
  POST_ACTION_STRIP_ZONES,
  REACTIONS_MOUNT_SLOT_KINDS,
} from '../slot/postActionStripSlot.js'
import './ReactionsLabCanvas.css'

/**
 * CR-15 — M154 composition stand for `#/lab/reactions`:
 * 4-zone FeedPostActionStrip + React-always + aggregate-below + optional tile picker.
 * FixtureAdapter only · Gap v2 residual · no invent HTTP/M155.
 */
function Cr15CompositionStand({
  t,
  locale,
  adapter,
  snap,
  defaultOpen = false,
  testId = 'rm-lab-cr15-composition',
}) {
  const [aggregateHost, setAggregateHost] = useState(null)
  const apiRef = useRef(null)

  return (
    <div
      className="rm-lab-canvas__card"
      data-testid={testId}
      data-lab-cr15-wire="true"
      data-lab-strip-composition="four-zone"
      data-lab-aggregate="below"
      data-lab-picker-default-open={defaultOpen ? 'true' : 'false'}
    >
      <p className="rm-lab-canvas__issue">
        CR-15 M154 wire — four-zone strip · React-always · aggregate below · FixtureAdapter
        {defaultOpen ? ' · picker open (tiles + accents)' : ''}.
      </p>
      <FeedPostActionStrip
        onZone={(zoneId) => {
          if (zoneId === 'reactions') apiRef.current?.activateAggregate?.()
        }}
        reactSlot={
          <ReactionsMount
            key={`cr15-${testId}-${locale}-${defaultOpen ? 'open' : 'closed'}`}
            target="thread-root"
            density="compact"
            slot={REACTIONS_MOUNT_SLOT_KINDS.POST_ACTION_STRIP}
            stripStatus={snap.stripStatus}
            summaryMarks={snap.summaryMarks}
            aggregateCount={snap.aggregateCount}
            selected={snap.selected}
            t={t}
            onReact={adapter.onReact}
            onAggregateActivate={adapter.onAggregateActivate}
            aggregatePlacement="below"
            aggregateHost={aggregateHost}
            apiRef={apiRef}
            reactAlways
            defaultOpen={defaultOpen}
            forcePickerSurface={defaultOpen ? 'popover' : 'auto'}
          />
        }
      />
      <div
        ref={setAggregateHost}
        className="rm-lab-canvas__aggregate-host"
        data-testid={`${testId}-aggregate-host`}
        data-lab-aggregate-host="true"
      />
    </div>
  )
}

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

const LOCALES = /** @type {const} */ (['en', 'et', 'ru'])
const THEMES = /** @type {const} */ (['light', 'dark'])
const VIEWPORTS = /** @type {const} */ (['desktop', '320'])
const TEXT_ZOOMS = /** @type {const} */ (['100', '200'])
const STRIP_STATES = /** @type {const} */ (['populated', 'empty', 'loading', 'unavailable'])
const PICKER_SCENES = /** @type {const} */ ([
  'comment-desktop',
  'root-scope',
  'mobile-sheet',
  'xor',
  'save-error',
])

/**
 * CR-03/CR-04 lab canvas for `#/lab/reactions`.
 * CR-15: M154 composition stands (CR-11…14 wire) · FixtureAdapter default · M160 stress.
 */
export function ReactionsLabCanvas() {
  const [locale, setLocale] = useState(/** @type {(typeof LOCALES)[number]} */ ('en'))
  const [theme, setTheme] = useState(/** @type {(typeof THEMES)[number]} */ ('light'))
  const [viewport, setViewport] = useState(/** @type {(typeof VIEWPORTS)[number]} */ ('desktop'))
  const [textZoom, setTextZoom] = useState(/** @type {(typeof TEXT_ZOOMS)[number]} */ ('100'))
  const dict = THREADS_FEED_DICTIONARY_BY_LOCALE[locale] || THREADS_FEED_DICTIONARY_BY_LOCALE.en
  const t = useMemo(() => makeT(dict), [dict])
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
  const liveAdapter = useMemo(() => createLiveAdapter({ issueId: '' }), [])
  const [adapterMode, setAdapterMode] = useState(/** @type {'fixture'|'live'} */ ('fixture'))
  const [demoState, setDemoState] = useState(
    /** @type {keyof typeof STRIP_STATE_FIXTURES} */ ('populated'),
  )
  const [pickerScene, setPickerScene] = useState(
    /** @type {(typeof PICKER_SCENES)[number]} */ ('comment-desktop'),
  )
  const demoSnap = STRIP_STATE_FIXTURES[demoState]
  const activeRootOnReact = adapterMode === 'fixture' ? rootAdapter.onReact : liveAdapter.onReact
  const activeCommentOnReact =
    adapterMode === 'fixture' ? commentAdapter.onReact : liveAdapter.onReact

  useEffect(() => {
    setThemeAttribute(theme, document, { persist: false })
  }, [theme])

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
      data-lab-locale={locale}
      data-lab-theme={theme}
      data-lab-viewport={viewport}
      data-lab-text-zoom={textZoom}
      data-lab-stress="m160"
      data-lab-cr15-wire="true"
    >
      <header className="rm-lab-canvas__header">
        <h1 className="rm-lab-canvas__title" data-testid="rm-lab-title">
          {t('threadsFeed.reactions.lab.title')}
        </h1>
        <p className="rm-lab-canvas__meta" data-testid="rm-lab-meta">
          {t('threadsFeed.reactions.lab.meta')}
        </p>

        <div
          className="rm-lab-canvas__stress"
          data-testid="rm-lab-stress-controls"
          aria-label="M160 stress"
        >
          <div className="rm-lab-canvas__stress-row" role="group" aria-label={t('threadsFeed.reactions.lab.stressLocale')}>
            <span className="rm-lab-canvas__stress-label">{t('threadsFeed.reactions.lab.stressLocale')}</span>
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                data-testid={`rm-lab-locale-${code}`}
                className={locale === code ? 'is-active' : undefined}
                aria-pressed={locale === code}
                onClick={() => setLocale(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="rm-lab-canvas__stress-row" role="group" aria-label={t('threadsFeed.reactions.lab.stressTheme')}>
            <span className="rm-lab-canvas__stress-label">{t('threadsFeed.reactions.lab.stressTheme')}</span>
            {THEMES.map((name) => (
              <button
                key={name}
                type="button"
                data-testid={`rm-lab-theme-${name}`}
                className={theme === name ? 'is-active' : undefined}
                aria-pressed={theme === name}
                onClick={() => setTheme(name)}
              >
                {t(`threadsFeed.reactions.lab.${name}`)}
              </button>
            ))}
          </div>
          <div className="rm-lab-canvas__stress-row" role="group" aria-label={t('threadsFeed.reactions.lab.stressViewport')}>
            <span className="rm-lab-canvas__stress-label">{t('threadsFeed.reactions.lab.stressViewport')}</span>
            <button
              type="button"
              data-testid="rm-lab-viewport-desktop"
              className={viewport === 'desktop' ? 'is-active' : undefined}
              aria-pressed={viewport === 'desktop'}
              onClick={() => setViewport('desktop')}
            >
              {t('threadsFeed.reactions.lab.viewportDesktop')}
            </button>
            <button
              type="button"
              data-testid="rm-lab-viewport-320"
              className={viewport === '320' ? 'is-active' : undefined}
              aria-pressed={viewport === '320'}
              onClick={() => setViewport('320')}
            >
              {t('threadsFeed.reactions.lab.viewportNarrow')}
            </button>
          </div>
          <div className="rm-lab-canvas__stress-row" role="group" aria-label={t('threadsFeed.reactions.lab.stressTextZoom')}>
            <span className="rm-lab-canvas__stress-label">{t('threadsFeed.reactions.lab.stressTextZoom')}</span>
            <button
              type="button"
              data-testid="rm-lab-text-100"
              className={textZoom === '100' ? 'is-active' : undefined}
              aria-pressed={textZoom === '100'}
              onClick={() => setTextZoom('100')}
            >
              {t('threadsFeed.reactions.lab.textNormal')}
            </button>
            <button
              type="button"
              data-testid="rm-lab-text-200"
              className={textZoom === '200' ? 'is-active' : undefined}
              aria-pressed={textZoom === '200'}
              onClick={() => setTextZoom('200')}
            >
              {t('threadsFeed.reactions.lab.textZoom')}
            </button>
          </div>
        </div>

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
        data-testid="rm-lab-cr15-wire"
        aria-label="CR-15 M154 composition wire"
      >
        <h2>CR-15 — M154 composition (CR-11…14 wire)</h2>
        <Cr15CompositionStand
          t={t}
          locale={locale}
          adapter={rootAdapter}
          snap={STRIP_STATE_FIXTURES.populated}
          testId="rm-lab-cr15-composition"
        />
        <Cr15CompositionStand
          t={t}
          locale={locale}
          adapter={rootAdapter}
          snap={STRIP_STATE_FIXTURES.populated}
          defaultOpen
          testId="rm-lab-cr15-picker"
        />
      </section>

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
              key={`demo-${demoState}-${locale}`}
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
              key={`host-root-${locale}`}
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
              key={`host-comment-${locale}`}
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
                key={`picker-comment-desktop-${locale}`}
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
                key={`picker-root-scope-${locale}`}
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
                key={`picker-mobile-sheet-${locale}`}
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
                key={`picker-xor-${locale}`}
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
                key={`picker-save-error-${locale}`}
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
