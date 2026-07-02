import { useI18n } from '../../i18n/I18nProvider.jsx'
import { GptDraftBanner } from './GptDraftBanner.jsx'
import './GptBridge.css'

/**
 * @param {{ mode?: 'login' | 'signup' }} props
 */
export function GptBridgeLoginContext({ mode = 'login' }) {
  const { t } = useI18n()
  const isSignup = mode === 'signup'

  return (
    <div
      className="gpt-bridge-login-context"
      data-testid={isSignup ? 'gpt-bridge-signup-context' : 'gpt-bridge-login-context'}
    >
      <GptDraftBanner />
      <h2 className="gpt-bridge-login-context__title">
        {t(isSignup ? 'gptBridge.signup.title' : 'gptBridge.login.title')}
      </h2>
      <p className="gpt-bridge-login-context__message">
        {t(isSignup ? 'gptBridge.signup.message' : 'gptBridge.login.message')}
      </p>
      {isSignup ? (
        <p className="gpt-bridge-login-context__note">{t('gptBridge.signup.phoneNote')}</p>
      ) : null}
    </div>
  )
}
