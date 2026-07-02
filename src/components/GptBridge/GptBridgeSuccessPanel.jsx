import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { GptDraftBanner } from './GptDraftBanner.jsx'
import './GptBridge.css'

/**
 * @param {{ redirectUrl?: string | null, onReturn?: () => void }} props
 */
export function GptBridgeSuccessPanel({ redirectUrl, onReturn }) {
  const { t } = useI18n()

  const handleReturn = () => {
    if (onReturn) {
      onReturn()
      return
    }
    if (redirectUrl) {
      window.location.assign(redirectUrl)
    }
  }

  return (
    <section className="gpt-bridge-panel gpt-bridge-panel--success" data-testid="gpt-bridge-success">
      <GptDraftBanner statusKey="gptBridge.draft.statusReady" />
      <h2 className="gpt-bridge-panel__title">{t('gptBridge.success.title')}</h2>
      <p className="gpt-bridge-panel__message">{t('gptBridge.success.message')}</p>
      <button
        type="button"
        className="gpt-bridge-panel__cta"
        data-testid="gpt-bridge-return-chatgpt"
        onClick={handleReturn}
      >
        {t('gptBridge.success.returnToChatgpt')}
      </button>
      <Link to="/profile" className="gpt-bridge-panel__secondary" data-testid="gpt-bridge-open-profile">
        {t('gptBridge.success.openProfile')}
      </Link>
    </section>
  )
}
