import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getNetworkPulse } from '../../services/networkPulseService.js'
import { getEmergingSignals } from '../../services/emergingSignalsService.js'
import { getStoryGptHref, hasStoryGptUrl } from '../../config/storyGptUrl.js'
import { Button } from '../Button/Button.jsx'
import { MISSING_FRAMING_CATEGORIES } from './WhatsMissingBlock.jsx'
import './ContinuumResidual.css'

export const CONTINUUM_RAIL_ICONS = Object.freeze({
  emerging: '/icons/early-signal-dashboard/ic-emerging-marker.png',
  missing: '/icons/early-signal-dashboard/ic-rail-missing.png',
  help: '/icons/early-signal-dashboard/ic-help-share.png',
  external: '/icons/public-home/ic-external-link.png',
  lock: '/icons/story-handoff/ic-lock.png',
})

function formatStoryCount(template, count) {
  return String(template).replace('{count}', String(count))
}

export function ContinuumResidual() {
  const { t } = useI18n()
  const [pulse, setPulse] = useState({ status: 'omit', slots: [] })
  const [emerging, setEmerging] = useState({ status: 'empty', cards: [] })
  const submitHref = getStoryGptHref()
  const submitExternal = hasStoryGptUrl()

  useEffect(() => {
    let cancelled = false
    getNetworkPulse().then((result) => {
      if (!cancelled) setPulse(result)
    })
    getEmergingSignals().then((result) => {
      if (!cancelled) setEmerging(result)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const pulseBound = pulse.status === 'bound' && Array.isArray(pulse.slots) && pulse.slots.length > 0
  const emergingCard =
    emerging.status === 'cards' && Array.isArray(emerging.cards) && emerging.cards.length > 0
      ? emerging.cards[0]
      : null

  return (
    <aside className="continuum-residual" data-testid="continuum-residual" aria-label={t('earlySignal.continuum.title')}>
      <header className="continuum-residual__header">
        <h3 className="continuum-residual__title">{t('earlySignal.continuum.title')}</h3>
        <p className="continuum-residual__message">{t('earlySignal.continuum.message')}</p>
        <p className="continuum-residual__hint">{t('earlySignal.continuum.residualHint')}</p>
        <a className="continuum-residual__view" href="#issue-feed">
          {t('earlySignal.continuum.viewIssues')}
        </a>
      </header>

      {pulseBound ? (
        <section className="continuum-residual__slot" data-testid="continuum-pulse">
          <p className="continuum-residual__slot-title">{t('earlySignal.pulse.title')}</p>
          <ul className="continuum-residual__metrics">
            {pulse.slots.map((slot) => (
              <li key={slot.id} className="continuum-residual__metric">
                <span>{t(slot.labelKey)}</span>
                <strong>{slot.value}</strong>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {emergingCard ? (
        <section className="continuum-residual__slot" data-testid="continuum-emerging">
          <p className="continuum-residual__slot-title">{t('earlySignal.emerging.title')}</p>
          <div className="continuum-residual__emerging">
            <img src={CONTINUUM_RAIL_ICONS.emerging} alt="" width={16} height={16} />
            <div>
              <p className="continuum-residual__emerging-label">{emergingCard.label}</p>
              <p className="continuum-residual__emerging-count">
                {formatStoryCount(t('earlySignal.emerging.storyCount'), emergingCard.storyCount)}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="continuum-residual__slot" data-testid="continuum-missing">
        <p className="continuum-residual__slot-title">
          <img src={CONTINUUM_RAIL_ICONS.missing} alt="" width={16} height={16} />
          <span>{t('earlySignal.missing.title')}</span>
        </p>
        <ul className="continuum-residual__missing">
          {MISSING_FRAMING_CATEGORIES.map((category) => (
            <li key={category.id}>{t(category.labelKey)}</li>
          ))}
        </ul>
      </section>

      <section className="continuum-residual__slot continuum-residual__help" data-testid="continuum-help">
        <p className="continuum-residual__slot-title">
          <img src={CONTINUUM_RAIL_ICONS.help} alt="" width={16} height={16} />
          <span>{t('earlySignal.help.title')}</span>
        </p>
        <Button
          hierarchy="secondary"
          size="small"
          href={submitHref}
          external={submitExternal}
          ariaLabel={t('earlySignal.help.submitAccessible')}
          trailingIcon={
            <img
              src={submitExternal ? CONTINUUM_RAIL_ICONS.external : CONTINUUM_RAIL_ICONS.lock}
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />
          }
          data-testid="continuum-help-cta"
        >
          {t('earlySignal.help.submit')}
        </Button>
      </section>
    </aside>
  )
}
