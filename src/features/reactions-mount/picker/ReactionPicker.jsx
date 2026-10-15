import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { REACTION_LAYERS } from '../../feed/semantics/reactionsV1.js'
import { CR_REACTION_ICON_PACK } from '../icons/crReactionIcons.js'
import { CrReactionIcon } from '../icons/CrReactionIcon.jsx'
import { ReactionPickerLayerGroup } from './ReactionPickerLayerGroup.jsx'
import './ReactionPicker.css'

/**
 * CR-02/CR-05/CR-06/CR-10 ReactionPicker — desktop popover (M154 B) + mobile sheet (M154 C).
 * CR-10: desktop popover → createPortal(document.body) + position:fixed from zone-1 coords.
 * Sheet stays in-flow. CR-05 dismiss · CR-06 chrome held.
 */
export function ReactionPicker({
  open,
  panelId,
  surface = 'popover',
  target = 'comment',
  layers,
  selectedIds = [],
  capacity = 3,
  busy = false,
  exclusiveHint = false,
  capacityBlocked = false,
  saveError = false,
  icons = CR_REACTION_ICON_PACK,
  t = (k) => k,
  onSelect,
  onClose,
  anchorRef = null,
  popoverStyle = null,
}) {
  const rootRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function onKey(e) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        if (typeof onClose === 'function') onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // FR-CR-05.4 — pointer/click outside rm-reaction-picker closes (exclude strip anchor)
  useEffect(() => {
    if (!open) return undefined
    function onPointerDown(e) {
      const root = rootRef.current
      if (!root) return
      const targetNode = e.target
      if (!(targetNode instanceof Node)) return
      if (root.contains(targetNode)) return
      const anchor = anchorRef && 'current' in anchorRef ? anchorRef.current : null
      if (anchor instanceof Node && anchor.contains(targetNode)) return
      if (typeof onClose === 'function') onClose()
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [open, onClose, anchorRef])

  useEffect(() => {
    if (open && closeRef.current) closeRef.current.focus()
  }, [open])

  if (!open) return null

  const selectedCount = Array.isArray(selectedIds) ? selectedIds.length : 0
  const atCapacity = selectedCount >= capacity
  const layerEntries = REACTION_LAYERS.filter(
    (layer) => !(target === 'thread-root' && layer === 'moderation'),
  ).map((layer) => [layer, layers?.[layer] || []])

  const className = [
    'rm-picker',
    surface === 'sheet' ? 'rm-picker--sheet' : 'rm-picker--popover',
  ].join(' ')

  const closeLabel = t('threadsFeed.reactions.close')
  const rootHint =
    target === 'thread-root' ? (
      <p
        className="rm-picker__hint rm-picker__hint--footer"
        data-testid="rm-picker-root-scope-hint"
      >
        {t('threadsFeed.reactions.rootModerationHint')}
      </p>
    ) : null

  const usePortal = surface === 'popover' && typeof document !== 'undefined'
  const fixedStyle =
    usePortal && popoverStyle && typeof popoverStyle.top === 'number'
      ? {
          position: 'fixed',
          top: `${popoverStyle.top}px`,
          left: `${popoverStyle.left}px`,
        }
      : usePortal
        ? { position: 'fixed', top: '0px', left: '0px' }
        : undefined

  const node = (
    <div
      ref={rootRef}
      id={panelId}
      className={className}
      style={fixedStyle}
      data-testid="rm-reaction-picker"
      data-rm-picker-surface={surface}
      data-rm-picker-target={target}
      data-rm-portal={usePortal ? 'body' : 'inline'}
      data-lab-picker="m154"
      role="dialog"
      aria-modal={surface === 'sheet' ? 'true' : undefined}
      aria-label={t('threadsFeed.reactions.viewReactions')}
    >
      <div className="rm-picker__header">
        <div className="rm-picker__capacity-block">
          <p className="rm-picker__capacity" data-testid="rm-picker-capacity">
            {selectedCount} of {capacity} selected · {t('threadsFeed.reactions.chooseUpTo')}
          </p>
          {atCapacity || capacityBlocked ? (
            <p className="rm-picker__capacity-full" data-testid="rm-picker-capacity-full">
              {t('threadsFeed.reactions.capacityFull')}
            </p>
          ) : null}
        </div>
        <button
          ref={closeRef}
          type="button"
          className="rm-picker__close"
          data-testid="rm-picker-close"
          aria-label={closeLabel}
          title={closeLabel}
          onClick={() => {
            if (typeof onClose === 'function') onClose()
          }}
        >
          <CrReactionIcon src={icons.close || CR_REACTION_ICON_PACK.close} size={16} />
        </button>
      </div>

      {exclusiveHint ? (
        <p className="rm-picker__hint" data-testid="rm-picker-xor-hint">
          {t('threadsFeed.reactions.agreeDisagreeExclusive')}
        </p>
      ) : null}

      {saveError ? (
        <p className="rm-picker__error" data-testid="rm-picker-save-error" role="alert">
          {t('threadsFeed.reactions.saveError')}
        </p>
      ) : null}

      <div className="rm-picker__body" data-testid="rm-picker-body">
        {layerEntries.map(([layer, entries]) => (
          <ReactionPickerLayerGroup
            key={layer}
            layer={layer}
            title={t(`threadsFeed.reactions.layer.${layer}`)}
            entries={entries}
            selectedIds={selectedIds}
            busy={busy}
            icons={icons}
            labelFor={(id) => t(`threadsFeed.reactions.id.${id}`)}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* FR-CR-06.2 — root moderation hint after layers (footer) */}
      {rootHint}
    </div>
  )

  if (usePortal) {
    return createPortal(node, document.body)
  }
  return node
}

/**
 * Resolve popover vs sheet from viewport (mobile ≤640px → sheet).
 * @param {'auto'|'popover'|'sheet'} force
 */
export function resolvePickerSurface(force = 'auto') {
  if (force === 'popover' || force === 'sheet') return force
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'popover'
  return window.matchMedia('(max-width: 640px)').matches ? 'sheet' : 'popover'
}
