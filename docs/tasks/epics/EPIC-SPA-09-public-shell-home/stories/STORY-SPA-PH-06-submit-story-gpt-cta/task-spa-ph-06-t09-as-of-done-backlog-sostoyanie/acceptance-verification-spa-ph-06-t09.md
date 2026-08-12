# Acceptance verification — SPA-PH-06-T09

- **Task:** As-of-Done backlog §состояние (F2)
- **run_mode:** `spa_ph_06_audit_2026_08_06`
- **Result:** PASS
- **Date:** 2026-08-06T09:49:54Z
- **HEAD (T08):** `16e7733`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| §состояние: helper + Board env Submit | PASS | backlog no «today hardcoded»; cites `storyGptUrl.js` + HEAD removed |
| Status Done + pkg/HEAD note | PASS | Meta Status + §состояние header |
| FR/AC not rewritten | PASS | FR/AC checkboxes unchanged; only §состояние + Meta Status |
| No stale `g-RkVU9xLWN` claim in §состояние | PASS | `rg` — id only in FR forbid wording / T04 table, not as current Board CTA |

## Commands

```bash
rg -n "hardcoded|g-RkVU9xLWN|getStoryGpt|As-of-Done" spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md
git -C spa-app show HEAD:src/pages/BoardPage.jsx | rg "g-RkVU9xLWN|getStoryGptHref"
```
