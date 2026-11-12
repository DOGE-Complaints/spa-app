# Acceptance verification — STORY-SPA-REQ21-01 shell chrome ownership

**Date:** `2026-10-06T19:33:20Z`
**Package:** `pkg-000092`  
**Result:** **PASS**

## AC matrix

| ID | Result | Evidence |
|----|--------|----------|
| AC-SPA-REQ2101-01 | **PASS** | `BoardPage.jsx` / `IssuePage.jsx` / `HowItWorksPage.jsx` no AppShell import; chrome in `AppShellLayout.jsx` |
| AC-SPA-REQ2101-02 | **PASS** | Public layout uses `Header`/`PublicFooter`/`PUBLIC_SHELL_SHOW_SIDEBAR`; protected path still `<AppShell>{content}</AppShell>`; vitest Board/Issue/HowItWorks + UserCabinet sidebar-on |
| AC-SPA-REQ2101-03 | **PASS** | Vitest BoardPage.shell / IssuePage.integration / HowItWorksPage / AppShell.showSidebar green; `npm run test:ui:board-shell` green |

## Pin

Layout owns chrome; pages content-only; PH-09 sidebar-off on public; no ThemeToggle / CSS migrate / features invent.

## §UI verification

| Item | Path / note |
|------|-------------|
| Story-root pack | [`../../screenshots/README.md`](../../screenshots/README.md) · [`../../screenshots/full-cycle/`](../../screenshots/full-cycle/) (P6 T07–T08 · `2026-10-06T19:48:21Z`) |
| Baseline (historical) | `task-spa-req21-01-t01-…/ui-baseline/` (proxy noted · F4 WAIVED) |
| Target spec | `task-spa-req21-01-t01-…/ui-mockup-spec.md` (brief + parity) |
| Post-implement (T01) | `ui-baseline/post-implement/01-board-default.png`, `02-how-it-works.png` |
| Puppeteer | `npm run test:ui:board-shell` PASS (P3) |

## Commands

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run BoardPage.shell IssuePage.integration HowItWorksPage AppShell.showSidebar
cd spa-app && npm run test:ui:board-shell
```
