# ui-mockup-spec — VL-07 T02 (Path A)

**Accepted:** M158 + M159 artboards Present · DS §2 IssuePresentationLayout / OverlayHost / OverlayLayout / KeyboardComposerLayout  
**Human gate:** Path A UX ready (artboards accepted) — no regenerate this fence.

## Contract
- Variants: `page` | `modal` | `fullScreenSheet` on IssuePresentationLayout
- OverlayHost owns Escape + scroll lock; OverlayLayout owns scrim/panel geometry
- KeyboardComposerLayout wraps Discussion composer slot (coord VL-06)
- Classic `#/board` mounts unchanged
