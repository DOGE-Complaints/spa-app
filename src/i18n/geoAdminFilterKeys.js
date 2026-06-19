/** @typedef {'geo_district' | 'geo_settlement' | 'geo_region' | 'geo_country' | 'geo_postal_code'} GeoAdminFilterKey */

/** @type {readonly GeoAdminFilterKey[]} */
export const GEO_ADMIN_FILTER_KEYS = Object.freeze([
  'geo_district',
  'geo_settlement',
  'geo_region',
  'geo_country',
  'geo_postal_code',
])

/** @type {Record<GeoAdminFilterKey, string>} */
export const GEO_ADMIN_PAYLOAD_KEYS = Object.freeze({
  geo_district: 'district',
  geo_settlement: 'settlement',
  geo_region: 'region',
  geo_country: 'country',
  geo_postal_code: 'postal_code',
})

/** @type {Record<GeoAdminFilterKey, string>} */
export const GEO_ADMIN_LABEL_KEYS = Object.freeze({
  geo_district: 'filterGeoDistrict',
  geo_settlement: 'filterGeoSettlement',
  geo_region: 'filterGeoRegion',
  geo_country: 'filterGeoCountry',
  geo_postal_code: 'filterGeoPostalCode',
})

/**
 * @returns {Record<GeoAdminFilterKey, string[]>}
 */
export function createEmptyGeoAdminFilters() {
  return {
    geo_district: [],
    geo_settlement: [],
    geo_region: [],
    geo_country: [],
    geo_postal_code: [],
  }
}
