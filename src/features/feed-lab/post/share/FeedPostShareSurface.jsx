import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  SHARE_COPIED_LABEL,
  SHARE_ROWS,
  SHARE_UNAVAILABLE_BODY,
  SHARE_UNAVAILABLE_TITLE,
  buildNetworkShareHref,
  copyTextToClipboard,
} from './shareIssueUrl.js'
import './FeedPostShareSurface.css'

/**
 * CT-24 M152d Share surface — desktop popover · narrow bottom sheet.
 * Custom UI only · no OS share-sheet hybrid · no invent gateway HTTP.
 */
export function FeedPostShareSurface({
  open = false,
  mode = 'popover',
  issueUrl = null,
  anchorEl = null,
  onClose = null,
  onCopied = null,
}) {
  const panelRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useLayoutEffect(() => {
    if (!open || mode !== 'popover' || !anchorEl) return undefined
    const update = () => {
      const r = anchorEl.getBoundingClientRect()
      setPos({ top: r.bottom + 8, left: r.left + r.width / 2 })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open, mode, anchorEl])

  useEffect(() => {
    if (!open) return undefined
    function onKey(e) {
      if (e.key === 'Escape' && typeof onClose === 'function') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !panelRef.current) return
    panelRef.current.querySelector('[data-testid="feed-post-share-close"]')?.focus?.()
  }, [open])

  if (!open) return null

  const hasUrl = typeof issueUrl === 'string' && issueUrl.length > 0
  const surface = mode === 'sheet' ? 'sheet' : 'popover'

  async function handleCopy() {
    if (!hasUrl) return
    const ok = await copyTextToClipboard(issueUrl)
    if (ok && typeof onCopied === 'function') onCopied()
    if (typeof onClose === 'function') onClose()
  }

  function handleNetwork(row) {
    if (!hasUrl) return
    if (row.copyFallback || row.id === 'instagram') {
      void handleCopy()
      return
    }
    const href = buildNetworkShareHref(row.id, issueUrl)
    if (href && typeof window !== 'undefined') {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  const panelStyle =
    surface === 'popover'
      ? { position: 'fixed', top: pos.top, left: pos.left, transform: 'translateX(-50%)' }
      : undefined

  return (
    <>
      <button
        type="button"
        className="feed-post-share-surface__scrim"
        data-testid="feed-post-share-scrim"
        aria-label="Dismiss share"
        onClick={() => typeof onClose === 'function' && onClose()}
      />
      <div
        ref={panelRef}
        className={`feed-post-share-surface feed-post-share-surface--${surface}`}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feed-post-share-title"
        data-testid="feed-post-share-surface"
        data-lab-share-surface={surface}
        data-lab-share-url={hasUrl ? 'present' : 'absent'}
        data-lab-ct24="true"
      >
        <div className="feed-post-share-surface__header">
          <h2 id="feed-post-share-title" className="feed-post-share-surface__title">
            Share Issue
          </h2>
          <button
            type="button"
            className="feed-post-share-surface__close"
            data-testid="feed-post-share-close"
            onClick={() => typeof onClose === 'function' && onClose()}
          >
            Close
          </button>
        </div>

        {hasUrl ? (
          <>
            <p className="feed-post-share-surface__desc">Share the public Issue link.</p>
            <ul className="feed-post-share-surface__list" data-testid="feed-post-share-rows">
              {SHARE_ROWS.map((row) => {
                if (row.kind === 'copy') {
                  return (
                    <li key={row.id}>
                      <hr className="feed-post-share-surface__sep" />
                      <button
                        type="button"
                        className="feed-post-share-surface__row"
                        data-testid="feed-post-share-row-copy"
                        data-share-row="copy"
                        onClick={() => void handleCopy()}
                      >
                        <span className="feed-post-share-surface__row-icon--copy" aria-hidden="true">
                          ⎘
                        </span>
                        <span className="feed-post-share-surface__row-text">
                          <span>{row.label}</span>
                        </span>
                      </button>
                    </li>
                  )
                }
                return (
                  <li key={row.id}>
                    <button
                      type="button"
                      className="feed-post-share-surface__row"
                      data-testid={`feed-post-share-row-${row.id}`}
                      data-share-row={row.id}
                      data-share-copy-fallback={row.copyFallback ? 'true' : undefined}
                      onClick={() => handleNetwork(row)}
                    >
                      <img
                        className="feed-post-share-surface__row-icon"
                        src={row.iconSrc}
                        alt=""
                        width={22}
                        height={22}
                        aria-hidden="true"
                        data-testid={`feed-post-share-icon-${row.id}`}
                      />
                      <span className="feed-post-share-surface__row-text">
                        <span>{row.label}</span>
                        {row.hint ? (
                          <span className="feed-post-share-surface__row-hint">{row.hint}</span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <p className="feed-post-share-surface__honesty" data-testid="feed-post-share-unavailable">
            <strong>{SHARE_UNAVAILABLE_TITLE}</strong>
            {SHARE_UNAVAILABLE_BODY}
          </p>
        )}
      </div>
    </>
  )
}

/** Transient M152d C toast — copy success only. */
export function FeedPostShareCopiedToast({ open = false, label = SHARE_COPIED_LABEL }) {
  if (!open) return null
  return (
    <div
      className="feed-post-share-toast"
      role="status"
      data-testid="feed-post-share-copied"
      data-lab-ct24="true"
    >
      {label}
    </div>
  )
}
