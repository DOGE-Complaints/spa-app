/**
 * Prefer draft nextFeed.thread.* gaps; fall through to threadsFeed.* (NF-04 L10N).
 * @param {(k: string) => string} t
 * @returns {(k: string) => string}
 */
export function makeFeedThreadT(t) {
  const map = {
    'threadsFeed.post.empty.title': 'nextFeed.thread.empty',
    'threadsFeed.composer.attachDenied': 'nextFeed.thread.attachDenied',
    'threadsFeed.composer.maxDepthReached': 'nextFeed.thread.maxDepth',
  }
  return (key) => {
    const mapped = map[key]
    if (mapped) {
      const v = t(mapped)
      if (v && v !== mapped) return v
    }
    return t(key)
  }
}
