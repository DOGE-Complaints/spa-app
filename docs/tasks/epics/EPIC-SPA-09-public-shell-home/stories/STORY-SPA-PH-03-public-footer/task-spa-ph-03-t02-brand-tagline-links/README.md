# SPA-PH-03-T02 — Brand + tagline + links

**Status:** Done — P3 2026-08-04T10:46:36Z  
**Story:** [`../STORY-SPA-PH-03-public-footer.md`](../STORY-SPA-PH-03-public-footer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md) FR-PH-03.2–03.6  
**Depends on:** T01 PublicFooter layout  
**ui_scope:** `visual` (extends T01)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T10:35:41Z

## Purpose
Fill Footer A content: quiet brand (logo/name) + literal `[TAGLINE_TBD]` + About · Privacy · Contact links. Narrow stack/wrap per M131; no social clusters.

## Risk
Inventing final tagline; adding social/newsletter; wrong hrefs without documenting `#` placeholders.

## Code Facts (re-verify at execute)
- Structure lives in `<PublicFooter />` from T01; mount points AppShell / public chrome.
- Tagline must stay literal `[TAGLINE_TBD]` until product approval (FR-PH-03.3).
- Links v1: `#` or static routes `/about`, `/privacy`, `/contact` if present — document placeholders (FR-PH-03.4); **no CMS**.
- Optional compact brand: reuse `public/assets/` logo only — **no NEW** icon-catalog row (M131 / icon assets).
- No `publicHome.footer.*` until T03 — may use temporary literals matching backlog L10N table, then wire keys in T03.

## AC / DoD
- [x] (P0) Structure: brand + tagline + About/Privacy/Contact (FR-PH-03.2) → backlog AC #1.
- [x] (P0) Tagline displays literal `[TAGLINE_TBD]` (FR-PH-03.3) → backlog AC #2.
- [x] (P0) Links static `#` or agreed routes; no CMS (FR-PH-03.4).
- [x] (P0) No icon rows / social / newsletter / card grid (FR-PH-03.5) → backlog AC #2.
- [x] (P0) Narrow: stack/wrap; brand + links retained (FR-PH-03.6).

## Where to change
- `spa-app/src/components/PublicFooter/` (content + CSS)
- Optional: `spa-app/public/assets/` logo reuse only

## Out of scope
L10N dictionary keys (T03); vitest (T04); gate (T05); final tagline approval; social icons; newsletter; full legal CMS; collective metrics.

## Verification
```bash
rg -n 'TAGLINE_TBD|PublicFooter|about|privacy|contact' spa-app/src/components
rg -n 'newsletter|instagram|twitter|facebook|social' spa-app/src/components/PublicFooter || echo 'no_social_ok'
```
