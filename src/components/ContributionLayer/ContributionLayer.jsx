import { useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { Button } from '../Button'
import {
  CONTRIB_DEMO_RECEIPTS,
  CONTRIB_DEMO_RECORDS,
  RECEIPTS_STATES,
  RECORDS_STATES,
  REPUTATION_STATES,
  resolveContributionPreview,
} from './contributionLayerState.js'
import './ContributionLayer.css'

const ICONS = Object.freeze({
  receipts: '/icons/user-cabinet/ic-contrib-receipts.png',
  records: '/icons/user-cabinet/ic-contrib-records.png',
  reputation: '/icons/user-cabinet/ic-contrib-reputation.png',
  cloudError: '/icons/story-handoff/ic-cloud-error.png',
  retry: '/icons/story-handoff/ic-auto-resubmit.png',
})

const RECEIPT_STATUS_KEYS = Object.freeze({
  published: 'cabinet.story.status.published',
  underReview: 'cabinet.story.status.underReview',
})

/**
 * @param {{
 *   previewFlag?: string | null,
 *   receiptsState?: string | null,
 *   recordsState?: string | null,
 *   reputationState?: string | null,
 * }} props
 */
export function ContributionLayer({
  previewFlag = null,
  receiptsState = null,
  recordsState = null,
  reputationState = null,
}) {
  const { t } = useI18n()
  const [notice, setNotice] = useState(null)
  const fromPreview = resolveContributionPreview(previewFlag)
  const receipts = receiptsState ?? fromPreview.receipts
  const records = recordsState ?? fromPreview.records
  const reputation = reputationState ?? fromPreview.reputation

  const showComingSoon = () => {
    setNotice(t('cabinet.common.comingSoon'))
  }

  return (
    <section
      className="contribution-layer"
      data-testid="contribution-layer"
      data-contribution-layer
      aria-label={t('cabinet.contrib.layerTitle')}
    >
      <h2 className="contribution-layer__title" data-testid="contribution-layer-title">
        {t('cabinet.contrib.layerTitle')}
      </h2>

      {notice ? (
        <p className="contribution-layer__notice" data-testid="contribution-coming-soon" role="status">
          {notice}
        </p>
      ) : null}

      <div className="contribution-layer__grid" data-testid="contribution-layer-grid">
        <ReceiptsCard state={receipts} t={t} onRetry={showComingSoon} />
        <RecordsCard state={records} t={t} onRetry={showComingSoon} />
        <ReputationCard state={reputation} t={t} onRetry={showComingSoon} />
      </div>
    </section>
  )
}

function ReceiptsCard({ state, t, onRetry }) {
  return (
    <article
      className={`contrib-card contrib-card--receipts contrib-card--${state}`}
      data-testid="contrib-receipts"
      data-contrib-receipts
      data-contrib-receipts-state={state}
      aria-label={t('cabinet.contrib.receipts.title')}
    >
      <header className="contrib-card__header">
        <img
          className="contrib-card__header-icon"
          src={ICONS.receipts}
          alt=""
          width={24}
          height={24}
          data-testid="contrib-receipts-icon"
        />
        <h3 className="contrib-card__title">{t('cabinet.contrib.receipts.title')}</h3>
      </header>

      {state === RECEIPTS_STATES.EMPTY ? (
        <p className="contrib-card__empty" data-testid="contrib-receipts-empty">
          {t('cabinet.contrib.receipts.empty')}
        </p>
      ) : null}

      {state === RECEIPTS_STATES.POPULATED ? (
        <>
          <p className="contrib-card__metric" data-testid="contrib-receipts-metric">
            {formatI18nMessage(t('cabinet.contrib.receipts.metric'), {
              count: CONTRIB_DEMO_RECEIPTS.count,
            })}
          </p>
          <ul className="contrib-card__list" data-testid="contrib-receipts-list">
            {CONTRIB_DEMO_RECEIPTS.items.map((item) => (
              <li key={item.id} className="contrib-card__list-item">
                <span>{item.id}</span>
                <span className="contrib-card__status">
                  {t(RECEIPT_STATUS_KEYS[item.statusKey] ?? RECEIPT_STATUS_KEYS.published)}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {state === RECEIPTS_STATES.UNAVAILABLE ? (
        <UnavailableBody
          message={t('cabinet.contrib.receipts.unavailable')}
          code="RECEIPT_SERVICE_UNAVAILABLE"
          onRetry={onRetry}
          testIdPrefix="contrib-receipts"
        />
      ) : null}
    </article>
  )
}

function RecordsCard({ state, t, onRetry }) {
  return (
    <article
      className={`contrib-card contrib-card--records contrib-card--${state}`}
      data-testid="contrib-records"
      data-contrib-records
      data-contrib-records-state={state}
      aria-label={t('cabinet.contrib.records.title')}
    >
      <header className="contrib-card__header">
        <img
          className="contrib-card__header-icon"
          src={ICONS.records}
          alt=""
          width={24}
          height={24}
          data-testid="contrib-records-icon"
        />
        <h3 className="contrib-card__title">{t('cabinet.contrib.records.title')}</h3>
      </header>

      {state === RECORDS_STATES.EMPTY ? (
        <p className="contrib-card__empty" data-testid="contrib-records-empty">
          {t('cabinet.contrib.records.empty')}
        </p>
      ) : null}

      {state === RECORDS_STATES.POPULATED ? (
        <>
          <p className="contrib-card__metric" data-testid="contrib-records-metric">
            {formatI18nMessage(t('cabinet.contrib.records.metric'), {
              count: CONTRIB_DEMO_RECORDS.count,
            })}
          </p>
          <ul className="contrib-card__list" data-testid="contrib-records-list">
            {CONTRIB_DEMO_RECORDS.eventKeys.map((eventKey) => (
              <li key={eventKey} className="contrib-card__list-item">
                {t(`cabinet.contrib.records.event.${eventKey}`)}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {state === RECORDS_STATES.UNAVAILABLE ? (
        <UnavailableBody
          message={t('cabinet.contrib.records.unavailable')}
          code="CONTRIBUTION_HISTORY_UNAVAILABLE"
          onRetry={onRetry}
          testIdPrefix="contrib-records"
        />
      ) : null}
    </article>
  )
}

function ReputationCard({ state, t, onRetry }) {
  return (
    <article
      className={`contrib-card contrib-card--reputation contrib-card--${state}`}
      data-testid="contrib-reputation"
      data-contrib-reputation
      data-contrib-reputation-state={state}
      aria-label={t('cabinet.contrib.reputation.title')}
    >
      <header className="contrib-card__header">
        <img
          className="contrib-card__header-icon"
          src={ICONS.reputation}
          alt=""
          width={24}
          height={24}
          data-testid="contrib-reputation-icon"
        />
        <h3 className="contrib-card__title">{t('cabinet.contrib.reputation.title')}</h3>
      </header>

      {state === REPUTATION_STATES.LATER ? (
        <>
          <p className="contrib-card__body" data-testid="contrib-reputation-later">
            {t('cabinet.contrib.reputation.comingLater')}
          </p>
          <span className="contrib-card__badge" data-testid="contrib-reputation-badge">
            {t('cabinet.common.comingLater')}
          </span>
        </>
      ) : null}

      {state === REPUTATION_STATES.AVAILABLE ? (
        <ul className="contrib-card__list" data-testid="contrib-reputation-metrics">
          <li className="contrib-card__list-item">
            {t('cabinet.contrib.reputation.metric.consistency')}
          </li>
          <li className="contrib-card__list-item">
            {t('cabinet.contrib.reputation.metric.verified')}
          </li>
          <li className="contrib-card__list-item">
            {t('cabinet.contrib.reputation.metric.trust')}
          </li>
        </ul>
      ) : null}

      {state === REPUTATION_STATES.UNAVAILABLE ? (
        <UnavailableBody
          message={t('cabinet.contrib.reputation.unavailable')}
          code="REPUTATION_DATA_UNAVAILABLE"
          onRetry={onRetry}
          testIdPrefix="contrib-reputation"
        />
      ) : null}
    </article>
  )
}

function UnavailableBody({ message, code, onRetry, testIdPrefix }) {
  const { t } = useI18n()
  return (
    <>
      <div className="contrib-card__error-row">
        <img
          className="contrib-card__error-icon"
          src={ICONS.cloudError}
          alt=""
          width={20}
          height={20}
          data-testid={`${testIdPrefix}-error-icon`}
        />
        <div>
          <p className="contrib-card__error" data-testid={`${testIdPrefix}-unavailable`}>
            {message}
          </p>
          <p className="contrib-card__code" data-testid={`${testIdPrefix}-code`}>
            {code}
          </p>
        </div>
      </div>
      <div className="contrib-card__actions">
        <Button
          type="button"
          hierarchy="secondary"
          intent="retry"
          data-testid={`${testIdPrefix}-retry`}
          onClick={onRetry}
          leadingIcon={<img src={ICONS.retry} alt="" width={16} height={16} />}
        >
          {t('cabinet.common.retry')}
        </Button>
      </div>
    </>
  )
}
