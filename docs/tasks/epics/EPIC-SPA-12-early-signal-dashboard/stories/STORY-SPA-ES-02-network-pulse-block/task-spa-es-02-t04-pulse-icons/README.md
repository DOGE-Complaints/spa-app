# SPA-ES-02-T04 — Pulse icons from catalog

**Status:** Done  
**Story:** [`../STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md) · icon catalog  
**Depends on:** T02 Pulse UI  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-02-t02-pulse-omit-bound-ui/ui-mockup-spec.md`](../task-spa-es-02-t02-pulse-omit-bound-ui/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:02:15Z · **P3:** 2026-08-17T11:10:56Z  
**Package:** `pkg-000067`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png
```

## Purpose
Wire Pulse block icons from catalog (ON DISK 2026-08-17). Bind slots only; **omit** Contributors.

> Источник: [STORY-SPA-ES-icon-assets.md](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md). Languages/Topics — labels from Pulse payload, no dedicated `ic-*`.

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Pulse header mark | `/icons/early-signal-dashboard/ic-pulse-mark.png` | `public/icons/early-signal-dashboard/ic-pulse-mark.png` | bind compact header |
| Stories metric | `/icons/early-signal-dashboard/ic-pulse-stories.png` | `public/icons/early-signal-dashboard/ic-pulse-stories.png` | bind `stories_collected` |
| Activity metric | `/icons/early-signal-dashboard/ic-pulse-activity.png` | `public/icons/early-signal-dashboard/ic-pulse-activity.png` | bind `recent_stories_7d` — **not** CAB `ic-story-activity` |
| Areas metric | `/icons/story-handoff/ic-field-location.png` | `public/icons/story-handoff/ic-field-location.png` | bind `areas` |
| Listening info | `/icons/story-handoff/ic-info.png` | `public/icons/story-handoff/ic-info.png` | honesty / listening copy |
| Contributors / Voices | — | — | **omit** — do not wire `/icons/user-cabinet/ic-field-role.png` |
| Particle / density viz | — | — | CSS — **not** `ic-*` |

## Risk
Wiring `ic-field-role.png` / CAB `ic-story-activity`; basename-only / glob `ic-pulse-*`.

## Code Facts (re-verify at execute)
- Disk (ls this APPLY): `spa-app/public/icons/early-signal-dashboard/ic-pulse-{mark,stories,activity}.png` · `spa-app/public/icons/story-handoff/ic-field-location.png` · `ic-info.png`.
- Catalog: [STORY-SPA-ES-icon-assets.md](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md).
- Pulse slot: [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) — titles only, no icon `<img>` in slot body yet.

## AC / DoD
- [x] (P0) Wire exact runtime paths from table above (no basename-only, no `ic-pulse-*` glob)
- [x] (P0) Do not wire Contributors / `ic-field-role.png`
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change

## Where to change
- `spa-app/src/components/earlySignal/` Pulse block (or Pulse slot)

## Out of scope
Icon PNG generation. Voices / Contributors metrics. `/metrics`. ES-03 Emerging HTTP.

## Verification
```bash
test -f spa-app/public/icons/early-signal-dashboard/ic-pulse-mark.png
test -f spa-app/public/icons/early-signal-dashboard/ic-pulse-stories.png
test -f spa-app/public/icons/early-signal-dashboard/ic-pulse-activity.png
test -f spa-app/public/icons/story-handoff/ic-field-location.png
test -f spa-app/public/icons/story-handoff/ic-info.png
```
