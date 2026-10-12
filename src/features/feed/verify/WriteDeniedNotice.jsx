import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import './VerifyChrome.css'

/**
 * DS §10 WriteDeniedNotice — unknown write deny (M157 E inset).
 * Does **not** claim the user is unverified; no auto `/verify` redirect (FR-VL-11.3).
 */
export function WriteDeniedNotice({ t, iconPack = null }) {
  const icons = iconPack || NEXT_FEED_THREAD_ICONS
  const errorSrc = icons.error || '/icons/story-handoff/ic-error.png'

  return (
    <div
      className="nf-write-denied-notice"
      data-ds-surface="WriteDeniedNotice"
      data-vl-done-surface="WriteDeniedNotice"
      data-testid="write-denied-notice"
      data-plane="light"
      role="alert"
    >
      <p className="nf-write-denied-title" data-testid="write-denied-title">
        <img src={errorSrc} alt="" aria-hidden="true" />
        <span>{t('threadsFeed.verify.writeDeniedTitle')}</span>
      </p>
      <p className="nf-write-denied-helper">{t('threadsFeed.verify.writeDeniedHelper')}</p>
    </div>
  )
}
