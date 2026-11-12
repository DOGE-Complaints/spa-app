# STORY-SPA-CR-05 — Strip open / dismiss (Facebook-like)

## Meta

- **Key:** `STORY-SPA-CR-05-strip-open-dismiss`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Present · P5 TASKED=0 · P8 Done · `2026-10-15T10:38:10Z` · [`pkg-000141`](../../spa-active-packages/pkg-000141-20261015-epic-spa-23-cr-05-strip-open-dismiss.yaml)
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · polish after CR-01…04 structure
- **Depends on:** [CR-01](STORY-SPA-CR-01-reactions-mount-strip.md) · [CR-02](STORY-SPA-CR-02-reaction-picker.md) · [CR-icon](STORY-SPA-CR-icon-assets.md)
- **Blocks:** CR-06, CR-07
- **UX mirror:** [OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md](OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.1–3.2
- **Code home:** `src/features/reactions-mount/` · `ReactionSummaryStrip` · `ReactionsMount` · `ReactionPicker` dismiss

## Зачем

Свести open/dismiss к привычному паттерну: при **populated** открытие с aggregate (hover + highlight); кнопка **React только в empty**; закрытие — click outside + лёгкий X (NS close).

## UX SSOT

- Mirror §3.1–3.2 (OP 2026-10-15) — **normative over** prior «React always opens» wording in CR-02 for empty/populated split
- Artboard tone: [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) (не invent new artboard)
- **OOS:** M155 people; `#/next/feed` cutover

## Icons

| Slot | Runtime URL |
|------|-------------|
| React (empty only) | `/icons/next-feed/actions/react.svg` |
| Light dismiss X | `/icons/next-shell/actions/close.svg` (CR-icon `close`) — **icon-only**, a11y name via `t('threadsFeed.reactions.close')` or equivalent, **no** visible «Close» label |

## FR

- **FR-CR-05.1** Empty strip: show `reaction-summary-react`; click opens picker  
- **FR-CR-05.2** Populated strip: **hide** React button; show aggregate  
- **FR-CR-05.3** Aggregate: hover → highlight + open picker; click → open picker (touch/a11y)  
- **FR-CR-05.4** Dismiss: pointer down / click outside `rm-reaction-picker` closes  
- **FR-CR-05.5** Dismiss: icon-only close control top-right inside picker (NS close SVG)  
- **FR-CR-05.6** Escape still closes (Present behavior retained)  
- **FR-CR-05.7** Aggregate no longer only `onAggregateActivate` for M155 — primary job = open picker (people remain OOS)

## Вне scope

Layout hug-width / hint footer → [CR-06](STORY-SPA-CR-06-picker-chrome-layout.md)  
`#/lab/feed` cutover → [CR-07](STORY-SPA-CR-07-lab-feed-cutover.md)  
Invent close SVG; heavy text Close button

## Acceptance Criteria

- [x] Empty: React visible; opens picker on click · structure (OP eye Absent → gate BLOCK)
- [x] Populated: React absent; aggregate hover highlights + opens picker; click opens · structure
- [x] Outside click closes picker · structure
- [x] Top-right icon-only close uses `/icons/next-shell/actions/close.svg` · structure
- [x] Escape closes · structure
- [x] Vitest covers empty/populated open + outside dismiss · structure
- [x] No M155; no invent HTTP · structure


## DoD

Lab `#/lab/reactions` demonstrates open/dismiss before CR-07. Verify: `data-testid` strip + picker unchanged where possible.
