export function SuccessPanel({ onContinue }) {
  return (
    <section
      className="phone-verification-panel phone-verification-panel--success"
      data-testid="phone-verification-success"
    >
      <h2 className="phone-verification-panel__title">Account Verified</h2>
      <p className="phone-verification-panel__description">
        Your civic account is now eligible for protected actions.
      </p>
      <div className="phone-verification-panel__actions">
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--primary"
          data-testid="phone-verification-success-continue"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </section>
  )
}
