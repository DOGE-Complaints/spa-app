import { useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'
import {
  WALLET_STATUS_DEMO_LINKED,
  WALLET_STATUS_STATES,
  resolveWalletStatusState,
} from './walletStatusState.js'
import './WalletStatus.css'

const ICONS = Object.freeze({
  unlinked: '/icons/user-cabinet/ic-wallet-unlinked.png',
  linked: '/icons/user-cabinet/ic-wallet-linked.png',
  connect: '/icons/user-cabinet/ic-wallet-connect.png',
})

/**
 * @param {{
 *   state?: string | null,
 *   previewFlag?: string | null,
 *   truncatedAddress?: string,
 *   linkedOnLabel?: string,
 * }} props
 */
export function WalletStatusCard({
  state = null,
  previewFlag = null,
  truncatedAddress = WALLET_STATUS_DEMO_LINKED.truncatedAddress,
  linkedOnLabel = WALLET_STATUS_DEMO_LINKED.linkedOnLabel,
}) {
  const { t } = useI18n()
  const [notice, setNotice] = useState(null)
  const resolved = resolveWalletStatusState({ state, previewFlag })

  const showComingSoon = () => {
    setNotice(t('cabinet.common.comingSoon'))
  }

  const headerIcon =
    resolved === WALLET_STATUS_STATES.LINKED
      ? ICONS.linked
      : resolved === WALLET_STATUS_STATES.CONNECT
        ? ICONS.connect
        : ICONS.unlinked

  const titleKey =
    resolved === WALLET_STATUS_STATES.LINKED
      ? 'cabinet.wallet.stateB.title'
      : resolved === WALLET_STATUS_STATES.CONNECT
        ? 'cabinet.wallet.stateC.title'
        : 'cabinet.wallet.stateA.title'

  return (
    <article
      className={`wallet-status-card wallet-status-card--${resolved}`}
      data-testid="wallet-status-card"
      data-wallet-status-card
      data-wallet-status-state={resolved}
      aria-label={t(titleKey)}
    >
      <header className="wallet-status-card__header">
        <img
          className="wallet-status-card__header-icon"
          src={headerIcon}
          alt=""
          width={24}
          height={24}
          data-testid="wallet-status-header-icon"
        />
        <h2 className="wallet-status-card__title" data-testid="wallet-status-title">
          {t(titleKey)}
        </h2>
      </header>

      {notice ? (
        <p className="wallet-status-card__notice" data-testid="wallet-status-coming-soon" role="status">
          {notice}
        </p>
      ) : null}

      {resolved === WALLET_STATUS_STATES.UNLINKED ? (
        <>
          <p className="wallet-status-card__description" data-testid="wallet-status-description">
            {t('cabinet.wallet.stateA.description')}
          </p>
          <div className="wallet-status-card__actions">
            <Button type="button" hierarchy="secondary" disabled data-testid="wallet-status-coming-later">
              {t('cabinet.common.comingLater')}
            </Button>
          </div>
        </>
      ) : null}

      {resolved === WALLET_STATUS_STATES.LINKED ? (
        <>
          <div className="wallet-status-card__fields" data-testid="wallet-status-linked-fields">
            <div className="wallet-status-card__field">
              <span className="wallet-status-card__field-label">
                {t('cabinet.wallet.stateB.field.address')}
              </span>
              <span className="wallet-status-card__field-value" data-testid="wallet-status-address">
                {truncatedAddress}
              </span>
            </div>
            <div className="wallet-status-card__field">
              <span className="wallet-status-card__field-label">
                {t('cabinet.wallet.stateB.field.linkedOn')}
              </span>
              <span className="wallet-status-card__field-value" data-testid="wallet-status-linked-on">
                {linkedOnLabel}
              </span>
            </div>
          </div>
          <div className="wallet-status-card__actions">
            <Button
              type="button"
              hierarchy="secondary"
              data-testid="wallet-status-manage"
              onClick={showComingSoon}
            >
              {t('cabinet.wallet.stateB.manage')}
            </Button>
          </div>
        </>
      ) : null}

      {resolved === WALLET_STATUS_STATES.CONNECT ? (
        <>
          <p className="wallet-status-card__description" data-testid="wallet-status-description">
            {t('cabinet.wallet.stateC.description')}
          </p>
          <div className="wallet-status-card__actions">
            <Button
              type="button"
              hierarchy="primary"
              data-testid="wallet-status-connect"
              onClick={showComingSoon}
            >
              {t('cabinet.wallet.stateC.connect')}
            </Button>
          </div>
          <p className="wallet-status-card__optional" data-testid="wallet-status-optional">
            {t('cabinet.wallet.stateC.optional')}
          </p>
        </>
      ) : null}
    </article>
  )
}
