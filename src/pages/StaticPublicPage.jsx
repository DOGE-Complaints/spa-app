import { useI18n } from '../i18n/I18nProvider.jsx'
import { Button } from '../components/Button/Button.jsx'
import { getStoryGptHref, hasStoryGptUrl } from '../config/storyGptUrl.js'
import {
  STATIC_PAGES_DOCS,
  STATIC_PAGES_LINKS,
} from '../i18n/staticPagesDictionary.js'
import './StaticPublicPage.css'

const ICON_BASE = '/icons/public-home/m172'

const ABOUT_SECTIONS = [
  { id: 'local', paras: ['p1', 'p2'] },
  { id: 'neighbours', paras: ['p1', 'p2'] },
  { id: 'network', paras: ['p1', 'p2'] },
  { id: 'marketing', paras: ['p1', 'p2', 'p3'] },
  { id: 'rewards', paras: ['p1', 'p2'] },
  { id: 'doge', paras: ['p1', 'p2'], link: true },
]

const PRIVACY_DOCS = [
  {
    id: 'privacy',
    titleKey: 'publicHome.static.privacy.downloads.privacyNotice',
    ...STATIC_PAGES_DOCS.privacy,
  },
  {
    id: 'terms',
    titleKey: 'publicHome.static.privacy.downloads.termsOfUse',
    ...STATIC_PAGES_DOCS.terms,
  },
  {
    id: 'participation',
    titleKey: 'publicHome.static.privacy.downloads.participantInformation',
    ...STATIC_PAGES_DOCS.participation,
  },
]

function ExternalTextLink({ href, children, testId }) {
  return (
    <a
      className="public-static-page__ext-link"
      href={href}
      data-testid={testId}
      rel="noopener noreferrer"
    >
      {children}
      <img
        className="public-static-page__ext-icon"
        src={`${ICON_BASE}/external-link.svg`}
        alt=""
        aria-hidden="true"
      />
    </a>
  )
}

/**
 * PH-15 — About / Privacy / Contact (M172 + privacy downloads).
 * PH-17 — Privacy dark-readable icons · Contact story CTA → VITE_STORY_GPT_URL.
 * No invent in-page legal · no invent RU/ET · no invent form POST / GPT URL / OP PASS.
 */
export function AboutPage() {
  const { t } = useI18n()
  const base = 'publicHome.static.about'

  return (
    <div className="board-shell public-static-route" data-testid="public-static-page" data-ph15-page="about">
      <main className="public-static-page" data-testid="public-static-about">
        <h1 className="public-static-page__title">{t(`${base}.title`)}</h1>
        <p className="public-static-page__lead">{t(`${base}.intro`)}</p>
        {ABOUT_SECTIONS.map((sec) => (
          <section
            key={sec.id}
            className="public-static-page__section"
            data-testid={`public-static-about-${sec.id}`}
          >
            <h2 className="public-static-page__h2">{t(`${base}.${sec.id}.title`)}</h2>
            {sec.paras.map((p) => (
              <p key={p} className="public-static-page__body">
                {t(`${base}.${sec.id}.${p}`)}
              </p>
            ))}
            {sec.link ? (
              <p className="public-static-page__body">
                <ExternalTextLink href={STATIC_PAGES_LINKS.dogeos} testId="public-static-about-dogeos">
                  {t(`${base}.doge.link`)}
                </ExternalTextLink>
              </p>
            ) : null}
          </section>
        ))}
      </main>
    </div>
  )
}

export function PrivacyPage() {
  const { t } = useI18n()
  const cta = t('publicHome.static.privacy.downloads.downloadCta')

  return (
    <div
      className="board-shell public-static-route"
      data-testid="public-static-page"
      data-ph15-page="privacy"
      data-ph17="privacy-icons"
    >
      <main className="public-static-page" data-testid="public-static-privacy">
        <h1 className="public-static-page__title">{t('publicHome.static.privacy.title')}</h1>
        <ul className="public-static-privacy-docs" data-testid="public-static-privacy-docs">
          {PRIVACY_DOCS.map((doc) => {
            const title = t(doc.titleKey)
            return (
              <li
                key={doc.id}
                className="public-static-privacy-card"
                data-testid={`public-static-privacy-card-${doc.id}`}
              >
                <img
                  className="public-static-privacy-card__icon"
                  src={`${ICON_BASE}/${doc.icon}.svg`}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  data-ph17-icon="card"
                />
                <div className="public-static-privacy-card__copy">
                  <p className="public-static-privacy-card__title">{title}</p>
                  <p className="public-static-privacy-card__file">{doc.filename}</p>
                </div>
                <a
                  className="public-static-privacy-card__cta"
                  href={doc.href}
                  download={doc.filename}
                  data-testid={`public-static-privacy-download-${doc.id}`}
                  aria-label={`${title}. ${cta}`}
                >
                  <img
                    className="public-static-privacy-card__dl-icon"
                    src={`${ICON_BASE}/download.svg`}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                    data-ph17-icon="download"
                  />
                  <span>{cta}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export function ContactPage() {
  const { t } = useI18n()
  const base = 'publicHome.static.contact'
  const storyHref = getStoryGptHref()
  const storyExternal = hasStoryGptUrl()

  return (
    <div
      className="board-shell public-static-route"
      data-testid="public-static-page"
      data-ph15-page="contact"
      data-ph17="contact-cta"
    >
      <main className="public-static-page" data-testid="public-static-contact">
        <h1 className="public-static-page__title">{t(`${base}.title`)}</h1>
        <p className="public-static-page__lead">{t(`${base}.lead`)}</p>
        <p className="public-static-page__body">{t(`${base}.intro`)}</p>
        <p className="public-static-page__body">{t(`${base}.admin`)}</p>
        <p className="public-static-page__body">{t(`${base}.story`)}</p>
        <p className="public-static-page__body">{t(`${base}.invite`)}</p>

        <ul className="public-static-contact-links" data-testid="public-static-contact-links">
          <li>
            <ExternalTextLink href={STATIC_PAGES_LINKS.site} testId="public-static-contact-site">
              {t(`${base}.site`)}
            </ExternalTextLink>
          </li>
          <li>
            <ExternalTextLink href={STATIC_PAGES_LINKS.telegram} testId="public-static-contact-telegram">
              {t(`${base}.telegram`)}
            </ExternalTextLink>
          </li>
          <li>
            <a
              className="public-static-page__ext-link"
              href={STATIC_PAGES_LINKS.email}
              data-testid="public-static-contact-email"
            >
              {t(`${base}.email`)}
            </a>
          </li>
        </ul>

        <p className="public-static-page__hint" role="note" data-testid="public-static-contact-story-hint">
          {t(`${base}.storyHint`)}
        </p>
        <div className="public-static-contact-story-cta">
          <Button
            hierarchy="primary"
            href={storyHref}
            external
            target={storyExternal ? '_blank' : '_self'}
            ariaLabel={t('howItWorks.cta.submitAccessibleLabel')}
            data-testid="public-static-contact-story-cta"
          >
            {t('publicHome.nav.submitStory')}
          </Button>
        </div>
      </main>
    </div>
  )
}

/** @deprecated PH-11 pending shell — kept name for imports; prefer About/Privacy/Contact. */
export function StaticPublicPage({ pageKey }) {
  if (pageKey === 'about') return <AboutPage />
  if (pageKey === 'privacy') return <PrivacyPage />
  if (pageKey === 'contact') return <ContactPage />
  return null
}
