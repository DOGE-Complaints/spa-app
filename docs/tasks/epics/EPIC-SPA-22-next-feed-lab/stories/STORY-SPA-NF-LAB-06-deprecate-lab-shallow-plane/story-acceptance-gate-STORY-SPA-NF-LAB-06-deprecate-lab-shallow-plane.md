# Story acceptance gate — STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane

- **Story:** Deprecate lab shallow plane (`*Deprecated`)
- **Package:** `pkg-000132-20261013-epic-spa-22-nf-lab-06-deprecate-lab-shallow-plane.yaml`
- **Result:** **PASS**
- **Date:** 2026-10-13T15:09:44Z
- **Note:** Rename foundation Done · lab-owned → `*Deprecated` · shared `features/feed/**` untouched · **NOT** visual package PASS · **NOT** greenfield (LAB-07+) · `data-lab-plane="deprecated"` · `data-lab-visual-done=false`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Lab-owned modules only under Deprecated names/paths | PASS | T02 · `*Deprecated.{jsx,css}` Present · legacy filenames Absent · nflab06 |
| Grep: no shared `features/feed/**` rename solely for this tip | PASS | T01/T03 · `git status src/features/feed/` empty · VL paths Present |
| `#/next/feed` / `#/board` smoke unchanged | PASS | no product host / board mutate this tip · vitest lab only |
| Deprecated exports documented in package INDEX | PASS | next-feed-lab INDEX Deprecated exports note |
| **Not** visual Done · **not** greenfield | PASS | gate note · page `data-lab-visual-done=false` · no LAB-07 create |

## Commands (live `2026-10-13T15:09:44Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/pages/__tests__/FeedLabPage
# → Test Files 5 passed · Tests 20 passed (incl. nflab06 ×5)
cd spa-app && git status --short src/features/feed/
# → empty
```

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
