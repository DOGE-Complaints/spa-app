# FeedReaction* retire note (CR-07)

**Decision:** rename to `*Deprecated` suffix (keep on disk for history / ban-path checks).

**Live path:** `FeedLabReactionsMount` → `features/reactions-mount/ReactionsMount` + FixtureAdapter on `#/lab/feed`.

**Do not** import Deprecated modules into greenfield post/discussion Done path.

**OOS:** production `#/next/feed` · delete `#/lab/reactions` stands.
