import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AUTH_PAGE_STATES, parseDevAuthState } from '../auth/authPageState.js'
import { getAuthErrorMessage, mapAuthError, resolvePostAuthRedirect } from '../auth/mapAuthError.js'
import { identityService } from '../auth/identityService.js'
import { supabase } from '../auth/supabaseClient.js'
import { readRememberMePreference, writeRememberMePreference } from '../auth/rememberMeStorage.js'
import './LoginPage.css'

const MAGIC_LINK_EXPIRY_MINUTES = 15

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const devState = searchParams.get('dev_auth_state')
  const devErrorCode = searchParams.get('dev_error_code')
  const redirectTarget = resolvePostAuthRedirect(searchParams.get('redirect'))

  const [pageState, setPageState] = useState(() => parseDevAuthState(devState))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(readRememberMePreference)
  const [busy, setBusy] = useState(false)
  const [signupFieldError, setSignupFieldError] = useState('')
  const [errorCode, setErrorCode] = useState(() =>
    devErrorCode ? mapAuthError({ message: devErrorCode }) : 'invalid_credentials',
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [magicLinkSentAt, setMagicLinkSentAt] = useState(null)

  useEffect(() => {
    if (devState) {
      setPageState(parseDevAuthState(devState))
    }
    if (devErrorCode) {
      setErrorCode(mapAuthError({ message: devErrorCode }))
    }
  }, [devState, devErrorCode])

  const magicLinkExpiryLabel = useMemo(() => {
    if (!magicLinkSentAt) {
      return `${MAGIC_LINK_EXPIRY_MINUTES} minutes`
    }
    const expiresAt = magicLinkSentAt + MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000
    const remainingMs = Math.max(0, expiresAt - Date.now())
    const minutes = Math.ceil(remainingMs / 60000)
    return `${minutes} minute${minutes === 1 ? '' : 's'}`
  }, [magicLinkSentAt])

  const showError = useCallback((error) => {
    setErrorCode(mapAuthError(error))
    setPageState(AUTH_PAGE_STATES.AUTH_ERROR)
  }, [])

  const completeAuthSuccess = useCallback(async () => {
    try {
      await identityService.fetchMe()
    } catch (identityError) {
      // Profile load may fail in mock/dev; auth session still valid.
    }
    setPageState(AUTH_PAGE_STATES.AUTH_SUCCESS)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    setBusy(true)
    writeRememberMePreference(rememberMe)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        throw error
      }
      await completeAuthSuccess()
    } catch (error) {
      showError(error)
    } finally {
      setBusy(false)
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setSignupFieldError('')
    if (password !== confirmPassword) {
      setSignupFieldError('Passwords do not match.')
      return
    }
    setBusy(true)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        throw error
      }
      await completeAuthSuccess()
    } catch (error) {
      showError(error)
    } finally {
      setBusy(false)
    }
  }

  const handleMagicLinkRequest = async () => {
    if (!email.trim()) {
      showError(new Error('account_not_found'))
      return
    }
    setBusy(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      })
      if (error) {
        throw error
      }
      setMagicLinkSentAt(Date.now())
      setPageState(AUTH_PAGE_STATES.MAGIC_LINK_SENT)
    } catch (error) {
      showError(error)
    } finally {
      setBusy(false)
    }
  }

  const handleForgotPassword = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${window.location.pathname}#/login`,
      })
      if (error) {
        throw error
      }
      setStatusMessage('Reset link sent. Check your email.')
      setPageState(AUTH_PAGE_STATES.LOGIN)
    } catch (error) {
      showError(error)
    } finally {
      setBusy(false)
    }
  }

  const handleContinue = () => {
    navigate(redirectTarget, { replace: true })
  }

  return (
    <div className="auth-page" data-testid="auth-page">
      <div className="auth-page__backdrop" />
      <div className="auth-card" data-auth-state={pageState}>
        <div className="auth-card__brand">
          <span className="auth-card__logo" aria-hidden="true">
            D
          </span>
          <span className="auth-card__brand-text">DOGEstonia</span>
        </div>

        {pageState === AUTH_PAGE_STATES.LOGIN && (
          <>
            <h1 className="auth-card__title">Sign In</h1>
            <p className="auth-card__description">Access your DOGEstonia account.</p>
            {statusMessage ? <p className="auth-card__status">{statusMessage}</p> : null}
            <form className="auth-form" onSubmit={handleLogin}>
              <label className="auth-field">
                <span>Email</span>
                <input
                  data-testid="auth-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="auth-field">
                <span>Password</span>
                <input
                  data-testid="auth-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              </label>
              <div className="auth-form__row">
                <label className="auth-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => setPageState(AUTH_PAGE_STATES.FORGOT_PASSWORD)}
                >
                  Forgot Password
                </button>
              </div>
              <button data-testid="auth-submit" type="submit" className="auth-button auth-button--primary" disabled={busy}>
                Sign In
              </button>
            </form>
            <button type="button" className="auth-button auth-button--secondary" onClick={() => setPageState(AUTH_PAGE_STATES.SIGNUP)}>
              Create Account
            </button>
            <div className="auth-divider">or</div>
            <button type="button" className="auth-button auth-button--ghost" onClick={handleMagicLinkRequest} disabled={busy}>
              Magic Link →
            </button>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.SIGNUP && (
          <>
            <h1 className="auth-card__title">Create Account</h1>
            <p className="auth-card__description">Create a DOGEstonia account to participate.</p>
            <form className="auth-form" onSubmit={handleSignup}>
              <label className="auth-field">
                <span>Email</span>
                <input data-testid="auth-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label className="auth-field">
                <span>Password</span>
                <input
                  data-testid="auth-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
              <label className="auth-field">
                <span>Confirm Password</span>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
              </label>
              <p className="auth-support">Phone verification happens later when required.</p>
              {signupFieldError ? (
                <p className="auth-field-error" data-testid="auth-signup-field-error" role="alert">
                  {signupFieldError}
                </p>
              ) : null}
              <button data-testid="auth-submit" type="submit" className="auth-button auth-button--primary" disabled={busy}>
                Create Account
              </button>
            </form>
            <button type="button" className="auth-button auth-button--secondary" onClick={() => { setSignupFieldError(''); setPageState(AUTH_PAGE_STATES.LOGIN) }}>
              Sign In Instead
            </button>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.MAGIC_LINK_SENT && (
          <>
            <div className="auth-icon auth-icon--mail" aria-hidden="true">
              ✉
            </div>
            <h1 className="auth-card__title">Check Your Email</h1>
            <p className="auth-card__description">A sign-in link has been sent to your email address.</p>
            <div className="auth-meta">
              <div>
                <span className="auth-meta__label">Email Sent</span>
                <span className="auth-meta__value">{email || 'you@example.com'}</span>
              </div>
              <div>
                <span className="auth-meta__label">Expires In</span>
                <span className="auth-meta__value">{magicLinkExpiryLabel}</span>
              </div>
            </div>
            <button type="button" className="auth-button auth-button--primary" onClick={handleMagicLinkRequest} disabled={busy}>
              Resend Link
            </button>
            <button type="button" className="auth-link auth-link--block" onClick={() => setPageState(AUTH_PAGE_STATES.LOGIN)}>
              Use Password Instead
            </button>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.FORGOT_PASSWORD && (
          <>
            <h1 className="auth-card__title">Reset Password</h1>
            <p className="auth-card__description">Enter your email and we&apos;ll send a reset link.</p>
            <form className="auth-form" onSubmit={handleForgotPassword}>
              <label className="auth-field">
                <span>Email</span>
                <input data-testid="auth-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <button data-testid="auth-submit" type="submit" className="auth-button auth-button--primary" disabled={busy}>
                Send Reset Link
              </button>
            </form>
            <button type="button" className="auth-button auth-button--secondary" onClick={() => setPageState(AUTH_PAGE_STATES.LOGIN)}>
              Back To Login
            </button>
            <p className="auth-support">We will never ask for your password.</p>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.AUTH_ERROR && (
          <>
            <div className="auth-icon auth-icon--error" aria-hidden="true">
              !
            </div>
            <h1 className="auth-card__title">Authentication Error</h1>
            <p className="auth-card__description">We couldn&apos;t sign you in. Please try again.</p>
            <div className="auth-error-list" data-testid="auth-error-active" data-auth-error-code={errorCode}>
              <p className="auth-error-item auth-error-item--active">
                <strong>{errorCode}</strong>: {getAuthErrorMessage(errorCode)}
              </p>
            </div>
            <button type="button" className="auth-button auth-button--primary" onClick={() => setPageState(AUTH_PAGE_STATES.LOGIN)}>
              Try Again
            </button>
            <button type="button" className="auth-button auth-button--secondary" onClick={() => setPageState(AUTH_PAGE_STATES.LOGIN)}>
              Back To Login
            </button>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.AUTH_SUCCESS && (
          <>
            <div className="auth-icon auth-icon--success" aria-hidden="true">
              ✓
            </div>
            <h1 className="auth-card__title">Welcome Back</h1>
            <p className="auth-card__description">Authentication successful.</p>
            <ul className="auth-success-list">
              <li>Session Created</li>
              <li>Account Active</li>
            </ul>
            <button data-testid="auth-submit" type="button" className="auth-button auth-button--primary" onClick={handleContinue}>
              Continue
            </button>
            <div className="auth-destinations">
              <span>Where would you like to go?</span>
              <div className="auth-destinations__links">
                <Link to="/board">Board</Link>
              </div>
            </div>
          </>
        )}

        <p className="auth-card__footnote">
          Standalone web authentication — no GPT or story-draft context.
        </p>
      </div>
    </div>
  )
}
