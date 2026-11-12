# STORY-SPA-NF-09 — Reactions strip + picker chrome (M154)

## Meta
- **Key:** `STORY-SPA-NF-09-reactions-strip-picker-chrome`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-09-reactions-strip-picker-chrome/STORY-SPA-NF-09-reactions-strip-picker-chrome.md)
- **Status:** Done · P3 (`2026-10-11T14:04:38Z`) · **`pkg-000111`**
- **Depends on:** NF-05 Done (catalog/Closed PUT); **NF-07** (4th civic Reactions zone); [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md) **AD-VP-01**, **AD-VP-02**, **AD-VP-04**
- **Related:** parity audit F3 · F2 wire
- **Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
- **Code home:** `features/feed/` presentation ± wrap `ReactionControls` · `#/next/feed*`
- **ui_scope:** `feed`
- **Arch:** [02 §1a–1b](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

## Зачем
M154 compact aggregate strip + grouped picker chrome (not classic marks+white pill as Done visual).

## UX SSOT
- [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
- Must-states: `THR-R-A` aggregate · strip empty/loading/error · picker Emotional/Epistemic (/Moderation comments) · desktop popover · mobile sheet · capacity · `THREAD-ROOT-SCOPE`
- M155 people surfaces **OOS**

## Arch delta (откуда ноги)
NF-05 AC «match M154» + Path A only required groups+Close → classic chrome PASS. **AD-VP-01/02** require feed presentation chrome. Semantics/catalog/PUT stay shared.

## Функциональные требования (FR)
- **FR-NF-09.1** Compact aggregate strip per M154 (marks + count + React affordance).
- **FR-NF-09.2** Desktop picker = anchored popover with labelled groups; mobile = bottom sheet.
- **FR-NF-09.3** Wire civic strip Reactions zone (NF-07) to same picker entry.
- **FR-NF-09.4** reactions.v1 ids only; capacity; Agree⟂Disagree; root = no Moderation.
- **FR-NF-09.5** No M155 people / Connect invent.
- **FR-NF-09.L10N** reuse `threadsFeed.reactions.*`

## Verify / edge matrix (local-five)
| Direction | Expect |
|-----------|--------|
| Strip empty | React affordance; no fake zero theatre |
| Strip populated | Aggregate honesty |
| Picker open desktop/mobile | Groups + capacity copy |
| Max capacity | Block 4th until deselect |
| Save error | Restore + retry honesty |
| Thread-root | No Moderation group |
| Live screenshots | vs M154 panels |

## Вне scope
M155; invent reaction ids; shell; Path A narrowing to «groups only»

## Acceptance Criteria
- [x] Live strip+picker chrome vs M154 (local-five)
- [x] Civic Reactions zone opens picker
- [x] Catalog/Closed PUT only; no M155
- [x] Edges exercised; cites AD-VP-01/02
