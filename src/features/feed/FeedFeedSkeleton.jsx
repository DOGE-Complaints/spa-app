/** Card-shaped skeletons for feed loading (M149 panel B). */
export function FeedFeedSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="feed-skeleton-card" aria-hidden="true" />
      ))}
    </>
  )
}
