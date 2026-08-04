import { useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSessionShell } from '../../auth/SessionShellContext.jsx'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'
import { supabase } from '../../auth/supabaseClient.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { MenuAction } from '../Button'
import './AccountControl.css'

const PROFILE_ICON = '/icons/user-cabinet/ic-field-role.png'
const CHEVRON_ICON = '/icons/identity/ic-chevron-down.png'

/**
 * Public header account control (M130): guest Sign in | auth menu Profile + Log out.
 */
export function AccountControl({ className = '' }) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { shellState, profile, isAuthenticated } = useSessionShell()
  const [menuOpen, setMenuOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const rootRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!menuOpen) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    function onPointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!isAuthenticated && menuOpen) setMenuOpen(false)
  }, [isAuthenticated, menuOpen])

  if (shellState === SESSION_SHELL_STATES.RESTORING) {
    return (
      <div
        className={`account-control account-control--restoring ${className}`.trim()}
        data-testid="account-control"
        data-state="restoring"
        aria-hidden="true"
      />
    )
  }

  if (!isAuthenticated) {
    return (
      <div
        className={`account-control account-control--guest ${className}`.trim()}
        data-testid="account-control"
        data-state="guest"
        ref={rootRef}
      >
        <Link
          to="/login"
          className="account-control-guest"
          data-testid="account-control-sign-in"
          aria-label={t('publicHome.account.signIn')}
        >
          <img src={PROFILE_ICON} alt="" className="account-control-icon" />
          <span className="account-control-label">{t('publicHome.account.signIn')}</span>
        </Link>
      </div>
    )
  }

  const displayName =
    typeof profile?.display_name === 'string' && profile.display_name.trim()
      ? profile.display_name.trim()
      : null
  const avatarSrc =
    typeof profile?.avatar_url === 'string' && profile.avatar_url.trim()
      ? profile.avatar_url.trim()
      : PROFILE_ICON

  async function handleLogOut() {
    if (signingOut) return
    setSigningOut(true)
    setMenuOpen(false)
    try {
      await supabase.auth.signOut()
    } finally {
      navigate('/board', { replace: true })
      setSigningOut(false)
    }
  }

  return (
    <div
      className={`account-control account-control--auth ${className}`.trim()}
      data-testid="account-control"
      data-state="authenticated"
      data-menu-open={menuOpen ? 'yes' : 'no'}
      ref={rootRef}
    >
      <button
        type="button"
        className="account-control-trigger"
        data-testid="account-control-trigger"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-label={t('publicHome.account.openMenu')}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img src={avatarSrc} alt="" className="account-control-avatar" />
        {displayName ? <span className="account-control-name">{displayName}</span> : null}
        <img src={CHEVRON_ICON} alt="" className="account-control-chevron" />
      </button>

      {menuOpen ? (
        <ul
          id={menuId}
          className="account-control-menu"
          role="menu"
          data-testid="account-control-menu"
        >
          <li role="none">
            <MenuAction
              intent="navigate"
              href="/profile"
              className="account-control-menu-item"
              data-testid="account-control-profile"
              onSelect={() => setMenuOpen(false)}
            >
              {t('publicHome.account.profile')}
            </MenuAction>
          </li>
          <li role="none">
            <MenuAction
              intent="action"
              className="account-control-menu-item"
              data-testid="account-control-logout"
              onSelect={() => {
                void handleLogOut()
              }}
            >
              {t('publicHome.account.logOut')}
            </MenuAction>
          </li>
        </ul>
      ) : null}
    </div>
  )
}
