import { FeedLabThreadMount } from './FeedLabThreadMount.jsx'
import { LAB_CT08_STANDS } from '../../fixtures/labCt08Stands.js'
import './FeedLabCt08Stands.css'

/**
 * CT-08 Path A stands strip on `#/lab/feed` — A–E · TREE · GATE.
 * No invent HTTP · OP eye Absent → visual BLOCK.
 */
export function FeedLabCt08Stands() {
  return (
    <section
      className="feed-lab-ct08-stands"
      data-testid="feed-lab-ct08-stands"
      data-lab-ct08="true"
      data-lab-plane="greenfield"
      aria-label="CT-08 ThreadMount stands"
    >
      <h2 className="feed-lab-ct08-stands__title" data-testid="feed-lab-ct08-heading">
        CT-08 ThreadMount stands (A–E · TREE · GATE)
      </h2>
      <ol className="feed-lab-ct08-stands__list" data-testid="feed-lab-ct08-list">
        {LAB_CT08_STANDS.map((stand) => (
          <li
            key={stand.id}
            className={`feed-lab-ct08-stands__item${stand.narrow ? ' feed-lab-ct08-stands__item--narrow' : ''}`}
            data-testid={`feed-lab-ct08-stand-${stand.id}`}
            data-lab-ct08-stand={stand.id}
            data-lab-narrow={stand.narrow ? 'true' : 'false'}
          >
            <p className="feed-lab-ct08-stands__label">{stand.label}</p>
            <div
              className="feed-lab-ct08-stands__card"
              data-testid={`feed-lab-ct08-card-${stand.id}`}
              data-lab-ct08="true"
            >
              <FeedLabThreadMount
                status={stand.status}
                comments={stand.comments}
                writeCapability={stand.writeCapability ?? null}
                verifyGateVariant={stand.verifyGateVariant ?? null}
                narrow={Boolean(stand.narrow)}
                initiallyExpanded={stand.initiallyExpanded !== false}
                initialDraft={stand.initialDraft || ''}
                branchDisclosure={Boolean(stand.branchDisclosure)}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
