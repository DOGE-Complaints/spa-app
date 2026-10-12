/**
 * Closed results-context status from existing host flags (no invent metrics API).
 *
 * @param {{
 *   showResults?: boolean,
 *   loading?: boolean,
 *   showFilteredEmpty?: boolean,
 *   searchActive?: boolean,
 * }} flags
 * @returns {'idle'|'populated'|'refreshing'|'filtered'|'search'}
 */
export function selectResultsContextStatus({
  showResults = false,
  loading = false,
  showFilteredEmpty = false,
  searchActive = false,
} = {}) {
  if (showResults && loading) return 'refreshing'
  if (showFilteredEmpty && searchActive) return 'search'
  if (showFilteredEmpty) return 'filtered'
  if (showResults) return 'populated'
  return 'idle'
}
