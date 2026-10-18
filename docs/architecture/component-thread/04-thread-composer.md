# CT-04 — ThreadComposer draft · fail · mobile (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T13:30:17Z (P3) · P5 APPLY `2026-10-18T13:33:24Z`  
> **Package:** `pkg-000162` · EPIC-SPA-24  
> **Code home:** `src/features/thread-mount/composer/` · ThreadMount draft/reply/fail · `#/lab/thread` stands J–M  
> **Normative:** OP-UX-MIRROR-m152-m153-m157-thread §4.2 T-C/T-root/T-draft/T-F/T-G · M153 C/F/G  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Root / reply | Write a comment / Post comment · Post reply · parent excerpt · Cancel reply |
| Draft | Kept across Cancel / target switch · no silent destroy · clear only on ok post |
| Fail F | FixtureAdapter soft-fail · Try again / Keep editing · draft+target kept |
| Mobile | narrow · `data-lab-sticky-keyboard` · stand M 390 |
| Write path | Fixture write only · no invent HTTP · no optimistic permanent comment |
| Lab | `#/lab/thread` stands J–M · Path A shots |

## Touchpoints

- `thread-mount/composer/{ThreadComposer.jsx,ThreadComposer.css}`
- `thread-mount/{ThreadMount,IssueThreadBlock}.jsx` · `tree/CommentNode.jsx` (Reply focus return)
- `thread-mount/adapters/FixtureAdapter.js` · `lab/ThreadLabCanvas.jsx`
- Tests: `threadMount.ct04`
- Lab verify: `#/lab/thread` · OP eye

## OOS

Invent OP PASS · invent HTTP · Attachments (CT-05) · verify gate (CT-07) · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **87**/87 · ct04 Present
- Path A shots md5: `bae63f95cc3b` · `9aea4e79bdb7` · `9aea4e79bdb7` · `c7b860be00f0` · `5c5a89db9705`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
