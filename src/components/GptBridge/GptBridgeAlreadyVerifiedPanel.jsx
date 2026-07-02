import { useI18n } from '../../i18n/I18nProvider.jsx'
import { GptDraftBanner } from './GptDraftBanner.jsx'
import './GptBridge.css'

/**
 * @param {{ redirectUrl?: string | null, onReturn?: () => void }} props
 */
export function GptBridgeAlreadyVerifiedPanel({ redirectUrl, onReturn }) {
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
    <section
      className="gpt-bridge-panel gpt-bridge-panel--already-verified"
      data-testid="gpt-bridge-already-verified"
    >
      <GptDraftBanner statusKey="gptBridge.draft.statusReady" />
      <h2 className="gpt-bridge-panel__title">{t('gptBridge.alreadyVerified.title')}</h2>
      <p className="gpt-bridge-panel__message">{t('gptBridge.alreadyVerified.message')}</p>
      <p className="gpt-bridge-panel__context">{t('gptBridge.alreadyVerified.context')}</p>
      <button
        type="button"
        className="gpt-bridge-panel__cta"
        data-testid="gpt-bridge-return-chatgpt"
        onClick={handleReturn}
      >
        {t('gptBridge.success.returnToChatgpt')}
      </button>
    </section>
  )
}
