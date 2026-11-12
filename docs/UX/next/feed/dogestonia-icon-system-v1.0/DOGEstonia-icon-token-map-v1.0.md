# DOGEstonia icon token map v1.0

The SVG masters contain `currentColor`; assign these semantic tokens in the consuming component. The accents below describe token names, not hardcoded component values.

| Context | Surface token | Icon foreground token | State token | Glyph size |
|---|---|---|---|---|
| Shell navigation / default actions | `color.semantic.bg.surface` | `color.semantic.text.primary` or `.secondary` | active: `color.semantic.action.primary-bg` + `.primary-text` | `size.icon.md` or `.sm` |
| Post action strip | `color.semantic.bg.surface-warm` | `color.semantic.text.secondary` | hover `opacity.hover`; selected `color.semantic.selection` | `size.icon.sm` |
| Toolbar / list-map | `color.semantic.bg.surface` | `color.semantic.text.primary` | selected `color.semantic.action.primary-bg` + `.primary-text` | `size.icon.sm` |
| Thread/composer | `color.semantic.bg.surface` / `.sunken` | `color.semantic.text.secondary` | disabled `color.semantic.text.disabled`; opacity token only on content | `size.icon.sm` |
| Focus, all controls | owning component surface | original icon color | `color.semantic.border.focus`; `focus.ring.width` and `.offset` | unchanged |
| Feedback info/success/warning/error | matching `feedback.*` background | matching `feedback.*` text/icon | text and shape remain present | `size.icon.xs`/`.sm` |
| Verified | owning surface | `identity.verified` | localized Verified label | `size.icon.xs` |
| Map pin | map provider-independent control surface | `color.semantic.text.primary` | selected `color.semantic.action.primary-bg`; focus token | `size.icon.md` |
| Reaction option | corresponding `reactions.v1` soft background | corresponding `reactions.v1` accent | selected text/check/outline; disabled `opacity.disabled-content` | `size.icon.sm`/`.md` |
| Compact reaction summary | owning surface | corresponding `reactions.v1` accent | localized label/count; no color-only meaning | `size.icon.xs`/`.sm` |

The reaction SVGs themselves also use `currentColor`; set it from the catalog alias. Do not permanently color the PostActionStrip. `off-topic` is excluded on the thread root. Hit targets are `size.control.touch` for touch controls, not SVG dimensions.
