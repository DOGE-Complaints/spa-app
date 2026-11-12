# STORY-SPA-NF-02 — Civic issue-as-post

## Meta
- **Key:** `STORY-SPA-NF-02-civic-issue-post`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-02-civic-issue-post/STORY-SPA-NF-02-civic-issue-post.md)
- **Status:** Done · P3 (`2026-10-10T18:41:45Z`) · **`pkg-000104`**
- **Depends on:** NF-01 list host Done; [register](NF-feed-mockup-intake-register.md) NF-P; [icon catalog](STORY-SPA-NF-icon-assets.md); [api-requirements §1.2](STORY-SPA-NF-api-requirements.md)
- **Code home:** `features/feed/` · Routes `#/next/feed` (+ issue mounts later NF-06)
- **ui_scope:** `feed`

## Зачем
Issue-as-post civic chrome (no-media path): identity/actions strip without schema overlay or media production claim.

## UX SSOT
- Spec: [M150](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
- PNG: [M150 png](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
- Register: [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md) row NF-P → NF-02
- States: no-media civic; collapse missing; no schema overlay prod

## Icons (from STORY-SPA-NF-icon-assets.md)
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Open issue | `open-issue` | `/icons/next-feed/actions/open-issue.svg` |
| More | `more` | `/icons/next-feed/actions/more.svg` |
| Comment / discussion | `comment` | `/icons/next-feed/actions/comment.svg` |
| React | `react` | `/icons/next-feed/actions/react.svg` |
| Share | `share` | `/icons/next-feed/actions/share.svg` |
| Place | `location` | `/icons/next-shell/actions/location.svg` (reuse) |

## API
- [api-req §1.2](STORY-SPA-NF-api-requirements.md): gateway issue payload ✅ · schema/media ❌ OOS
- Detail: `GET …/node/issues/{id}` when mount needs

## Функциональные требования (FR)
- **FR-NF-02.1** Civic post renders from confirmed issue fields; honest missing/collapse.
- **FR-NF-02.2** No production schema overlay; no media production claim.
- **FR-NF-02.3** Action strip affordances use catalog icons; wire behavior in NF-04/05 where applicable.
- **FR-NF-02.L10N** reuse `threadsFeed.post.*` where valid; draft `nextFeed.post.*` for new.

## Вне scope
- Schema/media production; shell chrome; invent API; people surfaces (M155)

## Тексты и переводы (en / et / ru)

### Reuse
- `threadsFeed.post.action.react` · `threadsFeed.post.action.discussion` · related post keys in [`threadsFeedDictionary.js`](../../../../src/i18n/threadsFeedDictionary.js)

### Draft `nextFeed.post.*`

| key | en | et | ru |
|-----|----|----|----|
| `nextFeed.post.openIssue` | Open issue | Ava teade | Открыть обращение |
| `nextFeed.post.more` | More actions | Rohkem | Ещё |
| `nextFeed.post.share` | Share | Jaga | Поделиться |
| `nextFeed.post.noMedia` | No media attached | Meediat pole | Медиа нет |
| `nextFeed.post.schemaUnavailable` | Structured details unavailable | Struktureeritud andmed puuduvad | Структурированные данные недоступны |

## Acceptance Criteria
- [x] Civic post matches M150 content claim without schema/media production
- [x] Icons from catalog runtime URLs
- [x] API = existing issue fields only; links api-req
- [x] L10N reuse + draft keys; shell OOS
