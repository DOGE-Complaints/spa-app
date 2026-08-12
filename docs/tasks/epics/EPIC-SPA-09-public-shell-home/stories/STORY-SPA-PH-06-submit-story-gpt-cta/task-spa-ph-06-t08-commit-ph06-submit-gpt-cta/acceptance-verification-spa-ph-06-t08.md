# Acceptance verification — SPA-PH-06-T08

- **Task:** Commit PH-06 Submit GPT CTA to git HEAD (F1)
- **run_mode:** `spa_ph_06_audit_2026_08_06`
- **Result:** PASS
- **Date:** 2026-08-06T09:48:45Z
- **Commit:** `16e7733`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Scoped PH-06 files committed | PASS | `16e7733` · 14 files (helper, Header/Board/HowItWorks/StorySubmit, tests, puppeteer, package.json) |
| HEAD no `g-RkVU9xLWN` on Submit paths | PASS | `git show HEAD:…/BoardPage.jsx` → `getStoryGptHref` only |
| HEAD has `storyGptUrl.js` | PASS | `git show HEAD:src/config/storyGptUrl.js` |
| Vitest PH-06 suite | PASS | storyGpt + ph06Submit + Header.publicNav + HowItWorks · **16/16** |

## Commands

```bash
cd spa-app && git rev-parse --short HEAD   # 16e7733
cd spa-app && git show HEAD:src/pages/BoardPage.jsx | rg "g-RkVU9xLWN|getStoryGptHref"
cd spa-app && npm test -- --run storyGpt ph06Submit Header.publicNav HowItWorks
```
