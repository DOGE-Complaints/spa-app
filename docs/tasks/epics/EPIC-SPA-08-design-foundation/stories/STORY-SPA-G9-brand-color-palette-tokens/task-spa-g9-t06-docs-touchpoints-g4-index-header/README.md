# SPA-G9-T06 — Docs touchpoints (INDEX / G4 note / tokens header)

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** backlog FR-G9.7; Documentation touchpoints INDEX / G4 / tokens header  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:45:25Z

## Purpose
Закрыть doc touchpoints: design-foundation INDEX G9 Todo→Done; note на G4 «runtime hex superseded by G9»; header comment в `tokens.css` (brand SSOT = Color Palette v1.0; G4 hex superseded by G9). Опц. ссылка в palette doc.

## Risk
INDEX/G4 stay Todo/stale while runtime Done → bullrun/doc drift.

## Code Facts (re-verify at execute)
- [design-foundation/INDEX.md](../../../../../backlog-stories/design-foundation/INDEX.md) G9 row Todo until this task.
- [STORY-SPA-G4…](../../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) needs supersession note.
- [tokens.css](../../../../../../../src/styles/tokens.css) header still G4 reconciliation comment until updated.

## AC / DoD
- [ ] (P0) INDEX G9 → Done (with pkg/pipeline link).
- [ ] (P0) G4 backlog note: runtime hex superseded by G9 (infra G4 remains).
- [ ] (P0) `tokens.css` header points to Color Palette v1.0 / G9 supersession.
- [ ] (P0) Story AC: INDEX G9 → Done; G4 note + tokens header обновлены.

## Where to change
- EXTEND `backlog-stories/design-foundation/INDEX.md`, G4 backlog story, `tokens.css` header; optional palette doc one-liner.

## Out of scope
- Story acceptance gate file fill (T07). Changing danger/success.

## Verification
```bash
rg -n 'G9|superseded|Color Palette' spa-app/docs/tasks/backlog-stories/design-foundation/INDEX.md spa-app/src/styles/tokens.css
```

Gate: [`acceptance-verification-spa-g9-t06.md`](./acceptance-verification-spa-g9-t06.md)

Gate Date: 2026-08-02T08:59:09Z.
