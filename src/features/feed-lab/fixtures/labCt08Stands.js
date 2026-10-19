/**
 * CT-08 Path A stands on `#/lab/feed` — M152 A–E · M153 TREE · M157 GATE.
 * FixtureAdapter / lab bodies only · no invent HTTP · no invent Identity.
 */

import { M152_ILLUSTRATIVE_BODIES, M153_NEST_BODIES } from '../../thread-mount/index.js'

/** @typedef {'loading'|'empty'|'populated'|'unavailable'} Ct08Status */

/**
 * @typedef {object} LabCt08Stand
 * @property {string} id
 * @property {string} label
 * @property {Ct08Status} status
 * @property {Array<{id:string,parentId:string|null,depth:number,body:string}>|null} [comments]
 * @property {'allowed'|'unverified'|'denied-unknown'|null} [writeCapability]
 * @property {string|null} [verifyGateVariant]
 * @property {boolean} [narrow]
 * @property {boolean} [initiallyExpanded]
 * @property {string} [initialDraft]
 * @property {boolean} [branchDisclosure]
 */

/** @type {ReadonlyArray<LabCt08Stand>} */
export const LAB_CT08_STANDS = Object.freeze([
  {
    id: 'A',
    label: 'A · loading',
    status: 'loading',
    comments: null,
    initiallyExpanded: true,
  },
  {
    id: 'B',
    label: 'B · empty',
    status: 'empty',
    comments: [],
    writeCapability: 'allowed',
    /* CT-10: entry-only first paint · activate opens composer */
    initiallyExpanded: false,
  },
  {
    id: 'C',
    label: 'C · populated (M152 bodies)',
    status: 'populated',
    comments: [
      { id: 'ct08-c-0', parentId: null, depth: 0, body: M152_ILLUSTRATIVE_BODIES[0] },
      { id: 'ct08-c-1', parentId: null, depth: 0, body: M152_ILLUSTRATIVE_BODIES[1] },
    ],
    writeCapability: 'allowed',
    initiallyExpanded: true,
  },
  {
    id: 'D',
    label: 'D · unavailable',
    status: 'unavailable',
    comments: null,
    initiallyExpanded: true,
  },
  {
    id: 'E',
    label: 'E · narrow populated',
    status: 'populated',
    comments: [
      { id: 'ct08-e-0', parentId: null, depth: 0, body: M152_ILLUSTRATIVE_BODIES[0] },
    ],
    writeCapability: 'allowed',
    narrow: true,
    initiallyExpanded: true,
  },
  {
    id: 'TREE',
    label: 'TREE · nest M153',
    status: 'populated',
    comments: [
      { id: 'ct08-t-a', parentId: null, depth: 0, body: M153_NEST_BODIES.A },
      { id: 'ct08-t-a1', parentId: 'ct08-t-a', depth: 1, body: M153_NEST_BODIES.A1 },
      { id: 'ct08-t-a1a', parentId: 'ct08-t-a1', depth: 2, body: M153_NEST_BODIES.A1a },
      { id: 'ct08-t-b', parentId: null, depth: 0, body: M153_NEST_BODIES.B },
    ],
    writeCapability: 'allowed',
    initiallyExpanded: true,
    branchDisclosure: true,
  },
  {
    id: 'GATE',
    label: 'GATE · unverified M157',
    status: 'populated',
    comments: [
      { id: 'ct08-g-0', parentId: null, depth: 0, body: M152_ILLUSTRATIVE_BODIES[0] },
    ],
    writeCapability: 'unverified',
    verifyGateVariant: 'blocked',
    initiallyExpanded: true,
    initialDraft: 'Draft stays until you verify and post.',
  },
])
