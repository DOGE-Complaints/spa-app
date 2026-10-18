import { CommentTree } from './tree/CommentTree.jsx'
import { DEFAULT_MAX_DEPTH, VISUAL_INDENT_CAP } from './config/threadMountConfig.js'
import './IssueThreadBlock.css'

/**
 * CT-01/CT-03 — M152 status chrome + M153 expanded CommentTree.
 * Greenfield under thread-mount · no reactions ownership · no invent authors/HTTP.
 *
 * @param {'loading'|'empty'|'populated'|'unavailable'} status
 * @param {Array<{ id?: string, body?: string, parentId?: string|null, depth?: number }>} [comments]
 * @param {boolean} [expanded] populated tree expand
 * @param {number} [maxDepth]
 * @param {number} [visualIndentCap]
 * @param {() => void} [onViewDiscussion]
 * @param {() => void} [onRetry]
 * @param {boolean} [composerEntry] show Write a comment affordance when capability permits
 */
export function IssueThreadBlock({
  status = 'empty',
  comments = [],
  expanded = false,
  maxDepth = DEFAULT_MAX_DEPTH,
  visualIndentCap = VISUAL_INDENT_CAP,
  onViewDiscussion = null,
  onRetry = null,
  composerEntry = false,
  onComposerEntry = null,
  composerEntryRef = null,
  onReply = null,
  branchDisclosure = false,
  branchExpandMode = 'sync',
  initialBranchStates = null,
  branchExpandDelayMs = undefined,
}) {
  const bodies = (Array.isArray(comments) ? comments : [])
    .map((c) => (typeof c?.body === 'string' ? c.body.trim() : ''))
    .filter(Boolean)
  const previews = bodies.slice(0, 2)

  return (
    <section
      className={`tm-issue-thread-block tm-issue-thread-block--${status}`}
      data-testid="tm-issue-thread-block"
      data-tm-status={status}
      data-tm-expanded={expanded ? 'true' : 'false'}
      data-lab-ct01="true"
      aria-label="Discussion"
    >
      <header className="tm-issue-thread-block__heading" data-testid="tm-thread-heading">
        <h3 className="tm-issue-thread-block__title">Discussion</h3>
      </header>

      {status === 'loading' ? (
        <div className="tm-issue-thread-block__state" data-testid="tm-thread-loading" role="status">
          <p className="tm-issue-thread-block__status-copy">Loading discussion…</p>
          <div className="tm-issue-thread-block__skeleton" aria-hidden="true" data-testid="tm-thread-skeleton">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : null}

      {status === 'empty' ? (
        <div className="tm-issue-thread-block__state" data-testid="tm-thread-empty" role="status">
          <p className="tm-issue-thread-block__lead">No comments yet</p>
          <p className="tm-issue-thread-block__helper">
            Start a constructive discussion about this Issue.
          </p>
          {composerEntry ? (
            <button
              type="button"
              ref={composerEntryRef}
              className="tm-issue-thread-block__composer-entry"
              data-testid="tm-thread-composer-entry"
              onClick={() => onComposerEntry?.()}
            >
              Write a comment
            </button>
          ) : null}
        </div>
      ) : null}

      {status === 'populated' ? (
        <div
          className="tm-issue-thread-block__state tm-issue-thread-block__populated"
          data-testid="tm-thread-populated"
        >
          {!expanded ? (
            <>
              <ul
                className="tm-issue-thread-block__previews"
                data-testid="tm-thread-previews"
              >
                {previews.map((body, i) => (
                  <li key={`preview-${i}`}>
                    <p className="tm-issue-thread-block__preview-body" data-testid="tm-thread-preview-body">
                      {body}
                    </p>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="tm-issue-thread-block__view"
                data-testid="tm-thread-view-discussion"
                onClick={() => onViewDiscussion?.()}
              >
                View discussion
              </button>
              {composerEntry ? (
                <button
                  type="button"
                  ref={composerEntryRef}
                  className="tm-issue-thread-block__composer-entry"
                  data-testid="tm-thread-composer-entry"
                  onClick={() => onComposerEntry?.()}
                >
                  Write a comment
                </button>
              ) : null}
            </>
          ) : (
            <div className="tm-issue-thread-block__expanded" data-testid="tm-thread-expanded">
              <CommentTree
                comments={comments}
                maxDepth={maxDepth}
                visualIndentCap={visualIndentCap}
                onReply={onReply}
                branchDisclosure={Boolean(branchDisclosure)}
                branchExpandMode={branchExpandMode || 'sync'}
                initialBranchStates={initialBranchStates}
                branchExpandDelayMs={branchExpandDelayMs}
              />
            </div>
          )}
        </div>
      ) : null}

      {status === 'unavailable' ? (
        <div
          className="tm-issue-thread-block__state tm-issue-thread-block__unavailable"
          data-testid="tm-thread-unavailable"
          role="alert"
        >
          <p className="tm-issue-thread-block__lead">Discussion unavailable</p>
          <p className="tm-issue-thread-block__helper">
            The Issue is still available. Try again later.
          </p>
          {typeof onRetry === 'function' ? (
            <button
              type="button"
              className="tm-issue-thread-block__retry"
              data-testid="tm-thread-retry"
              onClick={onRetry}
            >
              Try again
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
