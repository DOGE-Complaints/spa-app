/**
 * NS-03 T02 — own-story rail data for ProfileRail.
 *
 * Cabinet SPA wire lives in `useCabinetStoryActivity` (CAB-08). ProfileRail stays
 * honest-empty until a dedicated rail wire story — no invent rows here.
 *
 * @returns {{ status: 'empty', metrics: null, stories: [] }}
 */
export function useStoryActivityRail() {
  return {
    status: 'empty',
    metrics: null,
    stories: [],
  }
}
