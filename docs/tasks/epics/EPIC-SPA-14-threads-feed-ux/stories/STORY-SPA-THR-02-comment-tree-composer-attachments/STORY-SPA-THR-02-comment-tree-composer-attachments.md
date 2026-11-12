# STORY-SPA-THR-02-comment-tree-composer-attachments — Comment tree, composer, attachments

## Meta (pipeline)

- **Key:** `STORY-SPA-THR-02-comment-tree-composer-attachments`
- **Parent Epic:** [`../../EPIC-SPA-14-threads-feed-ux.md`](../../EPIC-SPA-14-threads-feed-ux.md)
- **Epic:** EPIC-SPA-14 Threads Feed UX · **Wave B**
- **Status:** Done
- **orientation:** ui_first
- **ui_scope:** `mixed`
- **source:** [`../../../../backlog-stories/threads-feed/STORY-SPA-THR-02-comment-tree-composer-attachments.md`](../../../../backlog-stories/threads-feed/STORY-SPA-THR-02-comment-tree-composer-attachments.md)
- **decision_ref:** backlog + [M144](../../../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md) + [arch 01](../../../../../architecture/threads-feed-ux/01-composition-and-mounts.md) + [arch 03](../../../../../architecture/threads-feed-ux/03-reactions-attachments-escalation.md) + [icons](../../../../backlog-stories/threads-feed/STORY-SPA-THR-icon-assets.md) + [ADMIN-04](../../../../backlog-stories/threads-feed/ADMIN-THR-04-api-requirements.md)
- **mockup SSOT:** `docs/UX/mockups/threads-feed/mockup-144-…`
- **Depends on:** M144 · icon catalog · THR-01 host shell · PRODUCT-BRIEF
- **Parent REQ:** [17](../../../../../requirements/17-issue-thread-feed-ux-and-reactions.md) §2, §4.1/4.4, AC-SPA-THR-02/06
- **Scaffolded:** `2026-09-22T21:00:23Z`
- **Package:** `pkg-000078`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.png
```

## Артборд (SSOT дизайна)

| Мокап | Состояние / фокус | Спека | PNG |
|-------|-------------------|-------|-----|
| **M144** THR-T | Nested · max-depth · reply composer · attach allowed/denied · post soft-fail | [mockup-144-…-spec.md](../../../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md) | [mockup-144-…-spec.png](../../../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.png) |

Implement UI to match M144 states **THR-T-A…F** exactly (geometry, hierarchy, soft-fail behavior).

## Зачем простыми словами

Дерево комментариев с bounded depth, reply composer и attach-as-reference; legal media floor без контрола «выключить защиту»; ошибки видимы и не съедают черновик.

## Текущее состояние (As-of-Done · P3 `pkg-000078` 2026-09-22)

- Host shell: `BoardIssuePost` + `IssueThreadBlock` (THR-01 / `pkg-000077`)
- Tree + composer + attach chrome: [`CommentTree.jsx`](../../../../../../src/components/threads/CommentTree.jsx) · [`CommentComposer.jsx`](../../../../../../src/components/threads/CommentComposer.jsx) inside populated `IssueThreadBlock`
- L10N: `threadsFeed.composer.*` in [`threadsFeedDictionary.js`](../../../../../../src/i18n/threadsFeedDictionary.js)
- Social tree/comment/attach HTTP: still **Unknown / Open** ([ADMIN-04](../../../../backlog-stories/threads-feed/ADMIN-THR-04-api-requirements.md)) — chrome + fail-soft only; **no invent HTTP**
- Pipeline Meta **Done** · gate PASS · screenshots THR-T-A…F (P6 T08 distinct A/B)

### Historical (pre-P3)

- Host mounts Done; no tree/composer interaction chrome; composer L10N tables only in backlog.

## Функциональные требования (FR)

### Tree (M144 §4, THR-T-A/B · REQ D13)

- **FR-THR-02.1** **THR-T-A:** Clear parent/child hierarchy (indent or equivalent) for comments below configured max depth (M144 §4, §THR-T-A). Depth value comes from node knobs / threads payload — UI must not hard-code a fake fixed number as product law (M144 annotation: configured max depth).
- **FR-THR-02.2** **THR-T-B:** At deepest permitted node, no deeper reply affordance (or explicit limit treatment); resident understands boundary without inventing “unlock deeper” games (M144 §THR-T-B).

### Composer (M144 THR-T-C · copy)

- **FR-THR-02.3** Root composer placeholder **`Write a comment`** (M144 § copy locks).
- **FR-THR-02.4** **THR-T-C Reply composer:** identifies parent comment; provides text, attach, cancel, and post affordances with visible/accessible labels (`Reply`, `Attach`, `Post reply`, `Cancel`, etc. per M144 § a11y) (M144 §THR-T-C).

### Attachments + legal floor (M144 THR-T-D/E · AC-SPA-THR-06 · arch Q5)

- **FR-THR-02.5** **THR-T-D Attach allowed:** selected item is a **compact attachment reference chip/row** in the composer — not a separate gallery product (M144 §THR-T-D, acceptance).
- **FR-THR-02.6** **THR-T-E Attach denied:** attach disabled/hidden **or** rejected with **persistent** inline warning (e.g. `This attachment can’t be added.`); rejected item must not appear as successfully attached; **no** control to disable CSAM / catastrophic-media / legal floor (AC-SPA-THR-06; M144 §THR-T-E).
- **FR-THR-02.7** Denied attachment must **not** erase draft text (M144 required annotation).

### Soft-fail post (M144 THR-T-F)

- **FR-THR-02.8** **THR-T-F:** Post failure shows visible recovery (`Try again` / equivalent); preserves recoverable draft text and still-valid attachment refs; not silent (M144 §THR-T-F, core locks).

### Boundaries

- **FR-THR-02.9** No JSON/schema/hashes/storage keys in resident UI (M144 data boundaries).
- **FR-THR-02.10** Do not invent upload HTTP paths in this story (AC-SPA-THR-01; transport Open). Tree/comment/attach social ops = **Unknown / Open** per ADMIN-THR-04 — UI may show chrome; write/load through client **only** when Closed, else Unavailable (no spa mocks of endpoints).

## Вне scope

- Full reactions picker (THR-03); escalation stub feedback (THR-04); verify gate (THR-05)  
- Blob transport SSOT / scanner vendor UI  
- **AC-SPA-THR-07:** rate-limit / near-dup UX  
- **AC-SPA-THR-03** / REQ8: votes / cabinet  
- Invent social HTTP paths (AC-SPA-THR-01)

## §Иконки

> SSOT: [STORY-SPA-THR-icon-assets.md](../../../../backlog-stories/threads-feed/STORY-SPA-THR-icon-assets.md). Wiring: **Runtime** в `<img src>` / CSS; **Disk** = путь от `spa-app/`. Все PNG **ON DISK**. Не показывать `ic-*` filenames резиденту (M145).

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Reply | `/icons/threads-feed/ic-reply.png` | `public/icons/threads-feed/ic-reply.png` | thr NEW |
| Attach | `/icons/threads-feed/ic-attach.png` | `public/icons/threads-feed/ic-attach.png` | thr NEW |
| Remove attachment | `/icons/threads-feed/ic-remove-attachment.png` | `public/icons/threads-feed/ic-remove-attachment.png` | thr NEW |
| React (comment-level) | `/icons/threads-feed/ic-react.png` | `public/icons/threads-feed/ic-react.png` | thr NEW · same as THR-01/03 |
| Attachment chip (generic file) | `/icons/story-handoff/ic-doc-new.png` | `public/icons/story-handoff/ic-doc-new.png` | Reuse · **primary** on chip |
| Attachment chip (fallback) | `/icons/threads-feed/ic-attach.png` | `public/icons/threads-feed/ic-attach.png` | only if doc chip unsuitable |
| Try again | `/icons/story-handoff/ic-auto-resubmit.png` | `public/icons/story-handoff/ic-auto-resubmit.png` | Reuse |
| Attach denied / soft-fail | `/icons/story-handoff/ic-warning-triangle.png` | `public/icons/story-handoff/ic-warning-triangle.png` | Reuse · **primary** |
| Soft-fail info (alt) | `/icons/story-handoff/ic-info.png` | `public/icons/story-handoff/ic-info.png` | Reuse · alt to warning |

## §L10N

> EN — канон M144. Namespace `threadsFeed.composer.*` (+ shared post tryAgain). Dictionary merge → T05.

| key | en | et | ru |
|-----|----|----|----|
| `threadsFeed.composer.placeholder` | Write a comment | Kirjuta kommentaar | Написать комментарий |
| `threadsFeed.composer.replyPlaceholder` | Write a reply | Kirjuta vastus | Написать ответ |
| `threadsFeed.composer.replyingTo` | Replying to | Vastamine | Ответ на |
| `threadsFeed.composer.reply` | Reply | Vasta | Ответить |
| `threadsFeed.composer.attach` | Attach | Lisa fail | Прикрепить |
| `threadsFeed.composer.removeAttachment` | Remove attachment | Eemalda manus | Удалить вложение |
| `threadsFeed.composer.attachedFile` | Attached file | Lisatud fail | Прикреплённый файл |
| `threadsFeed.composer.postReply` | Post reply | Postita vastus | Отправить ответ |
| `threadsFeed.composer.cancel` | Cancel | Tühista | Отмена |
| `threadsFeed.composer.keepEditing` | Keep editing | Jätka redigeerimist | Продолжить редактирование |
| `threadsFeed.composer.attachDenied` | This attachment can’t be added. | Seda manust ei saa lisada. | Это вложение нельзя добавить. |
| `threadsFeed.composer.tryAgain` | Try again | Proovi uuesti | Попробовать снова |
| `threadsFeed.composer.maxDepthReached` | Maximum reply depth reached | Maksimaalne vastuste sügavus on saavutatud | Достигнута максимальная глубина ответов |

## Субтаски

| Task | Slug | Title | Status |
|------|------|-------|--------|
| **T01** | `task-spa-thr-02-t01-comment-tree-max-depth` | Nested tree + max-depth boundary from knobs | Done |
| **T02** | `task-spa-thr-02-t02-reply-composer` | Reply composer (placeholder, post, cancel) | Done |
| **T03** | `task-spa-thr-02-t03-attach-ref-soft-fail` | Attach ref chip + denied soft-fail (no floor bypass) | Done |
| **T04** | `task-spa-thr-02-t04-composer-icons` | Wire §Иконки paths (reply/attach/remove/retry) | Done |
| **T05** | `task-spa-thr-02-t05-l10n-composer-keys` | `threadsFeed.composer.*` dictionary keys | Done |
| **T06** | `task-spa-thr-02-t06-vitest-draft-preserve` | Vitest soft-fail preserves draft | Done |
| **T07** | `task-spa-thr-02-t07-story-gate-thr-02` | Story gate THR-02 | Done |

## Acceptance Criteria

- [x] States THR-T-A…F match M144 PNG + spec checklists
- [x] Composer has text, attach, cancel, post (M144 AC)
- [x] Allowed attach = compact ref chip; denied = honest persistent feedback, no floor bypass (AC-SPA-THR-06)
- [x] Soft-fail preserves draft
- [x] Links: M144 · REQ-17 · arch
- [x] No invent social HTTP (AC-SPA-THR-01)
