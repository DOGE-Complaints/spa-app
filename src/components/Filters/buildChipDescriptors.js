import { formatLabelKey } from '../../i18n/labelDisplay.js'
import { GEO_ADMIN_FILTER_KEYS, GEO_ADMIN_LABEL_KEYS } from '../../i18n/geoAdminFilterKeys.js'

/**
 * @typedef {'status' | 'type' | 'labels' | 'search' | 'institution' | 'created_after' | 'created_before' | import('../../i18n/geoAdminFilterKeys.js').GeoAdminFilterKey} ChipField
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
 * @param {(institutionValue: string) => string} [formatInstitution]
 * @returns {FilterChipDescriptor[]}
 */
export function buildChipDescriptors(applied, t, locale, formatInstitution = (value) => value) {
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

  if (applied.institution.trim()) {
    const institutionLabel = formatInstitution(applied.institution)
    chips.push({
      id: `institution:${applied.institution}`,
      field: 'institution',
      value: applied.institution,
      label: `${t('filterInstitution')}: ${institutionLabel}`,
      removeAriaLabel: `${t('clear')} ${t('filterInstitution')} ${institutionLabel}`,
    })
  }

  if (applied.created_after.trim()) {
    chips.push({
      id: `created_after:${applied.created_after}`,
      field: 'created_after',
      value: applied.created_after,
      label: `${t('filterDateFrom')}: ${applied.created_after}`,
      removeAriaLabel: `${t('clear')} ${t('filterDateFrom')}`,
    })
  }

  if (applied.created_before.trim()) {
    chips.push({
      id: `created_before:${applied.created_before}`,
      field: 'created_before',
      value: applied.created_before,
      label: `${t('filterDateTo')}: ${applied.created_before}`,
      removeAriaLabel: `${t('clear')} ${t('filterDateTo')}`,
    })
  }

  for (const geoKey of GEO_ADMIN_FILTER_KEYS) {
    const values = applied[geoKey] ?? []
    const dimensionLabel = t(GEO_ADMIN_LABEL_KEYS[geoKey])
    for (const value of values) {
      chips.push({
        id: `${geoKey}:${value}`,
        field: geoKey,
        value,
        label: `${dimensionLabel}: ${value}`,
        removeAriaLabel: `${t('clear')} ${dimensionLabel} ${value}`,
      })
    }
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
