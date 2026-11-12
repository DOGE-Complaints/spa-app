# STORY-SPA-NF-12 — Text search FE enable (DUI-Q12 lift / REQ-56)

## Meta
- **Key:** `STORY-SPA-NF-12-text-search-fe-enable`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-12-text-search-fe-enable/STORY-SPA-NF-12-text-search-fe-enable.md)
- **Status:** Done · P3 (`2026-10-11T15:10:00Z`) · **`pkg-000114`**
- **Depends on:** NF-01 Done (toolbar host); NF-10 preferred; gateway [REQ-56](../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready**; [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md) **AD-VP-03**, **AD-VP-06**, **AD-VP-04**
- **Related:** DUI-Q12 amendment 2026-10-11 · api-req text search row
- **Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh` (gateway **must** serve `search`)
- **Code home:** `GatewayIssueRepository.buildIssuesQuery` · `boardQuery` serialize · `FeedToolbar` / host · `#/next/feed`
- **ui_scope:** `feed`
- **Arch:** [02 §2a](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) · DUI-Q12 amendment

## Зачем
Обычный текстовый поиск ленты: снять hide, wire `search` в HTTP, empty/edge states. Не новый search product.

## UX SSOT
- [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) search control; `BOARD-SEARCH-NO-RESULTS` now **live-capable** after enable (was future-contract under Q12 hide)
- Param name locked: **`search`** (REQ-56) — do not invent

## Arch delta (откуда ноги)
DUI-Q12 (2026-10-08) hid search until server semantics. REQ-56 Ready = condition met. Operator 2026-10-11 authorized FE enable (**AD-VP-03/06**). NF-01 correctly left hide until this story — not a random invent.

## Функциональные требования (FR)
- **FR-NF-12.1** Remove production hide/`searchUnavailable` as sole control; show active search on next-feed toolbar.
- **FR-NF-12.2** Pass non-empty trimmed `search` on `GET /node/issues` via `buildIssuesQuery` / list options.
- **FR-NF-12.3** Stop stripping `search` from server refetch key when live search enabled (`serializeServerBoardQuery` or feed-equivalent).
- **FR-NF-12.4** Empty / whitespace → no text restriction (D-S1 parity).
- **FR-NF-12.5** Compose with structural filters + `status=PUBLISHED`.
- **FR-NF-12.6** No-results honesty; error/retry when list fails.
- **FR-NF-12.L10N** replace unavailable copy; add `nextFeed.toolbar.search*` / empty keys as needed.

## Verify / edge matrix (local-five + gateway)
| Direction | Expect |
|-----------|--------|
| Query `foo` | HTTP includes `search=foo`; results D-S1 |
| Empty/whitespace | No search param / no text restriction |
| Search + type/label/geo | AND compose |
| No matches | Empty/no-results UI; query retained; clear/reset |
| List error while searching | Error + retry |
| URL round-trip | search in hash/query honesty |
| Narrow 390 | Control usable |
| Debounce / rapid type | No invent protocol — FE reasonable; no duplicate storms |
| Classic board | OOS unless shared helper — do not break shelter without task |

## Вне scope
Invent search endpoint/param; comments search; FTS indexes; classic board redesign

## Acceptance Criteria
- [x] Live toolbar search enabled; hide-only state gone (local-five)
- [x] Network shows `search` on list when non-empty
- [x] Empty/no-results + filter compose + edges exercised
- [x] Cites AD-VP-03/06 · REQ-56 · api-req
- [x] Vitest for query builder + live smoke evidence
