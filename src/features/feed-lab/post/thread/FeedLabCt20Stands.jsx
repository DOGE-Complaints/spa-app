import { FeedLabThreadMount } from './FeedLabThreadMount.jsx'
import { LAB_CT20_STANDS } from '../../fixtures/labCt20Stands.js'
import './FeedLabCt20Stands.css'

/**
 * CT-20 Path A residual stands on `#/lab/feed` — LAB-1…4.
 * No invent HTTP · OP eye Absent → visual BLOCK.
 */
export function FeedLabCt20Stands() {
  return (
    <section
      className="feed-lab-ct20-stands"
      data-testid="feed-lab-ct20-stands"
      data-lab-ct20="true"
      data-lab-plane="greenfield"
      aria-label="CT-20 lab audit residual stands"
    >
      <h2 className="feed-lab-ct20-stands__title" data-testid="feed-lab-ct20-heading">
        CT-20 lab residual stands (LAB-1…4)
      </h2>
      <ol className="feed-lab-ct20-stands__list" data-testid="feed-lab-ct20-list">
        {LAB_CT20_STANDS.map((stand) => (
          <li
            key={stand.id}
            className="feed-lab-ct20-stands__item"
            data-testid={`feed-lab-ct20-stand-${stand.id}`}
            data-lab-ct20-stand={stand.id}
            data-lab-ct20-lab={stand.lab}
          >
            <p className="feed-lab-ct20-stands__label">{stand.label}</p>
            <div
              className="feed-lab-ct20-stands__card"
              data-testid={`feed-lab-ct20-card-${stand.id}`}
              data-lab-ct20="true"
            >
              <FeedLabThreadMount
                status={stand.status}
                comments={stand.comments}
                writeCapability={stand.writeCapability ?? null}
                initiallyExpanded={stand.initiallyExpanded !== false}
                initialDraft={stand.initialDraft || ''}
                branchDisclosure={Boolean(stand.branchDisclosure)}
                maxDepth={stand.maxDepth}
                previewNodeBudget={99}
                attachmentsAvailable={stand.attachmentsAvailable !== false}
                forcePostFail={Boolean(stand.forcePostFail)}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
