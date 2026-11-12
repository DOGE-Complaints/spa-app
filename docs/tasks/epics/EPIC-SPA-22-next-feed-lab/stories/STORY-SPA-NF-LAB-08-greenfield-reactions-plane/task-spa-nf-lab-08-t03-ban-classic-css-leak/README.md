# SPA-NF-LAB-08-T03 — Ban classic class/CSS leak proof

**Status:** Done · P3 (`2026-10-13T16:09:25Z`)
**Story:** [`../STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md`](../STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T16:01:32Z`
**Package:** `pkg-000134`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
**Depends on:** T02 wire
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK** · not package visual Done

## Result
- nflab08 ban: Deprecated / ReactionChrome / Controls.css / classic class / emoji
- live `banDom=false` · `#/next/feed` untouched this tip

## AC / DoD
- [x] Ban grep empty under `post/reactions/` (+ greenfield mount path)
- [x] Vitest ban coverage Present
- [x] `#/next/feed` / `#/board` untouched this tip
