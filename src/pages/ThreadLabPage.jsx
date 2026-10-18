import { ThreadLabCanvas } from '../features/thread-mount/index.js'
import './ThreadLabPage.css'

/**
 * `#/lab/thread` — CT-01 M152 state matrix (FixtureAdapter).
 * Not product `#/next/feed` · feed cutover CT-08.
 */
export function ThreadLabPage() {
  return (
    <main
      className="thread-lab-page"
      data-testid="thread-lab-page"
      data-vl-lab-surface="ThreadLabPage"
      data-lab-plane="thread-mount"
      data-lab-ct01="true"
      data-lab-visual-done="false"
      data-tm-adapter-default="fixture"
      data-next-feed-cutover="oos"
    >
      <ThreadLabCanvas />
    </main>
  )
}
