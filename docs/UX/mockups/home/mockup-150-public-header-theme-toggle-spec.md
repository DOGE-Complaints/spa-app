# mockup-150 — Public Header ThemeToggle (REQ21-04)

**Extends:** [mockup-129-public-header-chrome-state-sheet-spec.md](./mockup-129-public-header-chrome-state-sheet-spec.md)  
**Viewport:** 1536×1024  
**Story:** STORY-SPA-REQ21-04 · `pkg-000095`  
**Rule:** No Header redesign invent beyond theme **slot** in existing controls cluster. Schemes from REQ21-03.

---

## Zone — Header controls cluster

Order (arch 01 §1):

1. Locale control (existing)
2. **ThemeToggle** (NEW)
3. Account slot (existing)
4. Mobile menu toggle (existing, small viewports)

## ThemeToggle control

| Property | Spec |
|----------|------|
| Role | `button` |
| States | `aria-pressed=true` when theme is **dark**; `false` when **light** |
| Label | i18n accessible name describing action (switch to light / switch to dark) |
| Visual | Compact control matching locale trigger height (~32px); uses semantic tokens (`--color-bg-secondary`, `--color-border`, `--color-text-primary`); **no** invent icon art beyond text/glyph already in system (sun/moon text or simple CSS) |
| testid | `public-header-theme-toggle` |

## States (must)

| State | data-theme | Notes |
|-------|------------|-------|
| A — Dark active | `dark` | Default first visit; toggle pressed |
| B — Light active | `light` | After toggle; preference in `localStorage['dogestonia.theme']='light'` |
| C — Reload restore | from storage | FOUC + boot apply stored value before paint |

## Forbidden

- OS `prefers-color-scheme` as source
- Account preference API sync
- New Header layout invent / purple glow / redesign artboard

## Selectors (implement)

- `[data-testid="public-header"]`
- `[data-testid="public-header-theme-toggle"]`
- `html[data-theme="dark"|"light"]`
