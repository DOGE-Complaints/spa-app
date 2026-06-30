import { afterEach, describe, expect, it } from 'vitest'
import { WAITLIST_ERROR_KINDS } from '../../auth/waitlistFlowState.js'
import { createWaitlistService, WaitlistApiError } from '../waitlistService.js'

describe('waitlistService', () => {
  const service = createWaitlistService('', true)

  afterEach(() => {
    service._resetMockStore?.()
  })

  it('joins waitlist in mock mode without creating account side-effects', async () => {
    const result = await service.joinWaitlist({
      email: 'user@example.com',
      country: 'Germany',
    })
    expect(result).toEqual({ status: 'joined', country: 'Germany', organization: null })
  })

  it('throws validation_error for invalid email', async () => {
    await expect(
      service.joinWaitlist({ email: 'not-an-email', country: 'Germany' }),
    ).rejects.toMatchObject({ kind: WAITLIST_ERROR_KINDS.VALIDATION_ERROR })
  })

  it('throws duplicate_request for repeated email', async () => {
    await service.joinWaitlist({ email: 'dup@example.com', country: 'Latvia' })
    await expect(
      service.joinWaitlist({ email: 'dup@example.com', country: 'Latvia' }),
    ).rejects.toBeInstanceOf(WaitlistApiError)
    await expect(
      service.joinWaitlist({ email: 'dup@example.com', country: 'Latvia' }),
    ).rejects.toMatchObject({ kind: WAITLIST_ERROR_KINDS.DUPLICATE_REQUEST })
  })

  it('maps mock fixture emails to distinct error kinds', async () => {
    await expect(
      service.joinWaitlist({ email: 'network@test.com', country: 'Finland' }),
    ).rejects.toMatchObject({ kind: WAITLIST_ERROR_KINDS.NETWORK_ERROR })

    await expect(
      service.joinWaitlist({ email: 'unavailable@test.com', country: 'Finland' }),
    ).rejects.toMatchObject({ kind: WAITLIST_ERROR_KINDS.SERVICE_UNAVAILABLE })

    await expect(
      service.joinWaitlist({ email: 'duplicate@test.com', country: 'Finland' }),
    ).rejects.toMatchObject({ kind: WAITLIST_ERROR_KINDS.DUPLICATE_REQUEST })
  })
})
