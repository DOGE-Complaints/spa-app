import { ReactionsLabCanvas } from '../features/reactions-mount/index.js'
import './ReactionsLabPage.css'

/**
 * `#/lab/reactions` — CR-01 strip preview host (lab-first).
 * Full lab story polish → CR-03. Not product `#/next/feed`.
 */
export function ReactionsLabPage() {
  return (
    <main
      className="reactions-lab-page"
      data-testid="reactions-lab-page"
      data-vl-lab-surface="ReactionsLabPage"
      data-lab-plane="reactions-mount"
      data-lab-visual-done="false"
    >
      <ReactionsLabCanvas />
    </main>
  )
}
