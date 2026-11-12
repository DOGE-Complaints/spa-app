# ui-mockup-spec — STORY-SPA-CT-31 (Path A)

> Path A · **code lock** · CT-22 preview host Present · ARCH §17 · policy **A** · P1.3 `2026-10-21T17:56:40Z` · **NO BRIEF**

## Target

- Continuity: CT-22 comment attachment preview chrome · CT-30 `publishedUrl` map
- Strategy **A**: authenticated fetch → blob → objectURL (not bare `<img src={publishedUrl}>` alone)
- Lab FixtureAdapter unchanged

## Delta vs AS-IS

Bare `<img src={publishedUrl}>` → 401 without Bearer · replace with auth-consumable objectURL path · revoke / loading / honesty held.

## Partial

OP eye Absent → visual gate **BLOCK** · no invent OP PASS.
