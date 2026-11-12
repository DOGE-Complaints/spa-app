# LAB closed vs OP-WAIVED — STORY-SPA-CT-20

> **UTC:** `2026-10-20T13:13:37Z` · **pkg-000178** · P3 Execute  
> **Rule:** FR-CT-20.6 — any LAB not closed in-wave → **OP-WAIVE** with explicit note · no silent drop

| LAB | Disposition | Evidence |
|-----|-------------|----------|
| LAB-1 | **CLOSED** | Stands `LAB1-load` / `LAB1-empty` / `LAB1-unavail` · shot 01 · vitest ct20 |
| LAB-2 | **CLOSED** | `forcePostFail` stand · shot 02 · soft-fail draft held |
| LAB-3 | **CLOSED** | `attachmentsAvailable=false` · shot 03 · no Attach/file |
| LAB-4 | **CLOSED** | `maxDepth=2` · Reply absent at depth 2 · shot 04 |

**OP-WAIVED:** _(none)_ — all LAB-1…4 closed in-wave.

**Harness:** dual-append unique ids · forest=tree · native `input[type=file]` · zero synthetic Ready chips · shot 05 · exit 0

**OP eye:** Absent · Partial visual=**BLOCK** · no invent OP PASS
