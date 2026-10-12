/**
 * DS §6 ThreadConnector — thin ancestry line / indent (light plane).
 */
export function ThreadConnector({ depth = 0, children = null }) {
  const d = Number(depth)
  const safe = Number.isFinite(d) && d > 0 ? Math.floor(d) : 0
  return (
    <div
      className={`thread-connector${safe > 0 ? ' thread-connector--nested' : ' thread-connector--root'}`}
      data-ds-surface="ThreadConnector"
      data-testid="thread-connector"
      data-depth={String(safe)}
      style={{ '--thread-connector-depth': safe }}
    >
      {children}
    </div>
  )
}
