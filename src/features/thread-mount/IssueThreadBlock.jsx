import { CommentTree } from './tree/CommentTree.jsx'
import {
  DEFAULT_MAX_DEPTH,
  DEFAULT_PREVIEW_NODE_BUDGET,
  VISUAL_INDENT_CAP,
} from './config/threadMountConfig.js'
import './IssueThreadBlock.css'

/**
 * CT-01/CT-03/CT-21 — M152 status chrome + M153/M152c expanded CommentTree.
 * Greenfield under thread-mount · no reactions ownership · no invent authors/HTTP.
 * CT-21: omit Discussion heading · pass previewNodeBudget.
 *
 * @param {'loading'|'empty'|'populated'|'unavailable'} status
 * @param {Array<{ id?: string, body?: string, parentId?: string|null, depth?: number }>} [comments]
 * @param {boolean} [expanded] populated tree expand
 * @param {number} [maxDepth]
 * @param {number} [visualIndentCap]
 * @param {number} [previewNodeBudget] CT-21 M152c DFS first-paint budget
 * @param {() => void} [onViewDiscussion]
 * @param {() => void} [onRetry]
 * @param {boolean} [composerEntry] show Write a comment affordance when capability permits
 * @param {string|null} [issueId] host issue id marker (no Discussion heading chrome)
 * @param {boolean} [reactionsAggregateConfirmed] CT-15 G-M2 · residents row only if confirmed
 */
export function IssueThreadBlock({
  status = 'empty',
  comments = [],
  expanded = false,
  maxDepth = DEFAULT_MAX_DEPTH,
  visualIndentCap = VISUAL_INDENT_CAP,
  previewNodeBudget = DEFAULT_PREVIEW_NODE_BUDGET,
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
  renderCommentReactions = null,
  renderReplyComposer = null,
  /** CT-18 M153b §6 */
  selectedReplyParentId = null,
  issueId = null,
  reactionsAggregateConfirmed = false,
}) {
  const bodies = (Array.isArray(comments) ? comments : [])
    .map((c) => (typeof c?.body === 'string' ? c.body.trim() : ''))
    .filter(Boolean)
  const previews = bodies.slice(0, 2)
  const idLabel = typeof issueId === 'string' && issueId.trim() ? issueId.trim() : ''
  const showResidentsRow =
    status === 'populated' && !expanded && Boolean(reactionsAggregateConfirmed)

  return (
    <section
      className={`tm-issue-thread-block tm-issue-thread-block--${status}`}
      data-testid="tm-issue-thread-block"
      data-tm-status={status}
      data-tm-expanded={expanded ? 'true' : 'false'}
      data-tm-issue-id={idLabel || undefined}
      data-lab-ct01="true"
      data-lab-ct15="true"
      data-lab-ct21="true"
      aria-label={idLabel ? `Issue discussion ${idLabel}` : 'Issue discussion'}
    >
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
          {/* CT-10 G-M1 · artboard B speech-bubble empty icon · decorative */}
          <div
            className="tm-issue-thread-block__empty-icon"
            data-testid="tm-thread-empty-icon"
            aria-hidden="true"
          >
            <img
              className="tm-issue-thread-block__empty-icon-img"
              src="/icons/next-feed/actions/comment.svg"
              alt=""
              width={56}
              height={56}
            />
          </div>
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
              {showResidentsRow ? (
                <p
                  className="tm-issue-thread-block__residents"
                  data-testid="tm-thread-residents-row"
                  data-lab-ct15="true"
                  data-tm-residents="confirmed"
                >
                  Reactions from residents
                </p>
              ) : null}
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
                previewNodeBudget={previewNodeBudget}
                onReply={onReply}
                branchDisclosure={Boolean(branchDisclosure)}
                branchExpandMode={branchExpandMode || 'sync'}
                initialBranchStates={initialBranchStates}
                branchExpandDelayMs={branchExpandDelayMs}
                renderCommentReactions={renderCommentReactions}
                renderReplyComposer={renderReplyComposer}
                selectedReplyParentId={selectedReplyParentId}
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
