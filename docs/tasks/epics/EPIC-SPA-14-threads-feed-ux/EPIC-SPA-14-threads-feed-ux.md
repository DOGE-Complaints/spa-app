# EPIC-SPA-14 — Threads Feed UX (board post + issue thread mounts)

> **ID:** `EPIC-SPA-14` · **Статус:** **In Progress** · Wave B/A chrome THR-01…06 **Done** (`pkg-000077`…`082`) · Wave C wire **THR-07…09 Done** (`pkg-000083`…`085`)  
> **Тип:** Product / UX  
> **source:** [`../../backlog-stories/threads-feed/INDEX.md`](../../backlog-stories/threads-feed/INDEX.md)  
> **Prerequisite:** PH-04 board feed Done · ADMIN-THR-01…06 Done · REQ-17 · M143–M148 ON DISK · icons ON DISK · threads HTTP-06 Closed  
> **Admin:** [ADMIN-THR-06](../../backlog-stories/threads-feed/ADMIN-THR-06-tech-decomposition.md)  
> **created_at:** `2026-09-22T20:38:39Z` · **thr-06 P6 gap:** `2026-09-23T06:57:47Z` · **thr-07 P3:** `2026-09-24T07:37:03Z` · **thr-07 P6 gap:** `2026-09-24T07:44:04Z` · **thr-08 P1.3:** `2026-09-24T07:50:12Z` · **thr-08 P3:** `2026-09-24T07:57:18Z` · **thr-08 P6 gap:** `2026-09-24T08:03:23Z` · **thr-09 P1.3:** `2026-09-24T08:07:05Z` · **thr-09 P3:** `2026-09-24T08:13:29Z` · **thr-09 P6 gap:** `2026-09-24T08:21:53Z`

---

## Назначение

На публичном `/board` и `/issue/:id`:

1. **BoardIssuePost** — continuous post shell (M143) — **Done** (THR-01)
2. **IssueThreadBlock** — shared mount + tree/composer — **Done** (THR-01/02)
3. **reactions.v1** strip + picker — **Done** (THR-03)
4. **Invite organization** stub — **Done** (THR-04 / M146)
5. **Verify-before-write** gate — **Done** (THR-05 / M147)
6. **Social/identity clients fail-soft** — **Done** (THR-06 · Unavailable seams)
7. **Threads client + knobs + tree wire** — **Done** (THR-07 · `pkg-000083`)
8. **Comment create / reply wire** — **Done** (THR-08 · `pkg-000084`)
9. **Reactions + attachment-ref wire** — **Done** (THR-09 · `pkg-000085`)

Мокапы SSOT: [`docs/UX/mockups/threads-feed/`](../../../UX/mockups/threads-feed/) M143–M148.

## Prerequisites (verified)

| Prerequisite | Status |
|--------------|--------|
| THR-01…06 chrome | Done (`pkg-000077`…`082`) |
| M143–M148 md+png | ON DISK (ui_first) |
| Threads public social HTTP | **Closed** (HTTP-06) — spa wire THR-07…09 |
| No invent social / escalate HTTP | Lock AC-SPA-THR-01 · Closed paths only |

## Состав

| Story | Тема | Wave | Mockup | Pipeline | Status |
|-------|------|------|--------|----------|--------|
| THR-01 | BoardIssuePost + IssueThreadBlock mounts | B | M143 + M148 | [pipeline](stories/STORY-SPA-THR-01-board-issue-post-mounts/STORY-SPA-THR-01-board-issue-post-mounts.md) | **Done** |
| THR-02 | Comment tree + composer + attachments | B | M144 | [pipeline](stories/STORY-SPA-THR-02-comment-tree-composer-attachments/STORY-SPA-THR-02-comment-tree-composer-attachments.md) | **Done** |
| THR-03 | reactions.v1 strip + picker | B | M145 | [pipeline](stories/STORY-SPA-THR-03-reactions-v1-picker/STORY-SPA-THR-03-reactions-v1-picker.md) | **Done** |
| THR-04 | Invite organization stub | B | M146 | [pipeline](stories/STORY-SPA-THR-04-escalation-stub/STORY-SPA-THR-04-escalation-stub.md) | **Done** · gap P6 CLOSED |
| THR-05 | Verify-before-write gate | B | M147 | [pipeline](stories/STORY-SPA-THR-05-verify-write-gate/STORY-SPA-THR-05-verify-write-gate.md) | **Done** · gap P6 CLOSED |
| THR-06 | Social/identity clients fail-soft | A | — | [pipeline](stories/STORY-SPA-THR-06-social-identity-clients-fail-soft/STORY-SPA-THR-06-social-identity-clients-fail-soft.md) | **Done** · gap P6 CLOSED |
| THR-07 | Threads client + knobs + tree wire | C | — | [pipeline](stories/STORY-SPA-THR-07-threads-client-knobs-tree-wire/STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) | **Done** · P3 `pkg-000083` |
| THR-08 | Comment write wire | C | — | [pipeline](stories/STORY-SPA-THR-08-comment-write-wire/STORY-SPA-THR-08-comment-write-wire.md) | **Done** · P3 `pkg-000084` |
| THR-09 | Reactions + attach-ref wire | C | — | [pipeline](stories/STORY-SPA-THR-09-reactions-attach-wire/STORY-SPA-THR-09-reactions-attach-wire.md) | **Done** · P3 `pkg-000085` · gap P6 CLOSED |

## Порядок волн (ADMIN-THR-06)

```
Wave B: THR-01 → THR-02 → THR-03 → THR-04 → THR-05 verify — Done
Wave A: THR-06 clients fail-soft — Done (pkg-000082)
Wave C: THR-07 → THR-08 → THR-09 — **THR-07…09 Done** (pkg-000083…085) · Product AC Done · P6 gaps CLOSED · Skip P7
```

Active tip: **THR-09** P6 gap CLOSED · [`pkg-000085`](../../spa-active-packages/pkg-000085-20260924-epic-spa-14-thr-09-reactions-attach-wire.yaml) · F1 CLOSED · F2 WAIVED · Skip P7.

## Cross-epic references

| Epic / Story | Relation |
|--------------|----------|
| [EPIC-SPA-09](../EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) | PH-04 feed host |
| [EPIC-SPA-13](../EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) | Do not mix SSR pkgs into THR wave |
| Gateway / threads social API | Named contracts only — **no invent HTTP** in spa |

## Локализация (L10N)

- **SSOT:** backlog THR-01…05 §L10N `threadsFeed.*`
- **File:** `src/i18n/threadsFeedDictionary.js`
- **Forbidden:** invent keys beyond story tables

## Вне scope эпика (closed wave)

- Invent social / escalate HTTP
- Mixing BUG / SSR active pkgs into tip
- Floor bypass / gallery product
