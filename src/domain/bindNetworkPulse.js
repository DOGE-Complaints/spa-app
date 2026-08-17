/**
 * Normative UI bind map (api-req §2.2 / AC-SPA-ES-08).
 * Contributors / Voices are never bound.
 */
export const PULSE_BIND_SLOTS = Object.freeze([
  {
    id: 'stories',
    field: 'stories_collected',
    kind: 'int',
    icon: '/icons/early-signal-dashboard/ic-pulse-stories.png',
    labelKey: 'earlySignal.pulse.metric.stories',
  },
  {
    id: 'areas',
    field: 'areas',
    kind: 'list',
    icon: '/icons/story-handoff/ic-field-location.png',
    labelKey: 'earlySignal.pulse.metric.areas',
  },
  {
    id: 'languages',
    field: 'languages',
    kind: 'list',
    icon: null,
    labelKey: 'earlySignal.pulse.metric.languages',
  },
  {
    id: 'topics',
    field: 'topics',
    kind: 'list',
    icon: null,
    labelKey: 'earlySignal.pulse.metric.topics',
  },
  {
    id: 'activity',
    field: 'recent_stories_7d',
    kind: 'int',
    icon: '/icons/early-signal-dashboard/ic-pulse-activity.png',
    labelKey: 'earlySignal.pulse.metric.activity',
  },
])

const FORBIDDEN_FIELDS = Object.freeze([
  'contributors',
  'voices',
  'submitter_count',
  'issue_count',
  'issues',
])

function isNonNegInt(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && Math.floor(value) === value
}

/**
 * @param {unknown} data Pulse envelope `data`
 * @returns {Array<{ id: string, field: string, value: number, icon: string|null, labelKey: string }>}
 */
export function bindNetworkPulse(data) {
  if (!data || typeof data !== 'object') return []

  const slots = []
  for (const spec of PULSE_BIND_SLOTS) {
    if (FORBIDDEN_FIELDS.includes(spec.field)) continue
    const raw = data[spec.field]
    if (spec.kind === 'int' && isNonNegInt(raw)) {
      slots.push({
        id: spec.id,
        field: spec.field,
        value: raw,
        icon: spec.icon,
        labelKey: spec.labelKey,
      })
    } else if (spec.kind === 'list' && Array.isArray(raw) && raw.length > 0) {
      slots.push({
        id: spec.id,
        field: spec.field,
        value: raw.length,
        icon: spec.icon,
        labelKey: spec.labelKey,
      })
    }
  }
  return slots
}
