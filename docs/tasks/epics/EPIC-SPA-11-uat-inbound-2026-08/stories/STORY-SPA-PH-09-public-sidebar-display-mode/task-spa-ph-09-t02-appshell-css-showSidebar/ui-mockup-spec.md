# UI mockup spec — SPA-PH-09-T02 AppShell showSidebar

**Path A** (P1.3 / task `@mockup:` ready — interview skip).  
**Decision SSOT (no new MVP artboard):** [`DOGEstonia-Story-Public-Pages-Without-Left-Sidebar.md`](../../../../../../backlog-stories/inbound/DOGEstonia-Story-Public-Pages-Without-Left-Sidebar.md) + backlog FR-PH-09.1  
**Baseline:** [`ui-baseline/`](./ui-baseline/) (pre: WORKSPACE column visible on `/#/board`)

## Delta vs baseline (this task only)

| Zone | Baseline (FAKE-OLD) | Target (PH-09) |
|------|---------------------|----------------|
| `<aside>` / `.board-sidebar` | Always in DOM | **Absent** when `showSidebar=false` |
| `.board-main` grid | `272px 1fr` with sidebar | Full-width main (`1fr` / no empty column) |
| Default prop | N/A (always show) | `showSidebar` default **true** (cabinet/protected) |
| Public callers | Always pass Sidebar | Wired in T03 via `PUBLIC_SHELL_SHOW_SIDEBAR=false` |

## Selectors

- `[data-testid="app-shell"]`
- `.board-sidebar` / `aside.app-shell__sidebar` — **absent** when off
- `.board-main` / `.app-shell__body` — full-width when off
- Header public nav remains: `[data-testid="public-header-nav"]`

## States

| State | Expectation |
|-------|-------------|
| Desktop 1536 · `showSidebar=false` | No WORKSPACE column; main full width |
| Narrow ~390 · sidebar off | No empty column / no layout hole from removed aside |
| `showSidebar=true` (default) | Current sidebar chrome (cabinet regression T04) |

## Explicit non-goals (Вне scope)

HIW step/card redesign (PH-08), cabinet redesign, content/copy, hard-delete `Sidebar.jsx`, new MVP artboard PNG.

## Operator gate

Path A — inbound UAT + FR-PH-09.1 cover delta; **no interview**. Proceed UI-2 at P3.
