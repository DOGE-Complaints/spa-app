# STORY-SPA-REQ21-04 — screenshots inventory

Story-root index for P4 spa UX / visual pack (ThemeToggle Header · mockup-150 · **no** redesign invent).

| Path | Role |
|------|------|
| [full-cycle/](./full-cycle/) | Story-gate primary · Happy theme states A/B/C |
| [full-cycle/README.md](./full-cycle/README.md) | File-level notes |
| [mockup-150](../../../../../../UX/mockups/home/mockup-150-public-header-theme-toggle-spec.md) | Artboard SSOT (MD; F4 WAIVED — no invent PNG) |
| `archive/` | _(none)_ |

## Artboard state matrix (P6 · mockup-150)

| # | State | data-theme | File | Notes |
|---|-------|------------|------|-------|
| A | Dark active | `dark` | [full-cycle/01-dark.png](./full-cycle/01-dark.png) | Default · toggle `aria-pressed=true` |
| B | Light active | `light` | [full-cycle/02-light.png](./full-cycle/02-light.png) | After toggle · `dogestonia.theme=light` |
| C | Reload restore | from storage | [full-cycle/03-reload-restore.png](./full-cycle/03-reload-restore.png) | Reload with light stored · FOUC+boot |

## Happy / Edge

| Class | Files |
|-------|-------|
| Happy | 01 dark · 02 light · 03 reload restore |
| Edge | _(none this wave)_ |

Capture harness: [`full-cycle/_capture-req21-04-p6.mjs`](./full-cycle/_capture-req21-04-p6.mjs) · `2026-10-06T20:34:23Z`.
