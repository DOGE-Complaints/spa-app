/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearOAuthRequestId,
  GPT_BRIDGE_CONTEXT,
  GPT_BRIDGE_PHASES,
  isGptBridgeContext,
  parseVerifyUrl,
  persistOAuthRequestId,
  readOAuthRequestId,
} from '../gptBridgeFlowState.js'

describe('gptBridgeFlowState', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  afterEach(() => {
    sessionStorage.clear()
  })

  it('persists oauth_request_id in sessionStorage', () => {
    persistOAuthRequestId('req-123')
    expect(readOAuthRequestId()).toBe('req-123')
    clearOAuthRequestId()
    expect(readOAuthRequestId()).toBeNull()
  })

  it('detects custom_gpt context', () => {
    expect(isGptBridgeContext(GPT_BRIDGE_CONTEXT)).toBe(true)
    expect(isGptBridgeContext('other')).toBe(false)
  })

  it('parses hash verify_url from identity', () => {
    const parsed = parseVerifyUrl('http://localhost:4173/#/verify?context=custom_gpt')
    expect(parsed.pathname).toBe('/verify')
    expect(parsed.search).toBe('?context=custom_gpt')
  })

  it('exports stable GPT bridge phases', () => {
    expect(GPT_BRIDGE_PHASES.RESOLVING).toBe('resolving')
    expect(GPT_BRIDGE_PHASES.SUCCESS).toBe('success')
  })
})
