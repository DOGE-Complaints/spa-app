# STORY-SPA-NF-07 — Civic post visual parity (M150)

## Meta
- **Key:** `STORY-SPA-NF-07-civic-post-visual-parity`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-07-civic-post-visual-parity/STORY-SPA-NF-07-civic-post-visual-parity.md)
- **Status:** Done · P3 (`2026-10-11T13:18:27Z`) · **`pkg-000109`**
- **Wave:** visual parity · after NF-01…06 Done
- **Depends on:** NF-02 Done (civic host); [icon catalog](STORY-SPA-NF-icon-assets.md); [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md) **AD-VP-01**, **AD-VP-04**
- **Related:** parity audit F2, F7 · [proposal](../../../analysis/proposal-next-feed-visual-parity-stories-2026-10-10.md)
- **Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh` (gateway + threads + spa). Visual Done = live `#/next/feed` vs artboard — not pack alone.
- **Code home:** `features/feed/` (`FeedCivicPost` + strip) · Routes `#/next/feed*`
- **ui_scope:** `feed`
- **Arch:** [02 §1a reskin](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) — four-zone strip is feed presentation, not classic 3-zone deferral

## Зачем
Закрыть F2/F7: civic card = M150 composition (4-zone strip + honest meta), без invent OPEN/schema/media.

## UX SSOT
- Spec: [M150](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
- PNG: [M150 png](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
- Must-states: `ISSUE-CARD-NO-MEDIA`; action row exactly `React | Comment | Share | Reactions`; SSR-C-civic (no overlay prod)
- Written honesty: demo `OPEN` / UV-* labels illustrative — wire API `status` as Present (`PUBLISHED` etc.)

## Icons
| UI slot | Logical ID | Runtime URL | Note |
|---------|------------|-------------|------|
| React / Comment / Share | existing | `/icons/next-feed/actions/{react,comment,share}.svg` | Present |
| Reactions (4th zone) | `react` + aggregate marks **or** promote gap | Prefer existing reactions glyphs; **no invent SVG masters** — document gap in catalog if orb master absent | AD-VP-01 |
| Civic identity icon | gap vs M150 paw | **Do not invent** — use approved brand/logo asset if Present, else honest omit + catalog Todo | F7 SPEC |

## Arch delta (откуда ноги)
NF-02 Path A accepted **3-zone** and deferred Reactions → NF-05; NF-05 Did not add 4th civic slot. Arch now requires feed presentation match M150 ([AD-VP-01](ARCH-DELTA-visual-parity-wave-2026-10-11.md)). This story owns closing that deferral — not a silent redesign.

## Функциональные требования (FR)
- **FR-NF-07.1** Action strip = four equal zones: React, Comment, Share, Reactions (M150/M152 anatomy).
- **FR-NF-07.2** Reactions zone affordance wires to reactions UX (NF-09 may finish chrome; slot Present here).
- **FR-NF-07.3** Meta honesty: API status chips; no invent humanized `ISSUE UV-*` / green OPEN when API says PUBLISHED.
- **FR-NF-07.4** Light-first card hierarchy tokens for civic surface (pair NF-10 if shared tokens).
- **FR-NF-07.L10N** reuse `threadsFeed.post.action.*` / `nextFeed.post.*`; add keys only if new copy.

## Verify / edge matrix (local-five)
| Direction | Expect |
|-----------|--------|
| Happy populated card | 4 zones visible; no duplicate strip inside Discussion (NF-08 removes classic row) |
| No-media | No blank media frame |
| Missing geo/date | Collapse honest |
| Narrow 390 | Four zones reflow per M150 G / M159 without clip |
| Reactions empty | Zone still present; no fake counts |
| Live screenshot | Evidence vs M150 panel A |

## Вне scope
Schema/media production; M155; shell chrome; invent icons/API; weaken Path A below M150 four-zone

## Acceptance Criteria
- [x] Live `#/next/feed` civic strip = 4 zones per M150 (local-five)
- [x] Status/meta honesty (no invent OPEN/UV demo as prod claim)
- [x] Icons = catalog / documented gap only
- [x] Cites AD-VP-01 · ARCH-DELTA · api-req
- [x] Edge matrix exercised; evidence saved
