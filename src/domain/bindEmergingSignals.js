/**
 * Normative UI bind map (api-req §3 / FR-ES-03.2).
 * Bind label / axis / story_count only. Never Issue ids as primary identity.
 */
export function bindEmergingSignals(data) {
  if (!data || typeof data !== 'object') return []
  const raw = data.signals
  if (!Array.isArray(raw)) return []

  const cards = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const label = typeof item.label === 'string' ? item.label.trim() : ''
    const axis = typeof item.axis === 'string' ? item.axis.trim() : ''
    const storyCount = item.story_count
    const isCount =
      typeof storyCount === 'number' && Number.isFinite(storyCount) && storyCount >= 0 && Math.floor(storyCount) === storyCount
    if (!label || !isCount) continue
    cards.push({
      label,
      axis,
      storyCount,
    })
  }
  return cards
}
