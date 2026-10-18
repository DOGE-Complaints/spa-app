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
  const adapter = useMemo(() => createFixtureAdapter(stand.status), [stand.status])
  const [snap, setSnap] = useState(() => adapter.snapshot())
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className={`tm-lab-stand${stand.narrow ? ' tm-lab-stand--narrow' : ''}`}
      data-testid={`tm-lab-stand-${stand.id}`}
      data-tm-stand={stand.id}
      data-tm-status={stand.status}
      data-lab-narrow={stand.narrow ? 'true' : 'false'}
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
          onRetry={() => {
            adapter.retry().then((next) => setSnap(next))
          }}
        />
      </div>
    </article>
  )
}

/**
 * CT-01 Path A canvas — M152 A–E fixture stands · `#/lab/thread`.
 * Partial visual BLOCK until OP eye · no invent OP PASS.
 */
export function ThreadLabCanvas() {
  const [theme, setTheme] = useState('light')

  return (
    <div
      className="tm-lab-canvas"
      data-testid="tm-lab-canvas"
      data-lab-ct01="true"
      data-lab-visual-done="false"
      data-lab-theme={theme}
    >
      <header className="tm-lab-canvas__header">
        <h1 className="tm-lab-canvas__title">CT-01 · M152 IssueThreadBlock states</h1>
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
