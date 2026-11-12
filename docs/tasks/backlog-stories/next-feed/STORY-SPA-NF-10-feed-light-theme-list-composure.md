# STORY-SPA-NF-10 — Feed light theme + list composure (M149/M160)

## Meta
- **Key:** `STORY-SPA-NF-10-feed-light-theme-list-composure`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-10-feed-light-theme-list-composure/STORY-SPA-NF-10-feed-light-theme-list-composure.md)
- **Status:** Done · P3 (`2026-10-11T14:44:52Z`) · **`pkg-000112`**
- **Depends on:** NF-07…09 preferred (surfaces exist); [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md) **AD-VP-01**, **AD-VP-04**
- **Related:** parity audit F6 · M149 Partial
- **Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
- **Code home:** `features/feed/` + tokens/`data-theme` · `#/next/feed*`
- **ui_scope:** `feed`
- **Arch:** [02 §3 tokens](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) · light-first artboards

## Зачем
Light-first feed card/thread plane vs frequent dark cards; reduce loading theatre where FE can (N+1 honesty without invent batch API).

## UX SSOT
- [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) populated light board/content
- [M160](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md) `THEME-POST-L/D`, `THEME-THREAD-L/D`
- Shell chrome OOS (next-shell) — score **feed content** tokens

## Arch delta (откуда ноги)
Path A WAIVE dark→M160 left feed cards dark while artboards light-first. Not invent new theme system — apply existing `[data-theme]` / tokens to feed surfaces (AD-VP-01 feed plane). Batch social API = OOS (DUI-Q11).

## Функциональные требования (FR)
- **FR-NF-10.1** Default light theme: civic + discussion surfaces match light-first geometry/tokens.
- **FR-NF-10.2** Dark parity sample (M160) does not regress contrast/a11y.
- **FR-NF-10.3** List composure: avoid prolonged multi-card loading theatre where FE can (skeletons/ordering); **no invent** gateway batch social endpoint.
- **FR-NF-10.L10N** no new copy required unless contrast labels needed.

## Verify / edge matrix (local-five)
| Direction | Expect |
|-----------|--------|
| Light populated feed | Cards/discussion light-first vs M149/M160 L |
| Toggle dark | Hierarchy intact; readable |
| Loading many threads | Honest progress; Issue cards not blank forever without status |
| 320 / 390 | No horizontal page scroll; actions reachable |
| Live screenshots | light + dark sample |

## Вне scope
Shell theme ownership invent; gateway N+1 batch invent; M155

## Acceptance Criteria
- [x] Live light feed content vs M149/M160 light baseline (local-five)
- [x] Dark sample parity smoke
- [x] No invent batch social API
- [x] Cites AD-VP-01/04
