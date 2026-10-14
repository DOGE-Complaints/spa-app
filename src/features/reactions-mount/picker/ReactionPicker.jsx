import { useEffect, useRef } from 'react'
import { REACTION_LAYERS } from '../../feed/semantics/reactionsV1.js'
import { CR_REACTION_ICON_PACK } from '../icons/crReactionIcons.js'
import { ReactionPickerLayerGroup } from './ReactionPickerLayerGroup.jsx'
import './ReactionPicker.css'

/**
 * CR-02 ReactionPicker — desktop popover (M154 B) + mobile sheet (M154 C).
 * Groups: Emotional / Epistemic / Moderation (comment only). Root: no selectable Moderation.
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
}) {
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

  return (
    <div
      id={panelId}
      className={className}
      data-testid="rm-reaction-picker"
      data-rm-picker-surface={surface}
      data-rm-picker-target={target}
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
          onClick={() => {
            if (typeof onClose === 'function') onClose()
          }}
        >
          {icons.close ? (
            <img src={icons.close} alt="" aria-hidden="true" />
          ) : null}
          <span>{t('threadsFeed.reactions.close')}</span>
        </button>
      </div>

      {target === 'thread-root' ? (
        <p className="rm-picker__hint" data-testid="rm-picker-root-scope-hint">
          {t('threadsFeed.reactions.rootModerationHint')}
        </p>
      ) : null}

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

      <div className="rm-picker__body">
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
    </div>
  )
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
