/** Schema Runtime overlay + map L10N (en canon M141 §10 / M142). */

export const SCHEMA_RUNTIME_DICTIONARY_EN = Object.freeze({
  schemaRuntime: {
    overlay: {
      sectionTitle: 'Additional details',
      showMore: 'Show more details',
    },
    cardField: {
      signals: {
        desired_outcome: 'Desired outcome',
        affected_group: 'Affected group',
        service_object: 'Service object',
      },
    },
    map: {
      toggle: {
        list: 'List',
        map: 'Map',
      },
      ineligible:
        'Map unavailable: no Issues in these results have public coordinates.',
      emptyPins: 'No locations to show on the map for this view',
      partialHint: 'Issues without public coordinates remain available in List view.',
      pinOpen: 'Open issue',
    },
  },
})

export const SCHEMA_RUNTIME_DICTIONARY_ET = Object.freeze({
  schemaRuntime: {
    overlay: {
      sectionTitle: 'Lisainfo',
      showMore: 'Näita rohkem üksikasju',
    },
    cardField: {
      signals: {
        desired_outcome: 'Soovitud tulemus',
        affected_group: 'Mõjutatud grupp',
        service_object: 'Teenuse objekt',
      },
    },
    map: {
      toggle: {
        list: 'Nimekiri',
        map: 'Kaart',
      },
      ineligible:
        'Kaart pole saadaval: ühelgi teemal selles tulemuses pole avalikke koordinaate.',
      emptyPins: 'Selle vaate jaoks pole kaardil asukohti',
      partialHint: 'Teemad ilma avalike koordinaatideta jäävad Nimekirja vaatesse.',
      pinOpen: 'Ava teema',
    },
  },
})

export const SCHEMA_RUNTIME_DICTIONARY_RU = Object.freeze({
  schemaRuntime: {
    overlay: {
      sectionTitle: 'Дополнительные сведения',
      showMore: 'Показать подробнее',
    },
    cardField: {
      signals: {
        desired_outcome: 'Желаемый результат',
        affected_group: 'Затронутая группа',
        service_object: 'Объект услуги',
      },
    },
    map: {
      toggle: {
        list: 'Список',
        map: 'Карта',
      },
      ineligible:
        'Карта недоступна: ни у одной темы в этих результатах нет публичных координат.',
      emptyPins: 'Для этого вида нет точек на карте',
      partialHint: 'Темы без публичных координат остаются в виде Список.',
      pinOpen: 'Открыть тему',
    },
  },
})

export const SCHEMA_RUNTIME_DICTIONARY_BY_LOCALE = Object.freeze({
  en: SCHEMA_RUNTIME_DICTIONARY_EN,
  et: SCHEMA_RUNTIME_DICTIONARY_ET,
  ru: SCHEMA_RUNTIME_DICTIONARY_RU,
})

export const SCHEMA_RUNTIME_FLAT_KEYS = Object.freeze([
  'schemaRuntime.overlay.sectionTitle',
  'schemaRuntime.overlay.showMore',
  'schemaRuntime.cardField.signals.desired_outcome',
  'schemaRuntime.cardField.signals.affected_group',
  'schemaRuntime.cardField.signals.service_object',
  'schemaRuntime.map.toggle.list',
  'schemaRuntime.map.toggle.map',
  'schemaRuntime.map.ineligible',
  'schemaRuntime.map.emptyPins',
  'schemaRuntime.map.partialHint',
  'schemaRuntime.map.pinOpen',
])

/**
 * @param {unknown} schemaCard
 * @returns {boolean}
 */
export function hasSchemaCardOverlay(schemaCard) {
  return Boolean(schemaCard) && typeof schemaCard === 'object' && !Array.isArray(schemaCard) && Object.keys(schemaCard).length > 0
}

/**
 * Resolve human label for a gateway dotted-path key.
 * Missing dictionary → return dotted-path + DEV warn (FR-SSR-02.8).
 * @param {(key: string) => string} t
 * @param {string} dottedPath
 * @returns {string}
 */
export function resolveSchemaCardFieldLabel(t, dottedPath) {
  const key = `schemaRuntime.cardField.${dottedPath}`
  const label = t(key)
  if (label === key) {
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
      console.warn(`[schemaRuntime] missing i18n for ${dottedPath}`)
    }
    return dottedPath
  }
  return label
}

/**
 * @param {unknown} value
 * @returns {string}
 */
export function formatSchemaCardValue(value) {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return '—'
}

/**
 * Ordered entries from schema_card object (gateway key order).
 * @param {Record<string, unknown>} schemaCard
 * @returns {{ path: string, value: unknown }[]}
 */
export function listSchemaCardEntries(schemaCard) {
  if (!hasSchemaCardOverlay(schemaCard)) return []
  return Object.keys(schemaCard).map((path) => ({ path, value: schemaCard[path] }))
}
