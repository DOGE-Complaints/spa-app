/**
 * Prefer draft nextFeed.thread.* / nextFeed.gate.* gaps; fall through to threadsFeed.* (NF-04/NF-05 L10N).
 * @param {(k: string) => string} t
 * @returns {(k: string) => string}
 */
export function makeFeedThreadT(t) {
  const map = {
    'threadsFeed.post.empty.title': 'nextFeed.thread.empty',
    'threadsFeed.composer.attachDenied': 'nextFeed.thread.attachDenied',
    'threadsFeed.composer.maxDepthReached': 'nextFeed.thread.maxDepth',
    'threadsFeed.verify.cta': 'nextFeed.gate.verifyRequired',
    'threadsFeed.verify.body': 'nextFeed.gate.deniedGeneric',
    'threadsFeed.composer.draftPreserved': 'nextFeed.gate.draftPreserved',
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
