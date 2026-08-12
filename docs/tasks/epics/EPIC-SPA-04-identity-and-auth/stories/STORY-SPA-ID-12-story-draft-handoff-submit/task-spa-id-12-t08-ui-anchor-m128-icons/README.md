# SPA-ID-12-T08 — UI anchor M128 + story-handoff icons

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T03, T06, T07  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
**Visual anchor M128 (Path A):** implement state panels per mockup-128; place icons from [icon-assets catalog](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md) in `public/icons/story-handoff/`; wire `/icons/story-handoff/ic-*.png` in components. Create `ui-mockup-spec.md` linking M128; UI-0 baseline + post-implement PNGs (9 states, 1536×1024).

## Risk
Wrong icon filenames break Scope I. Using `gptBridge.success.*` for State F confuses OAuth vs submit terminal (backlog reuse note).

## Code Facts (re-verify at execute)
- M128 spec: [`mockup-128-*.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md) — validated 2026-07-04.
- grep `story-handoff` in [`spa-app/public/`](../../../../../../../public/) → **no icons** at scaffold.
- Icon SSOT: [../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md) — 19 assets.

## AC / DoD
- [ ] (P0) All M128 states A/B/C/D/E/F/G/H/E0 rendered per spec (Scope I).
- [ ] (P0) Icons use catalog filenames only; decorative `aria-hidden`, semantic `aria-label` (Scope I).
- [ ] (P0) `storyHandoff.*` labels match M128; chips reuse `gptBridge.draft.*` (Scope H).
- [ ] (P0) `ui-mockup-spec.md` Path A → M128; `ui-baseline/README.md` + post-implement PNGs.
- [ ] (P1) `data-testid` selectors documented for T09 puppeteer.

## Where to change
- New: `spa-app/src/components/StoryHandoff/` (panels + CSS)
- `public/icons/story-handoff/ic-*.png`
- This folder: `ui-mockup-spec.md`, `ui-baseline/`

## Out of scope
Puppeteer gate (T09). Story gate §UI (T10).

## Verification
```bash
cd spa-app && npm run dev
# UI-0/3: task folder ui-baseline; puppeteer in T09
```
