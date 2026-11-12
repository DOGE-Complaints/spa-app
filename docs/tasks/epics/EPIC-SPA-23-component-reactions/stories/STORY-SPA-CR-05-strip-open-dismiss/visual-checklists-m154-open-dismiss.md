# Visual checklist — M154 open/dismiss (CR-05)

**Date:** 2026-10-15T10:24:52Z  
**Path A** · mockup accepted · OP eye **Absent** · Partial = **BLOCK**  
**Artboard:** `mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0` (md+png)  
**Normative:** OP-UX-MIRROR §3.1–3.2  
**Route:** `#/lab/reactions` · FixtureAdapter **only**

| Check | Structure | OP eye |
|-------|-----------|--------|
| Empty strip: React visible; click opens picker | Present (shots 01–02 · vitest) | Absent |
| Populated: React hidden; aggregate present | Present (shot 03 · vitest) | Absent |
| Aggregate hover → highlight + picker open | Present (shot 04 · vitest) | Absent |
| Aggregate click → picker open (touch/a11y) | Present (vitest) | Absent |
| Click outside `rm-reaction-picker` closes | Present (vitest) | Absent |
| Icon-only NS close top-right (no «Close» label) | Present (shot 05 · vitest) | Absent |
| Escape closes (retained) | Present (vitest) | Absent |
| No M155 · no invent HTTP · `#/next/feed` unchanged | Present (`data-m155-oos`) | Absent |

**Verdict:** structure held · visual **BLOCK** until OP eye PASS.

**md5 prefixes:** `3d437929c60a` · `36a4f5a4e551` · `bf22eae2b206` · `a3ed48e785f8` · `fe6ed236ee5d`
