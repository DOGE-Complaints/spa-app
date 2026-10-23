# CAB-08 — Cabinet layout · story-activity wire (structure Present · visual BLOCKED)

> **UTC:** 2026-10-23T14:56:53Z (P8 local close)  
> **Package:** `pkg-000217` · EPIC-SPA-07  
> **Code home:** `UserCabinetPage.jsx` · `StoryActivityCard.jsx` · `CivicStatusCard.jsx` · `storyActivityService.js` · `useCabinetStoryActivity.js`  
> **Normative:** Interview **P5** · [M170](../../UX/mockups/user%20profile/DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.md) · [M45](../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md) · Path A  
> **Status:** structure **Present** · gate **BLOCK** (OP eye · Partial visual) · Story **BLOCKED**

## Surface

| Piece | Rule |
|-------|------|
| Wallet + Contribution | Gated (`CAB08_SHOW_WALLET_CONTRIB=false`) · components kept · slots Absent |
| Verified Civic | `compact` badge when verified · no wallet-info plate |
| Story Activity | Full-width when gated · `GET /story-activity` wire · no invent rows |
| Empty CTA | Go to Feed → `/next/feed` · not `/board` |
| Soft OOS | NS-14 brand · invent GW-CAB-03 · invent contribution API · invent OP PASS |

## Touchpoints

- `pages/UserCabinetPage.jsx` · `UserCabinetPage.css` (`data-cab08=wallet-contrib-gated`)
- `services/storyActivityService.js` · `hooks/useCabinetStoryActivity.js`
- `components/StoryActivity/StoryActivityCard.jsx` · `components/CivicStatus/CivicStatusCard.jsx`
- Tests: `UserCabinetPage.cab08.test.jsx` · StoryActivityCard · storyActivityService · Path A `scripts/tmp-cab08-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent contribution API · WAIVED F1 operator ≠ visual PASS.
