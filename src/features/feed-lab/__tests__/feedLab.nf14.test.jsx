import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { FeedLabNf14Stand } from '../../feed/FeedLabNf14Stand.jsx'

describe('NF-14 FeedLabNf14Stand', () => {
  it('mounts list hit + detail without open row', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <FeedLabNf14Stand />
      </MemoryRouter>,
    )
    expect(html).toContain('data-testid="feed-lab-nf14-stand"')
    expect(html).toContain('data-testid="feed-lab-nf14-list"')
    expect(html).toContain('data-testid="feed-lab-nf14-detail"')
    expect(html).toContain('data-testid="feed-civic-post-hit"')
    expect(html).not.toContain('data-testid="feed-civic-post-open"')
    expect(html).toContain('data-nf14-surface="list"')
    expect(html).toContain('data-nf14-surface="detail"')
    expect(html).toContain('data-civic-hit="list"')
    expect(html).toContain('data-civic-hit="none"')
  })
})
