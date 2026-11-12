# STORY-SPA-CR-04 — Reactions L10N + theme stress

## Meta

- **Key:** `STORY-SPA-CR-04-reactions-l10n-theme-stress`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · `pkg-000140` · Await residual
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · AC-24-* L10N / a11y stress via M160
- **Depends on:** [CR-03](STORY-SPA-CR-03-lab-reactions-page.md) · [CR-icon](STORY-SPA-CR-icon-assets.md)
- **Blocks:** —
- **Code home (acceptance target):** lab `#/lab/reactions` surfaces under ET/RU/EN × light/dark × 320 / 200%

## Зачем

Prove reactions lab surfaces under locale + theme + density stress before any next-feed cutover. Icons `currentColor`; long ET/RU wrap; no new API.

## UX SSOT

- Spec/PNG: [M160](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png) — apply stress matrix to **reactions** lab surfaces
- Functional copy SSOT remains [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
- **OOS:** M155 people; invent HTTP; `#/next/feed` cutover

## Icons

[CR-icon §Reuse](STORY-SPA-CR-icon-assets.md) — all mark/chrome Runtime URLs; SVGs use **currentColor** / theme tokens (M160). No emoji interim.

## API

- No new endpoints; FixtureAdapter fixtures only ([CR-api](STORY-SPA-CR-api-requirements.md))

## FR

- **FR-CR-04.1** ET / RU / EN on strip + picker + lab chrome  
- **FR-CR-04.2** Light + dark; icons track theme  
- **FR-CR-04.3** Narrow 320px + 200% text; wrap without clipping critical controls  
- **FR-CR-04.4** Namespace: reuse `threadsFeed.reactions.*` Present; add `reactions.*` only for gaps  

## Вне scope

New API; people UI; next-feed cutover; invent mark filenames outside CR-icon

## Тексты и переводы

### Namespace policy

1. Prefer Present `threadsFeed.reactions.*` (react, close, chooseUpTo, layers, ids, unavailable, XOR helper)  
2. Draft `reactions.*` only for CR-01/02/03 gaps (retry, saveError, lab chrome)  
3. Mark **ids** never shown as raw user copy — always via `id.*` labels  
4. Omit hopeful / amused as selectable (PRODUCT-BRIEF lock)

### Stress sample keys

| area | keys |
|------|------|
| Strip | `threadsFeed.reactions.react` · `unavailable` · CR-01 draft retry |
| Picker | layers · `chooseUpTo` · `agreeDisagreeExclusive` · CR-02 saveError |
| Lab | CR-03 `reactions.lab.*` |

## Acceptance Criteria

- [ ] Lab reactions surfaces pass M160-style stress: ET/RU/EN × light/dark × 320/200%  
- [ ] Icons currentColor / theme-safe  
- [ ] Long ET/RU wrap; no clipped primary actions  
- [ ] No new API; FixtureAdapter only  
- [ ] L10N policy: reuse Present; ids not raw; no hopeful/amused selectable  
