# UX Prompts — Preview node budget + Share sheet (CT-21 · CT-24)

> **Package:** [component-thread](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Interview SSOT:** [INTERVIEW-CT-21-plus…](INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md)  
> **Recorded:** 2026-10-20  
> **Scope:** generative prompts **only** · **no** product code in UX chat output · analysis.mdc  
> **Etalon form:** [UX-PROMPTS-thread-residual-states.md](UX-PROMPTS-thread-residual-states.md)

---

## Sufficiency

| Check | Result |
|-------|--------|
| M152 Panel C collapsed 2-body preview | **Superseded** · tip [M152c](../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md) · intake PASS · **CT-21** |
| M152 Share sheet chrome | **Landed** [M152d](../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) · icons `public/icons/next-feed/share/` · **CT-24** |
| M153 tree / M153b tokens | **Reuse** for density — CT-23 · no invent denser-than-artboard |

**Decision:** Prompts below are **historical intake**. Do not regenerate unless OP reopens.

---

## Global constraints (every prompt)

```text
DOGEstonia SPA next-feed / lab thread-mount (IssueThreadBlock + CommentTree + PostActionStrip).
Light civic Issue post · four-action strip React | Comment | Share | Reactions unchanged as strip anatomy.
No Discussion · Issue {id} heading in discussion region.
No invent author/avatar/time · no invent gateway HTTP · no violet generic AI look.
Attachment / media in comments: local intent honesty if unpublished.
If unspecified: mark TBD and ask — do not invent.
No product code in UX chat output.
Comment reaction summary redesign: HOLD — out of scope.
```

---

## Prompt 1 — First-paint expanded tree with node budget + show more (CT-21)

### State matrix (minimum)

| State | Must show |
|-------|-----------|
| Few nodes (≤ budget) | Full tree expanded · no truncate control |
| Over budget | First N nodes in forest order (root+children counted together) · rest hidden · clear «show more» affordance |
| After show more | Remaining nodes appear (full or next chunk — annotate TBD if unsure) · control updates/hides |
| Empty / loading / unavailable | Unchanged M152 honesty · still **no** Discussion heading |
| Composer | Entry/composer per existing M153 · under tree |

### Paste-ready EN prompt

```text
Design a hi-fi residual state sheet for DOGEstonia SPA Issue thread FIRST PAINT on the feed card (component-thread · OP interview 2026-10-20).

Context: supersedes M152 Panel C collapsed “2 preview bodies + View discussion” for the default feed-card mount. Do NOT redraw full M152 A–E / M153 tree chrome from scratch — focus on expand + truncate behavior.

Operator locks:
- Default: discussion region is EXPANDED (CommentTree visible) — no collapsed summary as default
- Remove heading “Discussion · Issue {id}” entirely (and plain “Discussion” title row)
- Visible node budget DEFAULT = 3: count ROOT + CHILDREN together (not “3 independent roots”)
- Budget is a named config knob (like maxDepth) — annotate as configurable; show example at 3
- When total nodes > budget: show only the first budget nodes in tree order; provide a clear “show more” / continue control for the remainder
- Keep M153 bubble + continuous spine + React/Reply pills; do not invent extra outer frames around the tree
- Composer remains available below (Write a comment / Post) per M153

Panels (minimum):
A — ≤3 nodes: full tree, no show-more
B — deep/wide tree truncated at budget 3 with show-more
C — after show-more: remainder visible (or next chunk — mark TBD if policy unclear)
D — empty discussion (no heading) + entry
E — narrow 390: same truncate grammar

Constraints: light warm page; literal comment bodies; no fake authors/times; no invent HTTP; HOLD reaction summary redesign; Share strip out of this sheet.

Ask TBD aloud: exact “show more” copy; whether one-shot reveal vs chunked; forest traversal order when truncating mid-branch.

Deliver: one state sheet PNG + short written callouts. No product code.
```

---

## Prompt 2 — Share sheet for public Issue link (CT-24)

### State matrix (minimum)

| State | Must show |
|-------|-----------|
| Idle strip | Share zone in React\|Comment\|Share\|Reactions |
| Sheet open | Targets: Telegram · Instagram · X · WhatsApp · Facebook (+ optional Copy link if needed for fallback) |
| Success feedback | Honest “link shared / copied” — no fake social API success |
| Lab / no public URL | Honest unavailable / stub — do not invent production domain |
| Cancel / dismiss | Sheet closes · strip unchanged |

### Paste-ready EN prompt

```text
Design a hi-fi residual state sheet for DOGEstonia SPA post Share action (component-thread · OP interview 2026-10-20).

Context: PostActionStrip already has Share. Product claim (M152): Share shares/copies the canonical public Issue link. Lab currently no-ops. Need sheet chrome + networks — do NOT redesign the whole strip.

Operator locks:
- Networks in sheet: Telegram, Instagram, X, WhatsApp, Facebook
- Payload: canonical public Issue URL (not invent lab-only deep fake URL as production)
- If platform cannot open native share: show honest copy-link / open-intent path — mark Instagram/platform limits TBD, do not invent private APIs
- Prefer a light sheet / bottom sheet / popover continuous with civic feed — no violet generic AI chrome
- Keep strip anatomy: React | Comment | Share | Reactions

Panels (minimum):
A — strip with Share focus
B — sheet open listing the five networks (+ Copy link if you need a fallback row)
C — success feedback after copy/share
D — unavailable: no public Issue URL (lab honesty)
E — narrow 390 sheet

Constraints: no invent Identity; no invent engagement counts; HOLD unrelated thread chrome; no product code.

Ask TBD aloud: sheet vs system share sheet hybrid; exact network glyph set (reuse Present icons only if they exist — else annotate TBD).

Deliver: one state sheet PNG + short written callouts. No product code.
```

---

## After gen

1. Land written+PNG under `spa-app/docs/UX/next/feed/artboards/` with DOGEstonia-* names (no spaces).  
2. Intake validate vs prompts (analysis.mdc).  
3. Wire story Artboard tip on CT-21 / CT-24.  
4. Do **not** invent copy or network icons before OP accepts artboard.
