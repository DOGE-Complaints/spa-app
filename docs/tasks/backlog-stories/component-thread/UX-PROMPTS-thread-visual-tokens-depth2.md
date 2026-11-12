# UX Prompts — Thread visual tokens (Depth 2.0)

> **Package:** [component-thread](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **SSOT:** [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
> **Audit:** [analysis-lab-feed-thread-visual-depth2-gaps-2026-10-20.md](../../../analysis/analysis-lab-feed-thread-visual-depth2-gaps-2026-10-20.md) · evidence `docs/analysis/lab-feed-thread-visual-depth2-2026-10-20/`  
> **Inventory:** [analysis-lab-feed-thread-visual-atoms-inventory-2026-10-20.md](../../../analysis/analysis-lab-feed-thread-visual-atoms-inventory-2026-10-20.md)  
> **Recorded:** 2026-10-20T10:20:00Z  
> **Intake:** 2026-10-20T10:54:54Z — [analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md](../../../analysis/analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md)  
> **Landed SSOT:** [M153b written](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) + PNG (callouts illustrative)  
> **Etalon form:** landing [UX-PROMPTS.md](../../../../../landing/docs/tasks/backlog-stories/landing-finetuning/UX-PROMPTS.md)  
> **Scope:** prompts **only** for SSOT-silent visual tokens · **Ask before invent hex/px** · no product code

---

## Sufficiency verdict — M152 / M153 written tokens

| Check | Result |
|-------|--------|
| Shared palette `#F7F6F2` / `#FFFDF8` / `#101828` / `#667085` / `#E7E4DC` / `#F5C542` / `#B54708` | **Reuse** — Match on lab · locked in M153b |
| Strip 56 / touch ≥44 / indent ~44·24 / thread pad 20 | **Reuse** written px — rem-root Drift is eng |
| Bubble · spine · pills · parent · AttachmentRef paint | **Landed M153b** — operator-accepted token table · **READY** SSOT · stories **CT-18** (A–D) · **CT-19** (§7) |
| Lab AS-IS (blue-grey mix · 32px pills · `#2E90FA`) | **Rejected** by M153b — CSS parity = **CT-18** · not new art |
| Attach picker flow | Tip [M153a v1.1](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · story **CT-17** |
| M153a PNG green/red chips | **Not authoritative** — M153b §7 wins · **CT-19** |

**Decision:** Token callout prompt below is **historical intake** (sheet landed). Do not regenerate M153b. Stories: [CT-18](STORY-SPA-CT-18-depth2-token-chrome.md) · [CT-19](STORY-SPA-CT-19-attachment-ref-token-paint.md) · [OP mirror](OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md). Do not invent hex beyond M153b register.

---

## Global constraints (every prompt)

```text
DOGEstonia SPA thread-mount on next-feed / lab (#/lab/feed), NOT marketing landing.
Reuse locked palette from M152/M153 §12 — do not invent a second brand palette.
Document exact tokens for: comment bubble fill/border/radius/padding; continuous spine + L-elbow stroke width/color; React|Reply pill color, min-height vs 44px rule, padding, separator; AttachmentRef Ready/Denied colors; reply-parent subtle highlight.
Lab measured AS-IS may be cited as “current code” annotation only — do NOT treat code invent as approved SSOT until operator confirms.
Ask before inventing any hex or px not already in M152/M153 §12 or this prompt’s asked TBD list.
No product code in UX chat output.
Out of scope: attach file-picker flow (separate residual prompt); dual-append bug; comment reaction HOLD redesign; dark M160 full sheet; #/next/feed.
```

---

## Artboard map → residual

| Logical artboard | Status |
|------------------|--------|
| M152 / M153 full sheets | **Reuse** |
| Token callout sheet (Depth 2.0) | **Landed** M153b written + PNG · prompt below = historical |
| Attach picker types | M153a landed · rev3 chip chrome in [UX-PROMPTS-thread-residual-states.md](UX-PROMPTS-thread-residual-states.md) |

---

## Prompt — Thread chrome token callouts (Depth 2.0)

### State matrix (minimum)

| State / callout | Must show |
|-----------------|-----------|
| Bubble default | Fill, border, radius, padding labelled with TBD or approved values |
| Spine + elbow | Continuous left rail + L into nested bubble · stroke width + color labelled |
| Action pills | React + Reply side by side · sep · color · height (reconcile with ≥44 touch) |
| Reply parent highlight | How selected parent is “subtle” vs excerpt-only bar |
| AttachmentRef Ready | Chip fill/border + Ready status color |
| AttachmentRef Denied | Chip fill/border + deny title treatment |
| Annotation: rem root | Note whether SSOT px assume 16px html (lab measured 14px) — ask |

### Paste-ready EN prompt

```text
Design a hi-fi TOKEN CALLOUT sheet (or labelled crop annotations on existing M153) for DOGEstonia SPA thread-mount visual tokens that are silent in M152/M153 written specs (Depth 2.0 residual).

Do NOT redraw the full M152/M153 state sheets. Do NOT redesign attach file-picker + type allow-list (separate residual). Do NOT redesign comment reaction summary (HOLD).

Locked palette already approved (reuse, do not replace): page #F7F6F2, surface #FFFDF8, text #101828, secondary #667085, border #E7E4DC, action yellow #F5C542, link #B54708. Touch targets ≥44 px where controls are primary.

Produce labelled callouts for:
1) Comment bubble — fill (today’s code uses a blue-grey color-mix; ask if that is approved or provide approved wash), border, corner radius, padding
2) Nest spine — continuous left stroke width + color; L-elbow into bubble (width/color/geometry)
3) Comment actions — React | Reply pill pair: fill/border/text color, min-height (reconcile with 44 px rule — pills currently 32 px in code), horizontal padding, 1px separator
4) Reply target — what “parent highlighted subtly” means visually (bubble ring/wash vs excerpt bar only)
5) AttachmentRef Ready chip — fill, border, “Ready to post” status color
6) AttachmentRef Denied chip — fill, border, title emphasis
7) Optional footnote: confirm whether all M152/M153 px values assume 16px root font-size

Global constraints: light feed/thread chrome; no violet generic AI look; no invent gateway HTTP; no invent author avatars; ask before inventing any hex/px not in the locked palette above.

Out of scope: regenerating M152 A–E / M153 A–G full panels; attach OS picker flow; dual-append recovery; dark theme sheet.

Map artboard → Depth 2.0 token callouts · story touch CT-13/14 follow-on (TBD id if new).
```

---

## Explicit out of scope

- Full M152/M153 regenerate  
- Further M153b token regeneration (sheet landed READY)  
- Attach picker flow / M153a rev3 chip raster (see UX-PROMPTS-thread-residual-states.md)  
- Dual-append / forest flat (code)  
- Comment reaction HOLD  
- Invent OP PASS / invent hex beyond M153b register  
- Product CSS in UX chat  
