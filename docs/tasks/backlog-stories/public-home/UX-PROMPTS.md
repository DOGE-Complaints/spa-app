# UX Prompts — Public Home (ADMIN-PH-01)

> Package: [public-home](README.md)  
> Product lock: [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> Inputs: [ADMIN-PH-01-product-ux-prompts.md](ADMIN-PH-01-product-ux-prompts.md), legacy [M01](../../../UX/mockups/initiation/mockup-01-dashboard-main-spec.md), [M19](../../../UX/mockups/initiation/mockup-19-header-brand-strip-spec.md), [M20](../../../UX/mockups/initiation/mockup-20-header-language-selector-spec.md)  
> Method note: prompts are derived from locked product interview + verified current code.  
> **Specs landed (ADMIN-PH-02):** [`docs/UX/mockups/home/`](../../../UX/mockups/home/README.md) — M129–M133 + [how-it-works L10N appendix](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md).

## Global constraints (for every prompt)

- Build a dark civic-tech interface for DOGEstonia, not a landing page.
- Supersede legacy board layout from M01 where needed: **no status columns** on home; use a single issue feed.
- Header must be a hero-level brand signal: logo + DOGEstonia name + horizontal nav (`Dashboard`, `How it works`, `Submit a story`), and profile icon control on the right.
- Keep locale control visible in header states (M20 behavior baseline).
- Do not include `SYNCED` as a primary header label (legacy M19 marker is removed from chrome in this redesign).
- `/board` remains the home route target (today `/` redirects to `/board` in `App.jsx`).
- Reuse existing filter behavior/contract from board filter stack (SEARCH-02..05); redesign layout, not filter semantics.
- Submit CTA points to an external URL backed by `VITE_STORY_GPT_URL` (no in-app story compose in this scope).
- Keep visual language compatible with current tokens where practical: `#141417`, `#1b1c1f`, text `#f2f2f2`, muted `#9a9da6`, accent yellow (`#f5c542` target, token-close `#f5c518`).
- Footer must be meaningful in v1: brand + short tagline + links (About / Privacy / Contact).

## EN copy placeholders (locked set)

- Main nav:
  - `Dashboard`
  - `How it works`
  - `Submit a story`
- Footer:
  - Tagline: `[TAGLINE_TBD]`
  - Links: `About`, `Privacy`, `Contact`
- Tutorial draft (4 short steps for `/how-it-works`):
  1. `Understand what counts as a civic issue`
  2. `Scan real community reports on the dashboard`
  3. `Prepare your own story with clear evidence`
  4. `Submit through DOGEstonia GPT and continue in the platform`
- Tutorial CTA row:
  - `Go to Dashboard`
  - `Submit a story`

## Out of scope (must stay out of mockups)

- Landing hero patterns and promotional-first composition
- Large aggregate metrics layer (top labels/institutions/global counters)
- In-app compose workflow replacement for GPT handoff
- Replacing filter API contract or filter semantics
- Redesign of issue details page body (`/issue/:id`)

## Artboard to future story mapping

| Artboard ID | Surface | Future story |
|-------------|---------|--------------|
| PH-H | Header chrome (brand + nav + locale) | PH-01 |
| PH-A | Account control (guest/auth/logout) | PH-02 |
| PH-F | Footer | PH-03 |
| PH-B | Board home feed with filters | PH-04 |
| PH-T | How it works page | PH-05 |
| Submit affordance inside PH-H and PH-T | External GPT CTA behavior | PH-06 |

## PH-H — Header chrome

### State matrix

| State | Required |
|-------|----------|
| PH-H-A | Guest session, profile icon control leads to login |
| PH-H-B | Authenticated session, profile icon control leads to profile menu |
| PH-H-C | Locale selector open in header context |
| PH-H-D | Narrow/mobile width adaptation of horizontal nav |

### Paste-ready UX prompt (EN)

Design a state-sheet artboard for DOGEstonia public header chrome (PH-H) in a dark civic-tech style.  
Show four states in one sheet:  
1) guest session,  
2) authenticated session,  
3) locale selector open,  
4) narrow/mobile responsive header.

Hard requirements:
- Left side: brand block with logo and text "DOGEstonia" as a primary visual signal.
- Center/primary nav: "Dashboard", "How it works", "Submit a story".
- Right side: profile icon control (guest and auth variants), plus locale control.
- Do not include a SYNCED badge/label in the header.
- Keep this as app chrome, not a marketing hero.
- Keep spacing and hierarchy clear for fast scanning.
- Preserve dark palette and yellow accent only for active/high-priority affordances.

Output format:
- One consolidated state sheet with labeled states.
- Include desktop and narrow/mobile behavior expectations.
- No implementation code; visual/product specification only.

Notes for supersede:
- Supersedes M19 header strip where it conflicts (SYNCED removed from primary chrome).

## PH-A — Account control in header

### State matrix

| State | Required |
|-------|----------|
| PH-A-A | Guest: account control invites login |
| PH-A-B | Authenticated: profile icon/menu points to `/profile` |
| PH-A-C | Authenticated: logout action visible in dropdown menu |

### Paste-ready UX prompt (EN)

Design a focused state-sheet artboard for DOGEstonia account control behavior inside the new header (PH-A).  
Show three states: guest, authenticated idle, authenticated menu-open.

Hard requirements:
- Guest state: account icon/button clearly routes to login flow.
- Authenticated state: account icon opens a compact dropdown containing:
  - "Profile" (to `/profile`)
  - "Log out"
- Use a dropdown pattern, not a separate logout confirmation modal in v1.
- Keep interaction compact and habitual (familiar UX), consistent with dashboard chrome.
- Maintain civic-tech visual tone and avoid decorative clutter.

Behavior note for spec text:
- Logout expectation in product layer: clear session then redirect to `/board`.

## PH-F — Footer

### State matrix

| State | Required |
|-------|----------|
| PH-F-A | Default desktop footer |
| PH-F-B | Mobile wrap/reflow footer |

### Paste-ready UX prompt (EN)

Design a meaningful DOGEstonia public footer state sheet (PH-F) with desktop and mobile-wrap states.

Hard requirements:
- Footer content must include:
  - brand reference,
  - short tagline placeholder: `[TAGLINE_TBD]`,
  - links: About, Privacy, Contact.
- Keep it concise and utility-focused.
- Keep contrast and readability strong on dark background.
- Mobile state must show clean wrapping and tappable link rhythm.
- Do not turn footer into a card grid or marketing block.

Output:
- Two labeled states (desktop default, mobile wrap).
- Include spacing and hierarchy guidance in annotation text.

## PH-B — Board home feed (replacing columns)

### State matrix

| State | Required |
|-------|----------|
| PH-B-A | Loading (feed skeleton with filters visible) |
| PH-B-B | Empty board (no issues, no active filters) |
| PH-B-C | Results feed (full result set) |
| PH-B-D | Filtered no-results |
| PH-B-E | Load error with retry affordance |

### Paste-ready UX prompt (EN)

Design a state-sheet for DOGEstonia `/board` as the primary public home feed (PH-B).  
This redesign replaces the legacy multi-column board with a single rich issue feed.

Hard requirements:
- Keep existing filter toolbar concept and placement logic (search + filter panel + chips + reset), but adapt layout to feed format.
- Present issues as a scrollable feed (social x Jira hybrid): each item remains structured, factual, and scannable.
- Preserve clear affordance that item opens issue details (`/issue/:id`).
- Include explicit states: loading, empty (no issues), results, filtered no-results, load error with retry.
- Absolutely no status columns in the main body.
- Keep tone product-informational, not campaign/landing.
- Keep room for future data enrichments, but do not introduce new metric sections in v1.

Output:
- One state sheet with all required states labeled.
- Annotate where existing filter behavior is reused versus where layout changes.

Notes for supersede:
- Supersedes M01 column layout where conflicting.

## PH-T — How it works page (`/how-it-works`)

### State matrix

| State | Required |
|-------|----------|
| PH-T-A | Default page with 4-step tutorial and CTA row |

### Paste-ready UX prompt (EN)

Design a dedicated DOGEstonia `/how-it-works` page state sheet (PH-T) as an embedded tutorial page, not a landing page.

Hard requirements:
- Keep same shell language as dashboard (header/footer continuity).
- Present exactly four concise steps:
  1) what civic issues are,
  2) how to read live dashboard reports,
  3) how to prepare a useful story,
  4) how submit works through DOGEstonia GPT.
- Add CTA row:
  - "Go to Dashboard"
  - "Submit a story"
- Keep structure informational and practical; avoid promotional hero framing.
- Include space for localization-ready text blocks.
- Keep visual hierarchy calm, with one primary reading path.

Submit behavior note:
- "Submit a story" in this scope represents external GPT handoff (env-backed URL), not in-app compose.

## Verification checklist for ADMIN-PH-01

- `UX-PROMPTS.md` includes PH-H / PH-A / PH-F / PH-B / PH-T.
- Every artboard has a state matrix and a paste-ready EN prompt.
- Submit is explicitly external GPT handoff.
- `/how-it-works` is explicitly a standalone page.
- Legacy M01/M19 conflicts are explicitly marked as superseded for this redesign.
