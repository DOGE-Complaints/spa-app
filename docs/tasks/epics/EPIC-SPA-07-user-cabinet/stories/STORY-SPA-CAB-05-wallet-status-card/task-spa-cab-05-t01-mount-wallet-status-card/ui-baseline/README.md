# UI baseline — SPA-CAB-05-T01 (Wallet Status)

**Viewport:** 1536×1024  
**Route:** `/#/profile`  
**Selector:** `[data-testid="cabinet-slot-wallet"]`  
**UTC scaffold:** 2026-07-26T19:31:45Z

## Capture

```bash
cd spa-app && npm run test:ui:cabinet-wallet-cab05   # CAB05_PHASE=pre|post-implement
```

DEV hook: `sessionStorage['doge.wallet-preview']` = `unlinked` | `linked` | `connect`.

## Pre-implement (UI-0)

| File | Trigger |
|------|---------|
| `pre-implement/a-wallet-slot-placeholder-1536x1024.png` | mock auth → `/#/profile`; wallet slot still `comingLater` |

## Post-implement (UI-3)

| File | State | Trigger |
|------|-------|---------|
| `post-implement/a-unlinked-stub-1536x1024.png` | A | default / `preview=unlinked` |
| `post-implement/b-linked-coming-soon-1536x1024.png` | B | `preview=linked` |
| `post-implement/c-connect-coming-soon-1536x1024.png` | C | `preview=connect` |

After story-root pack, historical PNGs move to `../screenshots/archive/`.
