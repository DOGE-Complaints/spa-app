import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CR_REACTION_ICON_PACK } from '../icons/crReactionIcons.js'
import { CrReactionIcon } from '../icons/CrReactionIcon.jsx'
import './ReactorsPopover.css'

/**
 * CR-17 / M155 Panel A — compact ReactorsPopover (~320px).
 * Combined list · no tabs · no Connect · Escape + outside dismiss.
 */
export function ReactorsPopover({
  open,
  panelId,
  state = 'ready',
  people = [],
  icons = CR_REACTION_ICON_PACK,
  t = (k) => k,
  onClose = null,
  onRetry = null,
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

  const title = t('threadsFeed.reactions.peopleWhoReacted')
  const closeLabel = t('threadsFeed.reactions.close')
  const list = Array.isArray(people) ? people : []

  const body =
    state === 'loading' ? (
      <div className="rm-reactors__loading" data-testid="rm-reactors-loading" role="status">
        <div className="rm-reactors__skeleton" aria-hidden="true" />
        <div className="rm-reactors__skeleton" aria-hidden="true" />
        <p className="rm-reactors__status-text">{t('threadsFeed.reactions.loadingPeople')}</p>
      </div>
    ) : state === 'error' ? (
      <div className="rm-reactors__error" data-testid="rm-reactors-error" role="alert">
        <p className="rm-reactors__status-text">{t('threadsFeed.reactions.peopleUnavailable')}</p>
        {typeof onRetry === 'function' ? (
          <button
            type="button"
            className="rm-reactors__retry"
            data-testid="rm-reactors-retry"
            onClick={() => onRetry()}
          >
            {t('threadsFeed.reactions.tryAgain')}
          </button>
        ) : null}
      </div>
    ) : (
      <ul className="rm-reactors__list" data-testid="rm-reactors-list">
        {list.map((person) => {
          const rid = String(person.reaction_id || '')
          const name = String(person.name || '')
          const initials = name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((p) => p[0]?.toUpperCase() || '')
            .join('')
          const reactionName = rid
            ? t(`threadsFeed.reactions.id.${rid}`)
            : t('threadsFeed.reactions.viewReactions')
          return (
            <li
              key={person.id || `${name}-${rid}`}
              className="rm-reactors__row"
              data-testid={`rm-reactors-row-${person.id || rid}`}
              data-fixture={person.fixture ? 'true' : undefined}
            >
              <span className="rm-reactors__avatar" aria-hidden="true">
                {initials || '?'}
                {rid ? (
                  <span className="rm-reactors__badge" data-reaction-id={rid}>
                    <CrReactionIcon src={icons[rid]} size={14} />
                  </span>
                ) : null}
              </span>
              <span className="rm-reactors__name">{name}</span>
              <span className="rm-visually-hidden">{reactionName}</span>
            </li>
          )
        })}
      </ul>
    )

  const style =
    popoverStyle && typeof popoverStyle.top === 'number'
      ? {
          position: 'fixed',
          top: `${popoverStyle.top}px`,
          left: `${popoverStyle.left}px`,
          zIndex: 1200,
        }
      : undefined

  const node = (
    <div
      ref={rootRef}
      className="rm-reactors"
      data-testid="rm-reactors-popover"
      data-rm-portal="body"
      data-rm-people-state={state}
      data-rm-connect="absent"
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={style}
    >
      <header className="rm-reactors__header">
        <h2 className="rm-reactors__title" data-testid="rm-reactors-title">
          {title}
        </h2>
        <button
          ref={closeRef}
          type="button"
          className="rm-reactors__close"
          data-testid="rm-reactors-close"
          aria-label={closeLabel}
          title={closeLabel}
          onClick={() => {
            if (typeof onClose === 'function') onClose()
          }}
        >
          <CrReactionIcon src={icons.close || CR_REACTION_ICON_PACK.close} size={16} />
        </button>
      </header>
      <div className="rm-reactors__body">{body}</div>
    </div>
  )

  if (typeof document !== 'undefined' && document.body) {
    return createPortal(node, document.body)
  }
  return node
}
