import './Filters.css'

/**
 * @param {{
 *   open: boolean,
 *   onToggle: () => void,
 *   title: string,
 *   children: import('react').ReactNode,
 *   footer?: import('react').ReactNode,
 *   institutionSlot?: import('react').ReactNode,
 *   dateSlot?: import('react').ReactNode,
 *   geoSlot?: import('react').ReactNode,
 *   extensionSlot?: import('react').ReactNode,
 * }} props
 */
export function FilterPanel({
  open,
  onToggle,
  title,
  children,
  footer,
  institutionSlot,
  dateSlot,
  geoSlot,
  extensionSlot,
}) {
  return (
    <div className="board-filter-panel" data-open={open ? 'yes' : 'no'}>
      <button
        type="button"
        className="board-filter-panel-toggle"
        aria-expanded={open}
        aria-controls="board-filter-panel-body"
        onClick={onToggle}
      >
        {title}
      </button>

      {open ? (
        <>
          <div
            className="board-filter-panel-backdrop"
            aria-hidden="true"
            onClick={onToggle}
          />
          <div
            id="board-filter-panel-body"
            className="board-filter-panel-body"
            role="region"
            aria-label={title}
          >
            <div className="board-filter-panel-primary">{children}</div>
            <div className="board-filter-panel-extension" data-slot="institution">
              {institutionSlot}
            </div>
            <div className="board-filter-panel-extension" data-slot="date">
              {dateSlot}
            </div>
            <div className="board-filter-panel-extension" data-slot="geo">
              {geoSlot ?? extensionSlot}
            </div>
            {footer ? <div className="board-filter-panel-footer">{footer}</div> : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
