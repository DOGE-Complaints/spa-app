import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getNetworkPulse } from '../../services/networkPulseService.js'
import './WhatsMissingBlock.css'

export const MISSING_CATEGORY_ICONS = Object.freeze({
  areas: '/icons/story-handoff/ic-field-location.png',
  languages: '/icons/early-signal-dashboard/ic-gap-languages.png',
  groups: '/icons/identity/ic-profile-conflict.png',
  themes: '/icons/story-handoff/ic-field-institution.png',
  other: '/icons/early-signal-dashboard/ic-gap-ellipsis.png',
})

export const MISSING_FRAMING_CATEGORIES = Object.freeze([
  { id: 'areas', labelKey: 'earlySignal.missing.areas', icon: MISSING_CATEGORY_ICONS.areas, pulseId: 'areas' },
  { id: 'languages', labelKey: 'earlySignal.missing.languages', icon: MISSING_CATEGORY_ICONS.languages, pulseId: 'languages' },
  { id: 'groups', labelKey: 'earlySignal.missing.groups', icon: MISSING_CATEGORY_ICONS.groups, pulseId: null },
  { id: 'themes', labelKey: 'earlySignal.missing.themes', icon: MISSING_CATEGORY_ICONS.themes, pulseId: 'topics' },
])

const PULSE_LABEL_IDS = Object.freeze(['areas', 'languages', 'topics'])

function pulseLabelIds(view) {
  if (view?.status !== 'bound' || !Array.isArray(view.slots)) return []
  return view.slots.map((slot) => slot.id).filter((id) => PULSE_LABEL_IDS.includes(id))
}

export function WhatsMissingBlock() {
  const { t } = useI18n()
  const [pulse, setPulse] = useState({ status: 'omit', slots: [] })

  useEffect(() => {
    let cancelled = false
    getNetworkPulse().then((result) => {
      if (!cancelled) setPulse(result)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const fromPulse = pulseLabelIds(pulse)

  return (
    <div className="whats-missing-block" data-testid="whats-missing">
      <p className="whats-missing-block__intro">{t('earlySignal.missing.intro')}</p>
      <ul className="whats-missing-list" data-testid="whats-missing-categories">
        {MISSING_FRAMING_CATEGORIES.map((category) => {
          const pulseHint = category.pulseId && fromPulse.includes(category.pulseId)
          return (
            <li
              key={category.id}
              className="whats-missing-row"
              data-testid={`whats-missing-row-${category.id}`}
              data-pulse-label={pulseHint ? 'yes' : 'no'}
            >
              <img
                src={category.icon}
                alt=""
                className="whats-missing-row__icon"
                width={16}
                height={16}
              />
              <span className="whats-missing-row__label">{t(category.labelKey)}</span>
            </li>
          )
        })}
      </ul>
      <img
        src={MISSING_CATEGORY_ICONS.other}
        alt=""
        className="whats-missing-block__ellipsis"
        width={16}
        height={16}
        aria-hidden="true"
      />
    </div>
  )
}
