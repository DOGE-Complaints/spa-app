# UI mockup spec — SPA-PH-01-T01 (anchor)

**Story:** STORY-SPA-PH-01-header-brand-nav  
**Path A:** extends operator `@mockup` M129 (+ M130 host note) — human gate skip  
**Viewport:** 1536×1024 (mobile edge 390×844)  
**Route:** `/#/board`, `/#/how-it-works`  
**ui_scope:** `visual` · **ui_anchor:** `true`

## Extends mockup

- [mockup-129-public-header-chrome-state-sheet-spec.md](../../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md)
- [mockup-129-public-header-chrome-state-sheet-spec.png](../../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.png)
- [mockup-129-public-header-chrome-state-sheet-spec-estonia.png](../../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec-estonia.png)
- [mockup-130-public-header-account-control-state-sheet-spec.md](../../../../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md) — **slot host only** (content = PH-02)
- [mockup-130-public-header-account-control-state-sheet-spec-estonia.png](../../../../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec-estonia.png)

## Component

```tsx
<Header /> // PublicHeader alias — Brand | Primary nav | Session & locale
```

Mounted via Board/Issue `header={<Header />}` inside AppShell `header-strip`.

## Zones (M129)

| Zone | Contents |
|------|----------|
| Brand | Logo + wordmark **DOGEstonia** → `/board` |
| Primary nav | Dashboard → `/board`; How it works → `/how-it-works`; Submit a story → `VITE_STORY_GPT_URL` (PH-06) |
| Session & locale | Account slot host (`data-testid="header-account-slot"`) + LocaleSelector; **no SYNCED badge** |

## Selectors

| Element | Selector |
|---------|----------|
| Header root | `[data-testid="public-header"]` |
| Brand | `[data-testid="public-header-brand"]` |
| Desktop nav | `[data-testid="public-header-nav"]` |
| Nav items | `[data-testid="public-nav-dashboard\|how-it-works\|submit"]` |
| Account slot | `[data-testid="header-account-slot"]` |
| Menu toggle | `[data-testid="public-header-menu-toggle"]` |
| Mobile nav | `[data-testid="public-header-mobile-nav"]` |

## States captured

| Letter | State | Runtime |
|--------|-------|---------|
| A | Guest desktop board | `/#/board` guest |
| B | How it works active | `/#/how-it-works` |
| C | Locale menu open (M129 State C) | click `.header-locale-trigger` → `data-open=yes` |
| D | Mobile menu open | viewport ≤960 + toggle |
| E | Live authenticated board | `USER_EMAIL`/`USER_PASSWORD` → Continue → `/#/board` (account slot still empty host) |

## Path A — State D mobile (intentional vs M129 drawer)

**M129 State D artboard** shows a side/drawer panel that may include nav + session/locale controls.

**PH-01 Path A runtime (intentional):** at `max-width: 960px`, desktop `.header-primary-nav` is hidden; hamburger (`ic-nav-menu`) opens **inline** `.header-mobile-nav` **under** the header strip with **nav items only**. Locale and account slot remain in the right controls row (not moved into a drawer). Escape / outside click dismisses — FR-PH-01.6.

Evidence: `screenshots/full-cycle/05-edge-mock-mobile-menu-open-390x844.png`. Full M129 drawer composition is **out of PH-01 DoD** (post-audit F3 documented; no runtime rewrite in this wave).

## Baseline

See [ui-baseline/README.md](./ui-baseline/README.md).

## Operator gate

**Path A** — accepted via `@mockup` refs in P3 prompt; no AskQuestion human gate required.  
**F3 (2026-08-04):** Path A mobile inline documented above — closes audit Medium without drawer implement.
