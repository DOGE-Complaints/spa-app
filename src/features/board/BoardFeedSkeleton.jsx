export function BoardFeedSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="board-skeleton-card" aria-hidden="true" />
      ))}
    </>
  )
}
