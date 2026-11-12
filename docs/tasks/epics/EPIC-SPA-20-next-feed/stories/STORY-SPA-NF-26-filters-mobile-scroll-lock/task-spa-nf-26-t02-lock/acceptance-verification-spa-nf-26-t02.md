# Acceptance — SPA-NF-26-T02 body lock

- **Result:** **Done·BLOCK** (structure Pass · OP eye Absent)
- **UTC:** 2026-10-25T10:46:31Z
- **pkg:** `pkg-000233`

## AC

| AC | Result |
|----|--------|
| Body overflow locked while open | ✅ `overflow: hidden` · `touch-action: none` · `data-nf26-body-lock` |
| Restored on close | ✅ CAPTURE-META probes.closed |
| Visual OP eye | ❌ Absent → **BLOCK** |

## Evidence

- Vitest lock restore · Path A CAPTURE-META `fails: []`
