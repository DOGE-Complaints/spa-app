import { useEffect, useId, useMemo, useState } from 'react'
import {
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
  mapSummaryMarksToEntries,
  resolveHarnessThr03Scene,
  toggleReactionSelection,
  REACTION_LAYERS,
} from './reactionsV1Catalog.js'
import { THREADS_FEED_THREAD_ICONS } from './threadIcons.js'
import './ReactionControls.css'

function labelFor(t, id) {
  return t(`threadsFeed.reactions.id.${id}`)
}

function layerLabel(t, layer) {
  return t(`threadsFeed.reactions.layer.${layer}`)
}

function reactionMarkVisual(entry, icons) {
  const src = icons && icons[entry.id]
  if (src) {
    return <img className="reaction-mark-icon" src={src} alt="" aria-hidden="true" />
  }
  return (
    <span className="reaction-emoji" aria-hidden="true">
      {entry.emoji}
    </span>
  )
}

/**
 * Compact summary strip + reactions.v1 picker (M145 / M154).
 * THR-09: optional onReact → Closed PUT; knobs enable/capacity.
 */
export function ReactionControls({
  t,
  target = 'comment',
  initialSelected = [],
  summaryMarks = null,
  aggregateCount = null,
  commentId = null,
  maxReactions = DEFAULT_MAX_REACTIONS_PER_ACTOR,
  reactionsEnable = null,
  iconPack = null,
  /**
   * Live persist (THR-09).
   * @type {((args: { reactionId: string, op: 'add'|'remove', target: string, commentId: string|null }) => Promise<object|void>)|undefined}
   */
  onReact,
  /** Extra class on root (feed presentation). */
  className = '',
  /** M154 empty honesty: omit theatrical zero when no marks. */
  hideZeroCount = false,
  /** `sheet` = mobile bottom-sheet chrome (feed M154). */
  pickerVariant = 'default',
  /** Increment / change to force-open picker (civic strip bridge). */
  openSignal = 0,
}) {
  const icons = iconPack || THREADS_FEED_THREAD_ICONS
  const scene = resolveHarnessThr03Scene('strip')
  const [open, setOpen] = useState(
    scene === 'picker' ||
      scene === 'enabled-only' ||
      scene === 'exclusive' ||
      scene === 'keyboard' ||
      scene === 'mobile',
  )
  const [selected, setSelected] = useState(() => {
    if (scene === 'exclusive') return ['agree']
    return initialSelected
  })
  const [marksState, setMarksState] = useState(() => mapSummaryMarksToEntries(summaryMarks))
  const [aggregateState, setAggregateState] = useState(
    aggregateCount === null || aggregateCount === undefined ? null : Number(aggregateCount),
  )
  const [exclusiveHint, setExclusiveHint] = useState(scene === 'exclusive')
  const [busy, setBusy] = useState(false)
  const panelId = useId()

  useEffect(() => {
    setMarksState(mapSummaryMarksToEntries(summaryMarks))
    setAggregateState(
      aggregateCount === null || aggregateCount === undefined ? null : Number(aggregateCount),
    )
  }, [summaryMarks, aggregateCount])

  useEffect(() => {
    if (openSignal) setOpen(true)
  }, [openSignal])

  const capacity = Number.isFinite(Number(maxReactions)) && Number(maxReactions) > 0
    ? Math.floor(Number(maxReactions))
    : DEFAULT_MAX_REACTIONS_PER_ACTOR

  const enabled = useMemo(
    () =>
      listReactionsV1({
        target,
        includeDisabled: false,
        reactionsEnable,
      }),
    [target, reactionsEnable],
  )
  const showDisabledNote = scene === 'enabled-only'

  const marks = marksState || []
  const count =
    aggregateState ??
    (marks.length > 0 ? marks.reduce((n, m) => n + (Number(m.count) || 1), 0) : selected.length)
  const showCount = !(hideZeroCount && (!count || count === 0) && marks.length === 0)

  async function handleSelect(id) {
    if (busy) return
    const before = selected
    const { selected: next, error } = toggleReactionSelection(before, id, capacity)
    if (error === 'unknown-id' || error === 'capacity') return
    if (
      (id === 'agree' && before.includes('disagree')) ||
      (id === 'disagree' && before.includes('agree'))
    ) {
      setExclusiveHint(true)
    }

    if (typeof onReact !== 'function') {
      setSelected(next)
      return
    }

    const op = before.includes(id) ? 'remove' : 'add'
    setBusy(true)
    try {
      const result = await onReact({
        reactionId: id,
        op,
        target,
        commentId: target === 'thread-root' ? null : commentId,
      })
      if (result && result.status === 'ok' && result.data) {
        const data = result.data
        if (Array.isArray(data.selected)) {
          setSelected(data.selected.map(String))
        } else {
          setSelected(next)
        }
        const mapped = mapSummaryMarksToEntries(
          /** @type {Array<{ reaction_id?: string, count?: number }>} */ (data.summary_marks),
        )
        if (mapped) setMarksState(mapped)
        if (data.aggregate_count !== undefined && data.aggregate_count !== null) {
          setAggregateState(Number(data.aggregate_count))
        }
        return
      }
      if (result && result.status === 'fail' && result.failKind === 'verify') {
        return
      }
      // Soft-fail: keep prior selection
    } catch {
      // keep prior
    } finally {
      setBusy(false)
    }
  }

  const rootClass = ['reaction-controls', className].filter(Boolean).join(' ')
  const pickerClass = [
    'reaction-picker',
    scene === 'keyboard' ? 'reaction-picker--keyboard' : '',
    pickerVariant === 'sheet' ? 'reaction-picker--sheet' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={rootClass}
      data-testid="reaction-controls"
      data-reaction-target={target}
      data-thr03-scene={scene}
      data-catalog={REACTIONS_CATALOG_ATTR}
      data-max-reactions={String(capacity)}
      data-picker-variant={pickerVariant}
    >
      <div className="reaction-summary-strip" data-testid="reaction-summary-strip">
        <div className="reaction-summary-marks" aria-hidden={marks.length === 0}>
          {marks.map((entry) => (
            <span key={entry.id} className="reaction-summary-mark" data-reaction-id={entry.id}>
              {reactionMarkVisual(entry, icons)}
              <span className="reaction-summary-label">{labelFor(t, entry.id)}</span>
            </span>
          ))}
        </div>
        {showCount ? (
          <span className="reaction-summary-count" data-testid="reaction-summary-count">
            {count}
          </span>
        ) : null}
        <button
          type="button"
          className="reaction-open-button"
          data-testid="reaction-open-button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          disabled={busy}
        >
          <img src={icons.react} alt="" aria-hidden="true" />
          <span>{t('threadsFeed.reactions.react')}</span>
          <img
            className="reaction-open-chevron"
            src={icons.chevronDown || '/icons/public-home/ic-chevron-right.png'}
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      {open ? (
        <div
          id={panelId}
          className={pickerClass}
          data-testid="reaction-picker"
          data-presentation={pickerVariant === 'sheet' ? 'm154-sheet' : 'm154-picker'}
          role="dialog"
          aria-label={t('threadsFeed.reactions.viewReactions')}
        >
          <div className="reaction-picker-header">
            <p className="reaction-picker-capacity">{t('threadsFeed.reactions.chooseUpTo')}</p>
            <button
              type="button"
              className="reaction-picker-close"
              data-testid="reaction-picker-close"
              onClick={() => setOpen(false)}
            >
              {icons.close ? (
                <img src={icons.close} alt="" aria-hidden="true" />
              ) : null}
              <span>{t('threadsFeed.reactions.close')}</span>
            </button>
          </div>
          {showDisabledNote ? (
            <p className="reaction-picker-helper" data-testid="reaction-enabled-only-helper">
              {t('threadsFeed.reactions.enabledOnlyHelper')}
            </p>
          ) : null}
          {exclusiveHint ? (
            <p className="reaction-picker-exclusive" data-testid="reaction-agree-disagree-hint" role="status">
              {t('threadsFeed.reactions.agreeDisagreeExclusive')}
            </p>
          ) : null}
          {REACTION_LAYERS.filter((layer) => !(target === 'thread-root' && layer === 'moderation')).map(
            (layer) => {
              const items = enabled.filter((e) => e.layer === layer)
              if (items.length === 0) return null
              return (
                <section
                  key={layer}
                  className="reaction-picker-layer"
                  data-testid={`reaction-layer-${layer}`}
                  aria-label={layerLabel(t, layer)}
                >
                  <h3 className="reaction-picker-layer-title">{layerLabel(t, layer)}</h3>
                  <ul className="reaction-picker-list" role="list">
                    {items.map((entry) => {
                      const isOn = selected.includes(entry.id)
                      return (
                        <li key={entry.id}>
                          <button
                            type="button"
                            className={`reaction-choice${isOn ? ' reaction-choice--selected' : ''}${
                              scene === 'keyboard' && entry.id === 'acknowledge' ? ' reaction-choice--focus' : ''
                            }`}
                            data-testid={`reaction-choice-${entry.id}`}
                            data-reaction-id={entry.id}
                            aria-pressed={isOn}
                            disabled={busy}
                            onClick={() => {
                              void handleSelect(entry.id)
                            }}
                          >
                            {reactionMarkVisual(entry, icons)}
                            <span>{labelFor(t, entry.id)}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            },
          )}
          {/* Ensure disabled ids never rendered as choices */}
          <span className="visually-hidden" data-testid="reaction-catalog-version">
            reactions.v1
          </span>
        </div>
      ) : null}
    </div>
  )
}

const REACTIONS_CATALOG_ATTR = 'reactions.v1'
