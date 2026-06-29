import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AUTH_PAGE_STATES, parseDevAuthState } from '../auth/authPageState.js'
import { getAuthErrorMessageKey, mapAuthError, resolvePostAuthRedirect } from '../auth/mapAuthError.js'
import { identityService } from '../auth/identityService.js'
import { supabase } from '../auth/supabaseClient.js'
import { readRememberMePreference, writeRememberMePreference } from '../auth/rememberMeStorage.js'
import { LocaleSelector } from '../components/LocaleSelector/LocaleSelector.jsx'
import { formatI18nMessage } from '../i18n/formatI18nMessage.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './LoginPage.css'

const MAGIC_LINK_EXPIRY_MINUTES = 15

export function LoginPage() {
  const { t } = useI18n()
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
  const [signupPasswordMismatch, setSignupPasswordMismatch] = useState(false)
  const [errorCode, setErrorCode] = useState(() =>
    devErrorCode ? mapAuthError({ message: devErrorCode }) : 'invalid_credentials',
  )
  const [resetLinkSent, setResetLinkSent] = useState(false)
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
      return formatI18nMessage(t('auth.magicSent.minutesRemaining'), { n: MAGIC_LINK_EXPIRY_MINUTES })
    }
    const expiresAt = magicLinkSentAt + MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000
    const remainingMs = Math.max(0, expiresAt - Date.now())
    const minutes = Math.ceil(remainingMs / 60000)
    return formatI18nMessage(t('auth.magicSent.minutesRemaining'), { n: minutes })
  }, [magicLinkSentAt, t])

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
    setSignupPasswordMismatch(false)
    if (password !== confirmPassword) {
      setSignupPasswordMismatch(true)
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
      setResetLinkSent(true)
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
        <div className="auth-page__locale">
          <LocaleSelector />
        </div>
        <div className="auth-card__brand">
          <span className="auth-card__logo" aria-hidden="true">
            {t('auth.brand.mark')}
          </span>
          <span className="auth-card__brand-text">{t('auth.brand.name')}</span>
        </div>

        {pageState === AUTH_PAGE_STATES.LOGIN && (
          <>
            <h1 className="auth-card__title">{t('auth.signIn.title')}</h1>
            <p className="auth-card__description">{t('auth.signIn.desc')}</p>
            {resetLinkSent ? <p className="auth-card__status">{t('auth.resetLinkSent')}</p> : null}
            <form className="auth-form" onSubmit={handleLogin}>
              <label className="auth-field">
                <span>{t('auth.field.email')}</span>
                <input
                  data-testid="auth-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('auth.field.emailPlaceholder')}
                  required
                />
              </label>
              <label className="auth-field">
                <span>{t('auth.field.password')}</span>
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
                  {t('auth.rememberMe')}
                </label>
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => setPageState(AUTH_PAGE_STATES.FORGOT_PASSWORD)}
                >
                  {t('auth.forgotPassword')}
                </button>
              </div>
              <button data-testid="auth-submit" type="submit" className="auth-button auth-button--primary" disabled={busy}>
                {t('auth.signIn.title')}
              </button>
            </form>
            <button type="button" className="auth-button auth-button--secondary" onClick={() => setPageState(AUTH_PAGE_STATES.SIGNUP)}>
              {t('auth.cta.createAccount')}
            </button>
            <div className="auth-divider">{t('auth.or')}</div>
            <button type="button" className="auth-button auth-button--ghost" onClick={handleMagicLinkRequest} disabled={busy}>
              {t('auth.magicLink')}
            </button>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.SIGNUP && (
          <>
            <h1 className="auth-card__title">{t('auth.cta.createAccount')}</h1>
            <p className="auth-card__description">{t('auth.signup.desc')}</p>
            <form className="auth-form" onSubmit={handleSignup}>
              <label className="auth-field">
                <span>{t('auth.field.email')}</span>
                <input data-testid="auth-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label className="auth-field">
                <span>{t('auth.field.password')}</span>
                <input
                  data-testid="auth-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
              <label className="auth-field">
                <span>{t('auth.field.confirmPassword')}</span>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
              </label>
              <p className="auth-support">{t('auth.signup.phoneLater')}</p>
              {signupPasswordMismatch ? (
                <p className="auth-field-error" data-testid="auth-signup-field-error" role="alert">
                  {t('auth.signup.passwordMismatch')}
                </p>
              ) : null}
              <button data-testid="auth-submit" type="submit" className="auth-button auth-button--primary" disabled={busy}>
                {t('auth.cta.createAccount')}
              </button>
            </form>
            <button type="button" className="auth-button auth-button--secondary" onClick={() => { setSignupPasswordMismatch(false); setPageState(AUTH_PAGE_STATES.LOGIN) }}>
              {t('auth.signup.signInInstead')}
            </button>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.MAGIC_LINK_SENT && (
          <>
            <div className="auth-icon auth-icon--mail" aria-hidden="true">
              ✉
            </div>
            <h1 className="auth-card__title">{t('auth.magicSent.title')}</h1>
            <p className="auth-card__description">{t('auth.magicSent.desc')}</p>
            <div className="auth-meta">
              <div>
                <span className="auth-meta__label">{t('auth.magicSent.emailSent')}</span>
                <span className="auth-meta__value">{email || t('auth.field.emailPlaceholder')}</span>
              </div>
              <div>
                <span className="auth-meta__label">{t('auth.magicSent.expiresIn')}</span>
                <span className="auth-meta__value">{magicLinkExpiryLabel}</span>
              </div>
            </div>
            <button type="button" className="auth-button auth-button--primary" onClick={handleMagicLinkRequest} disabled={busy}>
              {t('auth.magicSent.resend')}
            </button>
            <button type="button" className="auth-link auth-link--block" onClick={() => setPageState(AUTH_PAGE_STATES.LOGIN)}>
              {t('auth.magicSent.usePassword')}
            </button>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.FORGOT_PASSWORD && (
          <>
            <h1 className="auth-card__title">{t('auth.forgot.title')}</h1>
            <p className="auth-card__description">{t('auth.forgot.desc')}</p>
            <form className="auth-form" onSubmit={handleForgotPassword}>
              <label className="auth-field">
                <span>{t('auth.field.email')}</span>
                <input data-testid="auth-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <button data-testid="auth-submit" type="submit" className="auth-button auth-button--primary" disabled={busy}>
                {t('auth.forgot.send')}
              </button>
            </form>
            <button type="button" className="auth-button auth-button--secondary" onClick={() => setPageState(AUTH_PAGE_STATES.LOGIN)}>
              {t('auth.forgot.backToLogin')}
            </button>
            <p className="auth-support">{t('auth.forgot.neverAsk')}</p>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.AUTH_ERROR && (
          <>
            <div className="auth-icon auth-icon--error" aria-hidden="true">
              !
            </div>
            <h1 className="auth-card__title">{t('auth.error.title')}</h1>
            <p className="auth-card__description">{t('auth.error.desc')}</p>
            <div className="auth-error-list" data-testid="auth-error-active" data-auth-error-code={errorCode}>
              <p className="auth-error-item auth-error-item--active">
                <strong>{errorCode}</strong>: {t(getAuthErrorMessageKey(errorCode))}
              </p>
            </div>
            <button type="button" className="auth-button auth-button--primary" onClick={() => setPageState(AUTH_PAGE_STATES.LOGIN)}>
              {t('auth.cta.tryAgain')}
            </button>
            <button type="button" className="auth-button auth-button--secondary" onClick={() => setPageState(AUTH_PAGE_STATES.LOGIN)}>
              {t('auth.forgot.backToLogin')}
            </button>
          </>
        )}

        {pageState === AUTH_PAGE_STATES.AUTH_SUCCESS && (
          <>
            <div className="auth-icon auth-icon--success" aria-hidden="true">
              ✓
            </div>
            <h1 className="auth-card__title">{t('auth.success.title')}</h1>
            <p className="auth-card__description">{t('auth.success.desc')}</p>
            <ul className="auth-success-list">
              <li>{t('auth.success.sessionCreated')}</li>
              <li>{t('auth.success.accountActive')}</li>
            </ul>
            <button data-testid="auth-submit" type="button" className="auth-button auth-button--primary" onClick={handleContinue}>
              {t('auth.cta.continue')}
            </button>
            <div className="auth-destinations">
              <span>{t('auth.success.whereTo')}</span>
              <div className="auth-destinations__links">
                <Link to="/board">{t('board')}</Link>
              </div>
            </div>
          </>
        )}

        <p className="auth-card__footnote">
          {t('auth.footnote')}
        </p>
      </div>
    </div>
  )
}
