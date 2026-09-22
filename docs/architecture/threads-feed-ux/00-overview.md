# Threads feed UX — target technical architecture (overview)

| Field | Value |
|-------|--------|
| **Focus** | Facebook-like Issue feed shell: post slot, comment tree, `reactions.v1` picker, attachments + legal media floor, escalation stub, verification via verified boolean |
| **Parent REQ** | [`../../requirements/17-issue-thread-feed-ux-and-reactions.md`](../../requirements/17-issue-thread-feed-ux-and-reactions.md) |
| **Interview** | [`../../analysis/zeya888.req-target-tech-arch-interview-17-issue-thread-feed-ux-and-reactions-2026-09-22.md`](../../analysis/zeya888.req-target-tech-arch-interview-17-issue-thread-feed-ux-and-reactions-2026-09-22.md) |
| **Recorded** | 2026-09-22T09:13:49Z |
| **Mode** | Target technical architecture of the REQ focus — **not** implementation tasks / STORY / pkg |
| **Slug** | `threads-feed-ux` |

**Levels:** functional = REQ `17` · this folder = how the focus is realized in `spa-app` · work items = backlog package `threads-feed` / P1.3 elsewhere.

---

## 1) Context & functional vs tech split

Public dashboard (`/board`) shows Issues as Facebook-like posts. Under each post: comment tree, `reactions.v1` picker, attachment affordance (legal media floor), soft escalation stub. Write gated on identity **verified boolean**. Separate Issue page (`/issue/:id`) is **not** deleted. Cabinet metrics / votes / hold-shadow → **REQ8**. No rate-limit / near-dup UX. **Do not invent** client HTTP paths (AC-SPA-THR-01).

| Layer | Lives in | Content |
|-------|----------|---------|
| Functional | REQ `17` | Goal, scope/OOS, AC-SPA-THR-* |
| Target tech (this package) | `docs/architecture/threads-feed-ux/` | Composition, clients, chrome, verify/fail-soft |
| Work items | `docs/tasks/backlog-stories/threads-feed/` | ADMIN + STORY — not this folder |

**Packaging / runtime image:** **N/A** — spa already has SSR/runtime; this focus is product shell composition, not a deployability-gap.

**Sibling tech-arch:**

- Identity: [`doge-identity-service/docs/architecture/TECH-ARCH-threads-verification-boolean.md`](../../../../doge-identity-service/docs/architecture/TECH-ARCH-threads-verification-boolean.md) — wire `identity_verified` on `GET /me`
- Threads: [`doge-threads/docs/architecture/threads-entity-shell/00-overview.md`](../../../../doge-threads/docs/architecture/threads-entity-shell/00-overview.md)
- Gateway ThreadContext / pack — sibling REQ `52` (cite when arch on disk; else REQ + interview)

---

## 2) Operator locks (interview)

| # | Theme | Decision |
|---|-------|----------|
| Q1 | Composition | **B** — `BoardIssuePost` wraps as-is `IssueCard` + `IssueThreadBlock` |
| Q2 | Clients | **C** — Issues = gateway; social = threads (when Closed); verified = identity |
| Q3 | Verify UX | **A** — existing `/verify` + returnTo (not inline duplicate) |
| Q4 | Mounts | **B** — thread block on `/board` **and** `/issue/:id` (shared) · rec A overridden |
| Q5 | Attachments | **A** — refs + media floor; soft fail; no disable-floor control |
| Q6 | Reactions | **A** — summary strip + gesture picker; full enabled `reactions.v1` |
| Q7 | Escalation | **A** — visible non-dead stub; no invent escalate API |
| Q8 | Open API | **A** — progressive shell + fail-soft; no spa mock data |

---

## 3) Target components (logical)

| Component | Responsibility | Must not |
|-----------|----------------|----------|
| `BoardIssuePost` | Wrap feed `IssueCard`; host thread chrome slot | Rewrite civic Issue card contract |
| `IssueThreadBlock` | Shared tree / picker / composer / stub mount | Duplicate second social UX per page |
| Issues client | Existing gateway Issues list/detail | Invent new Issues path |
| Threads social client | Read/write tree/marks/refs when paths Closed | Invent HTTP; mock comments |
| Identity Me consumer | Read `identity_verified` before write | Treat `phone_verified` as sole gate |
| Verify handoff | Navigate `/verify` + returnTo | Inline second verify product |

Siblings in this package:

- [`01-composition-and-mounts.md`](./01-composition-and-mounts.md)
- [`02-clients-and-write-gates.md`](./02-clients-and-write-gates.md)
- [`03-reactions-attachments-escalation.md`](./03-reactions-attachments-escalation.md)
- [`04-verify-and-fail-soft.md`](./04-verify-and-fail-soft.md)

---

## 4) Primary flows (logical)

```text
/board feed
  → gateway Issues (as-is)
  → each row: BoardIssuePost(IssueCard + IssueThreadBlock)
  → IssueThreadBlock load: threads social (Closed) or empty/unavailable (Open)
  → write: identity_verified? → composer/react/attach : → /verify?returnTo=…

/issue/:id
  → gateway Issue detail (as-is)
  → same IssueThreadBlock(subject=issueId)
```

---

## 5) Ownership

| Artifact class | Owner |
|----------------|--------|
| Feed / picker / composer chrome | `spa-app` |
| Issue list/detail projection | `doge-complaints-gateway` |
| Thread tree, marks, attachment refs, knobs-in-context | `doge-threads` |
| Verified boolean + verify execute | `doge-identity-service` |
| Blob bytes | External — Open |
| Votes / cabinet / hold-shadow | REQ8 — not this arch |

---

## 6) Runtime / packaging

**N/A** for this package.

---

## 7) Open questions

- Exact Closed HTTP paths / JSON for thread list/create/react (spa client ops).
- Attachment blob transport SSOT.
- Exact `returnTo` / verify query keys (pattern reuse Open until named).
- Named escalate handoff route (if any) vs stub-only toast forever.

---

## 8) Not in this doc

- STORY keys, ADMIN execution, pkg, epic folders, mockup PNG generation.
- Invented client endpoints, ic-* names, mockup-NN numbers.
- REQ8 algorithm / cabinet redesign.
