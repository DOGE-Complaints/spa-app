# component-reactions — ReactionPicker surface (CR-02)

> Package: REQ-24 · EPIC-SPA-23 · **structure Present · visual BLOCKED** (OP eye Absent)  
> Code home: `spa-app/src/features/reactions-mount/picker/`  
> Lab: `#/lab/reactions` picker scenes B–E · `data-lab-visual-done=false`  
> Recorded: 2026-10-14T11:31:57Z · P8 docs · P5 TASKED=0

## Present modules

| Module | Role |
|--------|------|
| `picker/ReactionPicker.jsx` | Desktop popover + mobile sheet (`resolvePickerSurface`) |
| `picker/ReactionPickerLayerGroup.jsx` | Emotional / Epistemic / Moderation groups |
| `picker/ReactionPickerOption.jsx` | CR-icon Runtime URL + localized label |
| `ReactionsMount.jsx` | Wires picker · React always opens · save-error restore |
| `adapters/FixtureAdapter.js` | `failNext` for save-error lab · no invent HTTP |

## Locks

- Comment: three groups · root: no selectable Moderation  
- Capacity ≤3 · Agree/Disagree XOR via `toggleReactionSelection`  
- Icons = CR-icon §Reuse (agree/disagree/close) · no emoji interim  
- M155 people OOS · `#/next/feed` cutover OOS  
- Partial visual = **BLOCK** until OP eye — do not invent PASS
