# UI mockup spec — SPA-PH-10-T02 Header horizontal brand

**Path A** (P1.3 / task `@mockup:` ready — interview skip).  
**extends mockup:** [`mockup-129-public-header-chrome-state-sheet-spec.md`](../../../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) (+ `.png`)  
**Baseline:** [`ui-baseline/`](./ui-baseline/) (pre: circular + text name)

## Delta vs baseline (this task only)

| Zone | Baseline (FAKE-OLD) | Target (PH-10) |
|------|---------------------|----------------|
| Brand image | `/assets/DOGEstonia-logo-big.png` (circular) | `/assets/DOGEstonia-logo-horizontal.png` (wordmark-in-image) |
| Text name | Visible `.header-brand-name` «DOGEstonia» | **Removed** — name only via `img` `alt` |
| Link | `Link` → `/board` | Unchanged |
| onError | → `/assets/DOGEstonia-logo-fallback.svg` | Unchanged; alt preserved |
| Sizing | `.header-brand-logo` height 44px / width auto / contain | Keep; ensure no overflow ~390 |

## Selectors

- `[data-testid="public-header-brand"]`
- `img.header-brand-logo`
- **Absent:** `.header-brand-name`

## States

| State | Expectation |
|-------|-------------|
| Default desktop 1536 | Horizontal logo only; no adjacent text wordmark |
| Narrow ~390 | Brand strip no horizontal overflow; header layout intact |
| Img error | Fallback SVG; alt still product name |

## Explicit non-goals (Вне scope)

Footer brand, AppShell auth circular logo, login `auth.brand.name`, Landing, apple-touch-icon, transparent re-export of horizontal pad, regen M129 PNG.

## Operator gate

Path A — M129 context + backlog FR-PH-10.1–10.3 fully cover delta; **no interview**. Proceed UI-2.
