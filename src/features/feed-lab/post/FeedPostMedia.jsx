import { useState } from 'react'
import './FeedPostMedia.css'

/**
 * LAB-07 media — `/assets/dogefeed.png` · 16:9 · radius ~10px · no carousel.
 * Absent/error → honest placeholder (no invent second asset).
 */
export function FeedPostMedia({ media, onOpenDetail = null }) {
  const [state, setState] = useState('pending')
  if (!media?.src) return null

  const body =
    state === 'error' ? (
      <div
        className="feed-post-media__absent"
        data-testid="feed-post-media-absent"
        data-lab-media="absent"
      >
        Media unavailable
      </div>
    ) : (
      <img
        className="feed-post-media__img"
        data-testid="feed-post-media-img"
        src={media.src}
        alt={media.alt || ''}
        width={media.targetWidth || 1600}
        height={media.targetHeight || 900}
        onLoad={() => setState('ok')}
        onError={() => setState('error')}
      />
    )

  if (typeof onOpenDetail === 'function') {
    return (
      <button
        type="button"
        className="feed-post-media feed-post-media--hit"
        data-testid="feed-post-media"
        data-lab-hit="media"
        data-lab-media-ratio="16:9"
        onClick={(e) => onOpenDetail(e)}
      >
        {body}
      </button>
    )
  }

  return (
    <div
      className="feed-post-media"
      data-testid="feed-post-media"
      data-lab-media-ratio="16:9"
    >
      {body}
    </div>
  )
}
