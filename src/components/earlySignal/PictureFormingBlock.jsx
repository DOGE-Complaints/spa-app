import { useI18n } from '../../i18n/I18nProvider.jsx'
import './PictureFormingBlock.css'

export function PictureFormingBlock() {
  const { t } = useI18n()

  return (
    <div className="picture-forming-block" data-testid="picture-forming">
      <p className="picture-forming-block__message">{t('earlySignal.forming.message')}</p>
      <div className="picture-forming-viz" aria-hidden="true">
        <span className="picture-forming-viz__node picture-forming-viz__node--a" />
        <span className="picture-forming-viz__node picture-forming-viz__node--b" />
        <span className="picture-forming-viz__node picture-forming-viz__node--c" />
        <span className="picture-forming-viz__node picture-forming-viz__node--d" />
        <span className="picture-forming-viz__node picture-forming-viz__node--e" />
        <span className="picture-forming-viz__link picture-forming-viz__link--ab" />
        <span className="picture-forming-viz__link picture-forming-viz__link--bc" />
        <span className="picture-forming-viz__link picture-forming-viz__link--cd" />
        <span className="picture-forming-viz__link picture-forming-viz__link--ae" />
      </div>
    </div>
  )
}
