import {
  VERIFY_HANDOFF_HEADING,
  VERIFY_HANDOFF_RETURN,
  VERIFY_HANDOFF_ROUTE,
} from '../config/threadMountConfig.js'
import './VerifyWriteGate.css'

/**
 * CT-07 V-B — stub handoff notice · existing `/verify` route label only.
 * No method UI invent · no Identity fields.
 *
 * @param {object} props
 * @param {() => void} [props.onBack]
 */
export function StubVerifyHandoff({ onBack = null }) {
  return (
    <div
      className="tm-verify-handoff"
      data-testid="tm-verify-handoff"
      data-tm-verify-route={VERIFY_HANDOFF_ROUTE}
      data-lab-ct07="true"
      data-tm-identity-methods="false"
      role="region"
      aria-label="Verification handoff"
    >
      <p className="tm-verify-handoff__route" data-testid="tm-verify-handoff-route">
        {VERIFY_HANDOFF_ROUTE}
      </p>
      <h2 className="tm-verify-handoff__heading" data-testid="tm-verify-handoff-heading">
        {VERIFY_HANDOFF_HEADING}
      </h2>
      <p className="tm-verify-handoff__return" data-testid="tm-verify-handoff-return">
        {VERIFY_HANDOFF_RETURN}
      </p>
      <p className="tm-verify-handoff__honesty" data-testid="tm-verify-handoff-honesty">
        Stub handoff · method controls live on existing Verify · not invented here.
      </p>
      {typeof onBack === 'function' ? (
        <button
          type="button"
          className="tm-verify-handoff__back"
          data-testid="tm-verify-handoff-back"
          onClick={onBack}
        >
          Back
        </button>
      ) : null}
    </div>
  )
}
