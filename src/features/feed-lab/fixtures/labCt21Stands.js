/**
 * CT-21 Path A stands on `#/lab/feed` — M152c A–E.
 * previewNodeBudget=3 DFS · Show more one-shot · no Discussion heading · default expanded.
 * No invent HTTP · no invent OP PASS · Partial visual=BLOCK.
 */

import { M153_NEST_BODIES } from '../../thread-mount/index.js'

/** Within-budget nest · 3 DFS nodes · no Show more (M152c A) */
export const CT21_WITHIN_BUDGET = Object.freeze([
  { id: 'ct21-a', parentId: null, depth: 0, body: M153_NEST_BODIES.A },
  { id: 'ct21-a1', parentId: 'ct21-a', depth: 1, body: M153_NEST_BODIES.A1 },
  { id: 'ct21-a1a', parentId: 'ct21-a1', depth: 2, body: M153_NEST_BODIES.A1a },
])

/** Over-budget nest · 5 DFS nodes · Show more (M152c B/C/E) */
export const CT21_OVER_BUDGET = Object.freeze([
  { id: 'ct21-b0', parentId: null, depth: 0, body: M153_NEST_BODIES.A },
  { id: 'ct21-b1', parentId: 'ct21-b0', depth: 1, body: M153_NEST_BODIES.A1 },
  { id: 'ct21-b2', parentId: 'ct21-b1', depth: 2, body: M153_NEST_BODIES.A1a },
  { id: 'ct21-b3', parentId: null, depth: 0, body: M153_NEST_BODIES.B },
  { id: 'ct21-b4', parentId: 'ct21-b3', depth: 1, body: M153_NEST_BODIES.B1 },
])

/**
 * @typedef {object} LabCt21Stand
 * @property {string} id
 * @property {string} panel
 * @property {string} label
 * @property {'loading'|'empty'|'populated'|'unavailable'} status
 * @property {Array|{id:string,parentId:string|null,depth:number,body:string}|null} [comments]
 * @property {boolean|null} [initiallyExpanded]
 * @property {boolean} [narrow]
 * @property {boolean} [branchDisclosure]
 * @property {number} [previewNodeBudget]
 */

/** @type {ReadonlyArray<LabCt21Stand>} */
export const LAB_CT21_STANDS = Object.freeze([
  {
    id: 'A-within',
    panel: 'A',
    label: 'M152c A · within budget (3) · no Show more',
    status: 'populated',
    comments: CT21_WITHIN_BUDGET,
    initiallyExpanded: null,
    branchDisclosure: false,
  },
  {
    id: 'B-trunc',
    panel: 'B',
    label: 'M152c B · truncated first paint · Show more comments',
    status: 'populated',
    comments: CT21_OVER_BUDGET,
    initiallyExpanded: null,
    branchDisclosure: false,
  },
  {
    id: 'C-reveal',
    panel: 'C',
    label: 'M152c C · after Show more (capture clicks)',
    status: 'populated',
    comments: CT21_OVER_BUDGET,
    initiallyExpanded: null,
    branchDisclosure: false,
  },
  {
    id: 'D-empty',
    panel: 'D',
    label: 'M152c D · empty · no Discussion heading',
    status: 'empty',
    comments: [],
    initiallyExpanded: false,
    branchDisclosure: false,
  },
  {
    id: 'E-narrow',
    panel: 'E',
    label: 'M152c E · narrow 390 · truncate grammar',
    status: 'populated',
    comments: CT21_OVER_BUDGET,
    initiallyExpanded: null,
    narrow: true,
    branchDisclosure: false,
  },
])
