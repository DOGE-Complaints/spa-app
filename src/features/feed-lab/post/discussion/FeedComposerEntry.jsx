import { forwardRef, useState } from 'react'
import './FeedComposerEntry.css'

/**
 * Local composer stub — no threads HTTP.
 */
export const FeedComposerEntry = forwardRef(function FeedComposerEntry(
  { placeholder = 'Write a comment…' },
  ref,
) {
  const [value, setValue] = useState('')

  return (
    <div
      className="feed-post-composer-entry"
      data-testid="feed-post-composer-entry"
      data-lab-composer="local"
    >
      <textarea
        ref={ref}
        className="feed-post-composer-entry__field"
        data-testid="feed-post-composer-field"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        rows={2}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="feed-post-composer-entry__hint" data-testid="feed-post-composer-stub">
        Lab fixture composer — local only · no threads HTTP
      </p>
    </div>
  )
})
