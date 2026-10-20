import { useMemo, useState } from 'react'
import { setThemeAttribute } from '../../../theme/bootTheme.js'
import { ThreadMount } from '../ThreadMount.jsx'
import { M153_ILLUSTRATIVE_DRAFT } from '../composer/ThreadComposer.jsx'
import {
  THREAD_STATE_FIXTURES,
  createFixtureAdapter,
  createFixtureAttachmentIntent,
} from '../adapters/FixtureAdapter.js'
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
  /** CT-04 Path A */
  {
    id: 'J',
    status: 'empty',
    label: 'THR-T-C root composer',
    initiallyExpanded: true,
    initialDraft: '',
  },
  {
    id: 'K',
    status: 'populated',
    label: 'THR-T-C reply context + draft',
    initiallyExpanded: true,
    initialReplyParentId: 'fx-a',
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
  },
  {
    id: 'L',
    status: 'populated',
    label: 'THR-T-F post fail · draft kept',
    initiallyExpanded: true,
    initialReplyParentId: 'fx-a',
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    failNextPost: true,
    autoFail: true,
  },
  {
    id: 'M',
    status: 'populated',
    label: 'THR-T-G mobile 390 keyboard composer',
    initiallyExpanded: true,
    narrow: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialReplyParentId: 'fx-a1',
  },
  /** CT-05 Path A — M153 D/E / maxAttachments */
  {
    id: 'N',
    status: 'populated',
    label: 'THR-T-D attachment ready chip',
    initiallyExpanded: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialAttachments: [createFixtureAttachmentIntent('ready', 'image')],
    maxAttachments: 1,
  },
  {
    id: 'O',
    status: 'populated',
    label: 'THR-T-E attachment denied · draft intact',
    initiallyExpanded: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialAttachments: [createFixtureAttachmentIntent('denied', 'file')],
    maxAttachments: 1,
  },
  {
    id: 'P',
    status: 'populated',
    label: 'THR-T-maxA clamp maxAttachments=1',
    initiallyExpanded: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialAttachments: [createFixtureAttachmentIntent('ready', 'image')],
    maxAttachments: 1,
  },
  {
    id: 'Q',
    status: 'populated',
    label: 'attachments unavailable honesty',
    initiallyExpanded: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    attachmentsAvailable: false,
    maxAttachments: 1,
  },
  {
    id: 'R',
    status: 'populated',
    label: 'local intent · not published',
    initiallyExpanded: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialAttachments: [createFixtureAttachmentIntent('ready', 'file')],
    maxAttachments: 1,
  },
  /** CT-06 Path A — M153 T-coll / T-exp / T-err · local disclosure only */
  {
    id: 'S',
    status: 'populated',
    label: 'THR-T-coll branch collapsed · View replies',
    initiallyExpanded: true,
    commentSet: 'default',
    branchDisclosure: true,
    branchExpandMode: 'sync',
  },
  {
    id: 'T',
    status: 'populated',
    label: 'THR-T-exp expanding local · no invent HTTP',
    initiallyExpanded: true,
    commentSet: 'default',
    branchDisclosure: true,
    branchExpandMode: 'delayed',
    branchExpandDelayMs: 60_000,
    initialBranchStates: { 'fx-a': 'expanding' },
  },
  {
    id: 'U',
    status: 'populated',
    label: 'THR-T-err branch error · Try again',
    initiallyExpanded: true,
    commentSet: 'default',
    branchDisclosure: true,
    branchExpandMode: 'error',
    branchExpandDelayMs: 80,
    initialBranchStates: { 'fx-a': 'error' },
  },
  {
    id: 'V',
    status: 'populated',
    label: 'THR-T sync expand · children local',
    initiallyExpanded: true,
    commentSet: 'default',
    branchDisclosure: true,
    branchExpandMode: 'sync',
    initialBranchStates: { 'fx-a': 'expanded', 'fx-a1': 'collapsed' },
  },
  {
    id: 'W',
    status: 'populated',
    label: 'THR-T sync full local · no fake loader',
    initiallyExpanded: true,
    commentSet: 'default',
    branchDisclosure: true,
    branchExpandMode: 'sync',
    initialBranchStates: { 'fx-a': 'expanded', 'fx-a1': 'expanded' },
  },
  /** CT-07 Path A — M157 V-A…V-F · lab fixture + stub · no invent Identity */
  {
    id: 'VA',
    status: 'populated',
    label: 'THR-V-A gate blocked · draft+target',
    initiallyExpanded: true,
    commentSet: 'default',
    writeCapability: 'unverified',
    verifyGateVariant: 'blocked',
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialReplyParentId: 'fx-a1',
    showCivicLine: true,
  },
  {
    id: 'VB',
    status: 'populated',
    label: 'THR-V-B stub /verify handoff · no methods',
    initiallyExpanded: true,
    commentSet: 'default',
    writeCapability: 'unverified',
    verifyGateVariant: 'handoff',
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialReplyParentId: 'fx-a1',
  },
  {
    id: 'VC',
    status: 'populated',
    label: 'THR-V-C verified return · no auto-post',
    initiallyExpanded: true,
    commentSet: 'default',
    writeCapability: 'allowed',
    verifiedReturn: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialReplyParentId: 'fx-a1',
  },
  {
    id: 'VD',
    status: 'populated',
    label: 'THR-V-D cancel/fail · still blocked',
    initiallyExpanded: true,
    commentSet: 'default',
    writeCapability: 'unverified',
    verifyGateVariant: 'cancelled',
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialReplyParentId: 'fx-a1',
  },
  {
    id: 'VE',
    status: 'populated',
    label: 'THR-V-E stale / WRITE-DENIED-UNKNOWN',
    initiallyExpanded: true,
    commentSet: 'default',
    writeCapability: 'denied-unknown',
    verifyGateVariant: 'denied-unknown',
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialReplyParentId: 'fx-a1',
  },
  {
    id: 'VF',
    status: 'populated',
    label: 'THR-V-F mobile gate 390',
    initiallyExpanded: true,
    commentSet: 'default',
    narrow: true,
    writeCapability: 'unverified',
    verifyGateVariant: 'blocked',
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    initialReplyParentId: 'fx-a1',
  },
])

/**
 * Minimal civic chrome — proves Issue remains interactive while thread status changes.
 * Fixture labels only · no invent HTTP / Identity.
 */
function CivicChromeStub({ standId, issueClosed = false }) {
  return (
    <div className="tm-lab-civic" data-testid={`tm-lab-civic-${standId}`}>
      <div className="tm-lab-civic__identity">
        <span className="tm-lab-civic__id">ISSUE-UV-024</span>
        <span className="tm-lab-civic__status">{issueClosed ? 'Closed' : 'Open'}</span>
      </div>
      <h2 className="tm-lab-civic__title">A trusted neighbour network for pet care</h2>
      <p className="tm-lab-civic__summary">
        Neighbours want a simple signup list. Civic Issue chrome stays usable in every thread state.
      </p>
      <button type="button" className="tm-lab-civic__open" data-testid={`tm-lab-open-issue-${standId}`}>
        Open issue
      </button>
      <div className="tm-lab-strip" data-testid={`tm-lab-strip-${standId}`} role="group" aria-label="Post actions">
        <button type="button" data-testid={`tm-lab-react-${standId}`}>
          React
        </button>
        <button type="button">Comment</button>
        <button type="button" data-testid={`tm-lab-share-${standId}`}>
          Share
        </button>
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
    if (stand.failNextPost) a.setFailNextPost(true)
    return a
  }, [stand.status, stand.commentSet, stand.failNextPost])
  const [snap, setSnap] = useState(() => adapter.snapshot())
  const [expanded, setExpanded] = useState(Boolean(stand.initiallyExpanded))
  const [gateVariant, setGateVariant] = useState(stand.verifyGateVariant || null)
  const ct04 = stand.id === 'J' || stand.id === 'K' || stand.id === 'L' || stand.id === 'M'
  const ct05 =
    stand.id === 'N' || stand.id === 'O' || stand.id === 'P' || stand.id === 'Q' || stand.id === 'R'
  const ct06 =
    stand.id === 'S' || stand.id === 'T' || stand.id === 'U' || stand.id === 'V' || stand.id === 'W'
  const ct07 =
    stand.id === 'VA' ||
    stand.id === 'VB' ||
    stand.id === 'VC' ||
    stand.id === 'VD' ||
    stand.id === 'VE' ||
    stand.id === 'VF'
  const writeCap = stand.writeCapability || fixture.writeCapability

  return (
    <article
      className={`tm-lab-stand${stand.narrow ? ' tm-lab-stand--narrow' : ''}`}
      data-testid={`tm-lab-stand-${stand.id}`}
      data-tm-stand={stand.id}
      data-tm-status={stand.status}
      data-lab-narrow={stand.narrow ? 'true' : 'false'}
      data-lab-ct03={stand.id === 'F' || stand.id === 'G' || stand.id === 'H' || stand.id === 'I' ? 'true' : undefined}
      data-lab-ct04={ct04 ? 'true' : undefined}
      data-lab-ct05={ct05 ? 'true' : undefined}
      data-lab-ct06={ct06 ? 'true' : undefined}
      data-lab-ct07={ct07 ? 'true' : undefined}
    >
      <p className="tm-lab-stand__label">{stand.label}</p>
      <div className="tm-lab-card" data-testid={`tm-lab-card-${stand.id}`}>
        <CivicChromeStub standId={stand.id} issueClosed={stand.writeCapability === 'stale'} />
        <ThreadMount
          status={snap.status}
          comments={snap.comments}
          writeCapability={writeCap}
          expanded={expanded}
          onExpandedChange={setExpanded}
          narrow={Boolean(stand.narrow)}
          maxDepth={stand.maxDepth}
          maxAttachments={stand.maxAttachments}
          attachmentsAvailable={stand.attachmentsAvailable !== false}
          initialDraft={stand.initialDraft || ''}
          initialReplyParentId={stand.initialReplyParentId || null}
          initialAttachments={stand.initialAttachments || null}
          forcePostFail={Boolean(stand.failNextPost)}
          autoFailOnMount={Boolean(stand.autoFail)}
          branchDisclosure={Boolean(stand.branchDisclosure)}
          branchExpandMode={stand.branchExpandMode || 'sync'}
          initialBranchStates={stand.initialBranchStates || null}
          branchExpandDelayMs={stand.branchExpandDelayMs}
          verifyGateVariant={gateVariant}
          verifiedReturn={Boolean(stand.verifiedReturn)}
          showCivicLine={Boolean(stand.showCivicLine)}
          onGoVerify={() => setGateVariant('handoff')}
          onVerifyDismiss={() => {}}
          onHandoffBack={() => setGateVariant(stand.verifyGateVariant || 'blocked')}
          commentWriteOwner="host"
          onPostComment={async (payload) => {
            const result = await adapter.postComment(payload)
            if (result.ok) setSnap(adapter.snapshot())
            return result
          }}
          onRetry={() => {
            adapter.retry().then((next) => setSnap(next))
          }}
        />
      </div>
    </article>
  )
}

/**
 * CT-01…07 Path A canvas — nest · composer · attach · branch · verify · `#/lab/thread`.
 * Partial visual BLOCK until OP eye · no invent OP PASS / Identity / HTTP.
 */
export function ThreadLabCanvas() {
  const [theme, setTheme] = useState('light')

  return (
    <div
      className="tm-lab-canvas"
      data-testid="tm-lab-canvas"
      data-lab-ct01="true"
      data-lab-ct03="true"
      data-lab-ct04="true"
      data-lab-ct05="true"
      data-lab-ct06="true"
      data-lab-ct07="true"
      data-lab-visual-done="false"
      data-lab-theme={theme}
    >
      <header className="tm-lab-canvas__header">
        <h1 className="tm-lab-canvas__title">CT-01…07 · ThreadMount · nest · composer · attach · branch · verify</h1>
        <p className="tm-lab-canvas__meta">
          FixtureAdapter · Path A · Partial visual = BLOCK until OP eye · no invent HTTP/Identity
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
