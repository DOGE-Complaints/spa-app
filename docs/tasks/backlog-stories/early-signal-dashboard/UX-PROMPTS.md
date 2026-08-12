# UX Prompts — Early Signal / Pre-Cluster Discovery (ADMIN-ESD-01)

> Package: [early-signal-dashboard](INDEX.md)  
> Product lock: [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> Inputs: [ADMIN-ESD-01-product-ux-prompts.md](ADMIN-ESD-01-product-ux-prompts.md), [REQ-15](../../../requirements/15-early-signal-pre-cluster-public-dashboard.md), parent §§9, 15–20, 22–23, 31, 34–35 (`DOGEstonia-Early-Signal-Dashboard-Pre-Cluster-Product-Requirements.md`)  
> Method note: prompts derived from locked brief + verified code only (analysis.mdc).  
> **Verified empty path today:** [`BoardPage.jsx:326–334`](../../../../src/pages/BoardPage.jsx) `data-testid="board-empty"` + `publicHome.board.empty.*` — **not** Early Signal discovery. Host: `/` → `/board` ([`App.jsx:24–25`](../../../../src/App.jsx)). Issues: `issueService.getIssues` ([`BoardPage.jsx:101`](../../../../src/pages/BoardPage.jsx)); `GET {base}/tallinn/issues` ([`GatewayIssueRepository.js:76`](../../../../src/repositories/GatewayIssueRepository.js)). No Early Signal UI in `spa-app/src` (grep 0).

## Locked prompt defaults (open Q from brief)

| Topic | Default for mockups |
|-------|---------------------|
| Pulse until sibling contract | **Omit numeric metrics** or show **Story-presence copy-only** — never fabricate counts (AC-SPA-ES-08) |
| Host | `/board` only |
| Voices metric | **Out of scope** — do not require in Pulse |
| Issues ≥1 chrome | **Residual** discovery framing + existing Issue feed — not mandatory full five-block |

## Global constraints (for every prompt)

- Dark civic-tech DOGEstonia board continuum — **not** a marketing landing / hero page.
- Host surface is **`/board`** only (reuse public-home chrome). Do **not** redesign REQ-12 `/dashboard`.
- Zero confirmed Issues must feel like a **discovery state**, not a dead empty placeholder.
- Five conceptual blocks must remain distinguishable (responsive layout may reorder):
  1. Network Pulse  
  2. The Picture Is Forming  
  3. Emerging Signals  
  4. What's Missing  
  5. Help Complete the Picture  
- Terminology: **Story** / **Emerging Signal** / **Issue**; Level 2 ≠ Level 3; **Topic ≠ Issue**.
- Progressive states **A–E** are UX density modes. Parent Story counts are **illustrative only** — never treat them as clustering thresholds or game targets.
- Honest data: no fake completeness %, no «N Stories until Issue», no manufactured trending / majority / consensus for small-N.
- Anti-gaming: no «3 more Stories unlock Issue» (or equivalent).
- Privacy: aggregates / anonymized framing only; no personal contacts.
- **No Offers / Solutions** on Pre-Cluster or Issue-less board.
- Help / contribution CTAs use **existing** board Submit / GPT entry (`VITE_STORY_GPT_URL` pattern) — no in-app story compose.
- Do **not** invent gateway HTTP paths or response fields for Pulse/Emerging live metrics.
- Visual language compatible with public shell tokens: dark surfaces (`#141417` / `#1b1c1f`), text `#f2f2f2`, muted `#9a9da6`, accent yellow sparingly (`#f5c542` / token-close).
- Include `data-testid` affordance note for discovery root (e.g. `board-early-signal-discovery`) in ESD-D specs later — not a FE task here.

## EN copy placeholders (draft for mockups)

- Block titles:
  - `Network Pulse`
  - `The Picture Is Forming`
  - `Emerging Signals`
  - `What's Missing`
  - `Help Complete the Picture`
- Provisional label (Emerging): `Emerging signal` / `Provisional — may change`
- Pulse without metrics (copy-only): `Stories are already shaping a collective picture.`
- Help CTA (reuse Submit language): `Submit a story` / `Tell another story`
- Continuum (Issues present): `Issues emerging · discovery continues for what is still forming`

## Prohibited-pattern checklist (AC-SPA-ES-03)

Do **not** put any of these (or close paraphrases) in Early Signal strings:

- Completeness / understanding percentages (e.g. «% understood», «X% complete»)
- Countdown unlocks (e.g. «N more Stories to unlock Issue»)
- Small-N certainty language: `trending`, `majority`, `consensus` as product claims
- Collapsing Emerging Signal visual language into confirmed Issue chrome
- Offers / Solutions CTAs on zero-Issue board

## Out of scope (must stay out of mockups)

- spa REQ-12 personal `/dashboard` / cabinet redesign
- Offers / Solutions surfaces
- Invented gateway API shapes or fake metric dashboards
- Voices / unique-person metrics
- Civic Search & Matching / Companions
- Clustering algorithm / promotion thresholds as UI rules
- Replacing public-home header/footer/nav (reuse as-is)
- PNG delivery in this layer (ADMIN-ESD-02 owns specs intake)

## Artboard to future story mapping

| Artboard ID | Surface | Future story |
|-------------|---------|--------------|
| ESD-D | Discovery composition on `/board` (zero Issues) | ES-01 |
| ESD-P | Network Pulse block | ES-02 |
| ESD-E | Emerging Signals provisional | ES-03 |
| ESD-C | Picture Forming + What's Missing + Help Complete | ES-04 |
| ESD-I | Continuum with Issues ≥1 | ES-05 |

## Progressive states A–E (illustrative density modes only)

Map parent §§16–20 into UX modes. **Do not** hard-code Story counts as gates.

| Mode | Parent | User meaning (short) | Discovery emphasis |
|------|--------|----------------------|--------------------|
| A | First Signal | Network has begun | Sparse field; significant, not empty |
| B | Diverse Early Voices | Different experiences; listening | Separated signals; Emerging may be **absent** |
| C | Patterns Beginning | Something may be forming | Overlap hints + Emerging provisional |
| D | Collective Picture Emerging | Seeing something together | Denser provisional patterns; still ≠ Issues |
| E | First Issue Emerges | Shared Issue appears | Issue feed + residual discovery (ESD-I) |

---

## ESD-D — Discovery composition (`/board`, zero Issues)

### State matrix

| State | Required |
|-------|----------|
| ESD-D-load | Loading board Issues (skeleton / quiet load — no fake Pulse numbers) |
| ESD-D-A | Mode A — first-signal discovery composition |
| ESD-D-B | Mode B — diverse early voices; Emerging optional/absent |
| ESD-D-C | Mode C — patterns beginning; Emerging provisional |
| ESD-D-D | Mode D — denser pre-Issue picture |
| ESD-D-err | Load error (honest error; no fabricated discovery metrics) |

### Paste-ready UX prompt (EN)

Design a state-sheet artboard for DOGEstonia Pre-Cluster **discovery composition** on the public `/board` route when there are **zero confirmed Issues** (ESD-D). Dark civic-tech style. Reuse existing public header/footer chrome; focus on the main board content replacing today's sole empty placeholder.

Show these labeled states on one sheet: loading; Mode A; Mode B; Mode C; Mode D; load error.

Hard requirements:
- Present the five conceptual blocks as a single coherent discovery composition (not five random cards): Network Pulse, The Picture Is Forming, Emerging Signals, What's Missing, Help Complete the Picture.
- This must feel like a founding network moment, not an empty failure state.
- Modes A–D are density modes only — do **not** label panels with hard Story-count thresholds or unlock meters.
- Emerging Signals: provisional language; may be empty/absent in Mode B.
- Network Pulse: if no sibling-approved metrics exist, use Story-presence framing or omit numbers — **never invent counts**.
- No Offers/Solutions. No Topic presented as Issue. Level 2 visuals must not look like confirmed Issue cards.
- Help Complete the Picture CTA points to existing Submit-a-story / GPT entry pattern (external), not in-app compose.
- Include a note for a future discovery-root test id.

Output format:
- One consolidated state sheet with labeled states (desktop + narrow/mobile expectations).
- Visual/product specification only — no implementation code.

---

## ESD-P — Network Pulse block

### State matrix

| State | Required |
|-------|----------|
| ESD-P-omit | Metrics omitted / copy-only Story-presence (default until sibling contract) |
| ESD-P-bound | Metrics available — only sibling-approved fields (placeholder slots, no invented field names) |
| ESD-P-narrow | Narrow/mobile Pulse layout |

### Paste-ready UX prompt (EN)

Design a focused state-sheet for the **Network Pulse** block (ESD-P) inside Pre-Cluster discovery on `/board`.

Show three states: (1) omit / copy-only presence, (2) bound metrics slots when a verified sibling contract exists, (3) narrow/mobile.

Hard requirements:
- Answer “is anything happening here?” without fake certainty.
- Default state must work with **no** live aggregate API: copy-only or omit numbers.
- Do **not** invent metric names/paths. Do **not** require Voices / unique-person metrics.
- No percentages of completeness, no unlock countdowns, no trending/majority claims for small-N.
- Keep hierarchy early on the page when composed inside ESD-D, but this artboard isolates Pulse.

Output format:
- Labeled state sheet; desktop + narrow.
- Spec only — no code; no invented API schemas.

---

## ESD-E — Emerging Signals (provisional)

### State matrix

| State | Required |
|-------|----------|
| ESD-E-empty | No emerging section / empty honest absence |
| ESD-E-cards | One or more provisional Emerging Signal cards |
| ESD-E-weaken | Signal weakens / disappears without looking like a deleted Issue |

### Paste-ready UX prompt (EN)

Design a state-sheet for **Emerging Signals** (ESD-E): provisional Level-2 patterns that are **not** Issues.

Show: empty/absent; provisional cards present; weaken/disappear transition framing.

Hard requirements:
- Label clearly as provisional / emerging — never as Issue.
- Topic/taxonomy language ≠ Issue language.
- Weakening must feel like signal confidence changing, not a removed Issue card.
- Do not fabricate similarity for visual richness when empty.
- No Offers. No unlock gamification.

Output format:
- State sheet with card anatomy notes (title, provisional badge, supporting copy).
- Spec only.

---

## ESD-C — Coverage: Picture Forming + What's Missing + Help Complete

### State matrix

| State | Required |
|-------|----------|
| ESD-C-default | Three coverage functions visible and distinguishable |
| ESD-C-cta | Help Complete CTA → existing Submit/GPT affordance |
| ESD-C-narrow | Mobile wrap of the three blocks |

### Paste-ready UX prompt (EN)

Design a state-sheet for the coverage trio (ESD-C): **The Picture Is Forming**, **What's Missing**, and **Help Complete the Picture**.

Show default desktop composition, CTA emphasis, and narrow/mobile wrap.

Hard requirements:
- Civic participation / coverage language — not referral gamification.
- What's Missing may suggest under-heard topics/areas/languages in abstract framing — no personal contacts.
- Help CTA uses existing board Submit-a-story / GPT entry (external URL pattern).
- No “N more Stories unlock Issue”.
- Keep the three functions distinguishable even when stacked on mobile.

Output format:
- State sheet; annotate CTA target as existing GPT/Submit entry.
- Spec only.

---

## ESD-I — Continuum with Issues ≥1

### State matrix

| State | Required |
|-------|----------|
| ESD-I-feed | Existing Issue feed/cards render (regression must hold) |
| ESD-I-residual | Residual Pre-Cluster discovery chrome alongside Issues (not mandatory full five-block) |
| ESD-I-event | First Issue emergence feels meaningful (Mode E narrative), not a silent counter tick |

### Paste-ready UX prompt (EN)

Design a state-sheet for `/board` when **≥1 confirmed Issue** exists (ESD-I): continuum — Issue feed remains, discovery framing may remain for still-forming content.

Show: Issue feed primary; residual discovery chrome; first-Issue emergence emphasis (Mode E).

Hard requirements:
- Do **not** hard-cut to a different product shell.
- Existing Issue list/cards must remain recognizable (regression of current board feed).
- Residual discovery is enough — do not require the full five-block composition unless it fits without competing with Issues.
- Emerging Signals stay provisional; Issues stay Level 3.
- No Offers before/ beside Issue-less contexts; Offers remain out of scope here.
- Do not invent new APIs for this sheet.

Output format:
- State sheet showing feed + residual discovery relationship (desktop + narrow).
- Spec only.

---

## Notes for ADMIN-ESD-02

- Target specs folder plan: `spa-app/docs/UX/mockups/early-signal-dashboard/`
- Map ESD-D/P/E/C/I → `mockup-*-…-state-sheet-spec.md` per ADMIN-ESD-02
- PNG artboards may remain pending; document in README when intake runs
