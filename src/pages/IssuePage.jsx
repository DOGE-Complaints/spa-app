import { useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider.jsx'

export function IssuePage() {
  const { id } = useParams()
  const { resolveLocalizedText } = useI18n()

  const title = resolveLocalizedText({
    et: 'Probleemi detailvaade',
    ru: 'Детальный просмотр заявки',
    en: 'Issue details view',
  })
  const placeholder = resolveLocalizedText({
    et: 'Probleemi mustand',
    ru: 'Черновик заявки',
    en: 'Issue placeholder',
  })

  return (
    <main>
      <h1>{title}</h1>
      <p>
        {placeholder}: {id}
      </p>
    </main>
  )
}
