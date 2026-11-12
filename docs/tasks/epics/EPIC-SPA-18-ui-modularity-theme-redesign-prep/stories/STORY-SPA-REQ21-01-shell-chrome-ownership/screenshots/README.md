# STORY-SPA-REQ21-01 — screenshots inventory

Story-root index for P4 spa UX / visual pack (chrome ownership parity · **no** redesign invent).

| Path | Role |
|------|------|
| [full-cycle/](./full-cycle/) | Story-gate primary · Happy + must-states |
| [full-cycle/README.md](./full-cycle/README.md) | File-level notes |
| [../task-spa-req21-01-t01-inventory-page-shell-mounts/ui-baseline/](../task-spa-req21-01-t01-inventory-page-shell-mounts/ui-baseline/) | Historical UI-0 / post-implement proxy (F4 WAIVED) |
| [../task-spa-req21-01-t01-inventory-page-shell-mounts/ui-mockup-spec.md](../task-spa-req21-01-t01-inventory-page-shell-mounts/ui-mockup-spec.md) | Artboard SSOT (extends M129/M131/M132) |
| `archive/` | _(none)_ |

## Artboard state matrix (P6)

| # | State | File | Notes |
|---|-------|------|-------|
| 1 | Public board default | [full-cycle/01-board-default-footer-1536x1024.png](./full-cycle/01-board-default-footer-1536x1024.png) | Header + feed · PH-09 no sidebar · **footer in viewport** (F1+F3) |
| 2 | Public how-it-works | [full-cycle/02-how-it-works-footer-1536x1024.png](./full-cycle/02-how-it-works-footer-1536x1024.png) | HIW content · **footer in viewport** (F1+F3) |
| 3 | Public issue | [full-cycle/03-issue-chrome-back-1536x1024.png](./full-cycle/03-issue-chrome-back-1536x1024.png) | Layout chrome · issue content/back region · PublicFooter (F2) |
| 4 | Protected/workspace | [full-cycle/04-protected-workspace-sidebar-1536x1024.png](./full-cycle/04-protected-workspace-sidebar-1536x1024.png) | Default AppShell · WORKSPACE sidebar-on · Profile (F2) |
| 5 | Session overlay | [full-cycle/05-session-overlay-1536x1024.png](./full-cycle/05-session-overlay-1536x1024.png) | Session Expired overlay atop layout chrome (F2) |

## Happy / Edge

| Class | Files |
|-------|-------|
| Happy | 01 board · 02 HIW · 04 protected authenticated |
| Edge | 03 issue (gateway may yield not-found/placeholder) · 05 session_expired overlay |

Capture harness: [`full-cycle/_capture-req21-01-p6.mjs`](./full-cycle/_capture-req21-01-p6.mjs) · `2026-10-06T19:48:21Z`.
