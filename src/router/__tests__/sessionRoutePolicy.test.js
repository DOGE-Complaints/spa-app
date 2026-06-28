import { describe, expect, it } from 'vitest'
import { isProtectedPath, isPublicPath, isLoginPath } from '../sessionRoutePolicy.js'

describe('sessionRoutePolicy', () => {
  it('treats board and issue detail as public', () => {
    expect(isPublicPath('/board')).toBe(true)
    expect(isPublicPath('/issue/demo-1')).toBe(true)
    expect(isPublicPath('/login')).toBe(true)
  })

  it('treats dashboard profile verify compose as protected', () => {
    expect(isProtectedPath('/dashboard')).toBe(true)
    expect(isProtectedPath('/profile')).toBe(true)
    expect(isProtectedPath('/verify')).toBe(true)
    expect(isProtectedPath('/story/compose')).toBe(true)
  })

  it('public board stays public when logged out policy checked', () => {
    expect(isProtectedPath('/board')).toBe(false)
    expect(isPublicPath('/board')).toBe(true)
  })

  it('detects login path', () => {
    expect(isLoginPath('/login')).toBe(true)
    expect(isLoginPath('/board')).toBe(false)
  })
})
