import { useI18n } from '../../i18n/I18nProvider.jsx'
import './EarlySignalDiscovery.css'

const DISCOVERY_SLOTS = Object.freeze([
  { id: 'pulse', testId: 'early-signal-slot-pulse', titleKey: 'earlySignal.pulse.title' },
  { id: 'forming', testId: 'early-signal-slot-forming', titleKey: 'earlySignal.forming.title' },
  { id: 'emerging', testId: 'early-signal-slot-emerging', titleKey: 'earlySignal.emerging.title' },
  { id: 'missing', testId: 'early-signal-slot-missing', titleKey: 'earlySignal.missing.title' },
  { id: 'help', testId: 'early-signal-slot-help', titleKey: 'earlySignal.help.title' },
])

/**
 * Pre-cluster discovery composition (M136 / ES-01).
 * Child Pulse/Emerging HTTP and Help CTA land in ES-02…04 — slots stay titled placeholders.
 */
export function EarlySignalDiscovery() {
  const { t } = useI18n()
  const rootLabel = t('earlySignal.discovery.rootLabel')

  return (
    <section
      className="early-signal-discovery"
      data-testid="board-early-signal-discovery"
      aria-label={rootLabel}
    >
      <header className="early-signal-discovery__intro">
        <h2 className="early-signal-discovery__title">{rootLabel}</h2>
        <p className="early-signal-discovery__lede">{t('earlySignal.discovery.intro')}</p>
      </header>
      <div className="early-signal-slots">
        {DISCOVERY_SLOTS.map((slot) => (
          <section
            key={slot.id}
            className={`early-signal-slot early-signal-slot--${slot.id}`}
            data-testid={slot.testId}
            aria-labelledby={`early-signal-slot-${slot.id}-title`}
          >
            <h3 id={`early-signal-slot-${slot.id}-title`} className="early-signal-slot__title">
              {t(slot.titleKey)}
            </h3>
          </section>
        ))}
      </div>
    </section>
  )
}
