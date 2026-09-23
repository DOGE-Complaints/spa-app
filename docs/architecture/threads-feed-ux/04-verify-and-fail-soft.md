# Verify UX and fail-soft

Parent: [`00-overview.md`](./00-overview.md) · REQ [`17`](../../requirements/17-issue-thread-feed-ux-and-reactions.md)

## Verification UX (operator Q3 = A)

- Unverified write attempt → navigate existing **`/verify`** with return to feed/post (returnTo / query pattern Open until named; reuse story-gate style when documented).
- **Do not** build inline duplicate verification product in the thread block.
- Check **result** chrome must **not** display verification method (AC-SPA-THR-05).
- CTA copy may use pack **type + integration name** from gateway when available — not hard-coded phone.

### As-of-Done (THR-05 · `pkg-000081`)

| Fact | Evidence |
|------|----------|
| Gate helper | `src/components/threads/verifyWriteGate.js` · `isIdentityVerifiedForWrite` (`identity_verified === true` only) |
| Gate chrome | `src/components/threads/VerifyWriteGate.jsx` (+ CSS) |
| Composer intercept | `CommentComposer.jsx` post/attach |
| Handoff | `buildVerifyHandoffHref` → `#/verify?returnTo=` |
| L10N | `threadsFeed.verify.*` in `threadsFeedDictionary.js` |
| Harness | `window.__THR05_FORCE_SCENE__` |
| Pack keys | **Unknown / Open** — civic line only; **no invent** |

### Historical / coexistence

| Fact | Evidence |
|------|----------|
| Route `/verify` | `src/App.jsx` |
| `VerifyPage` | `src/pages/VerifyPage.jsx` (as-is still tied to phone flows / `phone_verified` in places) |
| Opaque boolean wire | Identity TECH-ARCH: `identity_verified` on `GET /me` |

Spa shell consumes **`identity_verified`** for the threads write gate; method-named flags may coexist on Me / VerifyPage but are not the sole gate.

## Progressive shell + fail-soft (operator Q8 = A)

- Mount `IssueThreadBlock` chrome in composition even while social HTTP is Open.
- Load/write through typed client **only** when path Closed; else skeleton/empty + explicit unavailable/error.
- **Do not** ship fake comments/reactions in spa.
- Gateway Issues list must not regress when thread social fails.

## Verify surfaces (architecture proof)

Until public social paths are named: component/unit tests, story gates, fail-soft fixtures. Do not mandate invented E2E URLs. Production entry remains existing spa start — packaging N/A for this focus.

## Not in this doc

P3 task lists; invent verify query schema; REQ8 sanctions UX.
