# UI baseline — SPA-ID-07-T03 (M123 anchor)

**Captured:** 2026-06-30 (post-implement all states)  
**Viewport:** 1536×1024  
**Route:** `/#/verify` → mock `88888888` → `COUNTRY_NOT_ALLOWED` → waitlist flow

## retroactive_closure

UI-0 pre-implement baseline was not captured before UI-2 in the initial P3 window. Path A `@mockup` gate satisfied via [ui-mockup-spec.md](../ui-mockup-spec.md) → [mockup-123](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md).

## Post-implement (story gate §UI)

| State | M123 | File | `data-testid` |
|-------|------|------|---------------|
| A | Country Not Supported | [not-supported-m123a-1536x1024.png](./post-implement/not-supported-m123a-1536x1024.png) | `waitlist-not-supported-panel` |
| B | Waitlist Form | [form-m123b-1536x1024.png](./post-implement/form-m123b-1536x1024.png) | `waitlist-form-panel` |
| C | Waitlist Joined | [joined-m123c-1536x1024.png](./post-implement/joined-m123c-1536x1024.png) | `waitlist-joined-panel` |
| D | Submission Error | [error-m123d-network-1536x1024.png](./post-implement/error-m123d-network-1536x1024.png) | `waitlist-error-panel` (`network_error`) |

## Capture command

```bash
cd spa-app && node ./tests/puppeteer/waitlist-all-states-screenshot.mjs
```

Legacy (state A only, delegates to all-states script):

```bash
cd spa-app && node ./tests/puppeteer/waitlist-anchor-screenshot.mjs
```
