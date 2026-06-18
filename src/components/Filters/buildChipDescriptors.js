import { formatLabelKey } from '../../i18n/labelDisplay.js'

/**
 * @typedef {'status' | 'type' | 'labels' | 'search'} ChipField
 */

/**
 * @typedef {Object} FilterChipDescriptor
 * @property {string} id
 * @property {ChipField} field
 * @property {string} value
 * @property {string} label
 * @property {string} removeAriaLabel
 */

/**
 * @param {import('../../router/boardFilterState.js').BoardFilterState} applied
 * @param {(key: string) => string} t
 * @param {string} locale
 * @returns {FilterChipDescriptor[]}
 */
export function buildChipDescriptors(applied, t, locale) {
  /** @type {FilterChipDescriptor[]} */
  const chips = []

  for (const status of applied.status) {
    const statusLabel = t(`status.${status}`)
    chips.push({
      id: `status:${status}`,
      field: 'status',
      value: status,
      label: `${t('filterStatus')}: ${statusLabel}`,
      removeAriaLabel: `${t('clear')} ${t('filterStatus')} ${statusLabel}`,
    })
  }

  if (applied.type) {
    const typeLabel = t(`issueType.${applied.type}`)
    chips.push({
      id: `type:${applied.type}`,
      field: 'type',
      value: applied.type,
      label: `${t('filterType')}: ${typeLabel}`,
      removeAriaLabel: `${t('clear')} ${t('filterType')} ${typeLabel}`,
    })
  }

  for (const labelKey of applied.labels) {
    const labelText = formatLabelKey(t, labelKey, locale)
    chips.push({
      id: `labels:${labelKey}`,
      field: 'labels',
      value: labelKey,
      label: `${t('filterLabels')}: ${labelText}`,
      removeAriaLabel: `${t('clear')} ${t('filterLabels')} ${labelText}`,
    })
  }

  const search = applied.search.trim()
  if (search) {
    chips.push({
      id: `search:${search}`,
      field: 'search',
      value: search,
      label: `${t('searchPlaceholder')}: ${search}`,
      removeAriaLabel: `${t('clear')} ${t('searchPlaceholder')}`,
    })
  }

  return chips
}
