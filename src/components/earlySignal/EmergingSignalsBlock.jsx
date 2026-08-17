import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getEmergingSignals } from '../../services/emergingSignalsService.js'
import './EmergingSignalsBlock.css'

export const EMERGING_ICONS = Object.freeze({
  marker: '/icons/early-signal-dashboard/ic-emerging-marker.png',
  empty: '/icons/early-signal-dashboard/ic-emerging-empty.png',
  stories: '/icons/early-signal-dashboard/ic-pulse-stories.png',
  issueCrest: '/assets/DOGEstonia-logo-big.png',
})

function formatStoryCount(template, count) {
  return String(template).replace('{count}', String(count))
}

export function EmergingSignalsBlock() {
  const { t } = useI18n()
  const [view, setView] = useState({ status: 'empty', cards: [] })

  useEffect(() => {
    let cancelled = false
    getEmergingSignals().then((result) => {
      if (!cancelled) setView(result)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const bound = view.status === 'cards' && Array.isArray(view.cards) && view.cards.length > 0

  return (
    <div
      className={`emerging-signals-block${bound ? ' emerging-signals-block--cards' : ' emerging-signals-block--empty'}`}
      data-testid={bound ? 'emerging-signals' : 'emerging-signals-empty'}
    >
      {bound ? (
        <ul className="emerging-signals-list">
          {view.cards.map((card) => (
            <li
              key={`${card.label}|${card.axis}|${card.storyCount}`}
              className="emerging-signal-card"
              data-testid="emerging-signal-card"
            >
              <div className="emerging-signal-card__chrome">
                <img
                  src={EMERGING_ICONS.marker}
                  alt=""
                  className="emerging-signal-card__marker"
                  width={18}
                  height={18}
                />
                <span className="emerging-signal-card__badge">{t('earlySignal.emerging.provisionalBadge')}</span>
              </div>
              <p className="emerging-signal-card__label">{card.label}</p>
              {card.axis ? <p className="emerging-signal-card__axis">{card.axis}</p> : null}
              <p className="emerging-signal-card__helper">{t('earlySignal.emerging.cardHelper')}</p>
              <p className="emerging-signal-card__count">
                <img
                  src={EMERGING_ICONS.stories}
                  alt=""
                  className="emerging-signal-card__count-icon"
                  width={14}
                  height={14}
                />
                <span>{formatStoryCount(t('earlySignal.emerging.storyCount'), card.storyCount)}</span>
              </p>
              <div className="emerging-signals-density" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <img
            src={EMERGING_ICONS.empty}
            alt=""
            className="emerging-signals-block__empty-icon"
            width={28}
            height={28}
          />
          <p className="emerging-signals-empty-copy" data-testid="emerging-signals-empty-message">
            {t('earlySignal.emerging.empty')}
          </p>
          <div className="emerging-signals-density emerging-signals-density--empty" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </>
      )}
    </div>
  )
}
