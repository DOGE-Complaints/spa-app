/**
 * Resolve people popover vs full sheet from viewport (mobile ≤640px → sheet).
 * CR-19 / M155 Panel C — people path only (picker uses resolvePickerSurface).
 * @param {'auto'|'popover'|'sheet'} force
 * @returns {'popover'|'sheet'}
 */
export function resolvePeopleSurface(force = 'auto') {
  if (force === 'popover' || force === 'sheet') return force
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'popover'
  return window.matchMedia('(max-width: 640px)').matches ? 'sheet' : 'popover'
}
