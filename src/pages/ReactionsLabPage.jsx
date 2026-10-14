import { ReactionsLabCanvas } from '../features/reactions-mount/index.js'
import './ReactionsLabPage.css'

/**
 * `#/lab/reactions` — CR-03 lab page (shell Routes · pattern `#/lab/feed`).
 * FixtureAdapter default · two hosts · mounts CR-01 strip + CR-02 picker.
 * Not product `#/next/feed`. M155 people OOS.
 */
export function ReactionsLabPage() {
  return (
    <main
      className="reactions-lab-page"
      data-testid="reactions-lab-page"
      data-vl-lab-surface="ReactionsLabPage"
      data-lab-plane="reactions-mount"
      data-lab-visual-done="false"
      data-rm-adapter-default="fixture"
      data-m155-oos="true"
      data-next-feed-cutover="oos"
    >
      <ReactionsLabCanvas />
    </main>
  )
}
