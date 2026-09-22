# Composition and mounts

Parent: [`00-overview.md`](./00-overview.md) · REQ [`17`](../../requirements/17-issue-thread-feed-ux-and-reactions.md)

## Target

| Piece | Role |
|-------|------|
| `BoardIssuePost` | Composition wrapper: existing `IssueCard` + slot for `IssueThreadBlock` |
| `IssueThreadBlock` | Shared social shell (tree, reactions chrome, composer, escalation stub) |
| Mount A | `/board` feed list — primary product placement (D30 / AC-SPA-THR-04) |
| Mount B | `/issue/:id` — same block; civic detail page **kept** (AC-SPA-THR-02) |

Operator **Q4 = B** (both mounts). Advisory preferred feed-only; overridden — detail reuses one component, one subject key (`issueId`), no second social product.

## Coexistence (As-of-Done · P3 `pkg-000077` 2026-09-22)

| Fact | Evidence |
|------|----------|
| Feed maps `BoardIssuePost` + `IssueCard` + `IssueThreadBlock` | `src/pages/BoardPage.jsx` · `src/components/threads/` |
| Routes | `src/App.jsx`: `/board`, `/issue/:id` |
| Issue page mounts shared thread | `src/pages/IssuePage.jsx` · same `IssueThreadBlock` |
| L10N `threadsFeed.post.*` | `src/i18n/threadsFeedDictionary.js` on disk |

### Historical (pre-mount · REQ §3 baseline)

| Fact | Evidence |
|------|----------|
| Feed mapped `IssueCard` only; no thread/comment product chrome in spa src | REQ verified table · superseded by this focus P3 |

Do not delete Issue page. Do not reopen public-home PH chrome stories for this shell.

## Tree depth

Max nest depth and related shell knobs arrive with threads payload / ThreadContext materialize (sibling threads arch: knobs inside pull). Spa **renders** up to knob; does not invent independent depth policy.

## Not in this doc

Component file paths as mandated deliverables; STORY keys; mockup IDs.
