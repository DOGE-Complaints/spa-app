import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CR_REACTION_ICON_PACK } from '../icons/crReactionIcons.js'
import { CrReactionIcon } from '../icons/CrReactionIcon.jsx'
import './ReactionsDialog.css'

/**
 * CR-18 / M155 Panel B — ReactionsDialog (~560px).
 * Tabs All + types · Connect stub / You · no picker catalog · Escape + focus trap.
 */
export function ReactionsDialog({
  open,
  panelId,
  state = 'ready',
  people = [],
  /** Optional summary marks — adds type tabs even when people list empty for that type (B2). */
  summaryMarks = null,
  icons = CR_REACTION_ICON_PACK,
  t = (k) => k,
  onClose = null,
  onRetry = null,
}) {
  const rootRef = useRef(null)
  const closeRef = useRef(null)
  const [activeTab, setActiveTab] = useState('all')
  const [connectMsg, setConnectMsg] = useState(null)

  const list = Array.isArray(people) ? people : []

  const tabs = useMemo(() => {
    const counts = new Map()
    for (const p of list) {
      const rid = String(p.reaction_id || '')
      if (!rid) continue
      counts.set(rid, (counts.get(rid) || 0) + 1)
    }
    if (Array.isArray(summaryMarks)) {
      for (const m of summaryMarks) {
        const rid = String(m.reaction_id || m.id || '')
        if (!rid || counts.has(rid)) continue
        counts.set(rid, 0)
      }
    }
    return [
      { id: 'all', count: list.length },
      ...[...counts.entries()].map(([id, count]) => ({ id, count })),
    ]
  }, [list, summaryMarks])

  const filtered = useMemo(() => {
    if (activeTab === 'all') return list
    return list.filter((p) => String(p.reaction_id || '') === activeTab)
  }, [list, activeTab])

  useEffect(() => {
    if (!open) {
      setActiveTab('all')
      setConnectMsg(null)
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    function onKey(e) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        if (typeof onClose === 'function') onClose()
        return
      }
      if (e.key !== 'Tab' || !rootRef.current) return
      const focusables = rootRef.current.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const nodes = [...focusables]
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open && closeRef.current) closeRef.current.focus()
  }, [open])

  if (!open) return null

  const title = t('threadsFeed.reactions.reactionsTitle')
  const closeLabel = t('threadsFeed.reactions.close')

  let body
  if (state === 'loading') {
    body = (
      <div className="rm-dialog__loading" data-testid="rm-dialog-loading" role="status">
        <div className="rm-dialog__skeleton" aria-hidden="true" />
        <div className="rm-dialog__skeleton" aria-hidden="true" />
        <p className="rm-dialog__status-text">{t('threadsFeed.reactions.loadingPeople')}</p>
      </div>
    )
  } else if (state === 'error') {
    body = (
      <div className="rm-dialog__error" data-testid="rm-dialog-error" role="alert">
        <p className="rm-dialog__status-text">{t('threadsFeed.reactions.peopleUnavailable')}</p>
        {typeof onRetry === 'function' ? (
          <button
            type="button"
            className="rm-dialog__retry"
            data-testid="rm-dialog-retry"
            onClick={() => onRetry()}
          >
            {t('threadsFeed.reactions.tryAgain')}
          </button>
        ) : null}
      </div>
    )
  } else if (filtered.length === 0) {
    body = (
      <div className="rm-dialog__empty" data-testid="rm-dialog-empty" role="status">
        <p className="rm-dialog__status-text">{t('threadsFeed.reactions.noPeopleForReaction')}</p>
      </div>
    )
  } else {
    body = (
      <ul className="rm-dialog__list" data-testid="rm-dialog-list">
        {filtered.map((person) => {
          const rid = String(person.reaction_id || '')
          const name = String(person.name || '')
          const initials = name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((p) => p[0]?.toUpperCase() || '')
            .join('')
          const isYou = Boolean(person.isYou)
          const unavailable = Boolean(person.connectionUnavailable)
          return (
            <li
              key={person.id || `${name}-${rid}`}
              className="rm-dialog__row"
              data-testid={`rm-dialog-row-${person.id || rid}`}
              data-fixture={person.fixture ? 'true' : undefined}
              data-rm-you={isYou ? 'true' : undefined}
            >
              <span className="rm-dialog__avatar" aria-hidden="true">
                {initials || '?'}
                {rid ? (
                  <span className="rm-dialog__badge" data-reaction-id={rid}>
                    <CrReactionIcon src={icons[rid]} size={14} />
                  </span>
                ) : null}
              </span>
              <span className="rm-dialog__name">{name}</span>
              {isYou ? (
                <span className="rm-dialog__you" data-testid="rm-dialog-you">
                  {t('threadsFeed.reactions.you')}
                </span>
              ) : unavailable ? (
                <span
                  className="rm-dialog__unavailable"
                  data-testid="rm-dialog-connection-unavailable"
                >
                  {t('threadsFeed.reactions.connectionUnavailable')}
                </span>
              ) : (
                <button
                  type="button"
                  className="rm-dialog__connect"
                  data-testid={`rm-dialog-connect-${person.id || rid}`}
                  onClick={() => {
                    setConnectMsg(t('threadsFeed.reactions.connectUnavailableYet'))
                  }}
                >
                  {t('threadsFeed.reactions.connect')}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const node = (
    <div className="rm-dialog-backdrop" data-testid="rm-dialog-backdrop">
      <div
        ref={rootRef}
        className="rm-dialog"
        data-testid="rm-reactions-dialog"
        data-rm-portal="body"
        data-rm-people-state={state}
        data-rm-active-tab={activeTab}
        data-rm-picker="absent"
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${panelId}-title`}
      >
        <header className="rm-dialog__header">
          <h2 className="rm-dialog__title" id={`${panelId}-title`} data-testid="rm-dialog-title">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="rm-dialog__close"
            data-testid="rm-dialog-close"
            aria-label={closeLabel}
            title={closeLabel}
            onClick={() => {
              if (typeof onClose === 'function') onClose()
            }}
          >
            <CrReactionIcon src={icons.close || CR_REACTION_ICON_PACK.close} size={16} />
          </button>
        </header>
        <div
          className="rm-dialog__tabs"
          role="tablist"
          aria-label={t('threadsFeed.reactions.reactionTabs')}
          data-testid="rm-dialog-tabs"
        >
          {tabs.map((tab) => {
            const selected = activeTab === tab.id
            const label =
              tab.id === 'all'
                ? `${t('threadsFeed.reactions.tabAll')} ${tab.count}`
                : `${t(`threadsFeed.reactions.id.${tab.id}`)} ${tab.count}`
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${panelId}-tab-${tab.id}`}
                className={[
                  'rm-dialog__tab',
                  selected ? 'rm-dialog__tab--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                data-testid={`rm-dialog-tab-${tab.id}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => {
                  setActiveTab(tab.id)
                  setConnectMsg(null)
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
        {connectMsg ? (
          <p className="rm-dialog__connect-msg" data-testid="rm-dialog-connect-msg" role="status">
            {connectMsg}
          </p>
        ) : null}
        <div
          className="rm-dialog__body"
          role="tabpanel"
          data-testid="rm-dialog-panel"
          aria-labelledby={`${panelId}-tab-${activeTab}`}
        >
          {body}
        </div>
      </div>
    </div>
  )

  if (typeof document !== 'undefined' && document.body) {
    return createPortal(node, document.body)
  }
  return node
}
