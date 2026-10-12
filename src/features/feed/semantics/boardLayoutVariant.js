/**
 * Closed BoardLayout variant from available width (DS §2 / dashboard-layout-spec).
 * Presentation-only — no invent data/API.
 *
 * @param {number} width
 * @returns {'compact'|'medium'|'wide'}
 */
export function selectBoardLayoutVariant(width = 0) {
  const w = Number(width) || 0
  if (w < 768) return 'compact'
  if (w < 1200) return 'medium'
  return 'wide'
}
