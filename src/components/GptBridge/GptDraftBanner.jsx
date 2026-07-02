import { useI18n } from '../../i18n/I18nProvider.jsx'
import './GptBridge.css'

/**
 * @param {{ statusKey?: 'gptBridge.draft.statusSaved' | 'gptBridge.draft.statusPrepared' | 'gptBridge.draft.statusReady' }} props
 */
export function GptDraftBanner({ statusKey = 'gptBridge.draft.statusSaved' }) {
  const { t } = useI18n()

  return (
    <aside className="gpt-bridge-draft-banner" data-testid="gpt-bridge-draft-banner">
      <div className="gpt-bridge-draft-banner__label">{t('gptBridge.draft.label')}</div>
      <div className="gpt-bridge-draft-banner__status" data-testid="gpt-bridge-draft-status">
        {t(statusKey)}
      </div>
      <div className="gpt-bridge-draft-banner__source">{t('gptBridge.draft.sourceGpt')}</div>
    </aside>
  )
}
