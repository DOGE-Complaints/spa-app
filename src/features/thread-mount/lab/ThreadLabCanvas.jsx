import { useMemo, useState } from 'react'
import { setThemeAttribute } from '../../../theme/bootTheme.js'
import { ThreadMount } from '../ThreadMount.jsx'
import { THREAD_STATE_FIXTURES, createFixtureAdapter } from '../adapters/FixtureAdapter.js'
import './ThreadLabCanvas.css'

const STANDS = /** @type {const} */ ([
  { id: 'A', status: 'loading', label: 'THR-P-A loading' },
  { id: 'B', status: 'empty', label: 'THR-P-B empty' },
  { id: 'C', status: 'populated', label: 'THR-P-C populated-collapsed' },
  { id: 'D', status: 'unavailable', label: 'THR-P-D unavailable' },
  { id: 'E', status: 'populated', label: 'THR-P-E narrow-390', narrow: true },
  /** CT-03 Path A */
  {
    id: 'F',
    status: 'populated',
    label: 'THR-T-A nested A→A1→A1a',
    initiallyExpanded: true,
    commentSet: 'default',
  },
  {
    id: 'G',
    status: 'populated',
    label: 'THR-T-B maxDepth=2 · no Reply at depth 2',
    initiallyExpanded: true,
    maxDepth: 2,
    commentSet: 'default',
  },
  {
    id: 'H',
    status: 'populated',
    label: 'depth vs VISUAL_INDENT_CAP · maxDepth=5',
    initiallyExpanded: true,
    maxDepth: 5,
    commentSet: 'depthVsCap',
  },
  {
    id: 'I',
    status: 'populated',
    label: 'orphan → flat fallback',
    initiallyExpanded: true,
    commentSet: 'orphan',
  },
])

/**
 * Minimal civic chrome — proves Issue remains interactive while thread status changes.
 * Fixture labels only · no invent HTTP / Identity.
 */
function CivicChromeStub({ standId }) {
  return (
    <div className="tm-lab-civic" data-testid={`tm-lab-civic-${standId}`}>
      <div className="tm-lab-civic__identity">
        <span className="tm-lab-civic__id">ISSUE-CT01-DEMO</span>
        <span className="tm-lab-civic__status">Open</span>
      </div>
      <h2 className="tm-lab-civic__title">Shared pet-care coordination on Uus-Veerenni</h2>
      <p className="tm-lab-civic__summary">
        Neighbours want a simple signup list. Civic Issue chrome stays usable in every thread state.
      </p>
      <button type="button" className="tm-lab-civic__open" data-testid={`tm-lab-open-issue-${standId}`}>
        Open issue
      </button>
      <div className="tm-lab-strip" data-testid={`tm-lab-strip-${standId}`} role="group" aria-label="Post actions">
        <button type="button">React</button>
        <button type="button">Comment</button>
        <button type="button">Share</button>
        <button type="button">Reactions</button>
      </div>
    </div>
  )
}

function StandCard({ stand }) {
  const fixture = THREAD_STATE_FIXTURES[stand.status]
  const adapter = useMemo(() => {
    const a = createFixtureAdapter(stand.status)
    if (stand.commentSet) a.setCommentSet(stand.commentSet)
    return a
  }, [stand.status, stand.commentSet])
  const [snap, setSnap] = useState(() => adapter.snapshot())
  const [expanded, setExpanded] = useState(Boolean(stand.initiallyExpanded))

  return (
    <article
      className={`tm-lab-stand${stand.narrow ? ' tm-lab-stand--narrow' : ''}`}
      data-testid={`tm-lab-stand-${stand.id}`}
      data-tm-stand={stand.id}
      data-tm-status={stand.status}
      data-lab-narrow={stand.narrow ? 'true' : 'false'}
      data-lab-ct03={stand.id === 'F' || stand.id === 'G' || stand.id === 'H' || stand.id === 'I' ? 'true' : undefined}
    >
      <p className="tm-lab-stand__label">{stand.label}</p>
      <div className="tm-lab-card" data-testid={`tm-lab-card-${stand.id}`}>
        <CivicChromeStub standId={stand.id} />
        <ThreadMount
          status={snap.status}
          comments={snap.comments}
          writeCapability={fixture.writeCapability}
          expanded={expanded}
          onExpandedChange={setExpanded}
          narrow={Boolean(stand.narrow)}
          maxDepth={stand.maxDepth}
          onRetry={() => {
            adapter.retry().then((next) => setSnap(next))
          }}
        />
      </div>
    </article>
  )
}

/**
 * CT-01/CT-03 Path A canvas — M152 A–E + M153 F–I · `#/lab/thread`.
 * Partial visual BLOCK until OP eye · no invent OP PASS.
 */
export function ThreadLabCanvas() {
  const [theme, setTheme] = useState('light')

  return (
    <div
      className="tm-lab-canvas"
      data-testid="tm-lab-canvas"
      data-lab-ct01="true"
      data-lab-ct03="true"
      data-lab-visual-done="false"
      data-lab-theme={theme}
    >
      <header className="tm-lab-canvas__header">
        <h1 className="tm-lab-canvas__title">CT-01/03 · ThreadMount states + CommentTree nest</h1>
        <p className="tm-lab-canvas__meta">
          FixtureAdapter · Path A · Partial visual = BLOCK until OP eye · no invent HTTP
        </p>
        <div className="tm-lab-canvas__theme" role="group" aria-label="Theme">
          {(['light', 'dark']).map((code) => (
            <button
              key={code}
              type="button"
              data-testid={`tm-lab-theme-${code}`}
              className={theme === code ? 'is-active' : undefined}
              aria-pressed={theme === code}
              onClick={() => {
                setTheme(code)
                setThemeAttribute(code, document, { persist: false })
              }}
            >
              {code}
            </button>
          ))}
        </div>
      </header>
      <div className="tm-lab-canvas__stands" data-testid="tm-lab-stands">
        {STANDS.map((stand) => (
          <StandCard key={stand.id} stand={stand} />
        ))}
      </div>
    </div>
  )
}
