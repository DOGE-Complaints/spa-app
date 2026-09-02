import {
  formatSchemaCardValue,
  hasSchemaCardOverlay,
  listSchemaCardEntries,
  resolveSchemaCardFieldLabel,
} from '../../i18n/schemaRuntimeDictionary.js'
import './SchemaCardOverlay.css'

const COMPACT_COLLAPSE_AFTER = 4

/**
 * Optional Additional details block for issue.schema_card (M141).
 * MUST NOT render structured_payload or invent keys.
 *
 * @param {object} props
 * @param {import('../../domain/types.js').IssueSchemaCard=} props.schemaCard
 * @param {(k: string) => string} props.t
 * @param {'compact'|'detail'} [props.density]
 */
export function SchemaCardOverlay({ schemaCard, t, density = 'compact' }) {
  if (!hasSchemaCardOverlay(schemaCard)) return null

  const entries = listSchemaCardEntries(schemaCard)
  const collapse =
    density === 'compact' && entries.length > COMPACT_COLLAPSE_AFTER
  const visible = collapse ? entries.slice(0, COMPACT_COLLAPSE_AFTER) : entries
  const hiddenCount = collapse ? entries.length - COMPACT_COLLAPSE_AFTER : 0

  return (
    <section
      className={`schema-card-overlay schema-card-overlay--${density}`}
      data-testid="schema-card-overlay"
      data-density={density}
      aria-label={t('schemaRuntime.overlay.sectionTitle')}
    >
      <h4 className="schema-card-overlay-title">{t('schemaRuntime.overlay.sectionTitle')}</h4>
      <dl className="schema-card-overlay-list">
        {visible.map(({ path, value }) => (
          <div key={path} className="schema-card-overlay-row" data-schema-path={path}>
            <dt className="schema-card-overlay-label">{resolveSchemaCardFieldLabel(t, path)}</dt>
            <dd className="schema-card-overlay-value">{formatSchemaCardValue(value)}</dd>
          </div>
        ))}
      </dl>
      {hiddenCount > 0 ? (
        <p className="schema-card-overlay-more" data-testid="schema-card-overlay-more">
          {t('schemaRuntime.overlay.showMore')}
        </p>
      ) : null}
    </section>
  )
}
