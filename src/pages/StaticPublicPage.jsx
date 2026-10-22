import { useI18n } from '../i18n/I18nProvider.jsx'
import './StaticPublicPage.css'

/**
 * PH-11 static public page shell (M166): H1 + OP-pending body honesty.
 * No invent legal/privacy/contact prose.
 */
export function StaticPublicPage({ pageKey }) {
  const { t } = useI18n()
  const title = t(`publicHome.static.${pageKey}.title`)
  const pending = t(`publicHome.static.${pageKey}.pending`)

  return (
    <div className="board-shell public-static-route" data-testid="public-static-page" data-ph11-page={pageKey}>
      <main className="public-static-page" data-testid={`public-static-${pageKey}`}>
        <h1 className="public-static-page__title">{title}</h1>
        <p className="public-static-page__pending" data-testid={`public-static-${pageKey}-pending`} role="note">
          {pending}
        </p>
      </main>
    </div>
  )
}

export function AboutPage() {
  return <StaticPublicPage pageKey="about" />
}

export function PrivacyPage() {
  return <StaticPublicPage pageKey="privacy" />
}

export function ContactPage() {
  return <StaticPublicPage pageKey="contact" />
}
