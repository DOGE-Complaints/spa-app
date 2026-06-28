export function ProcessingPanel() {
  return (
    <section
      className="phone-verification-panel phone-verification-panel--processing"
      data-testid="phone-verification-processing"
      aria-busy="true"
    >
      <h2 className="phone-verification-panel__title">Confirming Verification</h2>
      <p className="phone-verification-panel__description">
        Please wait while we verify your account.
      </p>
      <div className="phone-verification-panel__progress" aria-hidden="true">
        <span className="phone-verification-panel__progress-bar" />
      </div>
      <div className="phone-verification-panel__actions">
        <button
          type="button"
          className="phone-verification-panel__button phone-verification-panel__button--primary"
          disabled
          data-testid="phone-verification-processing-cta"
        >
          Verify
        </button>
      </div>
    </section>
  )
}
