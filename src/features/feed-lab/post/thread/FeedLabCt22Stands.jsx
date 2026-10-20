import { FeedLabThreadMount } from './FeedLabThreadMount.jsx'
import { LAB_CT22_STANDS } from '../../fixtures/labCt22Stands.js'
import './FeedLabCt22Stands.css'

/**
 * CT-22 Path A stands on `#/lab/feed` — M153a residual attachment preview.
 * No invent HTTP · OP eye Absent → visual BLOCK.
 */
export function FeedLabCt22Stands() {
  return (
    <section
      className="feed-lab-ct22-stands"
      data-testid="feed-lab-ct22-stands"
      data-lab-ct22="true"
      data-lab-plane="greenfield"
      aria-label="CT-22 comment attachment preview stands"
    >
      <h2 className="feed-lab-ct22-stands__title" data-testid="feed-lab-ct22-heading">
        CT-22 comment attachment preview (M153a residual)
      </h2>
      <ol className="feed-lab-ct22-stands__list" data-testid="feed-lab-ct22-list">
        {LAB_CT22_STANDS.map((stand) => (
          <li
            key={stand.id}
            className="feed-lab-ct22-stands__item"
            data-testid={`feed-lab-ct22-stand-${stand.id}`}
            data-lab-ct22-stand={stand.id}
            data-lab-ct22-panel={stand.panel}
          >
            <p className="feed-lab-ct22-stands__label">{stand.label}</p>
            <div
              className={
                stand.narrow
                  ? 'feed-lab-ct22-stands__card feed-lab-ct22-stands__card--narrow'
                  : 'feed-lab-ct22-stands__card'
              }
              data-testid={`feed-lab-ct22-card-${stand.id}`}
              data-lab-ct22="true"
              style={stand.narrow ? { maxWidth: 390 } : undefined}
            >
              <FeedLabThreadMount
                status={stand.status}
                comments={stand.comments}
                writeCapability="allowed"
                initiallyExpanded={true}
                narrow={Boolean(stand.narrow)}
                attachmentsAvailable={true}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
