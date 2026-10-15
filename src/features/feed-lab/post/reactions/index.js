/**
 * CR-07 cutover: live `#/lab/feed` path uses FeedLabReactionsMount → ReactionsMount.
 * FeedReaction* modules retired as *Deprecated — do not mount on greenfield Done path.
 */
export { FeedLabReactionsMount } from './FeedLabReactionsMount.jsx'

/** @deprecated CR-07 — retired from live lab-feed path */
export { FeedReactionPlaneDeprecated } from './FeedReactionPlaneDeprecated.jsx'
/** @deprecated CR-07 */
export { FeedReactionAggregateDeprecated } from './FeedReactionAggregateDeprecated.jsx'
/** @deprecated CR-07 */
export { FeedReactionPickerDeprecated } from './FeedReactionPickerDeprecated.jsx'
/** @deprecated CR-07 */
export { FeedReactionOptionDeprecated } from './FeedReactionOptionDeprecated.jsx'
/** @deprecated CR-07 */
export { FeedReactionLayerGroupDeprecated } from './FeedReactionLayerGroupDeprecated.jsx'

export { feedReactionLabel, FEED_REACTION_LABELS_EN } from './feedReactionLabels.js'
