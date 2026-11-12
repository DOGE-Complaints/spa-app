# PROMPT — $ux → brief for $icons (Gap-8 reactions masters)

> **Назначение:** вставить в **диалог $ux** (где создавались / живут артборды feed UX).  
> **$ux** не генерирует SVG сам — готовит **максимально чёткий бриф** для соседнего диалога **$icons**.  
> **SSOT имён / scope:** [STORY-SPA-CR-icon-assets.md](STORY-SPA-CR-icon-assets.md) · ADMIN-CR-03 Done · REQ-24  
> **Визуальный референс:** только артборды M154 / M155 / M160 (written + PNG tone) — **не** старые SVG masters / icon-system style sheets.  
> **Не делать здесь:** Lucide `ic-*`; regenerate §Reuse; hopeful/amused; people/avatars (M155 OOS).

---

## Paste into $ux dialogue (operator)

```text
@.cursor/rules/analysis.mdc

You are the UX documentation dialogue ($ux) for DOGEstonia feed next/artboards.
Your job NOW: prepare a copy-paste BRIEF for the neighboring icons dialogue ($icons).
Do NOT generate SVG files yourself. Do NOT invent reaction ids. Do NOT reopen M155 people UI.

## Mandatory inputs — read fully before writing the brief

Catalog (file names + Gap/Reuse/Omit SSOT):
@spa-app/docs/tasks/backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md

Artboards + written specs — VISUAL + semantic reference (indexes M154 / M155 / M160).
Use these as the ONLY design/style reference for glyphs (how marks look in strip/picker/sheet).
Written specs override imperfect PNG pixels (PNG = tone).
@spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md
@spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png
@spa-app/docs/UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md
@spa-app/docs/UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.png
@spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md
@spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png

Ids SSOT (snake_case catalog ids — do not invent):
@spa-app/src/components/threads/reactionsV1Catalog.js

Do NOT cite existing icon-system reaction SVG files, Lucide, or legacy stroke recipes as style authority.
Labels are primary; icons are visual aids (M154 · M160).

## Package scope for $icons (exact)

NEW masters ONLY — STORY-SPA-CR-icon-assets §Gap (8):

| # | catalog id (snake) | output file (kebab) | layer | meaning (EN fixture) | interim emoji (metaphor hint only) |
|---|--------------------|---------------------|-------|----------------------|--------------------------------------|
| 1 | empathy | empathy.svg | emotional | Empathy | heart-hands metaphor — not Facebook Love |
| 2 | concern | concern.svg | emotional | Concerned | alert / caution — not Angry |
| 3 | sad | sad.svg | emotional | Sad | restrained civic sad — not meme |
| 4 | outraged_situation | outraged-situation.svg | emotional | This is unacceptable | situation-directed outrage — NOT targeting a person |
| 5 | useful_fact | useful-fact.svg | epistemic | Useful fact | pin / fact mark |
| 6 | insightful | insightful.svg | epistemic | Insightful | insight — not generic lightbulb cliché if avoidable |
| 7 | needs_evidence | needs-evidence.svg | epistemic | Needs evidence | evidence / search — not “report” |
| 8 | aggressive | aggressive.svg | moderation | Aggressive | comment-only moderation mark — not root |

Target master paths (all under icon-system reactions/):
spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/reactions/<kebab>.svg

## Explicitly OUT of $icons package this wave

DO NOT generate / overwrite:
- acknowledge.svg, support.svg, agree.svg, disagree.svg, off-topic.svg (already Present — §Reuse)
- chrome: react, retry, warning, unavailable, error, success, info, close (NF/NS reuse)
- hopeful / amused (Topic-guarded defaults — §Omit; not selectable)
- people avatars, Connect, ReactorsPopover chrome (M155 OOS — badges reuse same reaction glyphs later)
- Lucide PNG ic-* pipeline; Facebook Like/Love/Care/Wow/Haha marks

## Design constraints for the brief (cite in $icons brief)

Visual metaphor / weight / spacing / how marks read in strip vs picker:
- Derive ONLY from M154 artboard+spec (primary). M160 for theme/contrast expectations. M155 only as “same glyph if used as badge”.
- Do not instruct $icons to match any pre-existing reaction SVG on disk.

From M154 written rules:
- restrained DOGEstonia civic language; yellow #F5C542 = selected/accent in UI, not required as stroke fill in master
- icon is aid; localized label carries meaning
- moderation marks are comment-eligible only (aggressive family)

From M160 written rules:
- prefer currentColor so marks inherit light/dark
- meaning never icon-only

Delivery format for masters (neutral delivery, not a style recipe from old icons):
- one SVG file per Gap id at the path above
- no embedded text; no raster; no brand logo
- scalable for small strip and picker option rows as shown on M154

From M155 (boundary only):
- if $icons mentions badges: same glyph as picker mark; no separate “people badge” invent set

## Your deliverable (reply format — mandatory)

Output ONE markdown block titled exactly:

### Brief for $icons — Gap-8 reactions.v1 masters

Inside that block include ALL of the following sections (no prose waffle outside the block):

1) **Mission** — one sentence: create 8 SVG masters for Gap ids; promote later to next-feed runtime.
2) **Inputs $icons must @** — list concrete workspace paths: M154 md+png (visual SSOT), M160 md+png (theme/currentColor), CR-icon-assets, reactionsV1Catalog.js. M155 md+png only as “badge = same glyph” note. Do NOT list existing reaction SVG masters as style refs.
3) **File table** — the 8 rows above with: catalog id | kebab filename | full master path | layer | EN meaning | one-line metaphor do/don’t drawn from M154.
4) **Visual rules from artboards** — short bullets: what to copy from M154 panels (glyph tone, density, label primacy); currentColor / contrast from M160; no legacy icon-file style matching.
5) **Forbidden** — copy the OUT list above + “do not use old icon-system SVGs as style templates”.
6) **QA checklist** — [ ] 8 files only; [ ] names exact kebab; [ ] readable at strip + picker sizes as on M154; [ ] works on light/dark via currentColor (M160); [ ] each Gap mark visually distinct on the artboard metaphor; [ ] outraged-situation reads as situation not person-attack; [ ] aggressive reads moderation not “angry react”; [ ] no hopeful/amused.
7) **After masters land (note only)** — promote copy into `spa-app/public/icons/next-feed/reactions/`; update STORY-SPA-CR-icon-assets §Gap→§Reuse; update icon manifest rows; do not invent duplicate package under component-reactions/ unless promote policy changes.

Stop after the Brief block. Do not generate SVG. Do not edit spa-app code.
```

---

## Operator handoff path

1. Paste the fenced block above into **$ux** (with artboards + catalog attached / @ as listed).  
2. Copy **`$ux` → `### Brief for $icons — …`** into **$icons**.  
3. After $icons lands 8 masters → promote + Gap→Reuse (separate wave; not this prompt).

## Related

- [STORY-SPA-CR-icon-assets.md](STORY-SPA-CR-icon-assets.md)  
- [ADMIN-CR-03-icon-assets-catalog.md](ADMIN-CR-03-icon-assets-catalog.md)  
- [ICON-GENERATION-INDEX.md](../icons/ICON-GENERATION-INDEX.md) #10  
- Masters land under: `spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/reactions/` (paths only — not style SSOT)
