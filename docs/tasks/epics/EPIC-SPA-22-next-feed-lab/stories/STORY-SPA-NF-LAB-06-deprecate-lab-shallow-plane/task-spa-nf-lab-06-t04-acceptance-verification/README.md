# SPA-NF-LAB-06-T04 — Story acceptance-verification

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
**Depends on:** T01–T03
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Final story acceptance-verification: map every backlog AC to evidence · update gate · confirm package INDEX documents Deprecated exports · explicit **Not** visual Done · **not** greenfield (LAB-07+).

## Gate
[`../story-acceptance-gate-STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`](../story-acceptance-gate-STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md) · **PASS** (rename foundation · NOT visual Done)

## AC map
| AC | Status | Evidence |
|----|--------|----------|
| Lab-owned only under Deprecated names/paths | PASS | T02 · nflab06 · `ls *Deprecated*` |
| No shared `features/feed/**` rename | PASS | T01/T03 · `git status features/feed/` empty |
| `#/next/feed` / `#/board` smoke unchanged | PASS | no product host mutate this tip |
| Deprecated exports in package INDEX | PASS | next-feed-lab INDEX note |
| Not visual Done · not greenfield | PASS | gate note · `data-lab-visual-done=false` |

## AC / DoD
- [x] Gate rows filled from live run
- [x] INDEX Deprecated export note Present
- [x] Explicit NOT visual Done / NOT greenfield
