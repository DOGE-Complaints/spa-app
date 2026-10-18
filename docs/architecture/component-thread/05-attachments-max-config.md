# CT-05 — AttachmentRef · maxAttachments config (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T13:39:15Z (P3) · P5 APPLY `2026-10-18T13:41:57Z`  
> **Package:** `pkg-000163` · EPIC-SPA-24  
> **Code home:** `src/features/thread-mount/composer/AttachmentRef` · `config/threadMountConfig` clamp · `#/lab/thread` stands N–R  
> **Normative:** OP-UX-MIRROR-m152-m153-m157-thread §4.2 T-D/T-E/T-maxA · M153 D/E  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Config | `DEFAULT_MAX_ATTACHMENTS` · `resolveMaxAttachments` · `clampAttachmentIntents` · `canAddAttachment` |
| AttachmentRef | Ready D · Denied E · Remove · `data-tm-attach-published=false` · local-intent copy |
| Composer | Attach respects max · omit/disable when unavailable · honest copy |
| Write path | Fixture local-intent only · no invent upload/bind HTTP · no claim published |
| Lab | `#/lab/thread` stands N–R · Path A shots |

## Touchpoints

- `thread-mount/config/threadMountConfig.js`
- `thread-mount/composer/{AttachmentRef,ThreadComposer}.*`
- `thread-mount/ThreadMount.jsx` · `adapters/FixtureAdapter.js` · `lab/ThreadLabCanvas.jsx`
- Tests: `threadMount.ct05`
- Lab verify: `#/lab/thread` · OP eye

## OOS

Invent OP PASS · invent upload HTTP · gallery · safety bypass · classifier UI · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **93**/93 · ct05 Present
- Path A shots md5: `65e98338caf3` · `9d4e88ba6afa` · `65e98338caf3` · `04e4e14dd28b` · `f5c2f02537cd`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
