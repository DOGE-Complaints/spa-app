import './Filters.css'

/**
 * @param {{
 *   open: boolean,
 *   onToggle: () => void,
 *   title: string,
 *   children: import('react').ReactNode,
 *   footer?: import('react').ReactNode,
 *   extensionSlot?: import('react').ReactNode,
 * }} props
 */
export function FilterPanel({ open, onToggle, title, children, footer, extensionSlot }) {
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
            <div className="board-filter-panel-extension" data-slot="institution" />
            <div className="board-filter-panel-extension" data-slot="date" />
            <div className="board-filter-panel-extension" data-slot="geo">
              {extensionSlot}
            </div>
            {footer ? <div className="board-filter-panel-footer">{footer}</div> : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
