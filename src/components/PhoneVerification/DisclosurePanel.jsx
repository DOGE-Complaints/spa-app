import { PHONE_VERIFICATION_DISCLOSURE } from './phoneVerificationLabels.js'

export function DisclosurePanel({ onSendCode, onNotNow }) {
  return (
    <section
      className="phone-verification-panel phone-verification-panel--disclosure"
      data-testid="phone-verification-disclosure"
    >
      <h2 className="phone-verification-panel__title">{PHONE_VERIFICATION_DISCLOSURE.title}</h2>
      <p className="phone-verification-panel__description">{PHONE_VERIFICATION_DISCLOSURE.body}</p>
      <div className="phone-verification-panel__actions">
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--primary"
          data-testid="phone-verification-disclosure-send"
          onClick={onSendCode}
        >
          {PHONE_VERIFICATION_DISCLOSURE.primaryCta}
        </button>
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--secondary"
          data-testid="phone-verification-disclosure-not-now"
          onClick={onNotNow}
        >
          {PHONE_VERIFICATION_DISCLOSURE.secondaryCta}
        </button>
      </div>
    </section>
  )
}
