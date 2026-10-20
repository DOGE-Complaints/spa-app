/**
 * LAB-02 static lab feed fixtures — no HTTP · no invent Closed product label API.
 * Visible identity = demo publicId (fixture-only). Visual card compose → LAB-03.
 */

import { resolveLabMediaStub } from './labMediaStub.js'

/**
 * @typedef {object} LabFixtureComment
 * @property {string} id
 * @property {string} body
 * @property {string|null} [parentId]
 * @property {number} [depth]
 * @property {true} fixtureOnly
 */

/**
 * @typedef {object} LabFeedFixture
 * @property {string} publicId — visible demo id (fixture-only; not Closed product label field)
 * @property {string} title
 * @property {string} summary — fixture-authored (not geoHint-only)
 * @property {string} geoHint
 * @property {'PUBLISHED'} status
 * @property {'INCIDENT'} type
 * @property {{ src: string, alt: string, targetWidth: number, targetHeight: number, fixtureOnly: true }} media
 * @property {LabFixtureComment[]} comments
 * @property {true} fixtureOnly
 * @property {true} dataFixture
 */

/** @type {ReadonlyArray<Omit<LabFeedFixture, 'media'>>} */
const LAB_FEED_FIXTURE_DRAFTS = [
  {
    publicId: 'DOGEstonia-UusVeerenni-001',
    title: 'Night construction noise — Uus Veerenni corner',
    summary: 'Residents report repeated late-night construction noise near the corner.',
    geoHint: 'Tallinn',
    status: 'PUBLISHED',
    type: 'INCIDENT',
    comments: [
      { id: 'lab-c-001-a', body: 'Noise after 23:00 again.', fixtureOnly: true },
      { id: 'lab-c-001-b', body: 'Kas keegi juba teatas?', fixtureOnly: true },
    ],
    fixtureOnly: true,
    dataFixture: true,
  },
  {
    publicId: 'DOGEstonia-UusVeerenni-002',
    title: 'Potholes on Pärnu mnt near bus stop',
    summary: 'Deep potholes make the bike lane and bus approach unsafe.',
    geoHint: 'Tallinn',
    status: 'PUBLISHED',
    type: 'INCIDENT',
    /** CR-12 lab: populated aggregate under strip (fixture-only) */
    reactionStripState: 'populated',
    /** CT-14 G-L2: default feed nest depth ≥1 (spine OP-eye) · ≤2 comments · no invent HTTP */
    comments: [
      { id: 'lab-c-002-a', body: 'Bike lane is unsafe here.', fixtureOnly: true },
      {
        id: 'lab-c-002-a1',
        parentId: 'lab-c-002-a',
        depth: 1,
        body: 'City should patch the approach lane soon.',
        fixtureOnly: true,
      },
    ],
    fixtureOnly: true,
    dataFixture: true,
  },
  {
    publicId: 'DOGEstonia-UusVeerenni-003',
    title: 'Overflowing bins at Kadriorg playground',
    summary: 'Weekend rush filled playground bins; litter spills onto paths.',
    geoHint: 'Tallinn',
    status: 'PUBLISHED',
    type: 'INCIDENT',
    comments: [
      { id: 'lab-c-003-a', body: 'Weekend rush filled them fast.', fixtureOnly: true },
      { id: 'lab-c-003-b', body: 'Lapsed ei saa mänguväljakul olla.', fixtureOnly: true },
    ],
    fixtureOnly: true,
    dataFixture: true,
  },
  {
    publicId: 'DOGEstonia-UusVeerenni-004',
    title: 'Broken streetlight on Telliskivi block',
    summary: 'Dark stretch near the corner shop after the streetlight failed.',
    geoHint: 'Tallinn',
    status: 'PUBLISHED',
    type: 'INCIDENT',
    /** CT-15 G-M3: greenfield card wires narrow · sticky composer (not only CT08 E) */
    narrow: true,
    comments: [
      { id: 'lab-c-004-a', body: 'Dark corner near the corner shop.', fixtureOnly: true },
    ],
    fixtureOnly: true,
    dataFixture: true,
  },
  {
    publicId: 'DOGEstonia-UusVeerenni-005',
    title: 'Standing water after rain — Kalamaja alley',
    summary: 'Blocked drain leaves standing water in the alley for a second day.',
    geoHint: 'Tallinn',
    status: 'PUBLISHED',
    type: 'INCIDENT',
    comments: [
      { id: 'lab-c-005-a', body: 'Drain looks blocked.', fixtureOnly: true },
      { id: 'lab-c-005-b', body: 'Vesi seisab juba teist päeva.', fixtureOnly: true },
    ],
    fixtureOnly: true,
    dataFixture: true,
  },
]

/**
 * Exactly five lab fixtures (frozen). Loader is sync / static — no fetch.
 * @returns {ReadonlyArray<LabFeedFixture>}
 */
export function loadLabFeedFixtures() {
  return LAB_FEED_FIXTURE_DRAFTS.map((draft) =>
    Object.freeze({
      ...draft,
      narrow: Boolean(draft.narrow),
      branchDisclosure: draft.branchDisclosure === true ? true : undefined,
      reactionStripState: draft.reactionStripState || 'empty',
      comments: draft.comments.map((c) =>
        Object.freeze({
          ...c,
          parentId: c.parentId == null ? null : c.parentId,
          depth: Number.isFinite(c.depth) ? c.depth : 0,
        }),
      ),
      media: Object.freeze(resolveLabMediaStub(draft.publicId)),
    }),
  )
}

/** Frozen catalog for import sites that need a constant. */
export const LAB_FEED_FIXTURES = Object.freeze(loadLabFeedFixtures())
