# UI mockup spec — SPA-CAB-06-T01 (anchor)

**Story:** STORY-SPA-CAB-06-contribution-layer  
**Path A:** extends existing mockup SSOT (operator `@mockup:` M53 + M23 — human gate skip)  
**Viewport:** 1536×1024  
**Route:** `/#/profile`  
**ui_scope:** `visual` · **ui_anchor:** `true`  
**Scaffolded:** 2026-07-28T09:20:22Z

## Extends mockup

- [mockup-53-contribution-layer-state-sheet-spec.md](../../../../../../UX/mockups/user%20profile/mockup-53-contribution-layer-state-sheet-spec.md) — module states A1–C3 SSOT
- [mockup-53-contribution-layer-state-sheet-spec.png](../../../../../../UX/mockups/user%20profile/mockup-53-contribution-layer-state-sheet-spec.png)
- [mockup-23-user-cabinet-empty-new-user-spec.md](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md) — empty composite §Civic Contributions
- [mockup-23-user-cabinet-empty-new-user-spec.png](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.png)

Placement: M99 Section 5 contribution slot (full-width bottom), CAB-01 shell.

## Component

```tsx
<ContributionLayer
  previewFlag={/* DEV doge.contrib-preview */}
/>
```

Contains child cards: Story Receipts, Contribution Records, Reputation.  
Mounted in `cabinet-slot-contribution` on `UserCabinetPage`. **New** component.

## MVP product deltas vs M53 artboard

| Topic | M53 artboard | MVP AC (backlog) |
|-------|--------------|------------------|
| HTTP | future receipts/records API | **none** — UI stub (GW-CAB-03 Deferred) |
| A1 Submit Story CTA | primary on empty | **omitted** (FR-CAB-06.5 / post-MVP) |
| Retry / affordances | Retry | → `cabinet.common.comingSoon` |
| Reputation | C1–C3 | MVP default **C1 Coming Later** |
| Numeric score / rank | none | **none** (C2 labels only, no numbers) |
| Live A2/B2 | populated lists | UI preview via DEV hook only until GW-CAB-03 |

## Selectors

| Element | Selector |
|---------|----------|
| Cabinet page | `[data-testid="user-cabinet-page"]` |
| Contribution slot | `[data-testid="cabinet-slot-contribution"]` |
| Layer root | `[data-contribution-layer]` |
| Receipts card | `[data-contrib-receipts]` / `[data-contrib-receipts-state]` |
| Records card | `[data-contrib-records]` / `[data-contrib-records-state]` |
| Reputation card | `[data-contrib-reputation]` / `[data-contrib-reputation-state]` |

## States (M53 letters)

| Letter | Module state key | Runtime trigger (DEV `doge.contrib-preview`) |
|--------|------------------|-----------------------------------------------|
| A1 | receipts `empty` | default MVP / `receipts-empty` |
| A2 | receipts `populated` | `receipts-populated` |
| A3 | receipts `unavailable` | `receipts-unavailable` |
| B1 | records `empty` | default |
| B2 | records `populated` | `records-populated` |
| B3 | records `unavailable` | `records-unavailable` |
| C1 | reputation `later` | default MVP / `reputation-later` |
| C2 | reputation `available` | `reputation-available` |
| C3 | reputation `unavailable` | `reputation-unavailable` |

## Visual rules

- Layer owns section title (`cabinet.contrib.layerTitle`); no duplicate slot-header title when mounted
- Icons: `/icons/user-cabinet/ic-contrib-{receipts,records,reputation}.png` + reuse story-handoff cloud/retry — **no** coin/gamification
- L10N: `cabinet.contrib.*` + reuse `cabinet.common.comingLater` / `comingSoon` / `retry`
- Ledger aesthetic (M53 §5); metrics as **text** `{count}`, not icons

## Baseline

See [ui-baseline/README.md](./ui-baseline/README.md).

## Operator gate

Path A — accepted via P3 `@mockup:` M53+M23 md+png (no Path B interview).
