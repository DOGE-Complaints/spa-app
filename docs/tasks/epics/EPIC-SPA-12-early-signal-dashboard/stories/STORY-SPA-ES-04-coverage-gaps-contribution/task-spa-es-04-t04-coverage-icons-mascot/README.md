# SPA-ES-04-T04 — Gap/help icons + mascot path

**Status:** Done  
**Story:** [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) · icon catalog  
**Depends on:** T01–T03 UI slots  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-04-t01-whats-missing-abstract/ui-mockup-spec.md`](../task-spa-es-04-t01-whats-missing-abstract/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:54:44Z · **P3:** 2026-08-17T12:02:25Z  
**Package:** `pkg-000069`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png
```

## Purpose
Wire What's Missing + Help icons and mascot from catalog (ON DISK 2026-08-17). Full runtime paths only. Picture-forming viz = CSS — **not** `ic-*`.

| Функция | Runtime | Disk |
|---------|---------|------|
| Gap Areas | `/icons/story-handoff/ic-field-location.png` | `public/icons/story-handoff/ic-field-location.png` |
| Gap Languages | `/icons/early-signal-dashboard/ic-gap-languages.png` | `public/icons/early-signal-dashboard/ic-gap-languages.png` |
| Gap Groups | `/icons/identity/ic-profile-conflict.png` | `public/icons/identity/ic-profile-conflict.png` |
| Gap Themes | `/icons/story-handoff/ic-field-institution.png` | `public/icons/story-handoff/ic-field-institution.png` |
| Gap other | `/icons/early-signal-dashboard/ic-gap-ellipsis.png` | `public/icons/early-signal-dashboard/ic-gap-ellipsis.png` |
| Help share | `/icons/early-signal-dashboard/ic-help-share.png` | `public/icons/early-signal-dashboard/ic-help-share.png` |
| Help together | `/icons/early-signal-dashboard/ic-help-together.png` | `public/icons/early-signal-dashboard/ic-help-together.png` |
| Help see | `/icons/identity/ic-eye.png` | `public/icons/identity/ic-eye.png` |
| Help mascot | `/assets/es-help-mascot.png` | `public/assets/es-help-mascot.png` |
| Submit | `/icons/public-home/ic-external-link.png` | `public/icons/public-home/ic-external-link.png` |
| Lock | `/icons/story-handoff/ic-lock.png` | `public/icons/story-handoff/ic-lock.png` |
| Chevron | `/icons/public-home/ic-chevron-right.png` | `public/icons/public-home/ic-chevron-right.png` |

## Risk
Basename-only paths; inventing Issue crest; landing deep-link for mascot; `/dashboard`.

## Code Facts (re-verify at execute)
- NEW PNG + mascot **ON DISK** (ls 2026-08-17): `ic-gap-languages.png` · `ic-gap-ellipsis.png` · `ic-help-share.png` · `ic-help-together.png` · `es-help-mascot.png`.
- Blocks `WhatsMissingBlock` / `HelpCompleteBlock` **not** on disk yet (T01/T02 execute).
- Picture-forming viz: CSS — **not** `ic-*` (FR-ES-04.4).

## AC / DoD
- [x] (P0) Wire exact runtime paths from table above (no basename-only)
- [x] (P0) Mascot = `/assets/es-help-mascot.png` — no landing deep-link
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change
- [x] (P1) Align with mockup M139

## Where to change
- `spa-app/src/components/earlySignal/WhatsMissingBlock.jsx`
- `spa-app/src/components/earlySignal/HelpCompleteBlock.jsx`

## Out of scope
Generate PNG. ES-05 rail/topic icons. Product code this P1.

## Verification
```bash
test -f spa-app/public/icons/story-handoff/ic-field-location.png
test -f spa-app/public/icons/early-signal-dashboard/ic-gap-languages.png
test -f spa-app/public/icons/identity/ic-profile-conflict.png
test -f spa-app/public/icons/story-handoff/ic-field-institution.png
test -f spa-app/public/icons/early-signal-dashboard/ic-gap-ellipsis.png
test -f spa-app/public/icons/early-signal-dashboard/ic-help-share.png
test -f spa-app/public/icons/early-signal-dashboard/ic-help-together.png
test -f spa-app/public/icons/identity/ic-eye.png
test -f spa-app/public/assets/es-help-mascot.png
test -f spa-app/public/icons/public-home/ic-external-link.png
test -f spa-app/public/icons/story-handoff/ic-lock.png
test -f spa-app/public/icons/public-home/ic-chevron-right.png
```
