# SPA-CAB-06-T03 — Icon-wiring contrib (#19–#21 + reuse)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-06-contribution-layer.md`](../STORY-SPA-CAB-06-contribution-layer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md) §Иконки, T07; [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #19–#21  
**Depends on:** T01 (component exists)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-27T14:45:14Z

## Purpose
Закрыть backlog T07: wire пути иконок #19–#21 + reuse `ic-cloud-error` / `ic-auto-resubmit` в ContributionLayer. **Без** coin/gamification symbolism (каталог §Не включать). Метрики count — текст, не иконки.

## Risk
Wrong paths / DeFi-coin art → visual fail vs M53; missing reuse icons break A3/B3/C3 unavailable UI.

## Code Facts (re-verify at execute)
- On disk (may be 1096 B placeholders): `public/icons/user-cabinet/ic-contrib-{receipts,records,reputation}.png`.
- Reuse exist: `public/icons/story-handoff/ic-cloud-error.png`, `ic-auto-resubmit.png`.
- Placeholder PNG (1096 B) = `placeholder-ok` for wire/slot (real art ≫1096 may be post-audit).
- Pattern: CAB-05 T03 wallet icon wiring.

## AC / DoD
- [ ] (P0) ICONS map wires `/icons/user-cabinet/ic-contrib-receipts|records|reputation.png`.
- [ ] (P0) Unavailable/retry reuse `/icons/story-handoff/ic-cloud-error.png` + `ic-auto-resubmit.png`.
- [ ] (P0) No coin/gamification/DeFi symbolism in icon choice.
- [ ] (P1) Metrics remain text (`Receipts: {count}`), not icon glyphs.
- [ ] (P1) Paths/names unchanged vs catalog.

## Where to change
- `spa-app/src/components/ContributionLayer/` (ICONS map / `<img src>`)
- Assets already under `public/icons/user-cabinet/` and `story-handoff/` — do not invent new filenames

## Out of scope
- Generating new art ≫1096 B (post-audit if needed). L10N (T04). Vitest (T05). JSX state logic beyond wiring.

## Verification
```bash
cd spa-app && ls -la public/icons/user-cabinet/ic-contrib-*.png public/icons/story-handoff/ic-cloud-error.png public/icons/story-handoff/ic-auto-resubmit.png
cd spa-app && npm test -- --run ContributionLayer
```

Gate: [`acceptance-verification-spa-cab-06-t03.md`](./acceptance-verification-spa-cab-06-t03.md)
