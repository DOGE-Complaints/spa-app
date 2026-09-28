import { useEffect, useId, useMemo, useState } from 'react'
import {
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
  mapSummaryMarksToEntries,
  resolveHarnessThr03Scene,
  toggleReactionSelection,
  REACTION_LAYERS,
} from './reactionsV1Catalog.js'
import './ReactionControls.css'

function labelFor(t, id) {
  return t(`threadsFeed.reactions.id.${id}`)
}

function layerLabel(t, layer) {
  return t(`threadsFeed.reactions.layer.${layer}`)
}

/**
 * Compact summary strip + reactions.v1 picker (M145).
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
  /**
   * Live persist (THR-09).
   * @type {((args: { reactionId: string, op: 'add'|'remove', target: string, commentId: string|null }) => Promise<object|void>)|undefined}
   */
  onReact,
}) {
  const scene = resolveHarnessThr03Scene('strip')
  const [open, setOpen] = useState(
    scene === 'picker' || scene === 'enabled-only' || scene === 'exclusive' || scene === 'keyboard',
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
  const count = aggregateState ?? (marks.length > 0 ? marks.reduce((n, m) => n + (Number(m.count) || 1), 0) : selected.length)

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

  return (
    <div
      className="reaction-controls"
      data-testid="reaction-controls"
      data-reaction-target={target}
      data-thr03-scene={scene}
      data-catalog={REACTIONS_CATALOG_ATTR}
      data-max-reactions={String(capacity)}
    >
      <div className="reaction-summary-strip" data-testid="reaction-summary-strip">
        <div className="reaction-summary-marks" aria-hidden={marks.length === 0}>
          {marks.map((entry) => (
            <span key={entry.id} className="reaction-summary-mark" data-reaction-id={entry.id}>
              <span className="reaction-emoji" aria-hidden="true">
                {entry.emoji}
              </span>
              <span className="reaction-summary-label">{labelFor(t, entry.id)}</span>
            </span>
          ))}
        </div>
        <span className="reaction-summary-count" data-testid="reaction-summary-count">
          {count}
        </span>
        <button
          type="button"
          className="reaction-open-button"
          data-testid="reaction-open-button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          disabled={busy}
        >
          <img src="/icons/threads-feed/ic-react.png" alt="" aria-hidden="true" />
          <span>{t('threadsFeed.reactions.react')}</span>
          <img
            className="reaction-open-chevron"
            src="/icons/public-home/ic-chevron-right.png"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      {open ? (
        <div
          id={panelId}
          className={`reaction-picker${scene === 'keyboard' ? ' reaction-picker--keyboard' : ''}`}
          data-testid="reaction-picker"
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
              {t('threadsFeed.reactions.close')}
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
                            <span className="reaction-emoji" aria-hidden="true">
                              {entry.emoji}
                            </span>
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
