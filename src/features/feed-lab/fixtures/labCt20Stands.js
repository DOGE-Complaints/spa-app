/**
 * CT-20 Path A residual stands on `#/lab/feed` — LAB-1…4 reachability.
 * Coverage M152 loading/empty/unavailable · M153 post-fail · M153a attach-off · maxDepth Reply.
 * No invent HTTP · no invent SSOT panels · no invent OP PASS.
 */

import { M152_ILLUSTRATIVE_BODIES, M153_NEST_BODIES, M153_ILLUSTRATIVE_DRAFT } from '../../thread-mount/index.js'

/** @typedef {'loading'|'empty'|'populated'|'unavailable'} Ct20Status */

/**
 * @typedef {object} LabCt20Stand
 * @property {string} id
 * @property {string} lab
 * @property {string} label
 * @property {Ct20Status} status
 * @property {Array<{id:string,parentId:string|null,depth:number,body:string}>|null} [comments]
 * @property {'allowed'|null} [writeCapability]
 * @property {boolean} [initiallyExpanded]
 * @property {string} [initialDraft]
 * @property {boolean} [branchDisclosure]
 * @property {number} [maxDepth]
 * @property {boolean} [attachmentsAvailable]
 * @property {boolean} [forcePostFail]
 */

/** @type {ReadonlyArray<LabCt20Stand>} */
export const LAB_CT20_STANDS = Object.freeze([
  {
    id: 'LAB1-load',
    lab: 'LAB-1',
    label: 'LAB-1 · loading (M152)',
    status: 'loading',
    comments: null,
    initiallyExpanded: true,
  },
  {
    id: 'LAB1-empty',
    lab: 'LAB-1',
    label: 'LAB-1 · empty (M152)',
    status: 'empty',
    comments: [],
    writeCapability: 'allowed',
    initiallyExpanded: false,
  },
  {
    id: 'LAB1-unavail',
    lab: 'LAB-1',
    label: 'LAB-1 · unavailable (M152)',
    status: 'unavailable',
    comments: null,
    initiallyExpanded: true,
  },
  {
    id: 'LAB2-fail',
    lab: 'LAB-2',
    label: 'LAB-2 · forcePostFail · draft kept (M153 F)',
    status: 'populated',
    comments: [
      { id: 'ct20-f-0', parentId: null, depth: 0, body: M152_ILLUSTRATIVE_BODIES[0] },
    ],
    writeCapability: 'allowed',
    initiallyExpanded: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    forcePostFail: true,
  },
  {
    id: 'LAB3-attach-off',
    lab: 'LAB-3',
    label: 'LAB-3 · attachmentsAvailable=false (M153a F)',
    status: 'populated',
    comments: [
      { id: 'ct20-a-0', parentId: null, depth: 0, body: M152_ILLUSTRATIVE_BODIES[0] },
    ],
    writeCapability: 'allowed',
    initiallyExpanded: true,
    initialDraft: M153_ILLUSTRATIVE_DRAFT,
    attachmentsAvailable: false,
  },
  {
    id: 'LAB4-maxdepth',
    lab: 'LAB-4',
    label: 'LAB-4 · depth≥maxDepth · Reply block (maxDepth=2)',
    status: 'populated',
    comments: [
      { id: 'ct20-t-a', parentId: null, depth: 0, body: M153_NEST_BODIES.A },
      { id: 'ct20-t-a1', parentId: 'ct20-t-a', depth: 1, body: M153_NEST_BODIES.A1 },
      { id: 'ct20-t-a1a', parentId: 'ct20-t-a1', depth: 2, body: M153_NEST_BODIES.A1a },
    ],
    writeCapability: 'allowed',
    initiallyExpanded: true,
    /* disclosure off so depth-2 node is visible for Reply-block assert (LAB-4) */
    branchDisclosure: false,
    maxDepth: 2,
  },
])
