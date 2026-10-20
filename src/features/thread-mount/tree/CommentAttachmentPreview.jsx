import { useEffect, useState } from 'react'
import {
  ATTACH_NODE_LOCAL_PREVIEW_COPY,
  readyAttachmentIntents,
} from '../config/threadMountConfig.js'
import './CommentAttachmentPreview.css'

/**
 * CT-22 M153a residual — comment-node attachment preview.
 * Image: publishedUrl when Present · else local objectURL from File · honesty copy.
 * Non-image: type cue (pdf / office / markdown / file) · Denied omitted (ready only).
 * No invent HTTP / CDN / OP PASS.
 *
 * @param {{ attachments?: Array|null }} props
 */
export function CommentAttachmentPreview({ attachments = null }) {
  const ready = readyAttachmentIntents(attachments)
  if (ready.length === 0) return null

  return (
    <ul
      className="tm-comment-attach"
      data-testid="tm-comment-attachments"
      aria-label="Attachments"
    >
      {ready.map((a) => (
        <li key={a.id} className="tm-comment-attach__item">
          {a.kind === 'image' ? (
            <CommentImagePreview attachment={a} />
          ) : (
            <NonImageCue attachment={a} />
          )}
        </li>
      ))}
    </ul>
  )
}

function CommentImagePreview({ attachment }) {
  const published =
    typeof attachment.publishedUrl === 'string' && attachment.publishedUrl.trim()
      ? attachment.publishedUrl.trim()
      : null
  const file =
    typeof File !== 'undefined' && attachment.file instanceof File
      ? attachment.file
      : null
  const [localUrl, setLocalUrl] = useState(null)

  useEffect(() => {
    if (published || !file) {
      setLocalUrl(null)
      return undefined
    }
    const url = URL.createObjectURL(file)
    setLocalUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [published, file])

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
