/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

async function loadHelper() {
  vi.resetModules()
  return import('../storyGptUrl.js')
}

describe('storyGptUrl helper (PH-06 T01)', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('getStoryGptUrl reads trimmed VITE_STORY_GPT_URL', async () => {
    vi.stubEnv('VITE_STORY_GPT_URL', '  https://chatgpt.com/g/g-test-env  ')
    const { getStoryGptUrl, getStoryGptHref, hasStoryGptUrl } = await loadHelper()
    expect(getStoryGptUrl()).toBe('https://chatgpt.com/g/g-test-env')
    expect(getStoryGptHref()).toBe('https://chatgpt.com/g/g-test-env')
    expect(hasStoryGptUrl()).toBe(true)
  })

  it('empty env: calm empty string / # href; no hardcoded GPT id', async () => {
    vi.stubEnv('VITE_STORY_GPT_URL', '')
    const { getStoryGptUrl, getStoryGptHref, hasStoryGptUrl, openStoryGpt } = await loadHelper()
    expect(getStoryGptUrl()).toBe('')
    expect(getStoryGptHref()).toBe('#')
    expect(hasStoryGptUrl()).toBe(false)
    expect(getStoryGptUrl()).not.toMatch(/g-RkVU9xLWN/i)
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    expect(openStoryGpt()).toBe(false)
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('openStoryGpt opens env URL in new tab when set', async () => {
    vi.stubEnv('VITE_STORY_GPT_URL', 'https://example.test/gpt')
    const { openStoryGpt } = await loadHelper()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    expect(openStoryGpt()).toBe(true)
    expect(openSpy).toHaveBeenCalledWith(
      'https://example.test/gpt',
      '_blank',
      'noopener,noreferrer',
    )
  })
})
