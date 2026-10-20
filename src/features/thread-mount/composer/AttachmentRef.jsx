import { useEffect, useState } from 'react'
import {
  ATTACH_DENIED_SAFETY_DETAIL,
  ATTACH_DENIED_TITLE,
  ATTACH_DENIED_TYPE_HELPER,
  ATTACH_LOCAL_INTENT_COPY,
  ATTACH_READY_STATUS_COPY,
} from '../config/threadMountConfig.js'
import {
  attachFamilyLabel,
  attachTypeCue,
  middleEllipsisFileName,
} from './attachChipFilename.js'
import './AttachmentRef.css'

/**
 * CT-05 AttachmentRef · CT-19 M153b §7 paint · CT-25 M153c fileName + 48×48 thumb.
 * Never claims published media · no invent upload HTTP · no green Ready.
 *
 * @param {object} props
 * @param {{
 *   id: string,
 *   label?: string,
 *   fileName?: string,
 *   file?: File,
 *   status: 'ready'|'denied',
 *   kind?: string,
 *   denyReason?: 'type'|'safety',
 * }} props.intent
 * @param {() => void} [props.onRemove]
 */
export function AttachmentRef({ intent, onRemove = null }) {
  if (!intent?.id) return null
  const denied = intent.status === 'denied'
  const ready = intent.status === 'ready'
  const family = attachFamilyLabel(intent.kind)
  const fullName =
    typeof intent.fileName === 'string' && intent.fileName.trim()
      ? intent.fileName.trim()
      : ''
  const displayName = fullName ? middleEllipsisFileName(fullName) : ''
  const file =
    typeof File !== 'undefined' && intent.file instanceof File ? intent.file : null
  const isImage = intent.kind === 'image'

  const [thumbUrl, setThumbUrl] = useState(null)
  useEffect(() => {
    if (!isImage || !file) {
      setThumbUrl(null)
      return undefined
    }
    const url = URL.createObjectURL(file)
    setThumbUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [isImage, file])

  const denyReason = intent.denyReason === 'safety' ? 'safety' : denied ? 'type' : null
  const deniedDetail =
    denyReason === 'safety' ? ATTACH_DENIED_SAFETY_DETAIL : ATTACH_DENIED_TYPE_HELPER

  const cueKind = attachTypeCue(intent.kind)
  const showThumb = Boolean(isImage && thumbUrl)

  return (
    <div
      className={`tm-attachment-ref${denied ? ' tm-attachment-ref--denied' : ''}${
        ready ? ' tm-attachment-ref--ready' : ''
      }`}
      data-testid={`tm-attachment-ref-${intent.id}`}
      data-tm-attach-status={intent.status}
      data-tm-attach-published="false"
      data-tm-attach-deny-reason={denied ? denyReason || 'type' : ''}
      data-tm-attach-has-filename={fullName ? 'true' : 'false'}
      data-tm-attach-thumb={showThumb ? 'true' : 'false'}
      data-lab-ct05="true"
      data-lab-ct19="true"
      data-lab-ct25="true"
      role="group"
      aria-label={
        denied
          ? fullName
            ? `Denied attachment ${fullName}`
            : 'Denied attachment intent'
          : fullName
            ? `Pending attachment ${fullName}`
            : 'Pending attachment intent'
      }
    >
      <div className="tm-attachment-ref__main">
        {showThumb ? (
          <img
            className="tm-attachment-ref__thumb"
            src={thumbUrl}
            alt=""
            width={48}
            height={48}
            aria-hidden="true"
            data-testid="tm-attachment-thumb"
          />
        ) : (
          <span
            className={`tm-attachment-ref__cue tm-attachment-ref__cue--${intent.kind || 'file'}`}
            aria-hidden="true"
            data-testid="tm-attachment-type-cue"
            data-tm-attach-cue={cueKind}
          >
            {cueKind}
          </span>
        )}
        <div className="tm-attachment-ref__text">
          <p className="tm-attachment-ref__family" data-testid="tm-attachment-family">
            {family}
          </p>
          {fullName ? (
            <p
              className="tm-attachment-ref__filename"
              data-testid="tm-attachment-filename"
              title={fullName}
            >
              <span className="tm-attachment-ref__filename-vis" aria-hidden="true">
                {displayName}
              </span>
              <span className="tm-attachment-ref__filename-sr">{fullName}</span>
            </p>
          ) : (
            <p className="tm-attachment-ref__label" data-testid="tm-attachment-label">
              {intent.label || family}
            </p>
          )}
          {ready ? (
            <>
              <p className="tm-attachment-ref__ready" data-testid="tm-attachment-ready">
                {ATTACH_READY_STATUS_COPY}
              </p>
              <p className="tm-attachment-ref__local" data-testid="tm-attachment-local-intent">
                {ATTACH_LOCAL_INTENT_COPY}
              </p>
            </>
          ) : null}
          {denied ? (
            <div className="tm-attachment-ref__denied" data-testid="tm-attachment-denied" role="alert">
              <p className="tm-attachment-ref__denied-title" data-testid="tm-attachment-denied-title">
                {ATTACH_DENIED_TITLE}
              </p>
              <p
                className="tm-attachment-ref__denied-detail"
                data-testid="tm-attachment-denied-detail"
              >
                {deniedDetail}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        className="tm-attachment-ref__remove"
        data-testid={`tm-attachment-remove-${intent.id}`}
        aria-label={fullName ? `Remove ${fullName}` : 'Remove attachment'}
        onClick={() => onRemove?.()}
      >
        Remove
      </button>
    </div>
  )
}
