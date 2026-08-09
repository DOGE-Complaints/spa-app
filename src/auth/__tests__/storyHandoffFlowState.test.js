/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'
import { resolveHandoffReturnPath } from '../storyHandoffFlowState.js'

describe('resolveHandoffReturnPath', () => {
  it.each([
    {
      name: 'valid internal path',
      next: '/board',
      redirect: null,
      expected: '/board',
    },
    {
      name: 'path with draft_id query (handoff happy)',
      next: '/story/submit?draft_id=abc-123',
      redirect: undefined,
      expected: '/story/submit?draft_id=abc-123',
    },
    {
      name: 'empty string → /board',
      next: '',
      redirect: null,
      expected: '/board',
    },
    {
      name: 'absent next and redirect → /board',
      next: null,
      redirect: undefined,
      expected: '/board',
    },
    {
      name: 'protocol-relative // → /board',
      next: '//evil.example/phish',
      redirect: null,
      expected: '/board',
    },
    {
      name: 'absolute https URL → /board',
      next: 'https://evil.example/phish',
      redirect: null,
      expected: '/board',
    },
    {
      name: 'non-/ relative → /board',
      next: 'board',
      redirect: null,
      expected: '/board',
    },
    {
      name: 'redirect used when next absent',
      next: null,
      redirect: '/story/submit?draft_id=from-redirect',
      expected: '/story/submit?draft_id=from-redirect',
    },
    {
      name: 'next wins over redirect',
      next: '/board',
      redirect: '//evil',
      expected: '/board',
    },
  ])('$name', ({ next, redirect, expected }) => {
    expect(resolveHandoffReturnPath(next, redirect)).toBe(expected)
  })
})
