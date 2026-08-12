# SPA-PH-06-T08 — Commit PH-06 Submit GPT CTA to git HEAD (post-audit F1)

**Status:** Done — P6 PASS 2026-08-06T09:48:45Z · commit `16e7733`  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [audit-STORY-SPA-PH-06-execution-2026-08-06.md](../../../../../../analysis/audit-STORY-SPA-PH-06-execution-2026-08-06.md) §F1  
**Depends on:** SPA-PH-06-T01…T07 Done (P3 gate PASS 2026-08-05T10:31:01Z)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_06_audit_2026_08_06`  
**Scaffolded:** 2026-08-06T07:46:38Z  
**Package:** `pkg-000051` (unchanged)

## Purpose
Зафиксировать PH-06 runtime (helper + Header/HowItWorks/Board/StorySubmitPage wire + tests + puppeteer scripts + npm scripts) в `git HEAD`, чтобы clone/reset не возвращал hardcoded Board GPT URL.

## Risk
Partial commit leaving HEAD Board hardcode; committing secrets (`.env`); mixing unrelated WT files.

## Code Facts (re-verify at execute)
- WT: [`src/config/storyGptUrl.js`](../../../../../../../src/config/storyGptUrl.js) present; Board uses `getStoryGptHref` + `publicHome.nav.submitStory`.
- HEAD: `storyGptUrl.js` missing; Board still `g-RkVU9xLWN` + `createIssue` (audit §F1).
- Related WT: Header(+css/test), HowItWorks(+test), StorySubmitPage, `ph06SubmitNoHardcode.test.js`, puppeteer `public-submit-ph06-*.mjs`, `package.json` scripts.

## AC / DoD
- [x] (P0) Scoped PH-06 product + test + puppeteer files committed (operator-approved commit message).
- [x] (P0) HEAD `rg g-RkVU9xLWN` empty on Board/Header/HowItWorks Submit paths.
- [x] (P0) HEAD has `src/config/storyGptUrl.js`; Board uses helper (not hardcoded URL).
- [x] (P0) Gate file filled with `--print-utc-now` Date + commit SHA.

Gate Date: 2026-08-06T09:48:45Z · Commit: `16e7733`.
Gate: [`acceptance-verification-spa-ph-06-t08.md`](./acceptance-verification-spa-ph-06-t08.md)

## Where to change
- Commit only PH-06 scoped paths (see audit §Mount / HEAD)
- Gate: `acceptance-verification-spa-ph-06-t08.md` (create at P6)

## Out of scope
F2 (T09), F3 (T10), F4–F6 WAIVED, pkg change, PH-07 implement.

## Verification
```bash
cd spa-app && git show HEAD:src/config/storyGptUrl.js | head
cd spa-app && git show HEAD:src/pages/BoardPage.jsx | rg -n "g-RkVU9xLWN|getStoryGptHref|createIssue" || true
rg -n "g-RkVU9xLWN" spa-app/src/pages/BoardPage.jsx spa-app/src/components/AppShell/Header.jsx spa-app/src/pages/HowItWorksPage.jsx
cd spa-app && npm test -- --run storyGpt ph06Submit Header.publicNav HowItWorks
```
