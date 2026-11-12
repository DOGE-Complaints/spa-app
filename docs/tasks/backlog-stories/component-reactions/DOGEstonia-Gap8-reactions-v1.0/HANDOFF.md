# DOGEstonia — Gap-8 reactions.v1 master handoff

**Version:** 1.0 · 2026-10-14 · **Status:** new master candidates, awaiting visual acceptance.

Exactly eight SVG masters. Destination on repository integration: `spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/reactions/`. This isolated delivery mirrors the icon-system collection; it does not edit spa-app or promote runtime assets.

| Catalog ID | Master filename | Layer | English label from brief/M154 | Metaphor | SHA-256 |
|---|---|---|---|---|---|
| `empathy` | `empathy.svg` | emotional | Empathy | A heart held between two cupped hands. | `e65131a80f16da618f7b01736f1fdfb0222e3ce0a116cd0134ed2ecf052b8aea` |
| `concern` | `concern.svg` | emotional | Concerned | A compact alert lozenge, not the generic warning triangle. | `e542d6170fc345d2adbb23dbff00dd8509744af25e6611727dc4fa4487516854` |
| `sad` | `sad.svg` | emotional | Sad | One falling tear: sadness about the situation, with no judgemental face. | `7aa3c6c797fe71e4302f8ff6ef1c3bcb47703b0f305844e65a322bee0c9864bf` |
| `outraged_situation` | `outraged-situation.svg` | emotional | This is unacceptable | A single lightning break, directed at the situation. | `56bad2be0eacfc874c9cfe38b1b940e056adf6ab908280e69655445a555d4a06` |
| `useful_fact` | `useful-fact.svg` | epistemic | Useful fact | A folded reference document with two content lines; no truth certificate. | `a28fd7474423bc14c8505f3e18246e2dc60c492332826786f9f062348e148fd4` |
| `insightful` | `insightful.svg` | epistemic | Insightful | A new connection between two points, with a small central insight spark. | `cc57b48f1ef1e537baaa1d7d0a743ac7f16f69c9c5dde1947c709bec09a7f17c` |
| `needs_evidence` | `needs-evidence.svg` | epistemic | Needs evidence | A search lens with an open question; asks for evidence rather than declaring falsehood. | `1e945456f8859bd0792ea69b619fe1517d2e845685ede32cb38e180ebac67399` |
| `aggressive` | `aggressive.svg` | moderation | Aggressive | A restrained boundary flag for a comment; no angry face or sanction. | `934728776536c9c6873ff124a6448ba113aac4ddd130b7d7cad83de2c50af5d9` |

## Construction and integration

- 24×24 transparent canvas. Compact filled silhouettes and negative spaces derived from M154 tone, rather than earlier outline artwork. No external library geometry, fonts, embedded text, raster or logos.
- Every meaningful surface inherits `currentColor`. No fixed disc or hardcoded theme color is present in a master.
- Render at 16/20 px in compact aggregates, 20/24 px in pickers, or other component-approved sizes. No separate optical or avatar-badge variants created.
- Picker labels remain visible and localized; adjacent icons are decorative (`aria-hidden="true"` at consumption). Standalone imported SVG has no baked accessible name; the containing component supplies the localized name.
- `aggressive` belongs to Moderation and is comment-only. Labels/eligibility/enabled defaults are unchanged.
- Focus, selection checkmarks, pending/error controls and backgrounds belong to the option, outside the master. M160 focus colors: light `#B54708`, dark `#F5C542`.

## Scope and promotion boundary

- No existing Reuse SVG, chrome/status symbol, logo, people UI or catalog was modified. No `hopeful` or `amused` master was created.
- No runtime copies or component-reactions asset package was created.
- After review/acceptance: promote to the existing next-feed reactions runtime, update Gap→Reuse and master/index references in the repository workflow. This handoff performs none of those steps.

## Input evidence

`reactionsV1Catalog.js` supplies IDs/layers/defaults/target filtering; it contains no label dictionary. English labels here come from the supplied brief and M154. M155 was inspected only for its badge-reuse boundary. `analysis.mdc` was not attached in this workspace; no unrelated project rule was substituted.

| Supplied source | SHA-256 |
|---|---|
| `STORY-SPA-CR-icon-assets(1).md` | `7199246d7abb968d02154c5238765f219ff2af43be919b0659630b8acca4d481` |
| `reactionsV1Catalog.js` | `a2ef9c4dbcd7aa8bdb94ff69ccb7785d322dcb9c3a0fd07bfe9a722070eb63cc` |
| `mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0(1).md` | `1c60076fd11ddaf968656d3645d9946549b72bdd5dddbe00efd8e35412fc34aa` |
| `mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0(1).png` | `601e75b5ce66f0e3ad08f80ee2191b6c4490511fd8e52d869ec5571446b3e616` |
| `mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0(1).md` | `0d966337a971e6ed993ac31d35856b823be7f3585e700b3e5096292a86b2ec14` |
| `mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0(1).png` | `4c0203662882a1fabd75ffaa9bf3211fa3ae9f49f7ba211b018d2a92f8c8860a` |
| `mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0(1).md` | `9159698c453a5269cb9d885eaa62d99832ca6006e2d52a6fb559996f281502ae` |
| `mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0(1).png` | `170d7c9aabbe36ebd0e82b3c5fbfea636013eb6b256f374c5713389a752894fa` |
