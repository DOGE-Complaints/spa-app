import { useI18n } from '../i18n/I18nProvider.jsx'
import { AppShell, Header, PublicFooter, Sidebar } from '../components/AppShell/index.js'

/**
 * Stub target for PH-01 nav → `/how-it-works` (full page = PH-05).
 */
export function HowItWorksPage() {
  const { t } = useI18n()

  return (
    <div className="board-shell">
      <AppShell header={<Header />} sidebar={<Sidebar />} footer={<PublicFooter />}>
        <div className="board-workspace" data-testid="how-it-works-stub">
          <h1>{t('publicHome.nav.howItWorks')}</h1>
          <p>How it works content ships in PH-05.</p>
        </div>
      </AppShell>
    </div>
  )
}
