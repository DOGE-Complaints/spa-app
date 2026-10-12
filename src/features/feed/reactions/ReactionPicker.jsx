import { ReactionLayerGroup } from './ReactionLayerGroup.jsx'
import { ReactionSelectionFooter } from './ReactionSelectionFooter.jsx'
import { ReactionScopeHint } from './ReactionScopeHint.jsx'
import { REACTION_LAYERS } from '../semantics/reactionsV1.js'

/** DS §8 ReactionPicker — popover or sheet chrome. */
export function ReactionPicker({
  panelId,
  open,
  pickerVariant = 'default',
  scene = 'strip',
  target = 'comment',
  enabled = [],
  selected = [],
  busy = false,
  icons,
  t,
  exclusiveHint = false,
  showDisabledNote = false,
  capacity,
  selectedCount,
  focusId = null,
  onClose,
  onSelect,
}) {
  if (!open) return null
  const pickerClass = [
    'reaction-picker',
    scene === 'keyboard' ? 'reaction-picker--keyboard' : '',
    pickerVariant === 'sheet' ? 'reaction-picker--sheet' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      id={panelId}
      className={pickerClass}
      data-testid="reaction-picker"
      data-reaction-surface="ReactionPicker"
      data-presentation={pickerVariant === 'sheet' ? 'm154-sheet' : 'm154-picker'}
      role="dialog"
      aria-label={t('threadsFeed.reactions.viewReactions')}
    >
      <div className="reaction-picker-header">
        <ReactionSelectionFooter
          capacityText={t('threadsFeed.reactions.chooseUpTo')}
          selectedCount={selectedCount}
          capacity={capacity}
          doneLabel={t('threadsFeed.reactions.close')}
          onDone={onClose}
        />
        {icons?.close ? (
          <img className="reaction-picker-close-icon" src={icons.close} alt="" aria-hidden="true" />
        ) : null}
      </div>
      {showDisabledNote ? (
        <ReactionScopeHint testId="reaction-enabled-only-helper">
          {t('threadsFeed.reactions.enabledOnlyHelper')}
        </ReactionScopeHint>
      ) : null}
      {exclusiveHint ? (
        <ReactionScopeHint testId="reaction-agree-disagree-hint">
          {t('threadsFeed.reactions.agreeDisagreeExclusive')}
        </ReactionScopeHint>
      ) : null}
      {REACTION_LAYERS.filter((layer) => !(target === 'thread-root' && layer === 'moderation')).map(
        (layer) => (
          <ReactionLayerGroup
            key={layer}
            layer={layer}
            title={t(`threadsFeed.reactions.layer.${layer}`)}
            items={enabled.filter((e) => e.layer === layer)}
            selected={selected}
            busy={busy}
            icons={icons}
            labelFor={(id) => t(`threadsFeed.reactions.id.${id}`)}
            focusId={focusId}
            onSelect={onSelect}
          />
        ),
      )}
      <span className="visually-hidden" data-testid="reaction-catalog-version">
        reactions.v1
      </span>
    </div>
  )
}
