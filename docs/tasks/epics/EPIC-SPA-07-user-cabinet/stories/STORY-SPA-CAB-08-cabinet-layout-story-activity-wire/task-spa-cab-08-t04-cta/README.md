# SPA-CAB-08-T04 — Go to Feed → /next/feed

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md`](../STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md`](../../../../../backlog-stories/cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md)  
**ui_scope:** `cabinet` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T14:39:13Z`  
**Package:** `pkg-000217`  
**Path A:** M170+M45 · Interview P5 · p13UxReady

## Purpose

FR-CAB-08.5: Empty CTA → `/next/feed` (label Go to Feed) — not `/board`.

## Code Facts (verify)

- Target: Story Activity empty CTA href `/next/feed`

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · no invent OP PASS

## AC / DoD

- [ ] Structure claims only after code verify  
- [ ] Visual Done not claimed without OP eye

## Where changed

_(Await P3)_ `StoryActivityCard.jsx` · soft i18n

## Verification

```bash
rg -n "Go to Feed|/board|/next/feed" spa-app/src --glob '*StoryActivity*' spa-app/src/i18n/cabinetDictionary.js 2>/dev/null | head -30
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/user profile/mockup-45-story-activity-state-sheet-spec.md
```
