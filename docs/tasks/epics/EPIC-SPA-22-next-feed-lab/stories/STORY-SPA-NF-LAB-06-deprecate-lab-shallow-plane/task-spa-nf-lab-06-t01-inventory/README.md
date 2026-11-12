# SPA-NF-LAB-06-T01 — Inventory lab mounts · Borrow-forbidden list

**Status:** Done · P3 (`2026-10-13T15:09:44Z`)
**Story:** [`../STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`](../STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** false
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T15:02:37Z`
**Closed:** `2026-10-13T15:09:44Z`
**Package:** `pkg-000132`
**UX appendix:** skip (Artboards N/A · NOT visual PASS)
**Depends on:** LAB-01…02 Done
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
List all `features/feed-lab/*` mounts from `FeedLabPage` / overlay; cite shared `features/feed/**` imports as **Borrow-forbidden for lab Done** after LAB-07+. No rename in this task.

## Evidence
- [`INVENTORY.md`](./INVENTORY.md) — live inventory `2026-10-13T15:08:26Z`
- Lab-owned: IssueCard · LabReactionChrome · Discussion · DetailOverlay (+ css)
- Borrow-forbidden: identity · reactions · comments · composer · presentation · semantics

## AC / DoD
- [x] Inventory of lab-owned mounts Present in task evidence / story notes
- [x] Borrow-forbidden shared VL list cited for LAB-07+
- [x] No shared `features/feed/**` file renamed in this task

## Verification
```bash
ls spa-app/src/features/feed-lab/*.{jsx,css}
rg -n "from ['\"]\\.\\./feed/" spa-app/src/features/feed-lab --glob '*.jsx'
# git status spa-app/src/features/feed/ → empty (this tip)
```
