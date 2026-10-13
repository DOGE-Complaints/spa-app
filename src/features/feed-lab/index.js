export {
  LAB_FEED_FIXTURES,
  LAB_MEDIA_ALT_BY_PUBLIC_ID,
  LAB_MEDIA_STUB_PATH,
  LAB_MEDIA_STUB_TARGET,
  loadLabFeedFixtures,
  resolveLabMediaStub,
} from './fixtures/index.js'

/** Deprecated shallow lab plane (LAB-06) — explicit names · not Done greenfield */
export { FeedLabIssueCardDeprecated } from './FeedLabIssueCardDeprecated.jsx'
export { FeedLabDiscussionDeprecated } from './FeedLabDiscussionDeprecated.jsx'
export { FeedLabDetailOverlayDeprecated } from './FeedLabDetailOverlayDeprecated.jsx'
export { LabReactionChromeDeprecated } from './LabReactionChromeDeprecated.jsx'
export { labT } from './labI18n.js'

/** LAB-07 greenfield — import from `./post/` preferred on Done path (no Deprecated) */
export {
  FeedPostCard,
  FeedPostIdentity,
  FeedPostTitle,
  FeedPostSummary,
  FeedPostOpenIssue,
  FeedPostMedia,
  FeedPostActionStrip,
} from './post/index.js'
