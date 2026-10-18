export { ThreadMount } from './ThreadMount.jsx'
export { IssueThreadBlock } from './IssueThreadBlock.jsx'
export {
  createFixtureAdapter,
  createFixtureAttachmentIntent,
  THREAD_STATE_FIXTURES,
  THREAD_NEST_COMMENTS,
  THREAD_DEPTH_VS_CAP_COMMENTS,
  THREAD_ORPHAN_COMMENTS,
  M152_ILLUSTRATIVE_BODIES,
  M153_NEST_BODIES,
} from './adapters/FixtureAdapter.js'
export { createLiveAdapter } from './adapters/LiveAdapter.js'
export {
  DEFAULT_MAX_DEPTH,
  DEFAULT_MAX_ATTACHMENTS,
  DEFAULT_MEDIA_ALLOWED_TYPES,
  VISUAL_INDENT_CAP,
  MAX_DEPTH_REACHED_COPY,
  ATTACH_DENIED_TITLE,
  ATTACH_UNAVAILABLE_COPY,
  resolveMaxDepth,
  resolveMaxAttachments,
  resolveVisualIndentCap,
  clampAttachmentIntents,
  canAddAttachment,
  canReplyAtDepth,
  visualIndentLevel,
} from './config/threadMountConfig.js'
export { CommentTree } from './tree/CommentTree.jsx'
export { CommentNode } from './tree/CommentNode.jsx'
export { buildCommentForest } from './tree/buildCommentForest.js'
export { ThreadComposer, M153_ILLUSTRATIVE_DRAFT } from './composer/ThreadComposer.jsx'
export { AttachmentRef } from './composer/AttachmentRef.jsx'
export { ThreadLabCanvas } from './lab/ThreadLabCanvas.jsx'
