import { describe, expect, it } from 'vitest'
import { isProtectedPath, isPublicPath, isLoginPath } from '../sessionRoutePolicy.js'

describe('sessionRoutePolicy', () => {
  it('treats board and issue detail as public', () => {
    expect(isPublicPath('/board')).toBe(true)
    expect(isPublicPath('/how-it-works')).toBe(true)
    expect(isPublicPath('/issue/demo-1')).toBe(true)
    expect(isPublicPath('/issue/a/b')).toBe(true)
    expect(isPublicPath('/login')).toBe(true)
    expect(isPublicPath('/')).toBe(true)
  })

  it('treats dashboard profile verify story submit as protected', () => {
    expect(isProtectedPath('/dashboard')).toBe(true)
    expect(isProtectedPath('/dashboard/settings')).toBe(true)
    expect(isProtectedPath('/profile')).toBe(true)
    expect(isProtectedPath('/profile/edit')).toBe(true)
    expect(isProtectedPath('/verify')).toBe(true)
    expect(isProtectedPath('/verify/phone')).toBe(true)
    expect(isProtectedPath('/story/submit')).toBe(true)
    expect(isProtectedPath('/story/submit/confirm')).toBe(true)
    expect(isProtectedPath('/story/compose')).toBe(true)
  })

  it('public board and issue paths are not protected', () => {
    expect(isProtectedPath('/board')).toBe(false)
    expect(isPublicPath('/board')).toBe(true)
    expect(isProtectedPath('/how-it-works')).toBe(false)
    expect(isPublicPath('/how-it-works')).toBe(true)
    expect(isProtectedPath('/')).toBe(false)
    expect(isPublicPath('/')).toBe(true)
    expect(isProtectedPath('/login')).toBe(false)
    expect(isProtectedPath('/issue/demo-1')).toBe(false)
    expect(isProtectedPath('/issue/a/b')).toBe(false)
  })

  it('detects login path', () => {
    expect(isLoginPath('/login')).toBe(true)
    expect(isLoginPath('/board')).toBe(false)
  })
})
