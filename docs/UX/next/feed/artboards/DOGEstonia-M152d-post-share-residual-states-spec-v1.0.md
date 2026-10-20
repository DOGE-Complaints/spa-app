# DOGEstonia — Post Share Residual States Specification v1.0 (M152d)

**Date:** 2026-10-20  
**Surface:** SPA `#/lab/feed` · `PostActionStrip` Share zone  
**Continuity:** M152 strip Share claim (canonical public Issue link). Label **M152d** = docs tip id.  
**Status:** written SSOT from operator-accepted gen + interview locks.  
**Artboard:** [DOGEstonia-M152d-post-share-residual-states-spec-v1.0.png](DOGEstonia-M152d-post-share-residual-states-spec-v1.0.png) — title `DOGEstonia · POST SHARE · RESIDUAL STATES`  
**Prior exec id:** `exec-9a4da5a4-e2fc-49a5-941a-4d64d003295e`  
**Stories:** **CT-24** tip  
**Interview:** [INTERVIEW-CT-21-plus…](../../tasks/backlog-stories/component-thread/INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md)  
**Prompt:** [UX-PROMPTS preview/share Prompt 2](../../tasks/backlog-stories/component-thread/UX-PROMPTS-thread-preview-budget-and-share-2026-10-20.md)  
**Runtime icons:** `/icons/next-feed/share/{telegram,instagram,x,whatsapp,facebook}.svg`

## 1. Purpose

Replace Share no-op with custom share UI: desktop popover · narrow bottom sheet · five networks + Copy link · honest unavailable when no public Issue URL.

## 2. Locked rules

1. Strip anatomy unchanged: `React | Comment | Share | Reactions`.  
2. **Custom UI only** — no system share-sheet hybrid.  
3. Desktop: **popover** under Share. Narrow 390: **bottom sheet**.  
4. Networks (order as artboard): Telegram · Instagram · X · WhatsApp · Facebook · **Copy link**.  
5. Instagram row annotates **copy-link fallback**; platform handoff limits remain TBD — no invent private API.  
6. Payload: **canonical public Issue URL**.  
7. Success feedback: **`Link copied`** — copy success only; external handoff ≠ delivered.  
8. No public URL: sheet body honesty — `Sharing is unavailable here.` / `No public Issue link is available.`  
9. Close dismisses surface. Share focus ring Present on strip.

## 3. Panels

| Panel | Meaning |
|-------|---------|
| A | Share keyboard focus on strip |
| B | Desktop popover with six rows |
| C | `Link copied` confirmation |
| D | Public URL unavailable honesty |
| E | Narrow bottom sheet |

## 4. Icons

Present OP-supplied SVGs live at `spa-app/public/icons/next-feed/share/`. Reuse only these paths; do not invent replacement brand marks.

## 5. Out of scope

OAuth · short-link service · Instagram Graph API · invent production domain in lab · redesign strip zones.

## 6. Acceptance checklist

- [ ] Share opens popover (desktop) / bottom sheet (narrow)  
- [ ] Six rows Present · icons from `/icons/next-feed/share/`  
- [ ] Copy feedback `Link copied`  
- [ ] Unavailable URL honesty  
- [ ] No silent no-op
