import { useEffect, useMemo, useRef, useState } from 'react'
import { LAB_FEED_FIXTURES } from '../features/feed-lab/index.js'
import { makeLabFeedT } from '../features/feed-lab/labI18n.js'
import { FeedPostCard, FeedIssueDetailOverlay } from '../features/feed-lab/post/index.js'
import { FeedLabCt08Stands } from '../features/feed-lab/post/thread/FeedLabCt08Stands.jsx'
import { FeedLabCt20Stands } from '../features/feed-lab/post/thread/FeedLabCt20Stands.jsx'
import { FeedLabCt28Stand } from '../features/feed-lab/post/thread/FeedLabCt28Stand.jsx'
import { FeedLabCt23Stand } from '../features/feed/FeedLabCt23Stand.jsx'
import { FeedLabCt29Stand } from '../features/feed/FeedLabCt29Stand.jsx'
import { FeedLabNf13Stand } from '../features/feed/FeedLabNf13Stand.jsx'
import { FeedLabNf14Stand } from '../features/feed/FeedLabNf14Stand.jsx'
import { FeedLabCt21Stands } from '../features/feed-lab/post/thread/FeedLabCt21Stands.jsx'
import { FeedLabCt22Stands } from '../features/feed-lab/post/thread/FeedLabCt22Stands.jsx'
import { setThemeAttribute } from '../theme/bootTheme.js'
import './FeedLabPage.css'

const LOCALES = /** @type {const} */ (['en', 'et', 'ru'])
const THEMES = /** @type {const} */ (['light', 'dark'])
const VIEWPORTS = /** @type {const} */ (['desktop', '320'])
const TEXT_ZOOMS = /** @type {const} */ (['100', '200'])

/**
 * Feed lab canvas (`#/lab/feed`) — EPIC-SPA-22 · LAB-10 cutover · CR-08 M160 stress.
 * Greenfield only: `feed-lab/post/` list + overlay. Ban `*Deprecated` imports on Done path.
 * Theme via `setThemeAttribute(..., { persist: false })` — do not write localStorage.
 * `data-lab-plane=greenfield` · `data-lab-visual-done=false` until OP eye PASS.
 * CR-15: M154 strip+picker wire held under M160 stress · Gap v2 residual → visual BLOCK.
 * CT-08: ThreadMount cutover on cards + Path A stands A–E/TREE/GATE · Partial=BLOCK.
 * CT-20: LAB-1…4 residual stands · Partial=BLOCK · no invent HTTP/OP PASS.
 */
export function FeedLabPage() {
  const [detailId, setDetailId] = useState(null)
  const restoreFocusRef = useRef(null)
  const [locale, setLocale] = useState(/** @type {(typeof LOCALES)[number]} */ ('en'))
  const [theme, setTheme] = useState(/** @type {(typeof THEMES)[number]} */ ('light'))
  const [viewport, setViewport] = useState(/** @type {(typeof VIEWPORTS)[number]} */ ('desktop'))
  const [textZoom, setTextZoom] = useState(/** @type {(typeof TEXT_ZOOMS)[number]} */ ('100'))
  const t = useMemo(() => makeLabFeedT(locale), [locale])

  useEffect(() => {
    setThemeAttribute(theme, document, { persist: false })
  }, [theme])

  const detailFixture =
    detailId == null ? null : LAB_FEED_FIXTURES.find((fx) => fx.publicId === detailId) || null

  function openDetail(publicId, openerEl) {
    if (openerEl && typeof openerEl.focus === 'function') {
      restoreFocusRef.current = openerEl
    }
    setDetailId(publicId)
  }

  function closeDetail() {
    setDetailId(null)
  }

  return (
    <main
      className="feed-lab-page"
      data-testid="feed-lab-page"
      data-vl-lab-surface="FeedLabPage"
      data-lab-foundation="compose"
      data-lab-plane="greenfield"
      data-lab-preview="greenfield"
      data-lab-overlay="m158"
      data-lab-visual-done="false"
      data-lab-locale={locale}
      data-lab-theme={theme}
      data-lab-viewport={viewport}
      data-lab-text-zoom={textZoom}
      data-lab-stress="m160"
      data-lab-cr15-wire="true"
      data-lab-ct08="true"
      data-lab-ct20="true"
      data-m155-oos="true"
    >
      <div className="feed-lab-page__canvas" data-testid="feed-lab-canvas" aria-label="Feed lab canvas">
        <header className="feed-lab-page__header">
          <p className="feed-lab-page__meta" data-testid="feed-lab-fixture-count">
            fixtures: {LAB_FEED_FIXTURES.length}
          </p>
          <div
            className="feed-lab-page__stress"
            data-testid="rm-lab-stress-controls"
            aria-label="M160 stress"
          >
            <div
              className="feed-lab-page__stress-row"
              role="group"
              aria-label={t('threadsFeed.reactions.lab.stressLocale')}
            >
              <span className="feed-lab-page__stress-label">
                {t('threadsFeed.reactions.lab.stressLocale')}
              </span>
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  data-testid={`rm-lab-locale-${code}`}
                  className={locale === code ? 'is-active' : undefined}
                  aria-pressed={locale === code}
                  onClick={() => setLocale(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <div
              className="feed-lab-page__stress-row"
              role="group"
              aria-label={t('threadsFeed.reactions.lab.stressTheme')}
            >
              <span className="feed-lab-page__stress-label">
                {t('threadsFeed.reactions.lab.stressTheme')}
              </span>
              {THEMES.map((name) => (
                <button
                  key={name}
                  type="button"
                  data-testid={`rm-lab-theme-${name}`}
                  className={theme === name ? 'is-active' : undefined}
                  aria-pressed={theme === name}
                  onClick={() => setTheme(name)}
                >
                  {t(`threadsFeed.reactions.lab.${name}`)}
                </button>
              ))}
            </div>
            <div
              className="feed-lab-page__stress-row"
              role="group"
              aria-label={t('threadsFeed.reactions.lab.stressViewport')}
            >
              <span className="feed-lab-page__stress-label">
                {t('threadsFeed.reactions.lab.stressViewport')}
              </span>
              <button
                type="button"
                data-testid="rm-lab-viewport-desktop"
                className={viewport === 'desktop' ? 'is-active' : undefined}
                aria-pressed={viewport === 'desktop'}
                onClick={() => setViewport('desktop')}
              >
                {t('threadsFeed.reactions.lab.viewportDesktop')}
              </button>
              <button
                type="button"
                data-testid="rm-lab-viewport-320"
                className={viewport === '320' ? 'is-active' : undefined}
                aria-pressed={viewport === '320'}
                onClick={() => setViewport('320')}
              >
                {t('threadsFeed.reactions.lab.viewportNarrow')}
              </button>
            </div>
            <div
              className="feed-lab-page__stress-row"
              role="group"
              aria-label={t('threadsFeed.reactions.lab.stressTextZoom')}
            >
              <span className="feed-lab-page__stress-label">
                {t('threadsFeed.reactions.lab.stressTextZoom')}
              </span>
              <button
                type="button"
                data-testid="rm-lab-text-100"
                className={textZoom === '100' ? 'is-active' : undefined}
                aria-pressed={textZoom === '100'}
                onClick={() => setTextZoom('100')}
              >
                {t('threadsFeed.reactions.lab.textNormal')}
              </button>
              <button
                type="button"
                data-testid="rm-lab-text-200"
                className={textZoom === '200' ? 'is-active' : undefined}
                aria-pressed={textZoom === '200'}
                onClick={() => setTextZoom('200')}
              >
                {t('threadsFeed.reactions.lab.textZoom')}
              </button>
            </div>
          </div>
        </header>

        <FeedLabCt08Stands />
        <FeedLabCt20Stands />
        <FeedLabCt21Stands />
        <FeedLabCt22Stands />
        <FeedLabCt28Stand />
        <FeedLabCt23Stand />
        <FeedLabCt29Stand />
        <FeedLabNf13Stand />
        <FeedLabNf14Stand />

        <section
          className="feed-lab-page__section"
          data-testid="feed-lab-greenfield-section"
          data-lab-plane="greenfield"
          aria-label="Greenfield post plane"
        >
          <h2 className="feed-lab-page__section-title" data-testid="feed-lab-greenfield-heading">
            Greenfield feed lab (LAB-07…10)
          </h2>
          <ol
            className="feed-lab-page__list"
            data-testid="feed-lab-greenfield-list"
            data-lab-list-rhythm="m149"
          >
            {LAB_FEED_FIXTURES.map((fx) => (
              <li key={`gf-${fx.publicId}`} className="feed-lab-page__list-item">
                <FeedPostCard fixture={fx} onOpenDetail={openDetail} t={t} locale={locale} />
              </li>
            ))}
          </ol>
        </section>
      </div>
      <FeedIssueDetailOverlay
        fixture={detailFixture}
        open={Boolean(detailFixture)}
        onDismiss={closeDetail}
        restoreFocusRef={restoreFocusRef}
      />
    </main>
  )
}
