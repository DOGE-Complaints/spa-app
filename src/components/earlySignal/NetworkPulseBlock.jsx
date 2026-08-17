import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getNetworkPulse } from '../../services/networkPulseService.js'
import './NetworkPulseBlock.css'

const HEADER_MARK = '/icons/early-signal-dashboard/ic-pulse-mark.png'
const INFO_ICON = '/icons/story-handoff/ic-info.png'

export function NetworkPulseBlock() {
  const { t } = useI18n()
  const [view, setView] = useState({ status: 'omit', slots: [] })

  useEffect(() => {
    let cancelled = false
    getNetworkPulse().then((result) => {
      if (!cancelled) setView(result)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const bound = view.status === 'bound' && Array.isArray(view.slots) && view.slots.length > 0

  return (
    <div
      className={`network-pulse-block${bound ? ' network-pulse-block--bound' : ' network-pulse-block--omit'}`}
      data-testid={bound ? 'network-pulse-bound' : 'network-pulse-omit'}
    >
      <div className="network-pulse-block__chrome">
        <img src={HEADER_MARK} alt="" className="network-pulse-block__mark" width={20} height={20} />
      </div>

      {bound ? (
        <>
          <ul className="network-pulse-metrics">
            {view.slots.map((slot) => (
              <li
                key={slot.id}
                className="network-pulse-metric"
                data-testid={`network-pulse-metric-${slot.id}`}
              >
                {slot.icon ? (
                  <img src={slot.icon} alt="" className="network-pulse-metric__icon" width={16} height={16} />
                ) : null}
                <span className="network-pulse-metric__label">{t(slot.labelKey)}</span>
                <strong className="network-pulse-metric__value">{slot.value}</strong>
              </li>
            ))}
          </ul>
          {view.slots.some((slot) => slot.id === 'areas') ? (
            <p className="network-pulse-honesty">{t('earlySignal.pulse.areasHonesty')}</p>
          ) : null}
        </>
      ) : (
        <>
          <div className="network-pulse-density" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className="network-pulse-omit-copy" data-testid="network-pulse-omit-message">
            {t('earlySignal.pulse.omitMessage')}
          </p>
        </>
      )}

      <p className="network-pulse-listening">
        <img src={INFO_ICON} alt="" className="network-pulse-listening__icon" width={14} height={14} />
        <span>{t('earlySignal.pulse.listening')}</span>
      </p>
    </div>
  )
}
