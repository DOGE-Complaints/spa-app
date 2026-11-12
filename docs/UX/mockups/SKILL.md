---
name: generate-glow-icons
description: Generate consistent raster line icons for dark application interfaces as PNG RGBA files with real transparent backgrounds, thin rounded luminous strokes, and controlled colored glow. Use when creating one icon or an icon set from semantic descriptions, filenames, UI states, or reference icons; when replacing fake checkerboard backgrounds with actual alpha; or when producing dark-background previews for visual QA.
---

# Generate Glow Icons

Create production-ready transparent PNG icons and verify them before delivery.

## Collect the specification

Obtain or infer:

- semantic subject and state;
- output filename;
- canvas size, default `256x256`;
- color, default ice blue; use warm amber for attention, success, or brand-accent states when requested;
- reference icon or existing set, if available.

If the user supplies a queue, preserve its order and filenames exactly. Do not ask for details that can be safely inferred from the established set.

Read [references/style-spec.md](references/style-spec.md) before generating the first icon in a set.

## Generate the source

Use the available image-generation capability. For a simple icon requiring transparency, generate it on a perfectly flat chroma-key background and remove that background locally. Choose a key color absent from the icon and glow.

Prompt for:

- one centered symbol only;
- simple, immediately legible geometry;
- thin monoline construction with rounded caps and joins;
- bright near-white inner stroke, fine colored edge, and restrained colored outer glow;
- uniform optical weight and generous padding;
- perfectly flat chroma-key backdrop with no shadow, texture, grid, gradient, panel, or environment.

Explicitly prohibit checkerboard patterns. A checkerboard rendered into RGB pixels is not transparency.

When a reference is supplied, preserve its visual grammar but simplify irregular AI-generated geometry. Do not introduce text, frames, extra symbols, or photorealistic materials.

## Convert to real transparency

Use the installed image-generation skill's `remove_chroma_key.py` helper with soft matte and despill. Preserve the glow as partially transparent pixels; remove only the flat key backdrop.

If chroma-key removal damages the glow or leaves a colored fringe, retry once with a better-separated key color or a small edge contraction. Do not deliver a fake transparent image. If clean extraction remains impossible, report that true native transparency is required instead of pretending success.

## Validate every final PNG

Check programmatically and visually:

1. Format is PNG and color mode contains alpha (`RGBA` or equivalent).
2. All four corners have alpha `0`.
3. A substantial part of the canvas is fully transparent.
4. The visible icon remains centered, with roughly 15% safe padding around the glow.
5. The glow contains gradual partial alpha, not a hard opaque halo.
6. No checkerboard, white rectangle, dark panel, text, watermark, or unintended object remains.
7. At target UI size, the symbol is recognizable and its stroke does not collapse.

Reject and regenerate files that fail these checks.

## Produce previews

Keep the deliverable itself transparent. For review, composite the final PNG onto a separate solid near-black charcoal background, default `#101318`. Never bake the preview background into the production asset.

For a new or uncertain style, show at least:

- the icon at intended UI scale on the dark surface;
- an enlarged view for edge and glow inspection.

Do not add decorative cards unless the user is specifically evaluating card treatment.

## Deliver

Return the final transparent PNG and clearly distinguish any preview file. Preserve requested filenames. For batches, provide all assets with consistent dimensions, padding, stroke weight, glow radius, and state colors.