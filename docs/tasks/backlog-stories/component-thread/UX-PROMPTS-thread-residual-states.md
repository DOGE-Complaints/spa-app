# UX Prompts — Thread residual states (post lab audit)

> **Package:** [component-thread](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **SSOT visual:** [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
> **Audit:** [analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md](../../../analysis/analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md) · evidence `docs/analysis/lab-feed-thread-audit-2026-10-20/`  
> **Matrix:** [analysis-lab-feed-thread-event-state-matrix-2026-10-20.md](../../../analysis/analysis-lab-feed-thread-event-state-matrix-2026-10-20.md)  
> **Recorded:** 2026-10-20T09:55:21Z  
> **Intake:** 2026-10-20T10:54:54Z — [analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md](../../../analysis/analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md)  
> **Etalon form:** landing [UX-PROMPTS.md](../../../../../landing/docs/tasks/backlog-stories/landing-finetuning/UX-PROMPTS.md)  
> **Scope:** generative prompts **only** for SSOT-missing states · **no** product code in UX chat output

---

## Sufficiency verdict — M152 / M153 vs residual

| Check | Result |
|-------|--------|
| M152 THR-P-A…E status chrome | **Reuse** written + PNG — no gen prompt |
| M153 THR-T-A…F nest · reply · attach chips · post fail · branch · mobile G | **Reuse** — no gen prompt for already-panelized states |
| OP Attach lock: empty→picker→chip · images/PDF/Office | **Landed tip** [M153a v1.1](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) (rev3.1 PASS) · [v1.0 superseded](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.0.md) · story **CT-17** |
| M153a PNG C–E chip chrome | Align to [M153b §7](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · rev3.1 PASS · story **CT-19** |
| AttachmentRef paint tokens | **M153b written READY** · story **CT-19** |
| Dual-append / flat hierarchy after post | **Code bug** · story **CT-16** — no prompt |
| Lab unreachable stands LAB-1…4 | Story **CT-20** — no gen prompt |
| Comment reaction strip redesign | **HOLD** (OP) — no prompt · no story |
| maxAttachments / MIME / denied-submit | M153a §18 **TBD** — AC blockers on **CT-17** · no invent panel |

**Decision:** Keep attach-picker prompts as historical intake. Tip SSOT = M153a v1.1 + M153b. Stories: [CT-16…20](INDEX.md) · [OP mirror](OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md). Do not regenerate M152/M153 wholesale.

---

## Global constraints (every prompt)

```text
DOGEstonia SPA next-feed / lab thread-mount (IssueThreadBlock + ThreadComposer), NOT marketing landing.
Light board/feed ground · civic Issue post context · four-action strip React|Comment|Share|Reactions unchanged.
AttachmentRef = local pending intent only · never claim published media URL.
Allow-list (operator lock): images · PDF · Microsoft Office (Word/Excel/PowerPoint family) — mark TBD exact MIME/extensions if unspecified.
Flow: composer empty of chips → user activates Attach → OS/native file picker → then Ready or Denied chip · never invent pre-seeded chips on first paint.
Do not invent gateway HTTP APIs, mockup-NN ids beyond M152/M153 continuity, or new ic-* filenames — reuse Present attach.svg / send.svg paths when icons shown.
If something is not specified in M152/M153 / PRODUCT-BRIEF / OP attach lock, mark TBD and ask — do not invent.
No product code in UX chat output.
Reaction summary redesign on comment nodes: out of scope (HOLD).
```

---

## Artboard map → residual

| Logical artboard | Story touch | Prompt / art status |
|------------------|-------------|---------------------|
| M152 A–E · M153 A–G | CT-01…15 | **Reuse** existing SSOT |
| Attach picker + types (residual) | CT-05 / CT-11 follow-on | **Landed** M153a written + PNG rev2 · flow Pass |
| M153a C–E chip paint vs M153b | CT-05 / CT-11 | **Rev3 gen** below (raster hygiene) |
| Depth 2.0 token callouts | CT-13 / CT-14 | **Landed** M153b — see [UX-PROMPTS-thread-visual-tokens-depth2.md](UX-PROMPTS-thread-visual-tokens-depth2.md) |
| Dual-append recovery | — | **No art** — code fix wave |
| Comment reaction pills | CT-09 / CR | **HOLD** — no gen |

---

## Prompt — Attach picker + type allow-list (residual)

### State matrix (minimum)

| State | Must show |
|-------|-----------|
| Empty composer (no chip) | Attach affordance visible · **zero** AttachmentRef chips · no “Selected image” invent |
| Picker open (annotate) | OS/native file picker invoked from Attach — annotate if raster cannot show real OS chrome |
| Ready chip after allowed pick | Image **or** PDF **or** Office file · Ready to post · Local intent · not published · Remove |
| Denied — wrong type | File outside allow-list · honest deny · draft text intact |
| Denied — safety / capability | Align M153 THR-T-E honesty · draft intact |
| At maxAttachments | Attach disabled/omitted · existing chip kept |
| Attachments unavailable | No Attach · honesty copy (M153 omit) — TBD if capability flag unnamed |

### Paste-ready EN prompt

```text
Design a hi-fi residual state sheet for DOGEstonia SPA thread composer ATTACHMENTS after lab audit (component-thread residual · OP attach lock).

Context: extends M153 THR-T-D/E (Ready/Denied chips) — do NOT redraw full M152/M153. Focus on the missing picker + type allow-list path.

Operator lock:
- Allowed: images, PDF, Microsoft Office documents (Word/Excel/PowerPoint family — annotate TBD exact extensions if unsure)
- Flow: empty composer (no chips) → user clicks Attach → native/OS file picker → then Ready or Denied AttachmentRef chip
- Never show pre-seeded chips on first paint
- AttachmentRef remains local intent only — never published media claim

Global constraints: light feed/thread chrome; reuse Present paperclip Attach + send icons if shown; no violet generic AI look; keep Issue four-action strip out of comment rows; no invent gateway HTTP; no invent author/time Identity.

State sheet:
1) Desktop — empty composer under Discussion: Attach present, zero chips
2) Annotate picker invocation (OS dialog) after Attach
3) Ready chip after selecting an image; separate Ready examples for PDF and one Office type
4) Denied chip for disallowed type (outside allow-list) with draft text still in textarea
5) Denied chip for safety/capability (M153 E honesty) — draft intact
6) Optional inset: maxAttachments reached (Attach disabled)
7) Optional inset: attachments unavailable (omit Attach + honesty copy)

Out of scope: regenerating M152 A–E; nest spine/reply chrome; comment reaction summary redesign (HOLD); inventing published media gallery; inventing HTTP upload contract.

Ask before inventing deny copy not implied by M153 E / OP lock.
Map artboard → residual attach picker sheet · story touch CT-05 / CT-11 follow-on (TBD story id if new).
```

---

## Prompt — M153a rev3 (AttachmentRef chrome align to M153b §7)

> **Why:** Intake [analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md](../../../analysis/analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md) — M153a PNG C–E shows green Ready / pink-red Denied; [M153b §7](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) forbids green/red and locks paint. Rev3 is **raster hygiene** only; keep A/B/F composition from rev2.

### State matrix (minimum)

| State | Must show |
|-------|-----------|
| C1–C3 Ready | Fill `#FFFDF8` · border 1px `#E7E4DC` · radius 12 · pad 12 · status **`Ready to post`** `#101828` weight 600 · Remove `#B54708` · **no** green pill/fill |
| D type Denied | Fill `#F7F6F2` · border 1px `#B54708` · title M153 generic deny `#B54708` 600 · body `#101828` · allow-list helper · Remove `#B54708` · **no** pink/red wash |
| E safety Denied | Same chrome as D · safety detail sentence from M153 E |
| Honesty (optional) | `Local intent · not published` secondary if space — never published URL |
| A / B / F | Unchanged composition from M153a rev2 (zero chips · picker annotate · unavailable) |

### Paste-ready EN prompt

```text
Revise the DOGEstonia M153 CONTINUITY · ATTACH PICKER RESIDUAL artboard to revision 3 (raster hygiene only).

Keep panels A (zero chips), B (system-owned OS picker annotation — no custom file manager), and F (attachments unavailable · Attach omitted) as in rev 2 composition and copy.

REDRAW only AttachmentRef crops C1/C2/C3, D, and E so chip PAINT matches the operator-accepted Depth 2.0 token register (M153b §7). Locked palette only — do not invent green Ready fills, red/pink Denied washes, or violet:

Ready chips (C1 image · C2 PDF · C3 Word as Office representative):
- Fill #FFFDF8, border 1 px #E7E4DC, radius 12 px, padding 12 px all sides
- Status text exactly: Ready to post — color #101828, weight 600 (not a short green “Ready” badge)
- Remove action color #B54708
- Optional secondary honesty line: Local intent · not published
- Type cue may stay as small text badge (Image/PDF/Word) — no new ic-* icons; reuse Present attach.svg only if supplied

Denied chips (D type outside allow-list · E safety):
- Fill #F7F6F2, border 1 px #B54708, radius 12 px, padding 12 px
- Title: This attachment can’t be added. — #B54708 weight 600
- E adds: It does not meet the required media safety rules. — #101828
- D keeps helper: Allowed: images · PDF · Microsoft Office
- Remove #B54708
- Draft text remains intact in composer

Written M153a semantics and M153b tokens override any prior raster. Do not invent maxAttachments panel, MIME lists, HTTP upload, or published media URLs.
Out of scope: regenerating bubble/spine/pills (M153b already landed); dual-append; reaction HOLD; full M152/M153 redraw.
Map → M153a rev3 · story touch CT-05 / CT-11 follow-on.
```

---

## Prompt — M153a rev3.1 (Denied fill only · preserve rev3 Pass)

> **Why:** [analysis-m153a-rev3-artboard-validation-2026-10-20.md](../../../analysis/analysis-m153a-rev3-artboard-validation-2026-10-20.md) — rev3 **Partial PASS**: C Ready + `Ready to post` + no green **Pass**; D/E still show **pink/red chip wash** ≠ M153b §7 fill `#F7F6F2`.  
> **Rule:** delta edit on **existing rev3 raster** — do **not** redraw A/B/C/F; do **not** revert Ready copy or reintroduce green badges.

### Preserve (must not change)

| Panel | Keep exactly as rev3 |
|-------|----------------------|
| A | Zero chips · draft · Attach + Post comment |
| B | System-owned picker annotate · no custom file manager · allow-list note · TBD MIME |
| C1–C3 | `Ready to post` · no green pill · Neutral Ready chip · Remove link · type cues Image/PDF/Word |
| D copy | `This attachment can’t be added.` + `Allowed: images · PDF · Microsoft Office` · draft intact |
| E copy | Same title + `It does not meet the required media safety rules.` · draft intact |
| F | Attach omitted · `Attachments are unavailable here.` |
| Footer | Local-intent honesty · CT-05/CT-11 · TBD notes · no new ic-* |

### Change only

| Panel | Fix |
|-------|-----|
| D chip fill | `#F7F6F2` (page) — **remove** pink/light-red wash |
| E chip fill | same `#F7F6F2` |
| D/E border | keep 1 px `#B54708` |
| D/E title | keep `#B54708` weight 600 · body `#101828` |
| Remove | keep `#B54708` |

### Paste-ready EN prompt

```text
Delta-edit the EXISTING DOGEstonia artboard “M153 CONTINUITY · ATTACH PICKER RESIDUAL · rev 3” to revision 3.1.

CRITICAL — preserve everything already correct in rev 3. Do NOT regenerate the whole sheet from scratch. Do NOT change layout of A, B, C1–C3, or F. Do NOT revert Ready chips.

KEEP unchanged:
- A: initial composer, zero attachment chips, draft text, Attach + yellow Post comment
- B: system-owned OS/native file picker annotation only (platform UI TBD); no custom in-app file manager; allowed families note; MIME TBD
- C1 / C2 / C3: Ready chips with status text exactly “Ready to post” (not a short green “Ready” badge); no green fills; type cues Image / PDF / Word; Remove link; draft intact; Post comment visible
- D / E: denial copy strings exactly as rev 3 (generic deny + allow-list helper on D; safety detail sentence on E); draft intact; Remove; Post comment illustrative
- F: Attachments are unavailable here — Attach omitted
- Footer honesty: AttachmentRef = local pending intent, never published media; no new icon filenames

CHANGE ONLY panels D and E chip PAINT to match M153b Depth 2.0 token register §7 Denied:
- Chip fill: #F7F6F2 (warm page) — remove any pink, light-red, or rose wash inside the denied chip
- Chip border: 1 px solid #B54708 (keep)
- Title “This attachment can’t be added.”: #B54708, weight 600 (keep emphasis)
- Safety body on E: #101828 (keep)
- Remove: #B54708 (keep)
- Do not invent a second red/green status palette; meaning stays in words + orange border

Output title: M153 CONTINUITY · ATTACH PICKER RESIDUAL · rev 3.1
Out of scope: bubble/spine/pills; maxAttachments invent; MIME invent; HTTP upload; dual-append; reaction HOLD; full M152/M153 redraw.
Map → M153a rev3.1 · CT-05 / CT-11 follow-on.
```

---

## Explicit out of scope (this residual UX file)

- Regenerating M152 / M153 full sheets  
- Regenerating M153b token callouts (already landed READY)  
- Dual-append / duplicate-id forest flat (code bug — fix wave)  
- Comment reaction strip / people ownership redesign (HOLD)  
- Inventing maxAttachments / MIME / denied-submit policy panels  
- `#/next/feed` oval composer  
- Gateway HTTP / Live adapter invent  
- Product JSX/CSS in UX chat  
- Invent OP PASS
