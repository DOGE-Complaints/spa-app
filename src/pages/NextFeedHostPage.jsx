import { useI18n } from '../i18n/I18nProvider.jsx'
import './NextFeedHostPage.css'

/**
 * NS-01 host for `#/next/feed` (+ `#/next/feed/issue/:id`).
 * Honest WIP placeholder only — feed product body → next-feed.
 */
export function NextFeedHostPage() {
  const { t } = useI18n()

  return (
    <div className="board-shell next-feed-host-route" data-testid="next-feed-host">
      <main className="next-feed-host-wip" data-testid="next-feed-host-wip">
        <h1 className="next-feed-host-wip__title">{t('nextShell.wip.title')}</h1>
        <p className="next-feed-host-wip__body">{t('nextShell.wip.body')}</p>
      </main>
    </div>
  )
}
