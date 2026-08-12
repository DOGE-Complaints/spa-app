# Acceptance verification — SPA-ID-14-T08

- **Task:** As-of-Done backlog SSOT (F1)
- **Result:** PASS
- **Date:** 2026-08-07T20:25:53Z
- **Package:** `pkg-000055` · `run_mode=spa_id_14_audit_2026_08_07`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Backlog As-of-Done vs Historical (pre-ID-14) | PASS | [`STORY-SPA-ID-14-post-submit-path-choice.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md) §Зачем / Gap / Verified facts |
| Pipeline story mirror | PASS | [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md) same split |
| No product code change | PASS | docs only this task |

## Commands

```bash
rg -n "As-of-Done|Historical|Live skip State F" spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md
rg -n "setPhase\\(STORY_HANDOFF_PHASES.SUBMITTED\\)" spa-app/src/pages/StorySubmitPage.jsx
```
