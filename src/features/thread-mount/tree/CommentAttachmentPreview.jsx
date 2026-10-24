import { useEffect, useState } from 'react'
import {
  ATTACH_NODE_LOADING_COPY,
  ATTACH_NODE_LOCAL_PREVIEW_COPY,
  ATTACH_NODE_UNAVAILABLE_COPY,
  readyAttachmentIntents,
} from '../config/threadMountConfig.js'
import { fetchPublishedAttachmentObjectUrl } from '../attachments/fetchPublishedAttachmentObjectUrl.js'
import './CommentAttachmentPreview.css'

/**
 * CT-22 M153a residual — comment-node attachment preview.
 * CT-31 policy A: when `getAccessToken` Present · publishedUrl → auth fetch → blob → objectURL.
 * Without token fn (Lab Fixture / unit): publishedUrl as bare src (CT-22 held).
 * CT-34: sync File→objectURL (no text-only plate on local happy path) · local File
 * fallback while auth loads/errors · honesty when no File and no published URL.
 * No invent HTTP-09 / CDN / OP PASS.
 *
 * @param {{ attachments?: Array|null, getAccessToken?: (() => Promise<string|null|undefined>)|null }} props
 */
export function CommentAttachmentPreview({ attachments = null, getAccessToken = null }) {
  const ready = readyAttachmentIntents(attachments)
  if (ready.length === 0) return null

  return (
    <ul
      className="tm-comment-attach"
      data-testid="tm-comment-attachments"
      data-lab-ct31={typeof getAccessToken === 'function' ? 'true' : undefined}
      data-lab-ct34="true"
      aria-label="Attachments"
    >
      {ready.map((a) => (
        <li key={a.id} className="tm-comment-attach__item">
          {a.kind === 'image' ? (
            <CommentImagePreview attachment={a} getAccessToken={getAccessToken} />
          ) : (
            <NonImageCue attachment={a} />
          )}
        </li>
      ))}
    </ul>
  )
}

function CommentImagePreview({ attachment, getAccessToken = null }) {
  const published =
    typeof attachment.publishedUrl === 'string' && attachment.publishedUrl.trim()
      ? attachment.publishedUrl.trim()
      : null
  const file =
    typeof File !== 'undefined' && attachment.file instanceof File
      ? attachment.file
      : null
  const useAuthFetch = Boolean(published && typeof getAccessToken === 'function')
  /** CT-34 · sync objectURL on first paint when File Present (no text-plate flash). */
  const [localUrl, setLocalUrl] = useState(() => {
    if (!file) return null
    try {
      return URL.createObjectURL(file)
    } catch {
      return null
    }
  })
  /** @type {[{ status: 'idle'|'loading'|'ready'|'error', url: string|null, reason?: string }, Function]} */
  const [authState, setAuthState] = useState(() =>
    useAuthFetch ? { status: 'loading', url: null } : { status: 'idle', url: null },
  )

  useEffect(() => {
    if (!file) {
      setLocalUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      return undefined
    }
    let url
    try {
      url = URL.createObjectURL(file)
    } catch {
      setLocalUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      return undefined
    }
    setLocalUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  useEffect(() => {
    if (!useAuthFetch) {
      setAuthState({ status: 'idle', url: null })
      return undefined
    }
    let cancelled = false
    let created = null
    setAuthState({ status: 'loading', url: null })
    void (async () => {
      try {
        const result = await fetchPublishedAttachmentObjectUrl({
          url: published,
          getAccessToken,
        })
        if (cancelled) {
          if (result.ok) URL.revokeObjectURL(result.objectUrl)
          return
        }
        if (!result.ok) {
          setAuthState({ status: 'error', url: null, reason: result.reason })
          return
        }
        created = result.objectUrl
        setAuthState({ status: 'ready', url: created })
      } catch {
        if (!cancelled) setAuthState({ status: 'error', url: null, reason: 'fetch-failed' })
      }
    })()
    return () => {
      cancelled = true
      if (created) URL.revokeObjectURL(created)
    }
  }, [useAuthFetch, published, getAccessToken])

  if (useAuthFetch) {
    if (authState.status === 'ready' && authState.url) {
      return (
        <figure
          className="tm-comment-attach__figure"
          data-testid={`tm-comment-attach-${attachment.id}`}
          data-tm-attach-kind="image"
          data-tm-attach-local="false"
          data-tm-attach-auth="true"
          data-tm-attach-fetch="ready"
          data-lab-ct34="true"
        >
          <img
            className="tm-comment-attach__img"
            src={authState.url}
            alt={attachment.label || attachment.fileName || 'Attachment'}
          />
        </figure>
      )
    }
    /* CT-34 · local File image while auth loads / after deny — not sole text plate */
    if (localUrl) {
      const fetchStatus = authState.status === 'error' ? 'error' : 'loading'
      return (
        <figure
          className="tm-comment-attach__figure"
          data-testid={`tm-comment-attach-${attachment.id}`}
          data-tm-attach-kind="image"
          data-tm-attach-local="true"
          data-tm-attach-auth="true"
          data-tm-attach-fetch={fetchStatus}
          data-tm-attach-fetch-reason={
            authState.status === 'error' ? authState.reason || 'error' : undefined
          }
          data-lab-ct34="true"
        >
          <img
            className="tm-comment-attach__img"
            src={localUrl}
            alt={attachment.label || attachment.fileName || 'Attachment'}
          />
          <figcaption className="tm-comment-attach__honesty">
            {authState.status === 'error'
              ? ATTACH_NODE_UNAVAILABLE_COPY
              : ATTACH_NODE_LOADING_COPY}
          </figcaption>
        </figure>
      )
    }
    if (authState.status === 'loading') {
      return (
        <div
          className="tm-comment-attach__cue tm-comment-attach__cue--image-pending"
          data-testid={`tm-comment-attach-${attachment.id}`}
          data-tm-attach-kind="image"
          data-tm-attach-local="false"
          data-tm-attach-auth="true"
          data-tm-attach-fetch="loading"
          role="status"
        >
          <span className="tm-comment-attach__cue-label">
            {attachment.label || attachment.fileName || 'Attachment'}
          </span>
          <span className="tm-comment-attach__honesty">{ATTACH_NODE_LOADING_COPY}</span>
        </div>
      )
    }
    return (
      <div
        className="tm-comment-attach__cue tm-comment-attach__cue--image-pending"
        data-testid={`tm-comment-attach-${attachment.id}`}
        data-tm-attach-kind="image"
        data-tm-attach-local="false"
        data-tm-attach-auth="true"
        data-tm-attach-fetch="error"
        data-tm-attach-fetch-reason={authState.reason || 'error'}
        role="alert"
      >
        <span className="tm-comment-attach__cue-label">
          {attachment.label || attachment.fileName || 'Attachment'}
        </span>
        <span className="tm-comment-attach__honesty">{ATTACH_NODE_UNAVAILABLE_COPY}</span>
      </div>
    )
  }

  const src = published || localUrl
  const isLocal = !published && Boolean(localUrl)

  if (!src) {
    return (
      <div
        className="tm-comment-attach__cue tm-comment-attach__cue--image-pending"
        data-testid={`tm-comment-attach-${attachment.id}`}
        data-tm-attach-kind="image"
        data-tm-attach-local="true"
      >
        <span className="tm-comment-attach__cue-label">{attachment.label || 'Selected image'}</span>
        <span className="tm-comment-attach__honesty">{ATTACH_NODE_LOCAL_PREVIEW_COPY}</span>
      </div>
    )
  }

  return (
    <figure
      className="tm-comment-attach__figure"
      data-testid={`tm-comment-attach-${attachment.id}`}
      data-tm-attach-kind="image"
      data-tm-attach-local={isLocal ? 'true' : 'false'}
      data-lab-ct34="true"
    >
      <img
        className="tm-comment-attach__img"
        src={src}
        alt={attachment.label || attachment.fileName || 'Attachment'}
      />
      {isLocal ? (
        <figcaption className="tm-comment-attach__honesty">
          {ATTACH_NODE_LOCAL_PREVIEW_COPY}
        </figcaption>
      ) : null}
    </figure>
  )
}

function NonImageCue({ attachment }) {
  const kind = attachment.kind || 'file'
  const label =
    attachment.label ||
    attachment.fileName ||
    (kind === 'markdown'
      ? 'Markdown file'
      : kind === 'pdf'
        ? 'PDF document'
        : kind === 'office'
          ? 'Office document'
          : 'Selected file')
  const isLocal = !attachment.publishedUrl

  return (
    <div
      className="tm-comment-attach__cue"
      data-testid={`tm-comment-attach-${attachment.id}`}
      data-tm-attach-kind={kind}
      data-tm-attach-local={isLocal ? 'true' : 'false'}
    >
      <span className="tm-comment-attach__cue-kind" aria-hidden="true">
        {kind === 'markdown' ? 'MD' : kind === 'pdf' ? 'PDF' : kind === 'office' ? 'DOC' : 'FILE'}
      </span>
      <span className="tm-comment-attach__cue-label">{label}</span>
      {isLocal ? (
        <span className="tm-comment-attach__honesty">{ATTACH_NODE_LOCAL_PREVIEW_COPY}</span>
      ) : null}
    </div>
  )
}
