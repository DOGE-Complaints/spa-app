/**
 * DS §2 DiscussionLayout — vertical slots: header / body / composer / stub.
 * Composer slot hosts VL-06 DS atoms (ComposerEntry / ThreadComposer).
 */
export function DiscussionLayout({ header = null, body = null, composer = null, stub = null, className = '' }) {
  return (
    <div
      className={`discussion-layout${className ? ` ${className}` : ''}`}
      data-ds-surface="DiscussionLayout"
      data-vl-done-surface="DiscussionLayout"
      data-testid="discussion-layout"
    >
      {header ? (
        <div className="discussion-layout__header" data-slot="header">
          {header}
        </div>
      ) : null}
      {body ? (
        <div className="discussion-layout__body" data-slot="body">
          {body}
        </div>
      ) : null}
      {composer ? (
        <div className="discussion-layout__composer" data-slot="composer" data-composer-ds="true">
          {composer}
        </div>
      ) : null}
      {stub ? (
        <div className="discussion-layout__stub" data-slot="stub">
          {stub}
        </div>
      ) : null}
    </div>
  )
}
