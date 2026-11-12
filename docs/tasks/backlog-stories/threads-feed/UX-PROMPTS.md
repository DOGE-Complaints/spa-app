# UX Prompts — Threads feed shell (ADMIN-THR-01)

> Package: [threads-feed](INDEX.md)  
> Product lock: [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> Inputs: [ADMIN-THR-01-product-ux-prompts.md](ADMIN-THR-01-product-ux-prompts.md), [REQ-17](../../../requirements/17-issue-thread-feed-ux-and-reactions.md), [threads-feed-ux arch](../../../architecture/threads-feed-ux/00-overview.md), [reactions.v1 catalog](../../../../../docs/requirements%20backlog/DOGEstonia%20—%20Threads%20—%20Emotional%20reactions.md)  
> Method note: prompts derived from locked brief + verified code only (analysis.mdc). No mockup-NN / `ic-*` invented here.  
> **Verified host today:** `/board` maps `IssueCard` in feed ([`BoardPage.jsx:374-383`](../../../../src/pages/BoardPage.jsx)); routes `/board`, `/issue/:id`, `/verify` ([`App.jsx:25-30`](../../../../src/App.jsx)). No thread/comment product chrome under Issue posts yet (REQ-17 §3). Context artboard M132 §19 lists comments as artboard OOS — **do not rewrite M132**; product placement = feed post slot (AC-SPA-THR-04).

## Global constraints (for every prompt)

- Dark civic-tech DOGEstonia board continuum — **not** a marketing landing / hero page.
- Facebook-**like layout** (Issue = post; thread under post) using DOGEstonia palette, DS, logo — **no Facebook trademarks, logos, or copycat assets**.
- Reuse public-home chrome (header/footer/nav) as-is. Do **not** redesign PH-01…06 surfaces.
- Composition lock: **`BoardIssuePost`** wraps existing Issue card chrome + **`IssueThreadBlock`** under it (arch Q1). Do not invent a parallel “social card” that replaces civic Issue identity.
- Primary product placement: **dashboard feed** `/board`. Also show the **same** `IssueThreadBlock` on `/issue/:id` (arch Q4) without a second social product language.
- Progressive shell + fail-soft (arch Q8): chrome may appear while social data is empty/unavailable; **no fake comments or reactions** as demo content.
- Do **not** invent gateway/threads HTTP paths or JSON fields in mockup copy.
- Write gate: consume opaque **`identity_verified`**; unverified write → existing **`/verify`** with return to feed/post — **not** an inline duplicate verify product (arch Q3). Method (phone vs eID) must **not** appear in the check-result chrome.
- Reactions: `reactions.v1` only; three **labelled** layers — **emotional**, **epistemic**, **moderation** (catalog). Localized text authoritative; emoji/icon is visual aid only. Summary strip + gesture/button picker (arch Q6). `agree`⊥`disagree`. Moderation marks **not** on thread root.
- Attachments: refs/ids; honour legal media floor; **no** “disable CSAM / catastrophic-media floor” control (arch Q5). Soft-fail messages when attach denied.
- Escalation: soft **invitation stub** — visible, non-dead click feedback; not org/admin API (arch Q7).
- Visual language compatible with public shell tokens: dark surfaces (`#141417` / `#1b1c1f`), text `#f2f2f2`, muted `#9a9da6`, accent yellow sparingly (`#f5c542` / token-close).
- Projected testids for later specs (not a FE task here): `board-issue-post`, `issue-thread-block`.

## EN copy placeholders (draft for mockups)

- Thread empty: `Be the first to comment`
- Thread unavailable: `Discussion unavailable right now`
- Composer placeholder: `Write a comment…`
- Attach denied / floor: `This attachment isn’t allowed`
- Soft fail generic: `Couldn’t post — try again`
- Verify CTA: `Verify to join the discussion`
- Verify result (opaque): `You’re verified` — **never** “verified by phone/eID”
- Escalate idle: `Invite collaboration`
- Escalate feedback: `Collaboration handoff isn’t connected yet`
- Reaction layers (EN labels): `Emotional` · `Epistemic` · `Moderation`
- Sample enabled reaction labels (from catalog; do not invent new ids): Acknowledge, Support, Empathy, Agree, Disagree, Useful fact, Off-topic (etc. as enabled)

## Out of scope (must stay out of mockups)

- REQ8: cabinet raw metrics, participant votes, hold/shadow honesty UX
- Rate-limit / near-duplicate warning UX (AC-SPA-THR-07)
- Invented client endpoints or API field schemas
- Rewriting mockup-132 public board feed artboard file
- Facebook trademarks / Meta brand chrome
- Spa mock/fake thread datasets as “happy path truth”
- Blob upload transport SSOT / vendor scanner UI
- Inline verification flow that duplicates `/verify`
- Landing marketing hero replacing `/board`
- Voice-weight math / display as product chrome

## Artboard to future story mapping

| Artboard ID | Mockup | Surface | Future story | Spec |
|-------------|--------|---------|--------------|------|
| THR-P | **M143** | BoardIssuePost on `/board` | THR-01 | [mockup-143-…](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md) |
| THR-I | **M148** | Issue page mount of same thread block | THR-01 | [mockup-148-…](../../../UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md) |
| THR-T | **M144** | Comment tree + composer + attach/floor | THR-02 | [mockup-144-…](../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md) |
| THR-R | **M145** | reactions.v1 strip + picker (3 layers) | THR-03 | [mockup-145-…](../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md) |
| THR-E | **M146** | Escalation / collaboration stub | THR-04 | [mockup-146-…](../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md) |
| THR-V | **M147** | Verify-before-write gate CTA | THR-05 | [mockup-147-…](../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.md) |

THR-06 (tech_first clients) has **no** artboard in this layer. Intake closed: [ADMIN-THR-02](ADMIN-THR-02-ux-mockup-intake.md) · [mockups README](../../../UX/mockups/threads-feed/README.md).

---

## THR-P — BoardIssuePost (feed post slot)

### State matrix

| State | Required |
|-------|----------|
| THR-P-A | Loading thread chrome under Issue card |
| THR-P-B | Empty thread (no comments yet) |
| THR-P-C | Populated thread (collapsed summary + open tree affordance) |
| THR-P-D | Error / unavailable social (fail-soft; Issue card still readable) |
| THR-P-E | Narrow / mobile width |

### Paste-ready UX prompt (EN)

Design a state-sheet artboard for DOGEstonia **BoardIssuePost** on the public `/board` feed (THR-P) in a dark civic-tech style.

Show five labeled states in one sheet:  
1) thread loading under the Issue card,  
2) empty thread,  
3) populated thread,  
4) social unavailable/error with Issue card still intact,  
5) narrow/mobile.

Hard requirements:
- Composition: existing civic **Issue card** (title/status/open affordance language consistent with current board) sits in the **post slot**; **IssueThreadBlock** sits directly beneath it — Facebook-like stacking without Meta branding.
- Do not redesign public header/footer/filters; crop or frame one feed row as the focus.
- Populated state must show room for: comment tree summary, reaction strip, composer affordance, and a soft escalation control — detail of those controls may be “placeholder chrome” here if covered in THR-T/R/E, but the **slots** must be visible.
- Fail-soft state: clear “Discussion unavailable” (or equivalent) — **no** fake comments.
- Preserve dark palette; yellow accent only for primary actions.
- Note projected testids: `board-issue-post`, `issue-thread-block`.

Output format:
- One consolidated state sheet with labeled states (desktop + narrow).
- No implementation code; visual/product specification only.
- Do not invent API URLs or JSON.

---

## THR-T — Comment tree + composer + attachments

### State matrix

| State | Required |
|-------|----------|
| THR-T-A | Nested tree within max depth |
| THR-T-B | Max-depth reached (no deeper reply affordance / clear limit) |
| THR-T-C | Reply-to-comment composer open |
| THR-T-D | Attach allowed (floor permits) |
| THR-T-E | Attach denied / soft-fail message (floor) |
| THR-T-F | Soft-fail post error (visible, not silent) |

### Paste-ready UX prompt (EN)

Design a state-sheet artboard for DOGEstonia Issue **comment tree + composer + attachment** chrome (THR-T).

Show six labeled states: nested tree, max-depth, reply composer, attach allowed, attach denied/soft-fail, post soft-fail.

Hard requirements:
- Nested indentation (or clear parent/child) up to a node **max depth** knob — show the limit state explicitly.
- Composer: text field + reply context + attach affordance.
- Attachments are **refs** UX (photo/file chip or attach button) — not a separate gallery product.
- When floor denies: disable/hide attach and show an honest message; **never** show a control to “disable legal media / CSAM protection”.
- Soft-fail errors must be visible (toast/inline) — no silent drop.
- Keep civic-tech tone; no Facebook assets.
- Do not invent upload endpoint names.

Output format:
- One consolidated state sheet; no code; no invented HTTP.

---

## THR-R — reactions.v1 strip + picker (3 layers)

### State matrix

| State | Required |
|-------|----------|
| THR-R-A | Summary strip with aggregates (counts / top marks) |
| THR-R-B | Picker open — three labelled layers: Emotional / Epistemic / Moderation |
| THR-R-C | Enabled-only ids visible; disabled catalog entries omitted or clearly unavailable |
| THR-R-D | Hover or button-open picker (desktop) |
| THR-R-E | Long-press or explicit button (mobile) |
| THR-R-F | Keyboard / focus a11y path indicated |
| THR-R-G | `agree` vs `disagree` mutual exclusion chrome |

### Paste-ready UX prompt (EN)

Design a state-sheet artboard for DOGEstonia **reactions.v1** chrome (THR-R): summary strip + picker.

Show states covering: strip only, picker open with **three labelled groups** (Emotional, Epistemic, Moderation), desktop open gesture, mobile open gesture, keyboard focus path, and agree/disagree exclusivity.

Hard requirements:
- Catalog version **reactions.v1**. Use real layer names and sample ids from the catalog (e.g. acknowledge, support, agree, disagree, off_topic) — **do not invent** new reaction ids or a Facebook Like-only row.
- Presentation: labelled groups, **not** one undifferentiated emoji soup. Localized text is primary; emoji/icon is aid only — do not invent `ic-*` filenames.
- Strip stays compact on the feed; full catalog lives in the picker.
- Moderation layer: show on **comments**; indicate moderation is **unavailable on thread root**.
- Multi-select up to a max (default 3) — show capacity hint without gamey unlock copy.
- No voice-weight numbers or cabinet metrics.

Output format:
- One consolidated state sheet; no code; cite reactions.v1 layers by name.

---

## THR-E — Escalation stub

### State matrix

| State | Required |
|-------|----------|
| THR-E-A | Idle affordance visible on post/thread chrome |
| THR-E-B | Activated — toast/modal “not connected yet” (non-dead) |
| THR-E-C | Soon / disabled variant with honest copy |

### Paste-ready UX prompt (EN)

Design a focused state-sheet for the DOGEstonia **escalation / collaboration invitation stub** (THR-E).

Show idle, activated feedback, and soon/disabled variants.

Hard requirements:
- Soft invitation — **not** an admin ticket workflow or org org-chart UI.
- Click must **not** be a silent no-op: show toast or lightweight modal with clear “Collaboration handoff isn’t connected yet” (or equivalent).
- Do not invent escalate API screens, SLA, or queue boards.
- Keep compact; sits in BoardIssuePost / IssueThreadBlock chrome without overpowering the Issue card.

Output format:
- One small state sheet; no code; no invented endpoints.

---

## THR-V — Verify-before-write gate

### State matrix

| State | Required |
|-------|----------|
| THR-V-A | Unverified user attempts write → CTA to verify |
| THR-V-B | CTA navigates to existing `/verify` with return-to-feed/post expectation |
| THR-V-C | After verify — return; success chrome is method-opaque (no phone/eID in result) |
| THR-V-D | Optional: pack type + integration **name** as CTA supporting copy only (no method in result) |

### Paste-ready UX prompt (EN)

Design a state-sheet for DOGEstonia **verify-before-write** on the Issue thread (THR-V).

Show: unverified write blocked with CTA; handoff to `/verify`; return after success with **opaque** verified result.

Hard requirements:
- Gate uses opaque verified boolean language (“verified”), not `phone_verified` as the sole story.
- Handoff is **redirect to existing `/verify`**, not an inline eID/phone form inside the thread.
- Success / check result must **not** display verification method.
- Supporting CTA copy may mention a generic integration/product name if needed — still no method disclosure in the result.
- Do not redesign the full Verify page; crop CTA + result chrome relevant to the thread write path.

Output format:
- One consolidated state sheet; no code; no new verify routes.

---

## THR-I — Issue page mount

### State matrix

| State | Required |
|-------|----------|
| THR-I-A | Civic Issue detail body + same IssueThreadBlock below/alongside |
| THR-I-B | Thread empty / populated / unavailable parity with feed semantics |
| THR-I-C | Narrow / mobile coexistence with detail layout |

### Paste-ready UX prompt (EN)

Design a state-sheet for DOGEstonia **`/issue/:id`** with the **same** IssueThreadBlock as the feed (THR-I).

Show: detail + thread coexistence; empty vs populated vs unavailable; narrow layout.

Hard requirements:
- **Do not delete** or replace the Issue detail page — extend it with the shared thread shell.
- Visual language of IssueThreadBlock must match THR-P/THR-T/R (one component, two mounts).
- Do not invent a second comments product for detail-only.
- Keep public shell chrome; focus the detail column + thread.

Output format:
- One consolidated state sheet; no code; no route invention beyond existing `/issue/:id`.

---

## Notes for outside-IDE UX chat

1. Paste **Global constraints** once, then one artboard prompt at a time (or batch THR-P→I in order).
2. Deliverable of UX chat = artboards / state sheets for intake under `spa-app/docs/UX/mockups/threads-feed/` in **ADMIN-THR-02** — not this file.
3. This layer does **not** assign mockup-NN numbers or generate PNG.
