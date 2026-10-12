import { useState } from 'react'
import { isDraftDirty } from '../semantics/composerDraft.js'
import { DraftDiscardDialog } from './DraftDiscardDialog.jsx'
import { ThreadComposer } from './ThreadComposer.jsx'

/**
 * DS §7 ComposerEntry — compact entry → ThreadComposer (FR-VL-06.1).
 * Dirty leave asks DraftDiscardDialog (FR-VL-06.3).
 */
export function ComposerEntry({
  t,
  entryLabel,
  initiallyOpen = false,
  testId = 'issue-thread-composer',
  onCancel = null,
  ...composerProps
}) {
  const [open, setOpen] = useState(Boolean(initiallyOpen))
  const [draftSnapshot, setDraftSnapshot] = useState('')
  const [attachmentSnapshot, setAttachmentSnapshot] = useState(null)
  const [discardOpen, setDiscardOpen] = useState(false)

  function requestClose() {
    if (isDraftDirty(draftSnapshot, attachmentSnapshot)) {
      setDiscardOpen(true)
      return
    }
    setOpen(false)
    if (typeof onCancel === 'function') onCancel()
  }

  if (!open) {
    return (
      <button
        type="button"
        className="composer-entry"
        data-ds-surface="ComposerEntry"
        data-vl-done-surface="ComposerEntry"
        data-testid="composer-entry"
        onClick={() => setOpen(true)}
      >
        {entryLabel || t('threadsFeed.composer.placeholder')}
      </button>
    )
  }

  return (
    <div className="composer-entry-open" data-ds-surface="ComposerEntry" data-vl-done-surface="ComposerEntry">
      <ThreadComposer
        t={t}
        testId={testId}
        onCancel={requestClose}
        onDraftChange={(draft, attachment) => {
          setDraftSnapshot(draft)
          setAttachmentSnapshot(attachment)
        }}
        {...composerProps}
      />
      <DraftDiscardDialog
        open={discardOpen}
        title={t('nextFeed.composer.discardTitle') || 'Discard draft?'}
        body={t('nextFeed.composer.discardBody') || 'Your comment draft will be lost.'}
        keepLabel={t('threadsFeed.composer.keepEditing') || 'Keep editing'}
        discardLabel={t('nextFeed.composer.discard') || 'Discard'}
        onKeep={() => setDiscardOpen(false)}
        onDiscard={() => {
          setDiscardOpen(false)
          setDraftSnapshot('')
          setAttachmentSnapshot(null)
          setOpen(false)
          if (typeof onCancel === 'function') onCancel()
        }}
      />
    </div>
  )
}
