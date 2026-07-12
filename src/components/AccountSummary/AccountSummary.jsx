import { useI18n } from '../../i18n/I18nProvider.jsx'
import {
  deriveAccountSummaryState,
  formatAccountCreated,
  mapRoleTranslationKey,
  mapStatusTranslationKey,
  maskEmail,
} from './accountSummaryState.js'
import './AccountSummary.css'

const FIELD_ICONS = Object.freeze({
  email: '/icons/user-cabinet/ic-field-email.png',
  created: '/icons/user-cabinet/ic-field-created.png',
  role: '/icons/user-cabinet/ic-field-role.png',
  status: '/icons/user-cabinet/ic-field-status.png',
})

/**
 * @param {{ profile: Record<string, unknown> | null | undefined }} props
 */
export function AccountSummary({ profile }) {
  const { t, locale } = useI18n()
  const state = deriveAccountSummaryState(profile)
  const notAvailable = t('cabinet.common.notAvailable')

  const emailValue = maskEmail(profile?.email) ?? notAvailable
  const createdValue =
    formatAccountCreated(profile?.created_at, locale) ?? notAvailable
  const roleKey = mapRoleTranslationKey(profile?.role)
  const roleValue = profile?.role ? t(roleKey) : notAvailable
  const statusRaw = profile?.account_status ?? profile?.status
  const statusKey = mapStatusTranslationKey(statusRaw)
  const statusValue = statusKey ? t(statusKey) : notAvailable

  const fields = [
    {
      id: 'email',
      testId: 'account-summary-field-email',
      labelKey: 'cabinet.account.field.email',
      value: emailValue,
      muted: emailValue === notAvailable,
    },
    {
      id: 'created',
      testId: 'account-summary-field-created',
      labelKey: 'cabinet.account.field.created',
      value: createdValue,
      muted: createdValue === notAvailable,
    },
    {
      id: 'role',
      testId: 'account-summary-field-role',
      labelKey: 'cabinet.account.field.role',
      value: roleValue,
      muted: roleValue === notAvailable,
    },
    {
      id: 'status',
      testId: 'account-summary-field-status',
      labelKey: 'cabinet.account.field.status',
      value: statusValue,
      muted: statusValue === notAvailable,
    },
  ]

  return (
    <article
      className="account-summary"
      data-testid="account-summary"
      data-state={state}
      aria-label={t('cabinet.account.title')}
    >
      <h2 className="account-summary__title" data-testid="account-summary-title">
        {t('cabinet.account.title')}
      </h2>
      <dl className="account-summary__grid">
        {fields.map((field) => (
          <div key={field.id} className="account-summary__row" data-testid={field.testId}>
            <img
              src={FIELD_ICONS[field.id]}
              alt=""
              className="account-summary__icon"
              aria-hidden="true"
            />
            <dt className="account-summary__label">{t(field.labelKey)}</dt>
            <dd
              className={`account-summary__value${field.muted ? ' account-summary__value--muted' : ''}`}
              data-testid={field.muted ? 'account-summary-not-available' : undefined}
            >
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
