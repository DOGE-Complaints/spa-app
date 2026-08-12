# SPA-CAB-07-T04 — Icon-wiring M22 (reuse story-handoff)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-07-cabinet-page-states.md`](../STORY-SPA-CAB-07-cabinet-page-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) §Иконки, T06  
**Depends on:** T02 ErrorPanel  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T13:48:38Z

## Purpose
Подключить M22 icons: warning triangle + retry из story-handoff reuse. Новых ассетов не генерировать.

## Risk
Missing/wrong icon paths → non-engineering visual or broken img.

## Code Facts (re-verify at execute)
- Present on disk: `public/icons/story-handoff/ic-warning-triangle.png`, `ic-auto-resubmit.png`.
- M23 empty icons already wired in CAB-02…06 — no new wiring required here.

## AC / DoD
- [ ] (P0) M22 ErrorPanel uses `/icons/story-handoff/ic-warning-triangle.png`.
- [ ] (P0) Retry affordance uses `/icons/story-handoff/ic-auto-resubmit.png` (or equivalent wired reuse).
- [ ] (P1) No new icon files under `public/icons/user-cabinet/` for CAB-07.

## Where to change
- ErrorPanel / AppErrorState component icon `src` / constants map

## Out of scope
- Generating PNGs. M23 icon inventory (already Done in prior stories).

## Verification
```bash
ls spa-app/public/icons/story-handoff/ic-warning-triangle.png spa-app/public/icons/story-handoff/ic-auto-resubmit.png
cd spa-app && npm test -- --run ErrorPanel
```

Gate: [`acceptance-verification-spa-cab-07-t04.md`](./acceptance-verification-spa-cab-07-t04.md)
