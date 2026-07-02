import { useI18n } from '../../i18n/I18nProvider.jsx'
import { GptDraftBanner } from './GptDraftBanner.jsx'
import './GptBridge.css'

export function GptBridgeResolvingPanel() {
  const { t } = useI18n()

  return (
    <section className="gpt-bridge-panel" data-testid="gpt-bridge-resolving">
      <GptDraftBanner statusKey="gptBridge.draft.statusPrepared" />
      <h2 className="gpt-bridge-panel__title">{t('gptBridge.resolving.title')}</h2>
      <p className="gpt-bridge-panel__message">{t('gptBridge.resolving.message')}</p>
      <p className="gpt-bridge-panel__context">{t('gptBridge.resolving.context')}</p>
      <p className="gpt-bridge-panel__meta">{t('gptBridge.resolving.draftPreserved')}</p>
      <div className="gpt-bridge-panel__progress" aria-hidden="true" />
    </section>
  )
}
