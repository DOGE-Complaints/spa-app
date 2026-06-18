const LOCALE_BCP47 = Object.freeze({
  et: 'et-EE',
  ru: 'ru-RU',
  en: 'en-GB',
})

/**
 * @param {string} isoDate YYYY-MM-DD
 * @param {string | undefined} locale et | ru | en
 * @returns {string}
 */
export function formatBoardDateDisplay(isoDate, locale) {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return ''
  }

  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  const bcp47 = LOCALE_BCP47[locale] ?? LOCALE_BCP47.en

  return new Intl.DateTimeFormat(bcp47, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
