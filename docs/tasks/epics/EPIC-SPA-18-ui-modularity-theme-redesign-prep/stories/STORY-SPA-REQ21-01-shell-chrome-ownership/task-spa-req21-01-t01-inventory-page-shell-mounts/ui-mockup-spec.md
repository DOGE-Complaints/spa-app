# ui-mockup-spec — REQ21-01 shell chrome ownership

**ui_scope:** mixed · **Overnight gate:** OP auto-approved from `STORY-UX-MOCKUP-BRIEF.md` + baseline selectors  
**extends mockup:**  
- `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md`  
- `spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md`  
- `spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md`  
- `spa-app/docs/UX/mockups/initiation/mockup-01-dashboard-main-spec.md` (structure only)

**Target delta (behavior-preserving):**

| Element | Before | After |
|---------|--------|-------|
| Chrome owner | Production pages mount `AppShell`/`Header`/`PublicFooter` | `AppShellLayout` always mounts chrome |
| Pages | Wrap content in AppShell | Content-only for `<Outlet />` |
| PH-09 | `PUBLIC_SHELL_SHOW_SIDEBAR=false` on pages | Same flag read in layout |
| Visual | Public header + footer + no sidebar | **Parity** — no redesign pixels |

**States (must):**

1. Public board default — header + feed + footer; sidebar off  
2. Public how-it-works — `how-it-works-shell` class on layout AppShell; content route class retained  
3. Public issue — same chrome; page back button in content  
4. Protected/workspace — default AppShell sidebar on (unchanged)  
5. Session overlay — still overlays layout content  

**Selectors / data-testid:** keep `app-shell`, `public-footer`, `public-header-nav`, `data-show-sidebar="no"` on public.

**Out of mockup:** ThemeToggle · CSS migrate · features extract · `#/next`

**Human gate:** Overnight auto-accepted `2026-10-06T19:23:05Z` — proceed UI-2.
