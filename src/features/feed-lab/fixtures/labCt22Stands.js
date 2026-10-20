/**
 * CT-22 Path A stands on `#/lab/feed` — M153a residual attachment preview.
 * Image local (File → objectURL) · publishedUrl · markdown/pdf cues · Denied omit.
 * No invent HTTP · no invent OP PASS · Partial visual=BLOCK.
 */

import { createFixtureAttachmentIntent } from '../../thread-mount/index.js'

/** 1×1 PNG · local File for objectURL preview (no invent CDN) */
const TINY_PNG_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

export function makeTinyPngFile(name = 'local-preview.png') {
  const bin = Uint8Array.from(atob(TINY_PNG_B64), (c) => c.charCodeAt(0))
  return new File([bin], name, { type: 'image/png' })
}

/** Present public asset · publishedUrl path (lab honesty · not invent upload) */
export const CT22_PUBLISHED_ICON = '/icons/next-feed/actions/reply.svg'

export const CT22_IMAGE_LOCAL = Object.freeze([
  {
    id: 'ct22-img-local',
    parentId: null,
    depth: 0,
    body: 'Comment with local image preview (no published URL).',
    attachments: [
      createFixtureAttachmentIntent('ready', 'image', {
        id: 'ct22-att-local',
        file: makeTinyPngFile(),
        fileName: 'local-preview.png',
      }),
    ],
  },
])

export const CT22_IMAGE_PUBLISHED = Object.freeze([
  {
    id: 'ct22-img-pub',
    parentId: null,
    depth: 0,
    body: 'Comment with published image URL.',
    attachments: [
      createFixtureAttachmentIntent('ready', 'image', {
        id: 'ct22-att-pub',
        publishedUrl: CT22_PUBLISHED_ICON,
        fileName: 'published.png',
      }),
    ],
  },
])

export const CT22_MARKDOWN = Object.freeze([
  {
    id: 'ct22-md',
    parentId: null,
    depth: 0,
    body: 'Comment with markdown attachment cue.',
    attachments: [
      createFixtureAttachmentIntent('ready', 'markdown', {
        id: 'ct22-att-md',
        fileName: 'notes.md',
      }),
    ],
  },
])

export const CT22_PDF = Object.freeze([
  {
    id: 'ct22-pdf',
    parentId: null,
    depth: 0,
    body: 'Comment with PDF type cue.',
    attachments: [
      createFixtureAttachmentIntent('ready', 'pdf', {
        id: 'ct22-att-pdf',
        fileName: 'brief.pdf',
      }),
    ],
  },
])

/** Denied must not render as success media on the node */
export const CT22_DENIED_OMIT = Object.freeze([
  {
    id: 'ct22-denied',
    parentId: null,
    depth: 0,
    body: 'Denied intent must not appear as node media.',
    attachments: [
      createFixtureAttachmentIntent('denied', 'file', {
        id: 'ct22-att-denied',
        denyReason: 'type',
      }),
      createFixtureAttachmentIntent('ready', 'markdown', {
        id: 'ct22-att-ready-only',
        fileName: 'ok.md',
      }),
    ],
  },
])

/**
 * @typedef {object} LabCt22Stand
 * @property {string} id
 * @property {string} panel
 * @property {string} label
 * @property {'loading'|'empty'|'populated'|'unavailable'} status
 * @property {Array|null} [comments]
 * @property {boolean} [narrow]
 */

/** @type {ReadonlyArray<LabCt22Stand>} */
export const LAB_CT22_STANDS = Object.freeze([
  {
    id: 'A-image-local',
    panel: 'A',
    label: 'A · Image local preview (File · no URL)',
    status: 'populated',
    comments: CT22_IMAGE_LOCAL,
  },
  {
    id: 'B-image-published',
    panel: 'B',
    label: 'B · Image publishedUrl Present',
    status: 'populated',
    comments: CT22_IMAGE_PUBLISHED,
  },
  {
    id: 'C-markdown',
    panel: 'C',
    label: 'C · Markdown type cue (.md family)',
    status: 'populated',
    comments: CT22_MARKDOWN,
  },
  {
    id: 'D-pdf-cue',
    panel: 'D',
    label: 'D · PDF non-image cue',
    status: 'populated',
    comments: CT22_PDF,
  },
  {
    id: 'E-denied-omit',
    panel: 'E',
    label: 'E · Denied omit · ready md only',
    status: 'populated',
    comments: CT22_DENIED_OMIT,
  },
  {
    id: 'F-composer-post',
    panel: 'F',
    label: 'F · Empty · Attach+Post persist (interactive)',
    status: 'empty',
    comments: [],
  },
  {
    id: 'G-narrow',
    panel: 'G',
    label: 'G · Narrow · local image',
    status: 'populated',
    comments: CT22_IMAGE_LOCAL,
    narrow: true,
  },
])
