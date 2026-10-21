import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { FeedLabNf15Stand } from '../../feed/FeedLabNf15Stand.jsx'

describe('NF-15 FeedLabNf15Stand', () => {
  it('mounts Path A strip stand with M162 density marker', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <FeedLabNf15Stand />
      </MemoryRouter>,
    )
    expect(html).toContain('data-testid="feed-lab-nf15-stand"')
    expect(html).toContain('data-testid="feed-lab-nf15-card"')
    expect(html).toContain('data-nf15-density="m162"')
    expect(html).toContain('data-action-zones="4"')
    expect(html).toContain('data-feed-cr23-strip="true"')
  })
})
