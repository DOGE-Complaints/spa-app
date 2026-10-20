import { FeedLabThreadMount } from './FeedLabThreadMount.jsx'
import { LAB_CT21_STANDS } from '../../fixtures/labCt21Stands.js'
import './FeedLabCt21Stands.css'

/**
 * CT-21 Path A stands on `#/lab/feed` — M152c A–E.
 * No invent HTTP · OP eye Absent → visual BLOCK.
 */
export function FeedLabCt21Stands() {
  return (
    <section
      className="feed-lab-ct21-stands"
      data-testid="feed-lab-ct21-stands"
      data-lab-ct21="true"
      data-lab-plane="greenfield"
      aria-label="CT-21 preview budget default expanded stands"
    >
      <h2 className="feed-lab-ct21-stands__title" data-testid="feed-lab-ct21-heading">
        CT-21 preview budget · default expanded (M152c A–E)
      </h2>
      <ol className="feed-lab-ct21-stands__list" data-testid="feed-lab-ct21-list">
        {LAB_CT21_STANDS.map((stand) => (
          <li
            key={stand.id}
            className="feed-lab-ct21-stands__item"
            data-testid={`feed-lab-ct21-stand-${stand.id}`}
            data-lab-ct21-stand={stand.id}
            data-lab-ct21-panel={stand.panel}
          >
            <p className="feed-lab-ct21-stands__label">{stand.label}</p>
            <div
              className={
                stand.narrow
                  ? 'feed-lab-ct21-stands__card feed-lab-ct21-stands__card--narrow'
                  : 'feed-lab-ct21-stands__card'
              }
              data-testid={`feed-lab-ct21-card-${stand.id}`}
              data-lab-ct21="true"
              style={stand.narrow ? { maxWidth: 390 } : undefined}
            >
              <FeedLabThreadMount
                status={stand.status}
                comments={stand.comments}
                writeCapability="allowed"
                initiallyExpanded={stand.initiallyExpanded}
                narrow={Boolean(stand.narrow)}
                branchDisclosure={Boolean(stand.branchDisclosure)}
                previewNodeBudget={stand.previewNodeBudget}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
