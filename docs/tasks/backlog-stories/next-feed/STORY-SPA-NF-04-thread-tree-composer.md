# STORY-SPA-NF-04 — Thread tree + composer

## Meta
- **Key:** `STORY-SPA-NF-04-thread-tree-composer`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-04-thread-tree-composer/STORY-SPA-NF-04-thread-tree-composer.md)
- **Status:** Done · P3 (`2026-10-10T19:13:32Z`) · gap P6 CLOSED · **`pkg-000106`**
- **Depends on:** NF-02 post chrome; [register](NF-feed-mockup-intake-register.md) NF-T; [icon catalog](STORY-SPA-NF-icon-assets.md); [api-requirements §2](STORY-SPA-NF-api-requirements.md); reuse threads modules
- **Code home:** `features/feed/` (+ presentational reuse of `src/components/threads/*`)
- **ui_scope:** `feed`

## Зачем
Issue thread block + comment tree + text composer on feed surfaces: empty/load/populated/unavailable; Closed GET/POST; attach UI gated (Q06 text path).

## UX SSOT
- Spec: [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- PNG: [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png) · [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png)
- Register: [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md) row NF-T → NF-04
- States: empty / load / populated / unavailable; text path only

## Icons (from STORY-SPA-NF-icon-assets.md)
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Reply | `reply` | `/icons/next-feed/actions/reply.svg` |
| Send | `send` | `/icons/next-feed/actions/send.svg` |
| Attach (gated) | `attach` | `/icons/next-feed/actions/attach.svg` |
| Retry | `retry` | `/icons/next-feed/actions/retry.svg` |
| Expand / collapse thread | `chevron-down` | `/icons/next-shell/actions/chevron-down.svg` (reuse) |
| Remove attach chip | `close` | `/icons/next-shell/actions/close.svg` (reuse) |
| Error / unavailable | `error` / `unavailable` | `/icons/next-feed/status/error.svg` · `…/unavailable.svg` |

## API
- [api-req §2](STORY-SPA-NF-api-requirements.md) · sibling [THR api](../threads-feed/STORY-SPA-THR-api-requirements.md)
- knobs `GET /threads/knobs` ✅ · tree `GET /threads/issues/{id}` ✅ · comments `POST …/comments` + Bearer ✅
- attach_ref `POST …/attachment-refs` ✅ Closed · ⚠️ UI gated; no multipart
- Write-gate UX → NF-05 (`identity_verified`)

## Функциональные требования (FR)
- **FR-NF-04.1** Thread block states: empty / loading / populated / unavailable (+ retry).
- **FR-NF-04.2** Composer: text path only (DUI-Q06); reply + root.
- **FR-NF-04.3** Attach affordance gated; refs only — no blob invent.
- **FR-NF-04.4** Reuse Closed `ThreadsSocialClient` — no invent paths (`/threads/by-issue` forbidden).
- **FR-NF-04.L10N** prefer `threadsFeed.*` composer/discussion keys; draft `nextFeed.thread.*` only if gap.

## Вне scope
- Reactions picker product (NF-05); invite send; people; invent HTTP; shell chrome

## Тексты и переводы (en / et / ru)

### Reuse (`threadsFeed.*`)
- `threadsFeed.post.discussionLoading` · `discussionUnavailable` · `tryAgain` · `composer.placeholder` · `composer.reply` · `composer.attach` · related keys in [`threadsFeedDictionary.js`](../../../../src/i18n/threadsFeedDictionary.js)

### Draft `nextFeed.thread.*` (only if reuse insufficient)

| key | en | et | ru |
|-----|----|----|----|
| `nextFeed.thread.empty` | No comments yet | Kommentaare pole veel | Пока нет комментариев |
| `nextFeed.thread.attachDenied` | Attachments are not available | Manuseid ei saa lisada | Вложения недоступны |
| `nextFeed.thread.maxDepth` | Reply depth limit reached | Vastuste sügavuse limiit | Достигнут лимит глубины ответов |

## Acceptance Criteria
- [x] Thread + composer states per M152/M153; text path only
- [x] Uses Closed threads paths; no invent URLs
- [x] Icons = next-feed / next-shell catalog URLs
- [x] L10N reuse threadsFeed + draft gaps; shell/people OOS

> **As-of-Done (P6 `spa_nf_04_audit_2026_10_10`):** AC checkboxes synced to pipeline/gate Done · product FR hold on disk · do not reopen product AC. Historical: P1.3 scaffold left AC unchecked until gap T05.
