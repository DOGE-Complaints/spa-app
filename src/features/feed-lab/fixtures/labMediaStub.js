/**
 * LAB-02 media stub contract — shared path for all five fixtures.
 * Data foundation only · not full visual Done (display chrome → LAB-03).
 * Absent file → honest broken/placeholder · do not invent a second asset.
 */

/** @type {const} */
export const LAB_MEDIA_STUB_PATH = '/assets/dogefeed.png'

/** Target pixels documented for OP drop / Path A (16:9). */
export const LAB_MEDIA_STUB_TARGET = Object.freeze({ width: 1600, height: 900 })

/**
 * Authored alts per fixture public id (not filename guess).
 * @type {Readonly<Record<string, string>>}
 */
export const LAB_MEDIA_ALT_BY_PUBLIC_ID = Object.freeze({
  'DOGEstonia-UusVeerenni-001': 'Night construction noise near Uus Veerenni corner — lab media stub',
  'DOGEstonia-UusVeerenni-002': 'Potholes on Pärnu mnt near bus stop — lab media stub',
  'DOGEstonia-UusVeerenni-003': 'Overflowing bins at Kadriorg playground — lab media stub',
  'DOGEstonia-UusVeerenni-004': 'Broken streetlight on Telliskivi block — lab media stub',
  'DOGEstonia-UusVeerenni-005': 'Standing water after rain in Kalamaja alley — lab media stub',
})

/**
 * @param {string} publicId
 * @returns {{ src: string, alt: string, targetWidth: number, targetHeight: number, fixtureOnly: true }}
 */
export function resolveLabMediaStub(publicId) {
  const alt = LAB_MEDIA_ALT_BY_PUBLIC_ID[publicId]
  if (!alt) {
    throw new Error(`LAB-02: missing authored media alt for ${publicId}`)
  }
  return {
    src: LAB_MEDIA_STUB_PATH,
    alt,
    targetWidth: LAB_MEDIA_STUB_TARGET.width,
    targetHeight: LAB_MEDIA_STUB_TARGET.height,
    /** Fixture-only media contract — not a Closed product API field. */
    fixtureOnly: true,
  }
}
