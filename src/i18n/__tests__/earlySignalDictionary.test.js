import { describe, expect, it } from 'vitest'
import {
  EARLY_SIGNAL_DICTIONARY_BY_LOCALE,
  EARLY_SIGNAL_FLAT_KEYS,
} from '../earlySignalDictionary.js'
import { findMissingEarlySignalDictionaryKeys } from '../forbiddenVerificationTerms.js'

const ES01_FORBIDDEN = [
  /% understood/i,
  /n more stories to unlock/i,
  /\btrending\b/i,
  /\bmajority\b/i,
  /\bconsensus\b/i,
  /coverage \d+%/i,
  /3 more Stories needed/i,
]

function collectStrings(value, acc = []) {
  if (typeof value === 'string') {
    acc.push(value)
    return acc
  }
  if (value && typeof value === 'object') {
    for (const nested of Object.values(value)) collectStrings(nested, acc)
  }
  return acc
}

describe('earlySignal dictionary SSOT', () => {
  it('lists ES-01…ES-04 discovery / pulse / emerging / coverage keys', () => {
    expect(EARLY_SIGNAL_FLAT_KEYS).toEqual([
      'earlySignal.discovery.rootLabel',
      'earlySignal.discovery.intro',
      'earlySignal.pulse.title',
      'earlySignal.pulse.omitMessage',
      'earlySignal.pulse.metric.stories',
      'earlySignal.pulse.metric.areas',
      'earlySignal.pulse.metric.languages',
      'earlySignal.pulse.metric.topics',
      'earlySignal.pulse.metric.activity',
      'earlySignal.pulse.areasHonesty',
      'earlySignal.pulse.listening',
      'earlySignal.forming.title',
      'earlySignal.forming.message',
      'earlySignal.emerging.title',
      'earlySignal.emerging.provisionalBadge',
      'earlySignal.emerging.cardHelper',
      'earlySignal.emerging.empty',
      'earlySignal.emerging.storyCount',
      'earlySignal.emerging.weaken',
      'earlySignal.missing.title',
      'earlySignal.missing.intro',
      'earlySignal.missing.areas',
      'earlySignal.missing.languages',
      'earlySignal.missing.groups',
      'earlySignal.missing.themes',
      'earlySignal.help.title',
      'earlySignal.help.message',
      'earlySignal.help.submit',
      'earlySignal.help.submitAccessible',
    ])
  })

  it('has all EARLY_SIGNAL_FLAT_KEYS in et/ru/en', () => {
    expect(findMissingEarlySignalDictionaryKeys()).toEqual([])
  })

  it('has no AC-SPA-ES-03 forbidden copy in any locale', () => {
    const hits = []
    for (const [locale, dict] of Object.entries(EARLY_SIGNAL_DICTIONARY_BY_LOCALE)) {
      for (const text of collectStrings(dict)) {
        for (const pattern of ES01_FORBIDDEN) {
          if (pattern.test(text)) hits.push(`${locale}:${text}`)
        }
      }
    }
    expect(hits).toEqual([])
  })
})
