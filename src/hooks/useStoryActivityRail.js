/**
 * NS-03 T02 — own-story rail data for ProfileRail.
 *
 * CAB/gateway `GET /story-activity` exists (BE ✅). SPA HTTP client is **not** wired.
 * Returns honest empty — no invented gateway fields / fake story cards.
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
